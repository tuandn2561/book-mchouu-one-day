/**
 * =========================================================
 * 📖 3D SCRAPBOOK FLIPBOOK ENGINE (REFACTORED & ROBUST) 📖
 * =========================================================
 * - State Machine Architecture (Cover, Open Spread, Back Cover)
 * - Unified Action Dispatcher ([data-action]) preventing unwanted flips
 * - Ultra-Realistic 3D Birthday Cake & Metallic Candle Blow Logic
 * - Smooth Cascading Replay Animation (replayToCover)
 * - Intelligent Video Playback & GPU Optimization
 * =========================================================
 */

class AlbumBook {
  constructor(containerId = 'book-container', bookElId = 'album-book') {
    this.container = document.getElementById(containerId);
    this.bookEl = document.getElementById(bookElId);
    this.pagesData = (window.CONFIG && window.CONFIG.pages) || [];

    // Core State
    this.currentPageIndex = 0; // 0 = Cover, 1..totalSheets-1 = Spreads, totalSheets = Back Cover
    this.totalSheets = 0;
    this.sheets = [];
    this.isFlipping = false;
    this.lastFlipTime = 0;
    this.autoPlayTimer = null;
    this.isAutoPlaying = false;
    this.isCandlesBlown = false;

    // Global Reference
    window.albumBook = this;
    window.albumBookInstance = this;

    this.init();
  }

  // =========================================================
  // 🚀 INITIALIZATION
  // =========================================================
  init() {
    if (!this.bookEl || !this.container) {
      console.error("[AlbumBook] Required DOM containers not found.");
      return;
    }

    this.buildSheets();
    this.bindEvents();
    this.updateContainerCentering();
    this.updateZIndexes();
    this.updateUI();

    // Auto-warm video audio context on first user touch/click
    document.addEventListener('click', () => {
      this.handleVideoPlayback();
    }, { once: true });
  }

  // =========================================================
  // 📚 SHEET GENERATION & DOM MAPPING
  // =========================================================
  buildSheets() {
    this.bookEl.innerHTML = '';
    this.sheets = [];

    const pages = this.pagesData;
    const totalPages = pages.length;

    let sheetIndex = 0;
    for (let i = 0; i < totalPages; i += 2) {
      const frontData = pages[i];
      const backData = pages[i + 1] || null;

      const sheet = document.createElement('div');
      sheet.className = 'book-sheet';
      sheet.dataset.sheetIndex = sheetIndex;

      // Front Face (Right Page when unflipped)
      const frontFace = document.createElement('div');
      frontFace.className = 'sheet-face sheet-front';
      frontFace.dataset.pageNumber = i + 1;
      frontFace.innerHTML = this.renderPageHTML(frontData, i + 1, totalPages);

      // Back Face (Left Page when flipped)
      const backFace = document.createElement('div');
      backFace.className = 'sheet-face sheet-back';
      backFace.dataset.pageNumber = i + 2;
      if (backData) {
        backFace.innerHTML = this.renderPageHTML(backData, i + 2, totalPages);
      } else {
        backFace.innerHTML = `
          <div class="scrapbook-page blank-page">
            <div class="blank-heart">🤎</div>
          </div>
        `;
      }

      sheet.appendChild(frontFace);
      sheet.appendChild(backFace);
      this.bookEl.appendChild(sheet);

      this.sheets.push({
        index: sheetIndex,
        element: sheet,
        frontFace: frontFace,
        backFace: backFace,
        frontData: frontData,
        backData: backData,
        frontPageNum: i + 1,
        backPageNum: i + 2
      });

      sheetIndex++;
    }

    this.totalSheets = this.sheets.length;
    this.attachInteractiveListeners();
  }

  // =========================================================
  // 🎨 HTML PAGE RENDERERS
  // =========================================================
  renderPageHTML(data, pageNum, totalPages) {
    if (!data) return '';

    switch (data.type) {
      case 'cover':
        return this.renderCoverPage(data);
      case 'cake':
        return this.renderCakePage(data, pageNum, totalPages);
      case 'letter':
        return this.renderLetterPage(data, pageNum, totalPages);
      case 'back-cover':
        return this.renderBackCoverPage(data);
      case 'video':
      case 'photo':
      default:
        return this.renderMemoryPage(data, pageNum, totalPages);
    }
  }

  renderCoverPage(data) {
    return `
      <div class="scrapbook-page cover-page">
        <div class="cover-texture"></div>
        <div class="cover-border">
          <div class="cover-badge">${data.tag || 'Special Edition ✨'}</div>
          <div class="cover-photo-frame">
            <img src="${data.coverImage || 'media/33.jpg'}" alt="Cover Photo" class="cover-img" />
            <div class="washi-tape tape-cover-top mocha"></div>
          </div>
          <h1 class="cover-title">${data.title || 'BÙI KHÁNH LINH'}</h1>
          <p class="cover-subtitle">${data.subtitle || 'Happy 19th Birthday • Mchouu ✨'}</p>
          <div class="cover-quote">${data.quote || 'Gặp được em là điều dịu dàng nhất... 🤎'}</div>
          <div class="cover-tap-hint" data-action="flip-forward">
            <span>Chạm hoặc lật sang phải để mở ➔</span>
          </div>
        </div>
        <div class="bookmark-ribbon"></div>
      </div>
    `;
  }

  renderCakePage(data, pageNum, totalPages) {
    const recipientName = (window.CONFIG && window.CONFIG.recipientName) || 'Khánh Linh';
    const blownMsg = (window.CONFIG && window.CONFIG.cake && window.CONFIG.cake.blownMessage) ||
      'Chúc mừng sinh nhật Khánh Linh (Mchouu) tuổi 19 luôn luôn hạnh phúc, rạng rỡ và đạt được mọi ước mơ! 🎂✨🎉';

    return `
      <div class="scrapbook-page cake-page">
        <div class="washi-tape tape-top-left mocha"></div>
        <div class="washi-tape tape-top-right caramel"></div>
        
        <div class="page-header">
          <span class="page-badge">Make a Wish 🎂</span>
          <span class="page-number">${pageNum} / ${totalPages}</span>
        </div>
        
        <h2 class="cake-page-title">${data.title || 'Happy Birthday Khánh Linh! 🎂'}</h2>
        <p class="cake-page-subtitle">${data.subtitle || 'Nhấn vào nến hoặc nút bên dưới để thổi nến nhé ✨'}</p>
        
        <!-- 🎂 3D BIRTHDAY CAKE COMPONENT -->
        <div class="cake-interactive-stage" data-action="blow-candle" title="Nhấn để thổi nến">
          <!-- Floating Ambient Sparkles -->
          <div class="cake-sparkles-ambient">
            <span class="sparkle-dot sp-1">✨</span>
            <span class="sparkle-dot sp-2">⭐</span>
            <span class="sparkle-dot sp-3">✨</span>
            <span class="sparkle-dot sp-4">💖</span>
          </div>

          <!-- Porcelain Stand -->
          <div class="cake-stand-3d">
            <div class="cake-stand-plate"></div>
            <div class="cake-stand-stem"></div>
            <div class="cake-stand-base"></div>
            <div class="cake-stand-shadow"></div>
          </div>

          <!-- 3D Layered Cake Body -->
          <div class="cake-body-3d">
            <!-- Gold Cake Topper -->
            <div class="cake-topper-gold">
              <span>Happy 19th Birthday Khánh Linh ✨</span>
            </div>

            <!-- Top Tier -->
            <div class="cake-tier tier-top">
              <div class="tier-top-surface">
                <div class="strawberry-cluster">
                  <span class="cake-berry berry-1">🍓</span>
                  <span class="cake-berry berry-2">🍓</span>
                  <span class="cake-berry berry-3">🍓</span>
                </div>
                <div class="cream-piping top-piping"></div>
              </div>
              <div class="tier-body">
                <div class="icing-drips">
                  <span class="drip d-1"></span>
                  <span class="drip d-2"></span>
                  <span class="drip d-3"></span>
                  <span class="drip d-4"></span>
                </div>
              </div>
            </div>

            <!-- Middle Tier -->
            <div class="cake-tier tier-middle">
              <div class="tier-top-surface">
                <div class="cream-piping mid-piping"></div>
              </div>
              <div class="tier-body">
                <div class="pearl-ribbon">
                  <span>✨</span><span>🤎</span><span>✨</span><span>🤎</span><span>✨</span>
                </div>
                <div class="icing-drips mocha-drips">
                  <span class="drip d-1"></span>
                  <span class="drip d-2"></span>
                  <span class="drip d-3"></span>
                </div>
              </div>
            </div>

            <!-- Bottom Tier -->
            <div class="cake-tier tier-bottom">
              <div class="tier-top-surface">
                <div class="cream-piping bottom-piping"></div>
              </div>
              <div class="tier-body">
                <div class="gold-cake-lace"></div>
              </div>
            </div>
          </div>
          
          <!-- 3 Glowing Metallic 3D Candles -->
          <div class="candles-wrapper-3d" id="candles-container" data-action="blow-candle">
            <div class="candle-3d" data-candle="1">
              <div class="flame-aura"></div>
              <div class="flame" id="flame-1">
                <div class="flame-inner"></div>
              </div>
              <div class="wick"></div>
              <div class="candle-stick candle-metallic-pink"></div>
            </div>
            
            <div class="candle-3d candle-center" data-candle="2">
              <div class="flame-aura"></div>
              <div class="flame" id="flame-2">
                <div class="flame-inner"></div>
              </div>
              <div class="wick"></div>
              <div class="candle-stick candle-metallic-gold">
                <div class="candle-num-badge">19</div>
              </div>
            </div>
            
            <div class="candle-3d" data-candle="3">
              <div class="flame-aura"></div>
              <div class="flame" id="flame-3">
                <div class="flame-inner"></div>
              </div>
              <div class="wick"></div>
              <div class="candle-stick candle-metallic-pink"></div>
            </div>
          </div>
        </div>
        
        <!-- Action Button -->
        <div class="cake-blow-prompt" id="cake-instruction">
          <button class="blow-candle-btn" id="btn-blow-candle" data-action="blow-candle" type="button">
            <span class="btn-icon">🕯️</span>
            <span class="btn-text">Thổi Nến Ước Nguyện ✨</span>
          </button>
        </div>
        
        <!-- Post-Blow Blessing Result -->
        <div class="cake-wish-result hidden" id="cake-wish-banner">
          <div class="wish-heart-pulse">🎉🤎🎂</div>
          <p class="wish-blessing-text">${blownMsg}</p>
        </div>
        
        <div class="page-footer">
          <span class="page-date">Happy Birthday ${recipientName} (22/08/2007) ✨</span>
        </div>
      </div>
    `;
  }

  renderLetterPage(data, pageNum, totalPages) {
    const letterData = (window.CONFIG && window.CONFIG.loveLetter) || {};
    const paras = letterData.paragraphs || [
      "Gửi Bùi Khánh Linh, chúc mừng sinh nhật tuổi 19 thật rực rỡ và hạnh phúc!"
    ];

    return `
      <div class="scrapbook-page letter-page">
        <div class="washi-tape tape-top-right caramel"></div>
        <div class="page-header">
          <span class="page-badge">Bức Thư Tình 💌</span>
          <span class="page-number">${pageNum} / ${totalPages}</span>
        </div>
        
        <div class="parchment-letter-wrapper">
          <div class="letter-stamp">💌</div>
          <div class="letter-date">${letterData.date || '22 Tháng 08'}</div>
          <h3 class="letter-title">${letterData.title || 'Gửi Khánh Linh...'}</h3>
          <div class="letter-content">
            ${paras.map(p => `<p>${p}</p>`).join('')}
          </div>
          <div class="letter-signature">
            <span>${letterData.signature || 'Yêu Mchouu ❤️'}</span>
          </div>
          <div class="wax-seal">
            <span>KL🤎</span>
          </div>
        </div>
        
        <div class="page-footer">
          <span class="page-date">Forever & Always (22.08.2007) ✨</span>
        </div>
      </div>
    `;
  }

  renderBackCoverPage(data) {
    const footerText = data.footerNote || data.footer || 'Created with infinite love for Bùi Khánh Linh (22/08/2007)';

    return `
      <div class="scrapbook-page back-cover-page" data-interactive-zone="back-cover">
        <div class="cover-texture"></div>
        <div class="cover-border">
          <div class="back-cover-heart">🤎</div>
          <h2 class="back-cover-title">${data.title || 'To Be Continued...'}</h2>
          <p class="back-cover-subtitle">${data.subtitle || 'Hành trình của chúng mình sẽ còn viết tiếp thật nhiều trang nữa 🤎'}</p>
          <div class="back-cover-tag">${data.tag || 'Forever Love ✨'}</div>
          <div class="back-cover-footer">${footerText}</div>
          
          <button class="replay-btn" id="album-replay-btn" data-action="replay-album" type="button">
            <span>🔄 Xem Lại Từ Đầu</span>
          </button>
        </div>
      </div>
    `;
  }

  renderMemoryPage(data, pageNum, totalPages) {
    const isVideo = data.type === 'video' || (data.src && data.src.endsWith('.mp4'));
    const stickersHTML = (data.stickers || ['🌸', '✨', '🤎'])
      .map((s, idx) => `<span class="page-sticker sticker-${idx + 1}">${s}</span>`)
      .join('');

    const rot = data.rotation || 0;
    const tapeColor = data.tape || 'mocha';

    return `
      <div class="scrapbook-page memory-page">
        <!-- Washi Tapes -->
        <div class="washi-tape tape-top-left ${tapeColor}"></div>
        <div class="washi-tape tape-top-right ${tapeColor}"></div>
        
        <!-- Page Header -->
        <div class="page-header">
          <span class="page-badge">${data.date || '22.08.2007'}</span>
          <span class="page-number">${pageNum} / ${totalPages}</span>
        </div>
        
        <!-- Polaroid Card Wrapper -->
        <div class="polaroid-card" style="transform: rotate(${rot}deg);">
          <div class="polaroid-media-box">
            ${isVideo ? `
              <div class="video-container" data-action="toggle-video">
                <video class="page-video" playsinline webkit-playsinline loop muted autoplay preload="auto" src="${data.src}">
                  Trình duyệt không hỗ trợ video.
                </video>
                <div class="video-play-indicator" style="opacity: 0;">▶</div>
              </div>
            ` : `
              <img src="${data.src}" alt="${data.title || 'Memory Photo'}" class="page-photo" loading="lazy" />
            `}
          </div>
          
          <div class="polaroid-caption-area">
            <h3 class="polaroid-title">${data.title || 'Kỷ Niệm Ngọt Ngào'}</h3>
            <p class="polaroid-caption">${data.caption || 'Những khoảnh khắc bên nhau luôn là điều trân quý nhất.'}</p>
          </div>
          
          <div class="polaroid-pin">📌</div>
        </div>
        
        <!-- Decorative Stickers -->
        <div class="stickers-container">
          ${stickersHTML}
        </div>
        
        <!-- Page Footer -->
        <div class="page-footer">
          <span class="page-date">📅 ${data.date || '22.08.2007'}</span>
          <span class="page-heart-btn" data-action="heart-pop" title="Thả tim">🤎</span>
        </div>
      </div>
    `;
  }

  // =========================================================
  // 🎮 UNIFIED ACTION DISPATCHER & EVENT ROUTING
  // =========================================================
  bindEvents() {
    if (!this.container) return;

    // 1. Central Click Dispatcher
    this.container.addEventListener('click', (e) => {
      this.handleActionClick(e);
    });

    // 2. Keyboard Navigation (Arrows & Space)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        this.nextPage();
      } else if (e.key === 'ArrowLeft') {
        this.prevPage();
      }
    });

    // 3. Touch Swipe Handling
    let touchStartX = 0;
    let touchStartY = 0;

    this.bookEl.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    this.bookEl.addEventListener('touchend', (e) => {
      if (e.changedTouches.length > 0) {
        const diffX = e.changedTouches[0].clientX - touchStartX;
        const diffY = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            this.nextPage();
          } else {
            this.prevPage();
          }
        }
      }
    }, { passive: true });
  }

  handleActionClick(e) {
    // 1. Explicit data-action routing (Highest Priority)
    const actionEl = e.target.closest('[data-action]');
    if (actionEl) {
      const action = actionEl.dataset.action;
      e.preventDefault();
      e.stopPropagation();

      switch (action) {
        case 'blow-candle':
          this.blowCandles();
          return;
        case 'replay-album':
          this.replayToCover();
          return;
        case 'heart-pop':
          this.triggerHeartBurst(actionEl);
          return;
        case 'toggle-video':
          this.toggleVideoPlayback(actionEl);
          return;
        case 'flip-forward':
          this.nextPage();
          return;
        case 'flip-backward':
          this.prevPage();
          return;
      }
    }

    // 2. Birthday Cake Page Smart Routing
    const cakePageEl = e.target.closest('.cake-page');
    if (cakePageEl) {
      // If clicking top header or bottom footer -> Navigate back
      if (e.target.closest('.page-header') || e.target.closest('.page-footer')) {
        this.prevPage();
        return;
      }
      // Any other click inside Cake page (cake, candles, button, title, background) -> Blow candles!
      e.preventDefault();
      e.stopPropagation();
      this.blowCandles();
      return;
    }

    // 3. Back Cover Page Smart Routing
    const backCoverEl = e.target.closest('.back-cover-page');
    if (backCoverEl) {
      if (e.target.closest('#album-replay-btn') || e.target.closest('.replay-btn') || e.target.closest('.back-cover-heart') || e.target.closest('.back-cover-title')) {
        e.preventDefault();
        e.stopPropagation();
        this.replayToCover();
        return;
      }
      this.prevPage();
      return;
    }

    // 4. Non-navigational interactive elements
    if (
      e.target.closest('video') ||
      e.target.closest('.video-container') ||
      e.target.closest('.gallery-modal') ||
      e.target.closest('button')
    ) {
      return;
    }

    // 5. Natural Left / Right Page Navigation
    const rect = this.container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX > rect.width / 2) {
      this.nextPage();
    } else {
      this.prevPage();
    }
  }

  attachInteractiveListeners() {
    const replayBtns = document.querySelectorAll('#album-replay-btn, .replay-btn, [data-action="replay-album"]');
    replayBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.replayToCover();
      };
    });

    const candleTriggers = document.querySelectorAll('#btn-blow-candle, .blow-candle-btn, .cake-interactive-stage, #candles-container, .candles-wrapper-3d, .candle-3d, [data-action="blow-candle"]');
    candleTriggers.forEach(el => {
      el.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.blowCandles();
      };
    });
  }

  // =========================================================
  // 🎂 3D BIRTHDAY CAKE & BLOW LOGIC
  // =========================================================
  blowCandles() {
    this.isCandlesBlown = true;

    // Extinguish flames
    const flames = document.querySelectorAll('.flame');
    flames.forEach(f => f.classList.add('blown-out'));

    const auras = document.querySelectorAll('.flame-aura');
    auras.forEach(a => {
      a.style.opacity = '0';
    });

    // Sound & Grand Celebration Particles
    if (window.audioManager) window.audioManager.playCandleBlowSFX();
    if (window.particleEngine) {
      window.particleEngine.triggerGrandCelebration(5000);
    }

    // Toggle instruction & show banner
    const instructions = document.querySelectorAll('#cake-instruction, .cake-blow-prompt');
    instructions.forEach(inst => inst.classList.add('hidden'));

    const banners = document.querySelectorAll('#cake-wish-banner, .cake-wish-result');
    banners.forEach(b => {
      b.classList.remove('hidden');
      b.classList.add('show-banner');
    });

    // Cheer penguins
    if (window.penguinManager && window.penguinManager.penguins) {
      window.penguinManager.penguins.forEach(p => p.cheer("Happy Birthday Linh! 🎂🎉"));
    }
  }

  // =========================================================
  // 🔄 REPLAY TO COVER (CLEAN 3D RETURN TO FRONT COVER)
  // =========================================================
  replayToCover() {
    if (this.isFlipping) return;
    this.isFlipping = true;

    if (window.audioManager) window.audioManager.playPopSFX();

    // 1. Reset candle state
    this.isCandlesBlown = false;
    const flames = document.querySelectorAll('.flame');
    flames.forEach(f => f.classList.remove('blown-out'));
    const auras = document.querySelectorAll('.flame-aura');
    auras.forEach(a => {
      a.style.opacity = '1';
    });

    const instructions = document.querySelectorAll('#cake-instruction, .cake-blow-prompt');
    instructions.forEach(inst => inst.classList.remove('hidden'));

    const banners = document.querySelectorAll('#cake-wish-banner, .cake-wish-result');
    banners.forEach(b => {
      b.classList.add('hidden');
      b.classList.remove('show-banner');
    });

    // 2. Prepare sheets for smooth visual flip back to Cover
    const total = this.sheets.length;

    // Reset inside sheets (1..total-1) instantly behind Sheet 0
    this.sheets.forEach((sheet, idx) => {
      if (idx > 0) {
        sheet.element.style.transition = 'none';
        sheet.element.classList.remove('flipped');
        sheet.element.style.zIndex = (total - idx) + 5;
      }
    });

    // Bring Sheet 0 on top of the left stack in flipped state
    const sheet0 = this.sheets[0];
    sheet0.element.style.zIndex = 100;
    sheet0.element.style.transition = 'none';
    sheet0.element.classList.add('flipped');

    // Force browser layout reflow
    void sheet0.element.offsetWidth;

    // Animate Sheet 0 smoothly back onto the front cover
    sheet0.element.style.transition = 'transform 0.85s cubic-bezier(0.35, 0, 0.25, 1)';
    sheet0.element.classList.remove('flipped');

    this.currentPageIndex = 0;
    this.updateContainerCentering();
    this.updateUI();

    if (window.penguinManager) {
      window.penguinManager.triggerPageFlipDialogue('prev', 0);
    }

    if (window.audioManager) window.audioManager.playPageFlipSFX();

    setTimeout(() => {
      this.sheets.forEach((sheet, idx) => {
        sheet.element.style.transition = '';
        sheet.element.style.zIndex = (total - idx) + 5;
        sheet.element.classList.remove('flipped');
      });
      this.handleVideoPlayback();
      this.isFlipping = false;
    }, 900);
  }

  // =========================================================
  // 💖 HEART POP & VIDEO CONTROLS
  // =========================================================
  triggerHeartBurst(heartBtn) {
    if (window.audioManager) window.audioManager.playPopSFX();
    if (window.particleEngine) {
      const rect = heartBtn.getBoundingClientRect();
      window.particleEngine.triggerConfetti(15, rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    heartBtn.classList.add('heart-burst');
    setTimeout(() => heartBtn.classList.remove('heart-burst'), 600);
  }

  toggleVideoPlayback(videoContainer) {
    const vid = videoContainer.querySelector('video');
    const ind = videoContainer.querySelector('.video-play-indicator');
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      if (ind) ind.style.opacity = '0';
    } else {
      vid.pause();
      if (ind) ind.style.opacity = '1';
    }
  }

  // =========================================================
  // 📖 3D PAGE FLIP NAVIGATION
  // =========================================================
  nextPage() {
    const now = Date.now();
    if (this.isFlipping && (now - this.lastFlipTime < 850)) return;
    if (this.currentPageIndex >= this.totalSheets) return;

    this.isFlipping = true;
    this.lastFlipTime = now;

    const executeFlip = () => {
      if (this.currentPageIndex >= this.totalSheets) {
        this.isFlipping = false;
        return;
      }
      const currentSheet = this.sheets[this.currentPageIndex];
      if (window.audioManager) window.audioManager.playPageFlipSFX();

      currentSheet.element.style.zIndex = 100;
      currentSheet.element.classList.add('flipped');

      this.currentPageIndex++;
      this.updateContainerCentering();
      this.updateUI();

      if (window.penguinManager) {
        window.penguinManager.triggerPageFlipDialogue('next', this.currentPageIndex);
      }

      setTimeout(() => {
        this.updateZIndexes();
        this.handleVideoPlayback();
        this.isFlipping = false;
      }, 900);
    };

    if (window.penguinManager) {
      window.penguinManager.requestPageFlip('next', executeFlip);
    } else {
      executeFlip();
    }
  }

  prevPage() {
    const now = Date.now();
    if (this.isFlipping && (now - this.lastFlipTime < 850)) return;
    if (this.currentPageIndex <= 0) return;

    this.isFlipping = true;
    this.lastFlipTime = now;

    const executeFlip = () => {
      if (this.currentPageIndex <= 0) {
        this.isFlipping = false;
        return;
      }
      this.currentPageIndex--;
      const prevSheet = this.sheets[this.currentPageIndex];

      if (window.audioManager) window.audioManager.playPageFlipSFX();

      prevSheet.element.style.zIndex = 100;
      prevSheet.element.classList.remove('flipped');

      this.updateContainerCentering();
      this.updateUI();

      if (window.penguinManager) {
        window.penguinManager.triggerPageFlipDialogue('prev', this.currentPageIndex);
      }

      setTimeout(() => {
        this.updateZIndexes();
        this.handleVideoPlayback();
        this.isFlipping = false;
      }, 900);
    };

    if (window.penguinManager) {
      window.penguinManager.requestPageFlip('prev', executeFlip);
    } else {
      executeFlip();
    }
  }

  goToPage(sheetIdx) {
    if (sheetIdx < 0 || sheetIdx > this.totalSheets) return;

    if (sheetIdx === 0) {
      this.replayToCover();
      return;
    }

    const direction = sheetIdx > this.currentPageIndex ? 'next' : 'prev';
    this.currentPageIndex = sheetIdx;
    this.isFlipping = false;

    this.updateZIndexes();
    if (window.audioManager) window.audioManager.playPageFlipSFX();
    this.updateContainerCentering();
    this.handleVideoPlayback();
    this.updateUI();

    if (window.penguinManager) {
      window.penguinManager.triggerPageFlipDialogue(direction, sheetIdx);
    }
  }

  // =========================================================
  // 📐 Z-INDEX & CENTERING STATE MACHINE
  // =========================================================
  updateZIndexes() {
    this.sheets.forEach((sheet, idx) => {
      if (idx < this.currentPageIndex) {
        // Flipped on the left stack
        sheet.element.classList.add('flipped');
        sheet.element.style.zIndex = idx + 1;
      } else {
        // Unflipped on the right stack
        sheet.element.classList.remove('flipped');
        sheet.element.style.zIndex = (this.totalSheets - idx) + 5;
      }
    });
  }

  updateContainerCentering() {
    if (!this.container) return;

    this.container.classList.remove('state-cover', 'state-open', 'state-back');

    if (this.currentPageIndex === 0) {
      this.container.classList.add('state-cover');
    } else if (this.currentPageIndex >= this.totalSheets) {
      this.container.classList.add('state-back');
    } else {
      this.container.classList.add('state-open');
    }
  }

  // =========================================================
  // 🎬 GPU VIDEO MANAGEMENT & AUTOPLAY
  // =========================================================
  handleVideoPlayback() {
    const allVideos = this.bookEl.querySelectorAll('video');

    allVideos.forEach(vid => {
      vid.pause();
      vid.style.display = 'none';
    });

    if (this.currentPageIndex === 0 || this.currentPageIndex >= this.totalSheets) {
      return;
    }

    // Active spread sheets
    const leftSheet = this.sheets[this.currentPageIndex - 1];
    const rightSheet = this.sheets[this.currentPageIndex];

    if (leftSheet) {
      const leftVid = leftSheet.backFace.querySelector('video');
      if (leftVid) {
        leftVid.style.display = 'block';
        leftVid.play().catch(() => { });
      }
    }

    if (rightSheet) {
      const rightVid = rightSheet.frontFace.querySelector('video');
      if (rightVid) {
        rightVid.style.display = 'block';
        rightVid.play().catch(() => { });
      }
    }
  }

  // =========================================================
  // 📊 UI CONTROLS & PROGRESS BAR
  // =========================================================
  updateUI() {
    const progressFill = document.getElementById('book-progress-fill');
    const indicator = document.getElementById('page-indicator-text');
    const navPrev = document.getElementById('nav-prev-btn');
    const navNext = document.getElementById('nav-next-btn');

    const totalPages = this.pagesData.length;
    let text = '';
    let percent = 0;

    if (this.currentPageIndex === 0) {
      text = 'Bìa Sách (Cover) ✨';
      percent = 0;
      if (navPrev) navPrev.disabled = true;
      if (navNext) navNext.disabled = false;
    } else if (this.currentPageIndex >= this.totalSheets) {
      text = `Bìa Sau (${totalPages} / ${totalPages}) 🤎`;
      percent = 100;
      if (navPrev) navPrev.disabled = false;
      if (navNext) navNext.disabled = true;
    } else {
      const leftPageNum = (this.currentPageIndex * 2);
      const rightPageNum = (this.currentPageIndex * 2) + 1;
      text = `Trang ${leftPageNum} - ${Math.min(rightPageNum, totalPages)} / ${totalPages}`;
      percent = (this.currentPageIndex / this.totalSheets) * 100;
      if (navPrev) navPrev.disabled = false;
      if (navNext) navNext.disabled = false;
    }

    if (indicator) indicator.innerText = text;
    if (progressFill) progressFill.style.width = `${percent}%`;
  }

  // =========================================================
  // ⏳ AUTOPLAY CONTROLS
  // =========================================================
  toggleAutoPlay() {
    const autoplayBtn = document.getElementById('btn-autoplay');
    if (this.isAutoPlaying) {
      this.stopAutoPlay();
      if (autoplayBtn) autoplayBtn.classList.remove('active');
    } else {
      this.startAutoPlay();
      if (autoplayBtn) autoplayBtn.classList.add('active');
    }
  }

  startAutoPlay(intervalMs = 4500) {
    this.stopAutoPlay();
    this.isAutoPlaying = true;

    this.autoPlayTimer = setInterval(() => {
      if (this.currentPageIndex >= this.totalSheets) {
        this.replayToCover();
      } else {
        this.nextPage();
      }
    }, intervalMs);
  }

  stopAutoPlay() {
    this.isAutoPlaying = false;
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
}

// Global Export
window.AlbumBook = AlbumBook;
