/* =========================================
   PORTFOLIO – script.js
   Alex Morgan | Placement Portfolio 2025
   ========================================= */

// ===== NAVBAR: Sticky scroll effect + active link tracking =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class for shadow
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll-to-top button
  const scrollTopBtn = document.getElementById('scrollTop');
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }

  // Active nav link highlighting
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});


// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});


// ===== SCROLL REVEAL ANIMATION =====
// Uses IntersectionObserver for performance — no library needed
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger children of the same parent slightly
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

// Apply stagger delay to grid/card children
function assignStaggerDelays() {
  const gridParents = document.querySelectorAll(
    '.skills-grid, .projects-grid, .certs-grid, .experience-grid, .strengths-grid'
  );
  gridParents.forEach(parent => {
    const children = parent.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.dataset.delay = i * 80; // 80ms stagger
    });
  });
}

assignStaggerDelays();

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});


// ===== TYPING EFFECT =====
const typingTarget = document.getElementById('typingTarget');
const phrases = [
  'Engineering Student',
  'Aspiring Software Engineer',
  'Full-Stack Developer',
  'Open Source Contributor',
  'Problem Solver'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    // Typing forward
    typingTarget.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      // Pause at end of phrase before deleting
      isDeleting = true;
      typingTimeout = setTimeout(type, 1800);
      return;
    }
  } else {
    // Deleting
    typingTarget.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 55 : 90;
  typingTimeout = setTimeout(type, speed);
}

// Start typing after a short delay to let the page load
setTimeout(type, 800);


// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});


// ===== SCROLL TO TOP BUTTON =====
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ===== CARD HOVER: subtle 3D tilt effect =====
function addTiltEffect(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
    card.style.transition = 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    card.style.transformStyle = 'preserve-3d';
    card.style.willChange = 'transform';
  });
}

addTiltEffect('.project-card');
addTiltEffect('.cert-card');
