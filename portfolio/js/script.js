/**
 * Shalika G — Portfolio
 * Vanilla JS: navigation, scroll reveal, scroll-top button, contact form.
 * No external dependencies, no global pollution.
 */

(function () {
  'use strict';

  /* ---------------- Sticky header ---------------- */
  const header = document.getElementById('site-header');

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  /* ---------------- Mobile menu ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function toggleMenu() {
    if (!navToggle || !navMenu) return;
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMenu);

    navMenu.querySelectorAll('.nav__link, .nav__cta').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', function (event) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      const clickedInsideMenu = navMenu.contains(target) || navToggle.contains(target);
      if (!clickedInsideMenu && navMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(function (el, index) {
      el.style.transitionDelay = (Math.min(index % 4, 3) * 60) + 'ms';
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- Scroll-to-top button ---------------- */
  const scrollTopBtn = document.getElementById('scrollTop');

  function handleScrollTopVisibility() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 480) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  function onScroll() {
    handleHeaderScroll();
    handleScrollTopVisibility();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Contact form ---------------- */
  const contactForm = document.getElementById('contactForm');

  function setFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (!field || !errorEl) return;

    const wrapper = field.closest('.form__field');
    if (message) {
      if (wrapper) wrapper.classList.add('has-error');
      errorEl.textContent = message;
    } else {
      if (wrapper) wrapper.classList.remove('has-error');
      errorEl.textContent = '';
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formNote = document.getElementById('formNote');

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      let hasError = false;

      if (!nameInput || !nameInput.value.trim()) {
        setFieldError('name', 'nameError', 'Please enter your name.');
        hasError = true;
      } else {
        setFieldError('name', 'nameError', '');
      }

      if (!emailInput || !isValidEmail(emailInput.value.trim())) {
        setFieldError('email', 'emailError', 'Please enter a valid email address.');
        hasError = true;
      } else {
        setFieldError('email', 'emailError', '');
      }

      if (!messageInput || !messageInput.value.trim()) {
        setFieldError('message', 'messageError', 'Please enter a message.');
        hasError = true;
      } else {
        setFieldError('message', 'messageError', '');
      }

      if (hasError) {
        if (formNote) formNote.textContent = '';
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      const subject = encodeURIComponent('Portfolio contact from ' + name);
      const body = encodeURIComponent(
        message + '\n\n---\nFrom: ' + name + '\nEmail: ' + email
      );

      const mailtoLink = 'mailto:shalikag31@gmail.com?subject=' + subject + '&body=' + body;

      if (formNote) {
        formNote.textContent = 'Opening your email app to send this message to Shalika...';
      }

      window.location.href = mailtoLink;
    });

    [nameInput, emailInput, messageInput].forEach(function (input) {
      if (!input) return;
      input.addEventListener('input', function () {
        const wrapper = input.closest('.form__field');
        if (wrapper && wrapper.classList.contains('has-error')) {
          const errorEl = wrapper.querySelector('.form__error');
          if (errorEl) errorEl.textContent = '';
          wrapper.classList.remove('has-error');
        }
      });
    });
  }
})();
