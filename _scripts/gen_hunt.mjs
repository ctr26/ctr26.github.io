/**
 * Hunt data generator + round-trip verifier.
 * Produces encrypted stage data for _data/hunt.yml and verifies decryption.
 *
 * Normalization rule (must match hunt.js and hunt-admin.html exactly):
 *   trim → lowercase → collapse internal whitespace to single spaces
 *
 * Key derivation: SHA-256(UTF-8(normalized_answer)) → 32-byte AES-GCM key
 * Ciphertext format: base64(12-byte IV || ciphertext)
 * answer_check: hex(SHA-256(normalized_answer))
 */

import { webcrypto } from 'node:crypto';
const subtle = webcrypto.subtle;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

// ---- canonical normalization (must match hunt.js + hunt-admin.html) ----
function normalize(s) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

// ---- helpers ----
async function sha256(str) {
  const data = encoder.encode(normalize(str));
  const hash = await subtle.digest('SHA-256', data);
  return new Uint8Array(hash);
}

async function sha256Hex(str) {
  const buf = await sha256(str);
  return Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function deriveKey(answer) {
  const raw = await sha256(answer);
  return subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

function toBase64(buf) {
  return Buffer.from(buf).toString('base64');
}

function fromBase64(s) {
  return Uint8Array.from(Buffer.from(s, 'base64'));
}

async function encrypt(plaintext, keyAnswer) {
  const key = await deriveKey(keyAnswer);
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const ct = await subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(plaintext)
  );
  // Pack: IV (12 bytes) + ciphertext
  const combined = new Uint8Array(12 + ct.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ct), 12);
  return toBase64(combined);
}

async function decrypt(b64, keyAnswer) {
  const combined = fromBase64(b64);
  const iv = combined.slice(0, 12);
  const ct = combined.slice(12);
  const key = await deriveKey(keyAnswer);
  const pt = await subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  return decoder.decode(pt);
}

// ---- Placeholder stages ----
// Craig will replace these with real King's Cross clues + answers.
// The answers below are what you type to advance — they go through normalize() first.
const stages = [
  {
    title: 'Clue 1 — The Clocktower',
    clue: `Welcome to the King's Cross Treasure Hunt! 🚂

Head to the front of King's Cross station on Euston Road. Look up at the spectacular Victorian roof. How many large arched windows are visible on the upper section of the station frontage?

(Enter your answer below to unlock the next clue)`,
    answer: 'six',
  },
  {
    title: 'Clue 2 — Coal Drops Yard',
    clue: `Clue 2: Make your way to Coal Drops Yard (through the station, follow signs). At the very top of the yard you'll find the famous rooftop where two Victorian coal-drop buildings meet in a dramatic architectural gesture designed by Thomas Heatherwick.

What word is spelled out in large letters on the archway at the entrance to Coal Drops Yard from Stable Street?`,
    answer: 'coal drops yard',
  },
  {
    title: 'Clue 3 — Platform 9¾',
    clue: `Clue 3: Head back into King's Cross station and find the Platform 9¾ installation. There's a luggage trolley appearing to vanish through a brick wall.

What railway station do you need to reach (as shown on the destination board next to the trolley)?`,
    answer: 'hogwarts',
  },
];

const finish = `🎉 Congratulations — you've completed the King's Cross Treasure Hunt!

Make your way back to the starting point for your prize.`;

// ---- Generate YAML ----
async function generateYAML() {
  const lines = [];
  lines.push(`# =============================================================================`);
  lines.push(`# King's Cross Treasure Hunt — _data/hunt.yml`);
  lines.push(`# =============================================================================`);
  lines.push(`#`);
  lines.push(`# SCHEMA`);
  lines.push(`# ------`);
  lines.push(`# stages: (ordered list)`);
  lines.push(`#   - title:       Human-readable stage name (shown in progress bar)`);
  lines.push(`#   - clue:        PLAINTEXT clue — ONLY for stage 1 (the entry point)`);
  lines.push(`#   - clue_enc:    BASE64(IV || AES-GCM ciphertext) of the clue text,`);
  lines.push(`#                  encrypted with SHA-256(normalize(PREVIOUS stage's answer))`);
  lines.push(`#   - answer_check: hex(SHA-256(normalize(THIS stage's answer)))`);
  lines.push(`#                   Used to verify a typed password before using it as the next key.`);
  lines.push(`#`);
  lines.push(`# finish:          Message shown after the last stage is solved.`);
  lines.push(`#`);
  lines.push(`# NORMALIZATION RULE (applies to ALL answers — yours must match after this):`);
  lines.push(`#   1. Trim leading/trailing whitespace`);
  lines.push(`#   2. Lowercase`);
  lines.push(`#   3. Collapse internal whitespace to a single space`);
  lines.push(`#   Examples: "  SIX  " → "six"  |  "Coal  Drops   Yard" → "coal drops yard"`);
  lines.push(`#`);
  lines.push(`# TO AUTHOR A HUNT:`);
  lines.push(`#   1. Open /hunt-admin/ in your browser (works locally or on the deployed site)`);
  lines.push(`#   2. Enter your clue texts and answers in order`);
  lines.push(`#   3. Click "Generate YAML" — the tool encrypts each clue in-browser`);
  lines.push(`#   4. Copy-paste the generated YAML here, replacing the stages: block`);
  lines.push(`#   5. Commit and push`);
  lines.push(`#`);
  lines.push(`# SECURITY NOTE:`);
  lines.push(`#   This is tamper-resistant, not cryptographically unbreakable.`);
  lines.push(`#   A determined developer can extract keys stage-by-stage (each answer`);
  lines.push(`#   unlocks only the next clue), but cannot skip ahead without solving`);
  lines.push(`#   each stage in order. Perfect for a friendly walking hunt.`);
  lines.push(`# =============================================================================`);
  lines.push(``);
  lines.push(`stages:`);

  for (let i = 0; i < stages.length; i++) {
    const s = stages[i];
    const answerCheck = await sha256Hex(s.answer);
    lines.push(`  - title: "${s.title.replace(/"/g, '\\"')}"`);
    if (i === 0) {
      // Stage 1: plaintext clue
      lines.push(`    clue: |`);
      for (const line of s.clue.split('\n')) {
        lines.push(`      ${line}`);
      }
    } else {
      // Later stages: encrypted with previous answer
      const encryptedClue = await encrypt(s.clue, stages[i - 1].answer);
      lines.push(`    clue_enc: "${encryptedClue}"`);
    }
    lines.push(`    answer_check: "${answerCheck}"`);
    // Blank line between stages for readability
    if (i < stages.length - 1) lines.push(``);
  }

  lines.push(``);
  lines.push(`finish: |`);
  for (const line of finish.split('\n')) {
    lines.push(`  ${line}`);
  }

  return lines.join('\n');
}

// ---- Round-trip verification ----
async function verifyRoundTrip() {
  console.log('\n=== ROUND-TRIP VERIFICATION ===\n');
  let allPassed = true;

  for (let i = 1; i < stages.length; i++) {
    const prevAnswer = stages[i - 1].answer;
    const plaintext = stages[i].clue;

    // Encrypt
    const b64 = await encrypt(plaintext, prevAnswer);

    // Decrypt with correct answer
    let decrypted;
    try {
      decrypted = await decrypt(b64, prevAnswer);
    } catch (e) {
      console.error(`FAIL: Stage ${i + 1} decrypt with CORRECT answer threw: ${e.message}`);
      allPassed = false;
      continue;
    }

    if (decrypted !== plaintext) {
      console.error(`FAIL: Stage ${i + 1} decrypt mismatch`);
      console.error(`  expected: ${JSON.stringify(plaintext.slice(0, 80))}`);
      console.error(`  got:      ${JSON.stringify(decrypted.slice(0, 80))}`);
      allPassed = false;
    } else {
      console.log(`PASS: Stage ${i + 1} decrypts correctly with answer "${normalize(prevAnswer)}"`);
    }

    // Attempt decrypt with wrong answer — should throw
    let wrongThrew = false;
    try {
      await decrypt(b64, 'wronganswer');
    } catch (e) {
      wrongThrew = true;
    }
    if (!wrongThrew) {
      console.error(`FAIL: Stage ${i + 1} did NOT throw with wrong answer (AES-GCM tag check broken)`);
      allPassed = false;
    } else {
      console.log(`PASS: Stage ${i + 1} rejects wrong answer (AES-GCM authentication tag check)`);
    }
  }

  // Verify answer_check hashes
  for (let i = 0; i < stages.length; i++) {
    const check = await sha256Hex(stages[i].answer);
    console.log(`Stage ${i + 1} answer_check: ${check.slice(0, 16)}...  (for answer "${normalize(stages[i].answer)}")`);
  }

  console.log(`\n=== ${allPassed ? 'ALL CHECKS PASSED ✓' : 'SOME CHECKS FAILED ✗'} ===\n`);
  return allPassed;
}

// ---- Main ----
const yaml = await generateYAML();
const passed = await verifyRoundTrip();

if (!passed) {
  process.exit(1);
}

process.stdout.write('\n=== GENERATED YAML ===\n\n');
process.stdout.write(yaml + '\n');
