/**
 * verify_yaml.mjs — decrypts the EXISTING clue_enc values from _data/hunt.yml
 * and verifies they match the expected plaintext.
 * Uses the same algorithm as hunt.js and hunt-admin.html.
 */

import { webcrypto } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const subtle = webcrypto.subtle;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function normalize(s) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

async function sha256Hex(str) {
  const buf = await subtle.digest('SHA-256', encoder.encode(normalize(str)));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function deriveKey(answer) {
  const raw = await subtle.digest('SHA-256', encoder.encode(normalize(answer)));
  return subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['decrypt']);
}

function fromBase64(s) {
  return Uint8Array.from(Buffer.from(s, 'base64'));
}

async function decrypt(b64, keyAnswer) {
  const combined = fromBase64(b64);
  const iv = combined.slice(0, 12);
  const ct = combined.slice(12);
  const key = await deriveKey(keyAnswer);
  const pt = await subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  return decoder.decode(pt);
}

// ---- Read the YAML file (manual parse of just what we need) ----
// We extract clue_enc and answer_check values without a full YAML parser.

const dir = dirname(fileURLToPath(import.meta.url));
const yamlPath = join(dir, '../_data/hunt.yml');
const yaml = readFileSync(yamlPath, 'utf8');

// Known values for the 3 placeholder stages
const KNOWN = [
  { answer: 'six', prevAnswer: null },
  { answer: 'coal drops yard', prevAnswer: 'six' },
  { answer: 'hogwarts', prevAnswer: 'coal drops yard' },
];

// Extract clue_enc values (base64 strings)
const clueEncMatches = [...yaml.matchAll(/clue_enc:\s+"([^"]+)"/g)];
const answerCheckMatches = [...yaml.matchAll(/answer_check:\s+"([^"]+)"/g)];

if (clueEncMatches.length !== KNOWN.length - 1) {
  console.error(`Expected ${KNOWN.length - 1} clue_enc entries, found ${clueEncMatches.length}`);
  process.exit(1);
}
if (answerCheckMatches.length !== KNOWN.length) {
  console.error(`Expected ${KNOWN.length} answer_check entries, found ${answerCheckMatches.length}`);
  process.exit(1);
}

console.log('\n=== YAML ROUND-TRIP VERIFICATION ===\n');

let allPassed = true;

// Verify answer_check hashes
for (let i = 0; i < KNOWN.length; i++) {
  const expected = answerCheckMatches[i][1];
  const computed = await sha256Hex(KNOWN[i].answer);
  if (computed === expected) {
    console.log(`PASS: Stage ${i+1} answer_check matches for answer "${normalize(KNOWN[i].answer)}"`);
  } else {
    console.error(`FAIL: Stage ${i+1} answer_check mismatch`);
    console.error(`  expected: ${expected}`);
    console.error(`  computed: ${computed}`);
    allPassed = false;
  }
}

// Decrypt clue_enc values
const EXPECTED_DECRYPTS = [
  // Stage 2 clue (decrypted with stage 1 answer)
  `Clue 2: Make your way to Coal Drops Yard (through the station, follow signs). At the very top of the yard you'll find the famous rooftop where two Victorian coal-drop buildings meet in a dramatic architectural gesture designed by Thomas Heatherwick.\n\nWhat word is spelled out in large letters on the archway at the entrance to Coal Drops Yard from Stable Street?`,
  // Stage 3 clue (decrypted with stage 2 answer)
  `Clue 3: Head back into King's Cross station and find the Platform 9¾ installation. There's a luggage trolley appearing to vanish through a brick wall.\n\nWhat railway station do you need to reach (as shown on the destination board next to the trolley)?`,
];

for (let i = 0; i < clueEncMatches.length; i++) {
  const b64 = clueEncMatches[i][1];
  const prevAnswer = KNOWN[i + 1].prevAnswer; // prevAnswer for stage i+2 is KNOWN[i+1].prevAnswer
  try {
    const decrypted = await decrypt(b64, prevAnswer);
    // Trim both for comparison (YAML literal block may add trailing newline)
    if (decrypted.trim() === EXPECTED_DECRYPTS[i].trim()) {
      console.log(`PASS: Stage ${i+2} clue_enc decrypts correctly with answer "${normalize(prevAnswer)}"`);
    } else {
      console.error(`FAIL: Stage ${i+2} clue_enc decrypted text mismatch`);
      console.error(`  expected (first 80): ${JSON.stringify(EXPECTED_DECRYPTS[i].slice(0, 80))}`);
      console.error(`  got      (first 80): ${JSON.stringify(decrypted.slice(0, 80))}`);
      allPassed = false;
    }
  } catch (e) {
    console.error(`FAIL: Stage ${i+2} clue_enc failed to decrypt: ${e.message}`);
    allPassed = false;
  }
}

// Wrong answer should fail
for (let i = 0; i < clueEncMatches.length; i++) {
  const b64 = clueEncMatches[i][1];
  let threw = false;
  try { await decrypt(b64, 'wronganswer'); } catch (e) { threw = true; }
  if (threw) {
    console.log(`PASS: Stage ${i+2} rejects wrong decryption key (AES-GCM tag check)`);
  } else {
    console.error(`FAIL: Stage ${i+2} did NOT throw with wrong key`);
    allPassed = false;
  }
}

console.log(`\n=== ${allPassed ? 'ALL CHECKS PASSED ✓' : 'SOME CHECKS FAILED ✗'} ===\n`);
if (!allPassed) { process.exit(1); }
