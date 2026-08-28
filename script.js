// Prajasri R. G. Portfolio - Interactive Controller

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  
  // Check existing theme preference
  const savedTheme = localStorage.getItem('prajasri_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeUI(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('prajasri_theme', newTheme);
      updateThemeUI(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode! ✦`);
    });
  }

  function updateThemeUI(theme) {
    if (!themeIcon || !themeText) return;
    if (theme === 'dark') {
      themeIcon.textContent = '☀️';
      themeText.textContent = 'LIGHT';
    } else {
      themeIcon.textContent = '🌙';
      themeText.textContent = 'DARK';
    }
  }

  // 2. Pop-down Side Navigation Drawer
  const menuToggle = document.getElementById('menu-toggle');
  const navDrawerOverlay = document.getElementById('nav-drawer-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (navDrawerOverlay) {
      navDrawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (navDrawerOverlay) {
      navDrawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', openDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  // Close when clicking overlay backdrop
  if (navDrawerOverlay) {
    navDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === navDrawerOverlay) {
        closeDrawer();
      }
    });
  }

  // Close menu when clicking drawer navigation links
  document.querySelectorAll('.drawer-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const drawerItems = document.querySelectorAll('.drawer-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 250;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    drawerItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // 4. Scroll Reveal Observer (Pop up cards one by one like a lively feed)
  const revealElements = document.querySelectorAll('.reveal-item');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 90);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Contact Form Handling
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';

      if (!name || !email) {
        showToast('⚠️ Please fill in all fields.');
        return;
      }

      showToast(`🎉 Thanks ${name}! Submission received.`);
      signupForm.reset();
    });
  }

  // 6. Toast Notification Helper
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
});
