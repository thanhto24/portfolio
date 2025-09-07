// ===== GSAP REGISTRATION =====
gsap.registerPlugin(ScrollTrigger);

// ===== GLOBAL VARIABLES =====
let isLoaded = false;
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const progressFill = document.querySelector('.progress-fill');
  
  // Animate progress bar
  gsap.to(progressFill, {
    width: '100%',
    duration: 1,
    ease: 'power2.out'
  });
  
  // Hide loader after animation
  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        loader.style.display = 'none';
        isLoaded = true;
        initializeAnimations();
      }
    });
  }, 500);
});

// ===== CUSTOM CURSOR =====
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

// Smooth cursor follower
function animateCursorFollower() {
  const speed = 0.15;
  followerX += (mouseX - followerX) * speed;
  followerY += (mouseY - followerY) * speed;
  
  if (cursorFollower) {
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
  }
  
  requestAnimationFrame(animateCursorFollower);
}
animateCursorFollower();

// Cursor interactions
document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.transform = 'scale(1.5)';
    if (cursorFollower) cursorFollower.style.transform = 'scale(0.5)';
  });
  
  el.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.transform = 'scale(1)';
    if (cursorFollower) cursorFollower.style.transform = 'scale(1)';
  });
});

// ===== NAVIGATION =====
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll navigation
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: targetSection,
          offsetY: 80
        },
        ease: "power2.inOut"
      });
    }
    
    // Close mobile menu if open
    navLinksContainer.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksContainer.classList.toggle('active');
});

// Active navigation link
const sections = document.querySelectorAll('.section');
const updateActiveNav = () => {
  const scrollPos = window.scrollY + 100;
  
  sections.forEach((section, index) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', updateActiveNav);

// ===== TYPING EFFECT =====
const typingElement = document.getElementById('typing');
const roles = ['Software Engineer', 'Web Developer', 'Game Enthusiast', 'Tech Explorer', 'Creative Coder', 'Problem Solver'];

let currentRole = 0;
let currentChar = 0;
let isDeleting = false;

function typeEffect() {
  const role = roles[currentRole];
  
  if (isDeleting) {
    typingElement.textContent = role.substring(0, currentChar - 1);
    currentChar--;
  } else {
    typingElement.textContent = role.substring(0, currentChar + 1);
    currentChar++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && currentChar === role.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && currentChar === 0) {
    isDeleting = false;
    currentRole = (currentRole + 1) % roles.length;
    typeSpeed = 500; // Pause before next word
  }
  
  setTimeout(typeEffect, typeSpeed);
}

// ===== PARTICLES CONFIGURATION =====
function initParticles() {
  particlesJS('particles-js', {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 1000 } },
      color: { value: ['#00ffff', '#ff00ff', '#00ff00'] },
      shape: {
        type: 'circle',
        stroke: { width: 0, color: '#000000' }
      },
      opacity: {
        value: 0.6,
        random: false,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#00ffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: true
  });
}

// ===== TILT EFFECT =====
document.querySelectorAll('[data-tilt]').forEach(element => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = (y / rect.height) * 20;
    const rotateY = (x / rect.width) * -20;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  });
});

// ===== ANIMATIONS INITIALIZATION =====
function initializeAnimations() {
  // Hero section animations
  const tl = gsap.timeline();
  
  // Animate greeting
  tl.to('.greeting', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out'
  });
  
  // Animate name characters
  tl.to('.char', {
    opacity: 1,
    y: 0,
    rotationX: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  }, '-=0.5');
  
  // Animate description and actions
  tl.to(['.hero-description', '.hero-actions'], {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out'
  }, '-=0.3');
  
  // Start typing effect
  setTimeout(typeEffect, 1000);
  
  // Animate floating elements
  gsap.set('.float-item', { opacity: 0, scale: 0 });
  gsap.to('.float-item', {
    opacity: 0.7,
    scale: 1,
    duration: 1,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    delay: 1.5
  });
  
  // Section headers animation
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.to(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: false
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    });
  });
  
  // About section animations
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.about-container',
      start: 'top 80%',
      end: 'bottom 20%'
    }
  });
  
  aboutTl.from('.about-left', {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  })
  .from('.about-right', {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.5')
  .from('.detail-item', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  }, '-=0.3');
  
  // Animate stats counter
  gsap.utils.toArray('.stat-number').forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    gsap.to(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 80%'
      },
      innerHTML: target,
      duration: 2,
      ease: 'power2.out',
      snap: { innerHTML: 1 },
      onUpdate: function() {
        stat.innerHTML = Math.ceil(stat.innerHTML);
      }
    });
  });
  
  // Skills section animations
  gsap.utils.toArray('.skill-category').forEach((category, index) => {
    gsap.from(category, {
      scrollTrigger: {
        trigger: category,
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      delay: index * 0.2,
      ease: 'power2.out'
    });
    
    // Animate skill progress bars
    const progressBars = category.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      gsap.to(bar, {
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%'
        },
        width: `${progress}%`,
        duration: 1.5,
        ease: 'power2.out'
      });
    });
  });
  
  // Projects section animations
  gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      delay: index * 0.2,
      ease: 'back.out(1.7)'
    });
  });
  
  // Contact section animations
  const contactTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.contact-container',
      start: 'top 80%'
    }
  });
  
  contactTl.from('.contact-left', {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  })
  .from('.contact-right', {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.5')
  .from('.contact-method', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  }, '-=0.3');
}

// ===== FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Ngăn reload trang

    // Lấy data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate cơ bản
    if (!name || !email || !message) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Nút submit
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Loading
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    try {
      // Gửi thật tới Formspree
      const formData = new FormData(contactForm);
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        // Thành công
        submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
      } else {
        // Lỗi từ server
        const errorData = await res.json();
        showNotification(`Failed to send: ${errorData.error || 'Unknown error'}`, 'error');
        submitButton.innerHTML = originalText;
      }
    } catch (err) {
      // Lỗi mạng
      console.error(err);
      showNotification('Network error. Please try again later.', 'error');
      submitButton.innerHTML = originalText;
    } finally {
      // Reset nút sau 2s
      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 2000);
    }
  });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? 'var(--accent-color)' : type === 'error' ? 'var(--secondary-color)' : 'var(--primary-color)'};
    color: var(--bg-darker);
    padding: 1rem 1.5rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 1 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 1000);
}

// ===== FLOATING ELEMENTS ANIMATION =====
function animateFloatingElements() {
  const floatItems = document.querySelectorAll('.float-item');
  
  floatItems.forEach((item, index) => {
    const speed = parseFloat(item.getAttribute('data-speed')) || 2;
    
    gsap.to(item, {
      y: `${Math.sin(Date.now() * 0.001 * speed + index) * 20}px`,
      x: `${Math.cos(Date.now() * 0.001 * speed + index) * 15}px`,
      rotation: `${Math.sin(Date.now() * 0.002 * speed + index) * 5}deg`,
      duration: 0.1,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  });
  
  requestAnimationFrame(animateFloatingElements);
}

// ===== SCROLL PROGRESS INDICATOR =====
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// ===== THEME SWITCHER =====
function createThemeSwitcher() {
  const themeButton = document.createElement('button');
  themeButton.innerHTML = '<i class="fas fa-palette"></i>';
  themeButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    color: var(--primary-color);
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 9999;
    transition: all 0.3s ease;
  `;
  
  themeButton.addEventListener('click', () => {
    // Cycle through color themes
    const themes = [
      { primary: '#00ffff', secondary: '#ff00ff', accent: '#00ff00' },
      { primary: '#ff6b6b', secondary: '#4ecdc4', accent: '#45b7d1' },
      { primary: '#96ceb4', secondary: '#ffeaa7', accent: '#dda0dd' },
      { primary: '#ff7675', secondary: '#74b9ff', accent: '#00b894' }
    ];
    
    const currentTheme = Math.floor(Math.random() * themes.length);
    const theme = themes[currentTheme];
    
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    
    // Update gradient variables
    document.documentElement.style.setProperty('--gradient-primary', 
      `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`);
    document.documentElement.style.setProperty('--gradient-secondary', 
      `linear-gradient(135deg, ${theme.secondary}, ${theme.accent})`);
    
    showNotification('Theme changed!', 'success');
  });
  
  themeButton.addEventListener('mouseenter', () => {
    themeButton.style.transform = 'scale(1.1)';
    themeButton.style.boxShadow = '0 10px 30px rgba(0,255,255,0.3)';
  });
  
  themeButton.addEventListener('mouseleave', () => {
    themeButton.style.transform = 'scale(1)';
    themeButton.style.boxShadow = 'none';
  });
  
  document.body.appendChild(themeButton);
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelectorAll('.parallax');
  
  parallax.forEach(element => {
    const speed = element.dataset.speed || 0.5;
    const y = -(scrolled * speed);
    element.style.transform = `translateY(${y}px)`;
  });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card, .skill-card, .contact-method').forEach(el => {
  observer.observe(el);
});

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  createScrollProgress();
  createThemeSwitcher();
  
  // Start floating animation
  setTimeout(() => {
    if (isLoaded) {
      animateFloatingElements();
    }
  }, 3000);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  scrollTimeout = setTimeout(() => {
    updateActiveNav();
  }, 10);
});

// Smooth scroll polyfill for Safari
if (!CSS.supports('scroll-behavior', 'smooth')) {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('Portfolio Error:', e.error);
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape') {
    navLinksContainer.classList.remove('active');
    hamburger.classList.remove('active');
  }
  
  // Tab navigation improvements
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// ===== CONSOLE EASTER EGG =====
console.log(`
%c🚀 Welcome to Thanh's Portfolio! 🚀
%cBuilt with passion, powered by creativity.
%c
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%cTech Stack: HTML5, CSS3, JavaScript, GSAP
%cFeatures: Smooth animations, responsive design, interactive elements
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%c💫 Thanks for visiting! 💫
`,
'color: #00ffff; font-size: 16px; font-weight: bold;',
'color: #ff00ff; font-size: 14px;',
'color: #00ff00;',
'color: #ffffff; font-size: 12px;',
'color: #ffffff; font-size: 12px;',
'color: #00ff00;',
'color: #00ffff; font-size: 14px; font-weight: bold;'
);