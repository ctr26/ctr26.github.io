/**
 * hunt.js — King's Cross Treasure Hunt client-side logic
 *
 * Normalization rule (MUST match hunt-admin.html exactly):
 *   trim → lowercase → collapse internal whitespace to single spaces
 *
 * Key derivation: SHA-256(UTF-8(normalized_answer)) → 32-byte AES-GCM key
 * Ciphertext format in hunt.yml: base64(12-byte IV || AES-GCM ciphertext)
 * answer_check in hunt.yml: hex(SHA-256(normalized_answer))
 *
 * Progress: localStorage['hunt_stage']   — persists across browser sessions
 * Clue text: sessionStorage['hunt_clue_N'] — tab-scoped, cleared on close
 */

(function () {
  'use strict';

  // HUNT_DATA is injected by Jekyll in hunt.html:
  //   var HUNT_DATA = {{ site.data.hunt | jsonify }};
  // It contains only ciphertext + answer_check hashes — never plaintext future clues.

  var enc = new TextEncoder();
  var dec = new TextDecoder();
  var STORAGE_KEY = 'hunt_stage';

  // ---- Normalization -------------------------------------------------------
  function normalize(s) {
    return s.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  // ---- Crypto helpers ------------------------------------------------------
  function hexEncode(buf) {
    return Array.from(new Uint8Array(buf))
      .map(function (b) { return b.toString(16).padStart(2, '0'); })
      .join('');
  }

  function base64Decode(s) {
    var binary = atob(s);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  function sha256Hex(str) {
    return crypto.subtle.digest('SHA-256', enc.encode(normalize(str)))
      .then(function (buf) { return hexEncode(buf); });
  }

  function deriveDecryptKey(answer) {
    return crypto.subtle.digest('SHA-256', enc.encode(normalize(answer)))
      .then(function (raw) {
        return crypto.subtle.importKey(
          'raw', raw, { name: 'AES-GCM' }, false, ['decrypt']
        );
      });
  }

  function decryptClue(b64, keyAnswer) {
    var combined = base64Decode(b64);
    var iv = combined.slice(0, 12);
    var ct = combined.slice(12);
    return deriveDecryptKey(keyAnswer).then(function (key) {
      return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, ct);
    }).then(function (buf) {
      return dec.decode(buf);
    });
  }

  // ---- State ---------------------------------------------------------------
  function loadStage() {
    var s = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    return isNaN(s) ? 0 : s;
  }

  function saveStage(n) {
    localStorage.setItem(STORAGE_KEY, String(n));
  }

  function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function cacheClue(index, text) {
    sessionStorage.setItem('hunt_clue_' + index, text);
  }

  function getCachedClue(index) {
    return sessionStorage.getItem('hunt_clue_' + index);
  }

  // ---- UI helpers ----------------------------------------------------------
  function escapeHTML(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function clueToHTML(text) {
    // Split on double-newline for paragraphs; single newlines become <br>
    return text.trim().split(/\n{2,}/).map(function (p) {
      return '<p>' + escapeHTML(p).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  function setFeedback(msg, isError) {
    var el = document.getElementById('hunt-feedback');
    if (!el) { return; }
    el.textContent = msg;
    el.className = 'hunt-feedback' + (isError ? ' hunt-feedback-error' : ' hunt-feedback-ok');
  }

  function setButtonBusy(btn, isLast) {
    if (!btn) { return; }
    btn.disabled = true;
    btn.textContent = 'Checking…';
  }

  function setButtonReady(btn, isLast) {
    if (!btn) { return; }
    btn.disabled = false;
    btn.textContent = isLast ? '🏁 Submit final answer' : 'Submit →';
  }

  // ---- Submit answer -------------------------------------------------------
  function handleSubmit(stageIndex, rawAnswer) {
    var stages = HUNT_DATA.stages;
    var stage = stages[stageIndex];
    var isLast = (stageIndex === stages.length - 1);
    var btn = document.querySelector('.hunt-submit');

    setButtonBusy(btn, isLast);

    sha256Hex(rawAnswer).then(function (hex) {
      if (hex !== stage.answer_check) {
        setFeedback('❌ Not quite — try again!', true);
        setButtonReady(btn, isLast);
        return;
      }

      var nextIndex = stageIndex + 1;
      if (nextIndex >= stages.length) {
        saveStage(nextIndex);
        renderFinish();
        return;
      }

      var nextStage = stages[nextIndex];
      decryptClue(nextStage.clue_enc, rawAnswer).then(function (plaintext) {
        cacheClue(nextIndex, plaintext);
        saveStage(nextIndex);
        renderStage(nextIndex, plaintext);
      }).catch(function (err) {
        // Shouldn't happen if answer_check matched — but handle gracefully
        setFeedback('⚠️ Decryption error. Please check your answer and try again.', true);
        console.error('Decrypt error after hash match (should not happen):', err);
        setButtonReady(btn, false);
      });

    }).catch(function (err) {
      setFeedback('⚠️ Crypto error. Try refreshing the page.', true);
      console.error('SHA-256 error:', err);
      setButtonReady(btn, isLast);
    });
  }

  // ---- Render: active stage -----------------------------------------------
  function renderStage(index, clueText) {
    var stages = HUNT_DATA.stages;
    var total = stages.length;
    var app = document.getElementById('hunt-app');
    var isLast = (index === total - 1);
    var progressPct = Math.round((index / total) * 100);

    app.innerHTML =
      '<div class="hunt-progress">'
        + '<span class="hunt-progress-label">Clue ' + (index + 1) + ' of ' + total + '</span>'
        + '<div class="hunt-progress-bar" role="progressbar" aria-valuenow="' + (index + 1) + '" aria-valuemax="' + total + '">'
          + '<div class="hunt-progress-fill" style="width:' + progressPct + '%"></div>'
        + '</div>'
      + '</div>'
      + '<div class="hunt-clue box">'
        + '<h2 class="hunt-stage-title">' + escapeHTML(stages[index].title || ('Clue ' + (index + 1))) + '</h2>'
        + '<div class="hunt-clue-text">' + clueToHTML(clueText) + '</div>'
      + '</div>'
      + '<form id="hunt-form" class="hunt-form" autocomplete="off" novalidate>'
        + '<label for="hunt-answer">Your answer:</label>'
        + '<input type="text" id="hunt-answer" class="hunt-input" placeholder="Type your answer…" '
          + 'autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">'
        + '<button type="submit" class="button primary hunt-submit">'
          + (isLast ? '🏁 Submit final answer' : 'Submit →')
        + '</button>'
      + '</form>'
      + '<p id="hunt-feedback" class="hunt-feedback" aria-live="polite"></p>'
      + '<div class="hunt-footer-actions">'
        + '<button class="button small" id="hunt-reset">Start over</button>'
      + '</div>';

    var input = document.getElementById('hunt-answer');
    if (input) { input.focus(); }

    document.getElementById('hunt-form').addEventListener('submit', function (e) {
      e.preventDefault();
      handleSubmit(index, input.value);
    });

    document.getElementById('hunt-reset').addEventListener('click', function () {
      if (confirm('This will clear your progress and start from Clue 1. Continue?')) {
        resetProgress();
        init();
      }
    });
  }

  // ---- Render: finish screen -----------------------------------------------
  function renderFinish() {
    var app = document.getElementById('hunt-app');
    var total = HUNT_DATA.stages.length;
    var finishText = HUNT_DATA.finish || 'You have completed the hunt! 🎉';

    app.innerHTML =
      '<div class="hunt-finish box">'
        + '<div class="hunt-progress">'
          + '<span class="hunt-progress-label">Complete — ' + total + ' of ' + total + ' clues solved 🎉</span>'
          + '<div class="hunt-progress-bar"><div class="hunt-progress-fill" style="width:100%"></div></div>'
        + '</div>'
        + '<div class="hunt-finish-text">' + clueToHTML(finishText) + '</div>'
      + '</div>'
      + '<div class="hunt-footer-actions">'
        + '<button class="button small" id="hunt-reset">Play again</button>'
      + '</div>';

    document.getElementById('hunt-reset').addEventListener('click', function () {
      resetProgress();
      init();
    });
  }

  // ---- Render: error -------------------------------------------------------
  function renderError(msg) {
    var app = document.getElementById('hunt-app');
    app.innerHTML =
      '<div class="hunt-error box">'
        + '<p>⚠️ ' + escapeHTML(msg) + '</p>'
        + '<p><button class="button small" id="hunt-reset">Reset &amp; start over</button></p>'
      + '</div>';
    var btn = document.getElementById('hunt-reset');
    if (btn) {
      btn.addEventListener('click', function () { resetProgress(); init(); });
    }
  }

  // ---- Render: re-entry (resume after closing tab) -------------------------
  function renderReentry(stageIndex) {
    var stages = HUNT_DATA.stages;
    var app = document.getElementById('hunt-app');

    app.innerHTML =
      '<div class="hunt-reentry box">'
        + '<h2>Resume your hunt</h2>'
        + '<p>You were on <strong>' + escapeHTML(stages[stageIndex].title || ('Clue ' + (stageIndex + 1))) + '</strong>.</p>'
        + '<p>To show your clue, re-enter the answer to the <em>previous</em> clue:</p>'
        + '<form id="hunt-reentry-form" autocomplete="off" novalidate>'
          + '<input type="text" id="hunt-reentry-answer" class="hunt-input" placeholder="Previous answer…" '
            + 'autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">'
          + '<button type="submit" class="button primary hunt-submit">Resume →</button>'
        + '</form>'
        + '<p id="hunt-feedback" class="hunt-feedback" aria-live="polite"></p>'
        + '<div class="hunt-footer-actions">'
          + '<button class="button small" id="hunt-reset">Start over from Clue 1</button>'
        + '</div>'
      + '</div>';

    var input = document.getElementById('hunt-reentry-answer');
    if (input) { input.focus(); }

    document.getElementById('hunt-reentry-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var rawAnswer = input.value;
      var prevStage = stages[stageIndex - 1];
      var btn = document.querySelector('.hunt-submit');
      btn.disabled = true;
      btn.textContent = 'Checking…';

      sha256Hex(rawAnswer).then(function (hex) {
        if (hex !== prevStage.answer_check) {
          setFeedback('❌ That\'s not the right answer for the previous clue.', true);
          btn.disabled = false;
          btn.textContent = 'Resume →';
          return;
        }
        decryptClue(stages[stageIndex].clue_enc, rawAnswer).then(function (plaintext) {
          cacheClue(stageIndex, plaintext);
          renderStage(stageIndex, plaintext);
        }).catch(function () {
          setFeedback('⚠️ Decryption error — please try again.', true);
          btn.disabled = false;
          btn.textContent = 'Resume →';
        });
      }).catch(function () {
        setFeedback('⚠️ Crypto error. Try refreshing the page.', true);
        btn.disabled = false;
        btn.textContent = 'Resume →';
      });
    });

    document.getElementById('hunt-reset').addEventListener('click', function () {
      resetProgress();
      init();
    });
  }

  // ---- Initialisation ------------------------------------------------------
  function init() {
    var app = document.getElementById('hunt-app');
    if (!app) { return; }

    if (!window.HUNT_DATA || !Array.isArray(HUNT_DATA.stages) || HUNT_DATA.stages.length === 0) {
      renderError('Hunt data is missing or invalid. Please check _data/hunt.yml.');
      return;
    }

    var stages = HUNT_DATA.stages;
    if (!stages[0].clue) {
      renderError('Stage 1 must have a plaintext "clue" field in hunt.yml.');
      return;
    }

    var savedStage = loadStage();

    if (savedStage >= stages.length) {
      renderFinish();
      return;
    }

    if (savedStage === 0) {
      renderStage(0, stages[0].clue);
      return;
    }

    // Subsequent stages: clue text lives in sessionStorage after first decrypt
    var cached = getCachedClue(savedStage);
    if (cached) {
      renderStage(savedStage, cached);
      return;
    }

    // New tab / closed and reopened — need previous answer to re-derive key
    renderReentry(savedStage);
  }

  // ---- Boot ----------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
