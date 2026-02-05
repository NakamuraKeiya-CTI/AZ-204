/* ===== Theme Toggle ===== */
function initTheme() {
  const saved = localStorage.getItem('az204-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('az204-theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
}

/* ===== Mobile Sidebar ===== */
function initSidebar() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  // Close sidebar on link click (mobile)
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
      }
    });
  });
}

/* ===== Accordion ===== */
function initAccordions() {
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');

      // Close all in same group
      const parent = btn.closest('.accordion-group');
      if (parent) {
        parent.querySelectorAll('.accordion-btn').forEach(b => {
          b.classList.remove('active');
          b.nextElementSibling.classList.remove('show');
        });
      }

      if (!isOpen) {
        btn.classList.add('active');
        content.classList.add('show');
      }
    });
  });
}

/* ===== Copy Code ===== */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.closest('.code-block').querySelector('pre').textContent;
      navigator.clipboard.writeText(code).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = orig, 1500);
      });
    });
  });
}

/* ===== Quiz Engine ===== */
function initQuiz() {
  document.querySelectorAll('.quiz-section').forEach(quizSection => {
    const checkBtn = quizSection.querySelector('.quiz-check');
    const resetBtn = quizSection.querySelector('.quiz-reset');
    const resultDiv = quizSection.querySelector('.quiz-result');

    if (!checkBtn) return;

    checkBtn.addEventListener('click', () => {
      let correct = 0;
      let total = 0;
      const questions = quizSection.querySelectorAll('.quiz-question');

      questions.forEach(q => {
        total++;
        const answer = q.dataset.answer;
        const selected = q.querySelector('input[type="radio"]:checked');
        const explanation = q.querySelector('.q-explanation');

        // Reset styles
        q.querySelectorAll('label').forEach(l => {
          l.classList.remove('correct', 'incorrect');
        });

        if (selected) {
          const selectedLabel = selected.closest('label');
          if (selected.value === answer) {
            correct++;
            selectedLabel.classList.add('correct');
          } else {
            selectedLabel.classList.add('incorrect');
            // Show correct answer
            q.querySelectorAll('input[type="radio"]').forEach(r => {
              if (r.value === answer) r.closest('label').classList.add('correct');
            });
          }
        } else {
          // No answer selected - show correct
          q.querySelectorAll('input[type="radio"]').forEach(r => {
            if (r.value === answer) r.closest('label').classList.add('correct');
          });
        }

        if (explanation) explanation.classList.add('show');
      });

      if (resultDiv) {
        const pct = Math.round((correct / total) * 100);
        resultDiv.innerHTML = `\uD83C\uDFAF ${correct} / ${total} \u6B63\u89E3 (${pct}%)` +
          (pct >= 80 ? '<br>\u2728 \u7D20\u6674\u3089\u3057\u3044\uFF01' :
           pct >= 60 ? '<br>\uD83D\uDCAA \u3082\u3046\u5C11\u3057\uFF01' :
           '<br>\uD83D\uDCDA \u5FA9\u7FD2\u3057\u307E\u3057\u3087\u3046');
        resultDiv.style.background = pct >= 80 ? 'var(--success-bg)' :
          pct >= 60 ? '#fff4ce' : 'var(--error-bg)';
        resultDiv.classList.add('show');
      }

      // Save progress
      const moduleId = quizSection.dataset.module;
      if (moduleId) {
        const progress = JSON.parse(localStorage.getItem('az204-progress') || '{}');
        progress[moduleId] = { correct, total, pct: Math.round((correct / total) * 100) };
        localStorage.setItem('az204-progress', JSON.stringify(progress));
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        quizSection.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
        quizSection.querySelectorAll('label').forEach(l => l.classList.remove('correct', 'incorrect'));
        quizSection.querySelectorAll('.q-explanation').forEach(e => e.classList.remove('show'));
        if (resultDiv) resultDiv.classList.remove('show');
      });
    }
  });
}

/* ===== Progress Display (index page) ===== */
function initProgress() {
  const progress = JSON.parse(localStorage.getItem('az204-progress') || '{}');
  document.querySelectorAll('.module-card').forEach(card => {
    const moduleId = card.dataset.module;
    if (moduleId && progress[moduleId]) {
      const bar = card.querySelector('.card-progress-bar');
      if (bar) bar.style.width = progress[moduleId].pct + '%';
    }
  });
}

/* ===== Scroll to Top ===== */
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ===== Reading Progress Bar ===== */
function initReadingProgress() {
  const bar = document.querySelector('.reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = pct + '%';
  });
}

/* ===== Active Sidebar Link ===== */
function initActiveSidebarLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage) {
      a.classList.add('active');
    }
  });
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebar();
  initAccordions();
  initCopyButtons();
  initQuiz();
  initProgress();
  initScrollTop();
  initReadingProgress();
  initActiveSidebarLink();
});
