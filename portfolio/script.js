/* ═══════════════════════════════════════════
   PRAKASH TEKI PORTFOLIO — script.js
═══════════════════════════════════════════ */

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightNavLink();
});

/* ─── MOBILE MENU ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

/* ─── TYPED TEXT ANIMATION ─── */
const roles = ['Data Analyst', 'Analytics Engineer', 'BI Engineer', 'Data Engineer'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeText() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }
  setTimeout(typeText, speed);
}
setTimeout(typeText, 800);

/* ─── SCROLL REVEAL (IntersectionObserver) ─── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ─── STATS COUNTER ANIMATION ─── */
const statNums = document.querySelectorAll('.stat-num');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const statsBar = document.querySelector('.stats-bar');
  if (!statsBar) return;
  const rect = statsBar.getBoundingClientRect();
  if (rect.top < window.innerHeight - 50) {
    statsAnimated = true;
    statNums.forEach(el => {
      const target = +el.getAttribute('data-target');
      const duration = 1200;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
      }, 16);
    });
  }
}
window.addEventListener('scroll', animateStats);
animateStats();

/* ─── PROJECT FILTER ─── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const cats = card.getAttribute('data-category') || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ─── CONTACT FORM ─── */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    // If Netlify is handling, let it through. Otherwise handle manually.
    const isNetlify = form.getAttribute('data-netlify') === 'true';
    if (!isNetlify) {
      e.preventDefault();
      submitBtn.querySelector('.btn-text').textContent = 'Sending...';
      submitBtn.disabled = true;
      await new Promise(r => setTimeout(r, 1200));
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      submitBtn.disabled = false;
      form.reset();
      successMsg.classList.add('show');
      setTimeout(() => successMsg.classList.remove('show'), 5000);
    } else {
      submitBtn.querySelector('.btn-text').textContent = 'Sending...';
      submitBtn.disabled = true;
    }
  });
}

/* ─── SMOOTH SCROLL for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── PROFILE IMAGE FALLBACK ─── */
const profileImg = document.querySelector('.profile-img');
const profileFallback = document.querySelector('.profile-fallback');
if (profileImg && profileFallback) {
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    profileFallback.style.display = 'flex';
  });
  if (!profileImg.complete || profileImg.naturalWidth === 0) {
    profileImg.style.display = 'none';
    profileFallback.style.display = 'flex';
  }
}

/* ─── FADE-IN ANIMATION CSS KEYFRAME (injected) ─── */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);
