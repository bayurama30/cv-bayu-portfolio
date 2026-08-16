/* ==========================================================================
   Bayu Ramadhan — Portfolio
   Vanilla JS: nav, reveal, typing, form
   ========================================================================== */

(() => {
  'use strict';

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    const y = window.scrollY + 140;
    let currentId = '';
    sections.forEach((section) => {
      if (y >= section.offsetTop && y < section.offsetTop + section.offsetHeight) {
        currentId = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Typing effect ---------- */
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const phrases = [
      'Data & Business Intelligence Analyst',
      'Network & AI Infrastructure Engineer',
      'B2B Telecom Analytics',
      'Google Apps Script Automation'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const word = phrases[phraseIndex];
      typedEl.textContent = word.substring(0, charIndex);

      if (!deleting) {
        charIndex += 1;
        if (charIndex > word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        charIndex -= 1;
        if (charIndex < 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 40 : 90);
    };

    type();
  }

  /* ---------- Contact form → mailto ---------- */
  const form = document.getElementById('contactForm');
  const btnText = document.getElementById('btnText');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const email = data.get('email') || '';
      const subject = data.get('subject') || 'Website inquiry';
      const message = data.get('message') || '';

      const mailto =
        'mailto:bayuramadhan30@gmail.com' +
        '?subject=' + encodeURIComponent(subject + ' — from ' + name) +
        '&body=' + encodeURIComponent(message + '\n\n—\nFrom: ' + name + '\nEmail: ' + email);

      window.location.href = mailto;

      if (btnText) {
        btnText.textContent = '✓ Opening email...';
        setTimeout(() => {
          btnText.textContent = 'Send Message →';
        }, 3000);
      }
    });
  }
})();
