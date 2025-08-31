// Dynamic content for portfolio
const projects = [
  {
    title: {
      id: 'Aplikasi Chat Lokal dengan Integrasi AI',
      en: 'Local Chat App with AI Integration',
    },
    description: {
      id: 'Chat React lokal terintegrasi DeepSeek R1 via Ollama. Percakapan persisten dengan IndexedDB, mendukung thread (rename, delete, multi-session) dan fokus privasi (tanpa server).',
      en: 'Local React chat integrated with DeepSeek R1 via Ollama. Persistent conversations with IndexedDB, thread management (rename, delete, multi-session), privacy-first (no server).',
    },
    tags: ['React', 'IndexedDB', 'Ollama', 'DeepSeek R1'],
    repo: 'https://github.com/christofelkev/chat-local-ai',
    images: [
      './assets/projects/AI1.png',
      './assets/projects/AI2.png',
      './assets/projects/AI3.png',
    ],
  },
  {
    title: {
      id: 'RECIDER (Recipe Indonesia Finder)',
      en: 'RECIDER (Recipe Indonesia Finder)',
    },
    description: {
      id: 'Aplikasi Android (Kotlin) untuk mencari resep masakan Indonesia berdasarkan judul atau bahan. Menggunakan Retrofit, arsitektur MVVM, LiveData & ViewModel untuk UI dinamis dan rekomendasi dari backend.',
      en: 'Android app (Kotlin) to find Indonesian recipes by title or ingredients. Uses Retrofit, MVVM architecture, LiveData & ViewModel for dynamic UI and backend-driven recommendations.',
    },
    tags: [
      'Android Studio',
      'Kotlin',
      'Retrofit',
      'MVVM',
      'LiveData',
      'ViewModel',
    ],
    repo: 'https://github.com/christofelkev/recider',
    images: ['./assets/projects/recider1.png'],
  },
  {
    title: {
      id: 'Video to GIF Converter (FFmpeg)',
      en: 'Video to GIF Converter (FFmpeg)',
    },
    description: {
      id: 'Aplikasi web untuk konversi video → GIF. Frontend React, backend Node.js (Express), proses konversi oleh FFmpeg. Upload dari browser, proses server, unduh hasil GIF mudah.',
      en: 'Web app to convert video → GIF. React frontend, Node.js (Express) backend, conversion via FFmpeg. Upload from browser, server-side conversion, easy GIF download.',
    },
    tags: ['React', 'Node.js', 'Express', 'FFmpeg'],
    repo: 'https://github.com/christofelkev/video-to-gif-ffmpeg',
    images: ['./assets/projects/video-to-gif1.png'],
  },
  {
    title: {
      id: 'WhatsApp Bot, Bot WA Toko Servis',
      en: 'WhatsApp Bot, Service Shop Assistant',
    },
    description: {
      id: 'Bot WhatsApp yang dikembangkan dengan library Pepesan dan Baileys untuk memudahkan interaksi otomatis pada toko atau layanan servis melalui WhatsApp. Dirancang untuk menangani status / percakapan (state) secara efisien agar pengguna mendapatkan respons tepat waktu.',
      en: 'Web app to convert video → GIF. React frontend, Node.js (Express) backend, conversion via FFmpeg. Upload from browser, server-side conversion, easy GIF download.',
    },
    tags: ['JavaScript', 'Node.js', 'Baileys', 'Whatsapp', 'AppScript'],
    repo: 'https://github.com/christofelkev/bot-wa-toko-servis',
    images: ['./assets/projects/gif-1.svg'],
  },
  {
    title: {
      id: 'Podomoro App',
      en: 'Podomoro App',
    },
    description: {
      id: 'Sebuah Pomodoro timer modern dengan tampilan UI animasi, dukungan keyboard shortcut, efek suara, notifikasi, statistik sesi, serta opsi backend Node.js untuk menyimpan data statistik.',
      en: 'A sleek Pomodoro timer with animated UI, keyboard shortcuts, sound cues, notification support, session stats, and an optional Node.js backend to persist stats.',
    },
    tags: ['JavaScript', 'Node.js', 'React'],
    repo: 'https://github.com/christofelkev/bot-wa-toko-servis',
    images: ['./assets/projects/podomoro1.png'],
  },
  {
    title: {
      id: 'Sistem Faktur Penjualan',
      en: 'Sales Invoice System',
    },
    description: {
      id: 'Aplikasi berbasis web untuk mengelola perusahaan, customer, produk, penjualan, dan faktur. Dibangun menggunakan CodeIgniter 4 dengan fitur CRUD dan export PDF.',
      en: 'A web-based application to manage companies, customers, products, sales, and invoices.Built using CodeIgniter 4 with CRUD features and PDF export.',
    },
    tags: ['JavaScript', 'PHP', 'Code Igniter 4', 'MySql'],
    repo: 'https://github.com/christofelkev/ujikom_faktur',
    images: [
      './assets/projects/faktur1.png',
      './assets/projects/faktur2.png',
      './assets/projects/faktur3.png',
    ],
  },
];

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  const lang = localStorage.getItem('lang') || 'id';
  grid.innerHTML = projects.map((p) => {
    const title = typeof p.title === 'string' ? p.title : (p.title[lang] || p.title.id);
    const desc = typeof p.description === 'string' ? p.description : (p.description[lang] || p.description.id);
    const tags = p.tags.map((t) => `<span class="tag">${t}</span>`).join("");
    const images = Array.isArray(p.images) && p.images.length > 0 ? p.images : ["./assets/projects/placeholder.svg"];
    const imgsHtml = images.map((src, i) => `<img src="${src}" alt="${title} screenshot ${i+1}" ${i===0? 'class="active"':''}>`).join("");
    const rotate = images.length > 1 ? '1' : '0';
    return `
      <a class="card" href="${p.repo}" target="_blank" rel="noreferrer noopener" aria-label="Open ${title} on GitHub">
        <div class="thumb" data-rotate="${rotate}">
          ${imgsHtml}
        </div>
        <div class="content">
          <h3 class="title">${title}</h3>
          <p class="desc">${desc}</p>
        </div>
        <div class="meta">${tags}</div>
      </a>
    `;
  }).join("");
  initProjectCarousels();
}

function initProjectCarousels() {
  const thumbs = document.querySelectorAll('.thumb[data-rotate="1"]');
  thumbs.forEach((thumb) => {
    const imgs = thumb.querySelectorAll('img');
    if (imgs.length <= 1) return;
    // clear previous interval if any
    const prev = thumb.dataset.intervalId ? Number(thumb.dataset.intervalId) : null;
    if (prev) {
      clearInterval(prev);
    }
    let index = 0;
    imgs.forEach((img, i) => img.classList.toggle('active', i === 0));
    const id = setInterval(() => {
      imgs[index].classList.remove('active');
      index = (index + 1) % imgs.length;
      imgs[index].classList.add('active');
    }, 2500);
    thumb.dataset.intervalId = String(id);
  });
}

// Lightbox viewer for project images
function initLightbox() {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-image');
  const btnClose = document.getElementById('lb-close');
  const btnPrev = document.getElementById('lb-prev');
  const btnNext = document.getElementById('lb-next');
  if (!lb || !lbImg || !btnClose || !btnPrev || !btnNext) return;

  let currentImages = [];
  let currentIndex = 0;

  function open(images, startIndex) {
    currentImages = images;
    currentIndex = startIndex || 0;
    lbImg.src = currentImages[currentIndex];
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function show(delta) {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + delta + currentImages.length) % currentImages.length;
    lbImg.src = currentImages[currentIndex];
  }

  // Click on thumb images to open
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const img = t.closest('.thumb img');
    if (img) {
      const thumb = img.closest('.thumb');
      if (!thumb) return;
      const images = Array.from(thumb.querySelectorAll('img')).map((n) => n.getAttribute('src')).filter(Boolean);
      const start = images.indexOf(img.getAttribute('src'));
      open(images, Math.max(0, start));
      e.preventDefault();
    }
    if (t.hasAttribute('data-close')) {
      close();
    }
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => show(-1));
  btnNext.addEventListener('click', () => show(1));
  document.addEventListener('keydown', (e) => {
    if (lb.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(-1);
    if (e.key === 'ArrowRight') show(1);
  });
}

function setCurrentYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.classList.add('light');
  } else {
    root.classList.remove('light');
  }
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
}

function initTheme() {
  const stored = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = stored || (systemPrefersLight ? 'light' : 'dark');
  applyTheme(theme);

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      const storedTheme = localStorage.getItem('theme');
      if (!storedTheme) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setCurrentYear();
  initTheme();
  initRoleRotate();
  initI18n();
  initLightbox();
});

// Rotating typing effect for roles
function initRoleRotate() {
  const el = document.getElementById('role-rotate');
  if (!el) return;
  const roles = [
    'Web Developer',
    'Mobile Developer',
    'Tech Enthusiast',
    'Data Enthusiast',
  ];

  const typingSpeedMs = 70;
  const deletingSpeedMs = 45;
  const stayDelayMs = 1100;

  let roleIndex = 0;
  let textIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = roles[roleIndex];
    let delay;

    if (!isDeleting && textIndex < current.length) {
      textIndex += 1;
      delay = typingSpeedMs;
    } else if (!isDeleting && textIndex === current.length) {
      isDeleting = true;
      delay = stayDelayMs;
    } else if (isDeleting && textIndex > 0) {
      textIndex -= 1;
      delay = deletingSpeedMs;
    } else {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }

    el.textContent = current.slice(0, textIndex);
    setTimeout(tick, delay);
  }

  tick();
}

// Simple i18n switch (EN/ID)
function initI18n() {
  const langToggle = document.getElementById('lang-toggle');
  if (!langToggle) return;

  const dict = {
    id: {
      navCv: 'Download CV',
      ctaProjects: 'Lihat Proyek',
      ctaEmail: 'Email',
      projects: 'Proyek',
      projectsHint: 'Klik kartu untuk menuju repository GitHub.',
      contact: 'Kontak',
      contactEmail: 'Kirim Email',
      contactCv: 'Download CV',
      tech: 'Tech Stack',
      themeTitle: 'Toggle tema',
    },
    en: {
      navCv: 'Download CV',
      ctaProjects: 'View Projects',
      ctaEmail: 'Email',
      projects: 'Projects',
      projectsHint: 'Click a card to open the GitHub repository.',
      contact: 'Contact',
      contactEmail: 'Send Email',
      contactCv: 'Download CV',
      tech: 'Tech Stack',
      themeTitle: 'Toggle theme',
    }
  };

  function applyLang(lang) {
    const t = dict[lang] || dict.id;
    setText('nav-cv', t.navCv);
    setText('cta-projects', t.ctaProjects);
    setText('cta-email', t.ctaEmail);
    setText('projects-title', t.projects);
    setText('projects-hint', t.projectsHint);
    setText('contact-title', t.contact);
    setText('contact-email', t.contactEmail);
    setText('contact-cv', t.contactCv);
    setText('tech-title', t.tech);
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.title = t.themeTitle;
    langToggle.textContent = lang === 'id' ? 'EN' : 'ID';
    localStorage.setItem('lang', lang);
    // re-render projects with chosen language
    renderProjects();
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  const stored = localStorage.getItem('lang') || 'id';
  applyLang(stored);

  langToggle.addEventListener('click', () => {
    const current = localStorage.getItem('lang') || 'id';
    const next = current === 'id' ? 'en' : 'id';
    applyLang(next);
  });
}


