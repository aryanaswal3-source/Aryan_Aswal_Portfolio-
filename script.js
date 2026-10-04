/**
 * ============================================================================
 * ARYAN ASWAL — DEVELOPER PORTFOLIO JAVASCRIPT ENGINE
 * Stack: Pure Vanilla JavaScript (ES6+)
 * Compatibility: Zero-dependency, 100% GitHub Pages Compatible
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DOM Elements & State
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const hamburgerBtn = document.getElementById('mobile-menu-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const typedRoleElement = document.getElementById('typed-role');
  const contactForm = document.getElementById('contact-form');
  const toastContainer = document.getElementById('toast-container');
  const statCounters = document.querySelectorAll('.counter');

  // --------------------------------------------------------------------------
  // 2. Reading Scroll Progress Indicator & Navbar Scrolled State
  // --------------------------------------------------------------------------
  const updateScrollEffects = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Reading Progress Bar
    if (scrollProgress && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // Sticky Navbar Background Blur & Shadow
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top Button Visibility
    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', updateScrollEffects, { passive: true });
  updateScrollEffects();

  // --------------------------------------------------------------------------
  // 3. Mobile Hamburger Menu Toggle
  // --------------------------------------------------------------------------
  const toggleMobileMenu = (forceClose = false) => {
    if (!hamburgerBtn || !mobileNavDrawer) return;

    const isOpen = forceClose ? false : !hamburgerBtn.classList.contains('active');
    
    hamburgerBtn.classList.toggle('active', isOpen);
    mobileNavDrawer.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileNavDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => toggleMobileMenu());
  }

  // Close mobile drawer when any link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  });

  // Close mobile drawer on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn && hamburgerBtn.classList.contains('active')) {
      toggleMobileMenu(true);
    }
  });

  // --------------------------------------------------------------------------
  // 4. Smooth Anchor Navigation with Offset
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Active Navigation Link Highlighting (Scroll Spy)
  // --------------------------------------------------------------------------
  const highlightActiveNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveNavLink, { passive: true });

  // --------------------------------------------------------------------------
  // 6. Typing Animation in Hero Section
  // --------------------------------------------------------------------------
  if (typedRoleElement) {
    const rolesData = typedRoleElement.getAttribute('data-roles');
    const roles = rolesData ? JSON.parse(rolesData) : [
      'PHP & Laravel Developer',
      'Full-Stack Web Developer',
      'Database & API Specialist',
      'B.Sc. IT Graduate'
    ];

    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const typeRole = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        currentCharIndex--;
        typingSpeed = 45;
      } else {
        currentCharIndex++;
        typingSpeed = 95;
      }

      typedRoleElement.textContent = currentRole.substring(0, currentCharIndex);

      if (!isDeleting && currentCharIndex === currentRole.length) {
        // Pause at full word
        isDeleting = true;
        typingSpeed = 1800;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeRole, typingSpeed);
    };

    // Initial delayed start
    setTimeout(typeRole, 600);
  }

  // --------------------------------------------------------------------------
  // 7. Scroll Reveal Animations (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(element => element.classList.add('revealed'));
  }

  // --------------------------------------------------------------------------
  // 8. Animated Number Counters
  // --------------------------------------------------------------------------
  let countersStarted = false;

  const runCounters = () => {
    statCounters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1400;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        // Ease out quadratic
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeProgress * target);

        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const aboutSection = document.getElementById('about');
  if (aboutSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(aboutSection);
  }

  // --------------------------------------------------------------------------
  // 9. Project Category Filtering with Smooth Transitions
  // --------------------------------------------------------------------------
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const selectedFilter = this.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      // Animate project cards filtering
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories') || '';
        const categoryList = categories.split(' ');
        const matches = selectedFilter === 'all' || categoryList.includes(selectedFilter);

        if (matches) {
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96) translateY(10px)';

          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96) translateY(10px)';
          setTimeout(() => {
            card.classList.add('is-hidden');
          }, 250);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 10. Toast Notification System
  // --------------------------------------------------------------------------
  const showToast = (message, type = 'success', duration = 4500) => {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? '✅' : 'ℹ️';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  };

  // --------------------------------------------------------------------------
  // 11. Contact Form Client-Side Validation & Mailto Action
  // --------------------------------------------------------------------------
  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('submit-btn');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (input, condition) => {
      const group = input.closest('.form-group');
      if (!condition) {
        group.classList.add('has-error');
        return false;
      } else {
        group.classList.remove('has-error');
        return true;
      }
    };

    // Live validation on blur & input
    if (nameInput) {
      nameInput.addEventListener('input', () => validateField(nameInput, nameInput.value.trim().length >= 2));
    }
    if (emailInput) {
      emailInput.addEventListener('input', () => validateField(emailInput, emailRegex.test(emailInput.value.trim())));
    }
    if (subjectInput) {
      subjectInput.addEventListener('input', () => validateField(subjectInput, subjectInput.value.trim().length >= 3));
    }
    if (messageInput) {
      messageInput.addEventListener('input', () => validateField(messageInput, messageInput.value.trim().length >= 10));
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2);
      const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()));
      const isSubjectValid = validateField(subjectInput, subjectInput.value.trim().length >= 3);
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10);

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        // Target recipient email
        const recipient = 'aryanaswal3@gmail.com';
        
        const mailtoBody = encodeURIComponent(
          `Hello Aryan,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n--\nSent from Portfolio Website`
        );
        const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject}`);
        const mailtoUrl = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

        // Feedback state on button
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Opening Email Client...</span>
          <svg class="icon-svg animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        `;

        setTimeout(() => {
          window.location.href = mailtoUrl;
          showToast(`Thank you ${name}! Your email client has been launched.`);
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }, 600);
      } else {
        showToast('Please check the required form fields.', 'error');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. Placeholder Link Informational Handler
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      // If it's a social or repo placeholder
      const title = link.getAttribute('title') || 'Link';
      if (!link.classList.contains('mobile-link') && !link.classList.contains('nav-link')) {
        e.preventDefault();
        showToast(`${title} placeholder: Please replace '#' with your link in HTML.`, 'info', 3500);
      }
    });
  });

  console.log('✨ Aryan Aswal Portfolio initialized successfully.');
});
