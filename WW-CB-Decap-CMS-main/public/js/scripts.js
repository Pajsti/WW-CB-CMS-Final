// ========================================
// GLOBALS & UTILS
// ========================================

const i18n = {
  cs: {
    "nav.home":"Ahoj","nav.story":"Bylo nebylo","nav.news":"Aktuality","nav.gallery":"Fotogalerie","nav.program":"Zázemí","nav.about":"O nás","nav.contact":"Kontakt",
    "hero.kicker":"Oficiální stránky","hero.title":"Divoká voda – ČB","hero.lead":"Aktuality, galerie, program a live výsledky.",
    "feat.news":"Aktuality","feat.news-desc":"Novinky, reporty a články z akcí.","feat.read":"Číst",
    "feat.gallery":"Fotogalerie","feat.gallery-desc":"Fotky ze závodů a tréninků.","feat.open":"Otevřít",
    "feat.schedule":"Harmonogram","feat.schedule-desc":"Program závodních dnů a startovní listiny.","feat.view":"Zobrazit",
    "aside.quick":"Rychlé odkazy","aside.live":"Live Výsledky","aside.race":"Race Info","aside.docs":"Oficiální dokumenty","aside.sponsors":"Sponzoři",
    "news.title":"Nejnovější","news.lead":"Tady bude feed z aktualit."
  },
  en: {
    "nav.home":"Home","nav.story":"Story","nav.news":"News","nav.gallery":"Gallery","nav.program":"Venue","nav.about":"About","nav.contact":"Contact",
    "hero.kicker":"Official site","hero.title":"Whitewater – CB","hero.lead":"News, gallery, schedule and live results.",
    "feat.news":"News","feat.news-desc":"News, reports and articles from events.","feat.read":"Read",
    "feat.gallery":"Gallery","feat.gallery-desc":"Photos from races and training.","feat.open":"Open",
    "feat.schedule":"Schedule","feat.schedule-desc":"Race day schedule and start lists.","feat.view":"View",
    "aside.quick":"Quick links","aside.live":"Live Results","aside.race":"Race Info","aside.docs":"Official documents","aside.sponsors":"Sponsors",
    "news.title":"Latest","news.lead":"This will be the news feed."
  }
};

// ========================================
// THEME
// ========================================

function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
  }
  localStorage.setItem('wwcb_theme', theme);
  updateLogo(theme);
}

function updateLogo(theme) {
  const logo = document.querySelector('header img[alt*="logo"]');
  if (logo) {
    logo.src = theme === 'light' ? '/images/logo.png' : '/images/logo1.png';
  }
}

function toggleTheme() {
  const cur = localStorage.getItem('wwcb_theme') || 'dark';
  setTheme(cur === 'light' ? 'dark' : 'light');
}

function initTheme() {
  const saved = localStorage.getItem('wwcb_theme') ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark');
  setTheme(saved);
}

// ========================================
// LANGUAGE
// ========================================

function applyLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = (i18n[lang] && i18n[lang][key]) ? i18n[lang][key] : key;
  });
  const label = document.getElementById('langLabel');
  if (label) label.textContent = lang === 'cs' ? 'CZ' : 'EN';
  document.documentElement.lang = lang === 'cs' ? 'cs' : 'en';
}

function toggleLang() {
  const cur = localStorage.getItem('wwcb_lang') || 'cs';
  const next = cur === 'cs' ? 'en' : 'cs';
  localStorage.setItem('wwcb_lang', next);
  applyLang(next);
}

function initLang() {
  applyLang(localStorage.getItem('wwcb_lang') || 'cs');
}

// ========================================
// MOBILE MENU
// ========================================

function initMobilePanel() {
  const mobilePanel = document.getElementById('mobilePanel');
  const hamburger = document.getElementById('hamburger');
  const closePanel = document.getElementById('closePanel');
  const overlay = document.getElementById('mobileOverlay');

  if (!mobilePanel || !hamburger) return;

  const open = () => { mobilePanel.classList.add('open'); mobilePanel.setAttribute('aria-hidden', 'false'); };
  const close = () => { mobilePanel.classList.remove('open'); mobilePanel.setAttribute('aria-hidden', 'true'); };

  hamburger.addEventListener('click', open);
  if (closePanel) closePanel.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', close);
  mobilePanel.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// ========================================
// NAV HIGHLIGHT
// ========================================

function highlightNav() {
  const cur = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.remove('active');
    const href = (a.getAttribute('href') || '').replace(/\/$/, '');
    if (href === cur || (cur === '/' && href === '')) a.classList.add('active');
  });
}

// ========================================
// HEADER EVENTS
// ========================================

function bindHeaderEvents() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.replaceWith(themeToggle.cloneNode(true));
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  }

  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.replaceWith(langToggle.cloneNode(true));
    document.getElementById('langToggle').addEventListener('click', toggleLang);
  }

  initMobilePanel();
  updateLogo(localStorage.getItem('wwcb_theme') || 'dark');
}

// ========================================
// INIT
// ========================================

window.toggleTheme = toggleTheme;
window.toggleLang = toggleLang;

function init() {
  initTheme();
  initLang();
  bindHeaderEvents();
  highlightNav();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
