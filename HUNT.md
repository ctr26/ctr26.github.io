# King's Cross Treasure Hunt

A password-gated sequential clue system built into Craig's Jekyll site.
Participants solve outdoor clues → type the answer → unlock the next clue.
Future clue text is AES-GCM encrypted so it cannot be read from page source.

## How it works

1. **Stage 1** is always shown in plaintext (the starting point).
2. Solving stage 1 reveals its answer. The participant types it in.
3. The answer is normalized, hashed (SHA-256), and used as an AES-GCM key to decrypt stage 2's clue text.
4. Repeat for every subsequent stage.
5. After the last answer, a finish message is shown.

Progress is saved to `localStorage` so participants can close the tab and resume.
Decrypted clue text is cached in `sessionStorage` (tab-scoped) so they don't need to re-type on the same visit.
If they open a new browser tab after closing, they're prompted to re-enter their last answer.

## Authoring a hunt

### Step 1 — Write your clues and answers

Decide your route and write one clue + answer per physical location.

**Normalization rule** — all answers go through this before hashing/encrypting:
1. Trim leading/trailing whitespace
2. Convert to lowercase
3. Collapse internal whitespace to a single space

Your answers must match after normalization. Examples:
- `"  SIX  "` → `"six"` ✓
- `"Coal  Drops  Yard"` → `"coal drops yard"` ✓
- `"HogWarts"` → `"hogwarts"` ✓

### Step 2 — Open the admin tool

Open `/hunt-admin/` in your browser. Works locally (`bundle exec jekyll serve`) or on the live site.

> The admin page is `noindex` and not linked from anywhere. It is publicly accessible to anyone who knows the URL.

### Step 3 — Enter clues and answers

- Fill in the clue text and answer for each stage.
- Click **+ Add stage** to add more.
- Click **⚙️ Generate YAML** — the tool encrypts each clue in-browser using the previous answer as the key, computes answer_check hashes, and produces the YAML.

### Step 4 — Copy YAML into `_data/hunt.yml`

Copy the generated output and paste it into `_data/hunt.yml`, replacing the `stages:` and `finish:` blocks. You can add any other keys (comments, metadata) safely.

### Step 5 — Commit and deploy

```bash
git add _data/hunt.yml
git commit -m "chore(hunt): update clues"
git push
```

GitHub Pages will rebuild automatically.

## Adding, reordering, or removing stages

Always use `/hunt-admin/` to re-generate the YAML from scratch when changing the clue order or answers — because each clue is encrypted with the *previous* answer, any change ripples through all subsequent stages. Don't try to hand-edit `clue_enc` values.

Steps:
1. Open `/hunt-admin/`
2. Re-enter all clues and answers in the new order
3. Regenerate → copy → commit

## How progress and reset works

- **Progress**: current stage index is stored in `localStorage['hunt_stage']`. Participants can close the browser and return later; the hunt resumes where they left off.
- **Decrypted clue text**: stored in `sessionStorage` (cleared when the tab closes). On a fresh tab, participants are prompted to re-enter their last answer to decrypt the current clue.
- **Reset**: the "Start over" button clears `localStorage['hunt_stage']` and starts from Clue 1.

## Security model

This is **tamper-resistant, not cryptographically unbreakable**.

- Future clue text is never in the page source — it's AES-GCM ciphertext. A participant cannot read ahead by viewing source.
- Each stage's ciphertext can only be decrypted with the correct previous answer. AES-GCM authentication tags mean a wrong answer causes decryption to fail — not produce garbage.
- A determined developer can extract answers stage-by-stage (solve stage 1 → get key → decrypt stage 2 → repeat). They cannot skip ahead without solving in order.
- `answer_check` hashes (hex SHA-256) are in the page but cannot be reversed to recover the answer (SHA-256 is one-way for reasonable answers; for very short/guessable answers like single words, a dictionary attack is theoretically possible — keep your answers reasonably obscure or use phrases).

**This is the right level of security for a friendly walking hunt.**

## File map

| File | Purpose |
|------|---------|
| `_data/hunt.yml` | Hunt config: stages (titles, encrypted clues, answer hashes), finish message |
| `hunt.html` | The public hunt page at `/hunt/` |
| `assets/js/hunt.js` | Client-side logic: state machine, Web Crypto decrypt, localStorage |
| `hunt-admin.html` | Unlinked authoring tool at `/hunt-admin/` |
| `_scripts/gen_hunt.mjs` | Node.js script that generated the placeholder YAML + verified round-trip |
