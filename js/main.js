document.addEventListener('DOMContentLoaded',function(){
  const navToggle=document.getElementById('navToggle');
  const siteNav=document.getElementById('siteNav');
  const siteHeader=document.querySelector('.site-header');
  const logo=document.querySelector('.logo');
  const navLinks=document.querySelectorAll('.nav a:not(.resume-btn)');

  // Keep logos visible even if external icon CDNs fail temporarily
  const logoSelectors = '.lang-badge img, .tool-badge img, .api-link img, .edu-inline-logo';
  const fallbackLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230f172a'/%3E%3Cpath d='M16 32h32M32 16v32' stroke='%2300d9ff' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E";

  document.querySelectorAll(logoSelectors).forEach((img) => {
    img.addEventListener('error', function onImageError() {
      if (this.dataset.fallbackApplied === 'true') return;
      this.dataset.fallbackApplied = 'true';
      this.src = fallbackLogo;
      this.alt = (this.alt || 'Icon') + ' (fallback)';
    }, { once: true });
  });
  
  // Mobile menu toggle with smooth animation
  navToggle.addEventListener('click',()=>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
    
    // Animate nav links entrance
    if(siteNav.classList.contains('open')) {
      const navListItems = siteNav.querySelectorAll('li');
      navListItems.forEach((item, index) => {
        item.style.animation = `slideInUp 0.4s ease ${index * 0.1}s both`;
      });
    }
  });

  // Active link highlighting based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav a:not(.resume-btn)');
  
  const highlightActiveLink = () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if(window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if(item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
        item.style.color = 'var(--accent)';
        item.style.borderBottom = '2px solid var(--accent)';
      } else {
        item.style.borderBottom = '2px solid transparent';
      }
    });
  };

  // Enhanced navbar scroll effect with progress bar
  let scrollProgress = 0;
  window.addEventListener('scroll',function(){
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress = (window.scrollY / windowHeight) * 100;
    
    // Dynamic navbar background based on scroll
    if(window.scrollY > 100) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    
    highlightActiveLink();
  });

  // Smooth scroll behavior with custom offset
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if(href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Close mobile menu if open
          if(siteNav.classList.contains('open')) {
            navToggle.setAttribute('aria-expanded', 'false');
            siteNav.classList.remove('open');
          }
        }
      }
    });
  });

  // Enhanced link hover animation with ripple effect
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      this.style.transform = 'translateY(-2px)';
      this.style.textShadow = '0 0 10px rgba(0, 217, 255, 0.5)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.textShadow = 'none';
    });
  });

  // Fixed navbar heading
  if(logo) {
    logo.textContent = 'Muhammad Tahir Dars';
  }

  // Resume button enhanced interaction
  const resumeBtn = document.querySelector('.resume-btn');
  if(resumeBtn) {
    resumeBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) translateY(-2px)';
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      this.style.boxShadow = isLight
        ? '0 0 20px rgba(0, 217, 255, 0.35), 0 0 28px rgba(255, 0, 110, 0.18)'
        : '0 0 40px rgba(255, 0, 110, 0.6)';
    });
    
    resumeBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 0 15px rgba(255, 0, 110, 0.3)';
    });
  }

  // Navbar glow effect on scroll
  window.addEventListener('scroll', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if(window.scrollY > 50) {
      siteHeader.style.boxShadow = isLight
        ? `0 8px 28px rgba(14, 165, 233, ${Math.min(window.scrollY / 900, 0.18)})`
        : `0 8px 40px rgba(255, 0, 110, ${Math.min(window.scrollY / 500, 0.3)})`;
    } else {
      siteHeader.style.boxShadow = isLight
        ? '0 8px 24px rgba(17,24,39,0.08)'
        : '0 8px 32px rgba(0,0,0,0.3)';
    }
  });

  // Scroll effect for left side details
  const detailsEl = document.getElementById('details');
  const details2El = document.getElementById('details2');
  const heroRight = document.querySelector('.hero-right');
  
  if(detailsEl && heroRight) {
    heroRight.addEventListener('scroll', function() {
      const scrollY = this.scrollTop;
      const maxScroll = 300;
      const progress = Math.min(scrollY / maxScroll, 1);
      
      // Apply effect to first details line
      const translateX = -progress * 40;
      const scale = 1 - progress * 0.1;
      const boldIncrease = progress * 200;
      
      detailsEl.style.transform = `translateX(${translateX}px) scaleX(${scale})`;
      detailsEl.style.fontWeight = Math.min(400 + boldIncrease, 700);
      detailsEl.style.transformOrigin = 'left center';
      
      // Apply effect to second details line with slight delay
      const delayedProgress = Math.max(0, progress - 0.1);
      const translate2X = -delayedProgress * 50;
      const scale2 = 1 - delayedProgress * 0.15;
      const bold2Increase = delayedProgress * 250;
      
      details2El.style.transform = `translateX(${translate2X}px) scaleX(${scale2})`;
      details2El.style.fontWeight = Math.min(400 + bold2Increase, 700);
      details2El.style.transformOrigin = 'left center';
    });
  }

  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if(e.key === 'Escape' && siteNav.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('open');
    }
  });

  // Navbar link indicator animation
  const createIndicator = () => {
    navItems.forEach(link => {
      link.addEventListener('mouseenter', function() {
        this.style.position = 'relative';
        const indicator = document.createElement('span');
        indicator.style.cssText = `
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), transparent);
          animation: slideRight 0.3s ease;
        `;
      });
    });
  };

  createIndicator();

  // ============ PROFILE CARD ENHANCEMENTS ============
  const profileCard = document.querySelector('.profile-card');
  const profileImage = document.querySelector('.profile-image');
  const profileImageContainer = document.querySelector('.profile-image-container');
  
  if(profileCard) {
    
    // Hover state with pulse effect
    profileCard.addEventListener('mouseenter', () => {
      profileCard.classList.add('active');
      profileImage.style.filter = 'brightness(1.15) saturate(1.3)';
    });
    
    profileCard.addEventListener('mouseleave', () => {
      profileCard.classList.remove('active');
      profileImage.style.filter = 'brightness(1) saturate(1)';
    });
    
    // Scroll reveal animation - triggers when card enters viewport
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          profileCard.style.animation = 'slideInUp 0.8s ease';
          profileImageContainer.style.animation = 'slideInLeft 0.8s ease';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    observer.observe(profileCard);
    
    // Continuous subtle glow pulse
    setInterval(() => {
      profileCard.style.boxShadow = `0 0 ${Math.sin(Date.now() / 500) * 10 + 50}px rgba(0,217,255,0.3), 0 12px 48px rgba(0,0,0,0.4)`;
    }, 50);
  }


});

// Add CSS animation for nav items
const style = document.createElement('style');
style.textContent = `
  @keyframes slideRight {
    from { width: 0; }
    to { width: 100%; }
  }
  
  .nav a.active {
    color: var(--accent) !important;
    border-bottom: 2px solid var(--accent) !important;
  }
`;
document.head.appendChild(style);

// Certificate Modal Functions
function openCertModal(src, title) {
  const modal = document.getElementById('certModal');
  const modalFrame = document.getElementById('certModalFrame');
  const modalImage = document.getElementById('certModalImage');
  
  // Check if it's a PDF or image
  const decodedSrc = decodeURIComponent(src);
  if (decodedSrc.toLowerCase().endsWith('.pdf')) {
    modalFrame.src = decodedSrc;
    modalFrame.style.display = 'block';
    modalImage.style.display = 'none';
  } else {
    modalImage.src = decodedSrc;
    modalImage.style.display = 'block';
    modalFrame.style.display = 'none';
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  const modalFrame = document.getElementById('certModalFrame');
  const modalImage = document.getElementById('certModalImage');
  
  modal.classList.remove('active');
  modalFrame.src = '';
  modalImage.src = '';
  document.body.style.overflow = '';
}

// Close modal on outside click
document.addEventListener('click', function(e) {
  const modal = document.getElementById('certModal');
  if (e.target === modal) {
    closeCertModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeCertModal();
  }
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  // Use saved preference first; otherwise default to light.
  const savedTheme = localStorage.getItem('theme');

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  };

  const getPreferredTheme = () => {
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return 'light';
  };

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });

}

// Screen Maximize/Minimize Toggle
const screenToggle = document.getElementById('screenToggle');

if (screenToggle) {
  const updateScreenToggleState = () => {
    const isFullscreen = !!document.fullscreenElement;
    screenToggle.classList.toggle('active', isFullscreen);
    screenToggle.setAttribute('aria-pressed', String(isFullscreen));
    screenToggle.setAttribute('title', isFullscreen ? 'Minimize screen' : 'Maximize screen');
    screenToggle.setAttribute('aria-label', isFullscreen ? 'Minimize screen' : 'Maximize screen');
  };

  screenToggle.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn('Fullscreen toggle failed:', error);
    } finally {
      updateScreenToggleState();
    }
  });

  document.addEventListener('fullscreenchange', updateScreenToggleState);
  updateScreenToggleState();
}

