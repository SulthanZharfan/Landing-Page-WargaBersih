// Navigasi hamburger
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');
  if (!navLinks || !hamburger) return;
  const willOpen = !navLinks.classList.contains('active');
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', String(willOpen));
}

// Tutup menu saat link diklik (untuk mobile)
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks?.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });
});

const sanitizeSelector = (selector) => {
  const trimmed = (selector || '').trim();
  if (!trimmed || trimmed === '#' || !trimmed.startsWith('#')) return null;
  return trimmed;
};

const findTarget = (selector) => {
  const safeSelector = sanitizeSelector(selector);
  if (!safeSelector) return null;
  try {
    return document.querySelector(safeSelector);
  } catch (err) {
    console.warn('Lewati selector tidak valid:', safeSelector, err);
    return null;
  }
};

// Smooth scroll untuk link internal
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  const target = findTarget(anchor.getAttribute('href'));
  if (!target) return;
  anchor.addEventListener('click', (event) => {
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Tutup menu saat klik di luar navigasi
document.addEventListener('click', (event) => {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  if (!nav || !navLinks || !hamburger) return;
  const clickedOutside = !nav.contains(event.target) && !hamburger.contains(event.target);
  if (clickedOutside && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// Tutup menu dengan tombol Escape
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');
  navLinks?.classList.remove('active');
  if (hamburger) {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// Data default untuk fallback
const defaultData = {
  features: [
    {
      icon: '\u{1F4C5}',
      title: 'Jadwal Pengambilan Sampah',
      description: 'Lihat jadwal angkut terbaru agar lingkungan tetap rapi dan teratur.',
    },
    {
      icon: '\u{1F4E3}',
      title: 'Pengumuman RT/RW',
      description: 'Update rapat, gotong royong, dan informasi penting langsung di dashboard.',
    },
    {
      icon: '\u{1F4DD}',
      title: 'Laporan Warga',
      description: 'Kirim laporan lengkap dengan foto dan lokasi agar cepat ditindaklanjuti.',
    },
    {
      icon: '\u26A1',
      title: 'Notifikasi Real-time',
      description: 'Notifikasi ke aplikasi, email, dan WhatsApp untuk setiap perkembangan.',
    },
  ],
  programs: [
    { icon: '\u267B', title: 'Bank Sampah', description: 'Penukaran sampah terpilah menjadi poin dan insentif.' },
    { icon: '\u2692', title: 'Bersih Selokan', description: 'Jadwal gotong royong dan pelaporan hambatan lapangan.' },
    { icon: '\u{1F331}', title: 'Kompos Kampung', description: 'Pelatihan dan monitoring produksi kompos mandiri.' },
  ],
  testimonials: [
    { text: 'Sekarang laporan cepat direspons, warga lebih semangat jaga lingkungan.', author: 'Ibu Ratna - Warga' },
    { text: 'Dashboard-nya jelas, memudahkan kami membagi tugas petugas lapangan.', author: 'Pak Dedi - Ketua RT 06' },
    { text: 'Notifikasi WhatsApp efektif, jadwal angkut tidak pernah terlewat.', author: 'Rina - Warga' },
  ],
};

function renderData(data) {
  const featureContainer = document.getElementById('fitur');
  if (featureContainer) {
    featureContainer.innerHTML = '';
    const frag = document.createDocumentFragment();
    (data.features || []).forEach((feature) => {
      const card = document.createElement('article');
      card.className = 'feature-card reveal';
      card.innerHTML = `
        <span class="pill-icon" aria-hidden="true">${feature.icon}</span>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
      `;
      frag.appendChild(card);
    });
    featureContainer.appendChild(frag);
  }

  const programContainer = document.getElementById('programs');
  if (programContainer) {
    programContainer.innerHTML = '';
    const frag = document.createDocumentFragment();
    (data.programs || []).forEach((program) => {
      const card = document.createElement('article');
      card.className = 'program-card reveal';
      card.innerHTML = `
        <div class="program-icon" aria-hidden="true">${program.icon}</div>
        <div>
          <h3>${program.title}</h3>
          <p>${program.description}</p>
        </div>
      `;
      frag.appendChild(card);
    });
    programContainer.appendChild(frag);
  }

  const testiContainer = document.getElementById('testiList');
  if (testiContainer) {
    testiContainer.innerHTML = '';
    const frag = document.createDocumentFragment();
    (data.testimonials || []).forEach((testi) => {
      const card = document.createElement('article');
      card.className = 'quote-card reveal';
      card.innerHTML = `
        <p>"${testi.text}"</p>
        <span>${testi.author}</span>
      `;
      frag.appendChild(card);
    });
    testiContainer.appendChild(frag);
  }

  setupReveal();
}

// Fetch data dari file, fallback ke defaultData
fetch('data.json')
  .then((response) => (response.ok ? response.json() : Promise.reject()))
  .then((json) => renderData(json))
  .catch(() => renderData(defaultData));

// Scrollspy
const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'))
  .map((anchor) => {
    const href = anchor.getAttribute('href');
    const target = findTarget(href);
    if (!target) return null;
    return { id: target.id || href.slice(1), el: target, anchor };
  })
  .filter(Boolean);

function onScrollSpy() {
  if (!navAnchors.length) return;
  const fromTop = window.scrollY + 120;
  let current = null;
  navAnchors.forEach((item) => {
    if (item.el.offsetTop <= fromTop) current = item.id;
  });
  navAnchors.forEach((item) => {
    if (item.id === current) item.anchor.classList.add('active');
    else item.anchor.classList.remove('active');
  });
}

if (navAnchors.length) {
  document.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();
}

// Theme toggle dengan penyimpanan preferensi
const themeKey = 'wb-theme';
const btnTheme = document.getElementById('themeToggle');
const prefersDarkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

const getStoredTheme = () => {
  try {
    return localStorage.getItem(themeKey);
  } catch (err) {
    return null;
  }
};

const setStoredTheme = (value) => {
  try {
    localStorage.setItem(themeKey, value);
  } catch (err) {
    console.warn('Tidak dapat menyimpan tema', err);
  }
};

function renderThemeButton(isDark) {
  if (!btnTheme) return;
  btnTheme.setAttribute('aria-pressed', String(isDark));
  btnTheme.innerHTML = `
    <span class="theme-toggle__icon" aria-hidden="true">${isDark ? '\u2600' : '\u263E'}</span>
    <span>${isDark ? 'Mode Terang' : 'Mode Gelap'}</span>
  `;
  btnTheme.title = isDark ? 'Pilih mode terang' : 'Pilih mode gelap';
}

function applyTheme(mode) {
  if (!mode) return;
  document.documentElement.setAttribute('data-theme', mode);
  renderThemeButton(mode === 'dark');
}

function initTheme() {
  const stored = getStoredTheme();
  const prefersDark = prefersDarkQuery?.matches;
  applyTheme(stored || (prefersDark ? 'dark' : 'light'));
}

initTheme();

if (btnTheme) {
  btnTheme.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    setStoredTheme(next);
    applyTheme(next);
  });
}

prefersDarkQuery?.addEventListener('change', (event) => {
  if (getStoredTheme()) return;
  applyTheme(event.matches ? 'dark' : 'light');
});

// IntersectionObserver reveal animations
function setupReveal() {
  const elements = document.querySelectorAll('.feature-card, .program-card, .quote-card, .stat-card, .step-card, .demo-card, .team-card');
  if (!elements.length) return;

  const observer =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries, io) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 },
        )
      : null;

  elements.forEach((el) => {
    el.classList.add('reveal');
    if (observer) observer.observe(el);
    else el.classList.add('in');
  });
}

// Inisialisasi awal
setupReveal();
