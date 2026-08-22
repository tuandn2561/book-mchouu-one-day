/**
 * =========================================================
 * 🌟 MAIN CONTROLLER & INTERACTION HUB (REFACTORED) 🌟
 * =========================================================
 * - Envelope Opening Experience & Transition to Main Stage
 * - Navigation, Audio Playlist & Volume Control
 * - Quick Thumbnail Gallery Drawer
 * - Theme Switcher & Fullscreen Mode
 * - 3D Mouse Parallax Tilt
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Flipbook Instance
  const albumBook = new window.AlbumBook('book-container', 'album-book');
  window.albumBookInstance = albumBook;
  window.albumBook = albumBook;

  // 2. Core DOM Elements
  const introOverlay = document.getElementById('intro-overlay');
  const envelopeBtn = document.getElementById('btn-open-envelope');
  const envelope = document.getElementById('intro-envelope');
  const mainStage = document.getElementById('main-app-stage');
  
  const navPrev = document.getElementById('nav-prev-btn');
  const navNext = document.getElementById('nav-next-btn');
  const autoplayBtn = document.getElementById('btn-autoplay');
  const galleryBtn = document.getElementById('btn-gallery-drawer');
  const galleryModal = document.getElementById('gallery-modal');
  const galleryCloseBtn = document.getElementById('gallery-close-btn');
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const fullscreenBtn = document.getElementById('btn-fullscreen');
  
  // Music controls
  const musicPlayBtn = document.getElementById('music-play-btn');
  const musicNextBtn = document.getElementById('music-next-btn');
  const musicMuteBtn = document.getElementById('music-mute-btn');
  const musicVolumeSlider = document.getElementById('music-volume-slider');

  // Populate dynamic Intro text from config
  if (window.CONFIG) {
    const titleEl = document.getElementById('website-page-title');
    if (titleEl) titleEl.innerText = window.CONFIG.websiteTitle || "Happy Birthday!";
    
    const introGreeting = document.getElementById('intro-greeting-text');
    if (introGreeting && window.CONFIG.intro) {
      introGreeting.innerText = window.CONFIG.intro.greeting;
    }
    const introHint = document.getElementById('intro-hint-text');
    if (introHint && window.CONFIG.intro) {
      introHint.innerText = window.CONFIG.intro.hint;
    }
  }

  // =========================================================
  // 💌 1. INTRO ENVELOPE OPENING EXPERIENCE
  // =========================================================
  const openGiftEnvelope = () => {
    if (!envelope || envelope.classList.contains('opened')) return;
    
    envelope.classList.add('opened');
    
    // Play SFX & Grand Confetti Burst
    if (window.audioManager) {
      window.audioManager.playCandleBlowSFX();
      window.audioManager.play();
    }
    
    if (window.particleEngine) {
      window.particleEngine.triggerGrandCelebration(2500);
    }

    // Smooth fade out of intro and reveal album book
    setTimeout(() => {
      if (introOverlay) introOverlay.classList.add('fade-out');
      if (mainStage) {
        mainStage.classList.remove('hidden-stage');
        mainStage.classList.add('visible-stage');
      }
      
      albumBook.updateContainerCentering();
      albumBook.handleVideoPlayback();
      
      setTimeout(() => {
        if (introOverlay) introOverlay.style.display = 'none';
      }, 900);
    }, 1400);
  };

  if (envelopeBtn) envelopeBtn.addEventListener('click', openGiftEnvelope);
  if (envelope) envelope.addEventListener('click', openGiftEnvelope);

  // =========================================================
  // 📖 2. ALBUM NAVIGATION CONTROLS
  // =========================================================
  if (navPrev) {
    navPrev.addEventListener('click', () => albumBook.prevPage());
  }
  if (navNext) {
    navNext.addEventListener('click', () => albumBook.nextPage());
  }
  if (autoplayBtn) {
    autoplayBtn.addEventListener('click', () => albumBook.toggleAutoPlay());
  }

  // =========================================================
  // 🎵 3. MUSIC PLAYER CONTROLS
  // =========================================================
  if (musicPlayBtn) {
    musicPlayBtn.addEventListener('click', () => {
      if (window.audioManager) window.audioManager.toggle();
    });
  }
  if (musicNextBtn) {
    musicNextBtn.addEventListener('click', () => {
      if (window.audioManager) window.audioManager.nextTrack();
    });
  }
  if (musicMuteBtn) {
    musicMuteBtn.addEventListener('click', () => {
      if (window.audioManager) {
        window.audioManager.toggleMute();
        musicMuteBtn.innerHTML = window.audioManager.isMuted ? '🔇' : '🔊';
      }
    });
  }
  if (musicVolumeSlider) {
    musicVolumeSlider.addEventListener('input', (e) => {
      if (window.audioManager) {
        window.audioManager.setVolume(parseFloat(e.target.value));
      }
    });
  }

  // =========================================================
  // 🖼️ 4. QUICK THUMBNAIL GALLERY MODAL
  // =========================================================
  const buildGalleryGrid = () => {
    const galleryGrid = document.getElementById('gallery-grid-content');
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    const pages = (window.CONFIG && window.CONFIG.pages) || [];
    pages.forEach((page, idx) => {
      const item = document.createElement('div');
      item.className = 'gallery-thumbnail-card';
      
      let thumbImg = 'media/1.jpg';
      let title = page.title || `Trang ${idx + 1}`;
      let isVid = page.type === 'video' || (page.src && page.src.endsWith('.mp4'));
      
      if (page.type === 'cover') {
        thumbImg = page.coverImage || 'media/33.jpg';
        title = 'Bìa Sách ✨';
      } else if (page.type === 'cake') {
        thumbImg = 'media/33.jpg';
        title = 'Bánh Sinh Nhật 🎂';
      } else if (page.type === 'letter') {
        thumbImg = 'media/2.jpg';
        title = 'Bức Thư Tình 💌';
      } else if (page.type === 'back-cover') {
        thumbImg = 'media/33.jpg';
        title = 'Trang Cuối 🤎';
      } else if (page.src) {
        thumbImg = page.src;
      }

      const pageNum = idx + 1;
      const sheetTarget = pageNum === 1 ? 0 : Math.floor(pageNum / 2);

      item.innerHTML = `
        <div class="thumb-media-wrapper">
          ${isVid ? `<video src="${thumbImg}" class="thumb-vid" muted></video><span class="thumb-badge-vid">▶</span>` : `<img src="${thumbImg}" class="thumb-img" alt="${title}" loading="lazy" />`}
        </div>
        <div class="thumb-info">
          <span class="thumb-title">${title}</span>
          <span class="thumb-page-num">Trang ${pageNum}</span>
        </div>
      `;

      item.addEventListener('click', () => {
        albumBook.goToPage(sheetTarget);
        if (galleryModal) galleryModal.classList.remove('active');
      });

      galleryGrid.appendChild(item);
    });
  };

  buildGalleryGrid();

  if (galleryBtn && galleryModal) {
    galleryBtn.addEventListener('click', () => {
      galleryModal.classList.add('active');
    });
  }
  if (galleryCloseBtn && galleryModal) {
    galleryCloseBtn.addEventListener('click', () => {
      galleryModal.classList.remove('active');
    });
  }
  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        galleryModal.classList.remove('active');
      }
    });
  }

  // =========================================================
  // 🎨 5. THEME TOGGLE (Pastel Rose / Starry Night / Warm Sunset)
  // =========================================================
  const themes = ['theme-pastel-rose', 'theme-starry-night', 'theme-warm-sunset'];
  let currentThemeIndex = 0;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.remove(themes[currentThemeIndex]);
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      document.body.classList.add(themes[currentThemeIndex]);
      
      const icons = ['🌸', '🌌', '🌅'];
      themeToggleBtn.innerHTML = `<span>${icons[currentThemeIndex]}</span>`;
      if (window.audioManager) window.audioManager.playPopSFX();
    });
  }

  // =========================================================
  // 🖥️ 6. FULLSCREEN TOGGLE
  // =========================================================
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        fullscreenBtn.innerHTML = '<span>⤓</span>';
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          fullscreenBtn.innerHTML = '<span>⤢</span>';
        }
      }
    });
  }

  // =========================================================
  // 🌟 7. INTERACTIVE 3D PARALLAX TILT ON MOUSE MOVE
  // =========================================================
  const bookStageWrapper = document.querySelector('.book-stage-wrapper');
  if (bookStageWrapper) {
    let mouseX = 0, mouseY = 0;
    let currentTiltX = 0, currentTiltY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 6; // ±3 deg
      mouseY = (e.clientY / window.innerHeight - 0.5) * -6; // ±3 deg
    }, { passive: true });

    const applyParallax = () => {
      currentTiltX += (mouseY - currentTiltX) * 0.08;
      currentTiltY += (mouseX - currentTiltY) * 0.08;
      
      const bookContainer = document.getElementById('book-container');
      if (bookContainer) {
        bookContainer.style.setProperty('--mouse-tilt-x', `${currentTiltX}deg`);
        bookContainer.style.setProperty('--mouse-tilt-y', `${currentTiltY}deg`);
      }
      requestAnimationFrame(applyParallax);
    };
    applyParallax();
  }
});
