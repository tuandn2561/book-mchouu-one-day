/**
 * =========================================================
 * 📖 3D SCRAPBOOK FLIPBOOK ENGINE 📖
 * Centered 3D Layout, Robust Video Autoplay & Loop, Touch Gestures
 * =========================================================
 */

class AlbumBook {
  constructor() {
    this.container = document.getElementById('book-container');
    this.bookEl = document.getElementById('album-book');
    this.pagesData = (window.CONFIG && window.CONFIG.pages) || [];
    
    this.currentPageIndex = 0; // index of sheet
    this.sheets = [];
    this.totalSheets = 0;
    this.isFlipping = false;
    this.autoPlayTimer = null;
    this.isAutoPlaying = false;
    
    this.init();
  }

  init() {
    if (!this.bookEl) return;
    this.buildSheets();
    this.bindEvents();
    this.updateContainerCentering();
    this.updateUI();
    
    // Auto-warm video playback permissions on first interaction
    document.addEventListener('click', () => {
      this.handleVideoPlayback();
    }, { once: true });
  }

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
      sheet.style.zIndex = totalPages - sheetIndex;
      
      // Front page face
      const frontFace = document.createElement('div');
      frontFace.className = 'sheet-face sheet-front';
      frontFace.innerHTML = this.renderPageHTML(frontData, i + 1, totalPages);
      
      // Back page face
      const backFace = document.createElement('div');
      backFace.className = 'sheet-face sheet-back';
      if (backData) {
        backFace.innerHTML = this.renderPageHTML(backData, i + 2, totalPages);
      } else {
        // Blank page
        backFace.innerHTML = `<div class="scrapbook-page blank-page"><div class="blank-heart">🤎</div></div>`;
      }
      
      sheet.appendChild(frontFace);
      sheet.appendChild(backFace);
      this.bookEl.appendChild(sheet);
      
      this.sheets.push({
        element: sheet,
        frontData: frontData,
        backData: backData,
        frontPageNum: i + 1,
        backPageNum: i + 2
      });
      
      sheetIndex++;
    }
    
    this.totalSheets = this.sheets.length;
    this.attachPageInteractiveListeners();
  }

  renderPageHTML(data, pageNum, totalPages) {
    if (!data) return '';
    
    if (data.type === 'cover') {
      return `
        <div class="scrapbook-page cover-page">
          <div class="cover-texture"></div>
          <div class="cover-border">
            <div class="cover-badge">${data.tag || 'Special Edition'}</div>
            <div class="cover-photo-frame">
              <img src="${data.coverImage || 'media/IMG_20260610_010152_534.jpg'}" alt="Cover Photo" class="cover-img" onerror="this.src='media/IMG_20260603_100758_821.jpg'"/>
              <div class="washi-tape tape-cover-top mocha"></div>
            </div>
            <h1 class="cover-title">${data.title}</h1>
            <p class="cover-subtitle">${data.subtitle}</p>
            <div class="cover-quote">"${data.quote}"</div>
            <div class="cover-tap-hint">
              <span>Chạm hoặc lật sang phải để mở ➔</span>
            </div>
          </div>
          <div class="bookmark-ribbon"></div>
        </div>
      `;
    }

    if (data.type === 'back-cover') {
      return `
        <div class="scrapbook-page back-cover-page">
          <div class="cover-texture"></div>
          <div class="cover-border">
            <div class="back-cover-heart">🤎</div>
            <h2 class="back-cover-title">${data.title}</h2>
            <p class="back-cover-subtitle">${data.subtitle}</p>
            <div class="back-cover-tag">${data.tag || 'Forever Love'}</div>
            <div class="back-cover-footer">${data.footer}</div>
            <button class="replay-btn" id="album-replay-btn">
              <span>🔄 Xem Lại Từ Đầu</span>
            </button>
          </div>
        </div>
      `;
    }

    if (data.type === 'cake') {
      const recipientName = (window.CONFIG && window.CONFIG.recipientName) || 'Khánh Linh';
      return `
        <div class="scrapbook-page cake-page">
          <div class="washi-tape tape-top-left mocha"></div>
          <div class="washi-tape tape-top-right caramel"></div>
          <div class="page-header">
            <span class="page-badge">Make a Wish 🎂</span>
            <span class="page-number">${pageNum} / ${totalPages}</span>
          </div>
          
          <h2 class="cake-page-title">${data.title || 'Happy Birthday!'}</h2>
          <p class="cake-page-subtitle">${data.subtitle || 'Hãy ước một điều thật đẹp nhé'}</p>
          
          <!-- 3D Birthday Cake Interactive Component -->
          <div class="cake-interactive-stage">
            <div class="cake-plate"></div>
            <div class="cake-body">
              <div class="cake-layer cake-layer-bottom"></div>
              <div class="cake-layer cake-layer-middle"></div>
              <div class="cake-layer cake-layer-top">
                <div class="cake-frosting"></div>
                <div class="cake-strawberries">
                  <span>🍓</span><span>🍓</span><span>🍓</span>
                </div>
              </div>
            </div>
            
            <!-- Glowing Candles -->
            <div class="candles-wrapper" id="candles-container">
              <div class="candle" data-candle="1">
                <div class="flame" id="flame-1"></div>
                <div class="wick"></div>
                <div class="candle-stick candle-pink"></div>
              </div>
              <div class="candle candle-center" data-candle="2">
                <div class="flame" id="flame-2"></div>
                <div class="wick"></div>
                <div class="candle-stick candle-gold"></div>
              </div>
              <div class="candle" data-candle="3">
                <div class="flame" id="flame-3"></div>
                <div class="wick"></div>
                <div class="candle-stick candle-pink"></div>
              </div>
            </div>
          </div>
          
          <div class="cake-blow-prompt" id="cake-instruction">
            <button class="blow-candle-btn" id="btn-blow-candle">
              <span class="btn-icon">🕯️</span>
              <span class="btn-text">Nhấn Vào Nến Để Thổi Nến ✨</span>
            </button>
          </div>
          
          <div class="cake-wish-result hidden" id="cake-wish-banner">
            <div class="wish-heart-pulse">🎉🤎🎂</div>
            <p class="wish-blessing-text">${(window.CONFIG && window.CONFIG.cake && window.CONFIG.cake.blownMessage) || 'Chúc Khánh Linh (Mchouu) tuổi mới luôn luôn hạnh phúc!'}</p>
          </div>
          
          <div class="page-footer">
            <span class="page-date">Happy Birthday ${recipientName} (22/08/2007) ✨</span>
          </div>
        </div>
      `;
    }

    if (data.type === 'letter') {
      const letterData = (window.CONFIG && window.CONFIG.loveLetter) || {};
      const paras = letterData.paragraphs || ["Chúc em sinh nhật vui vẻ!"];
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

    // Photo / Video standard Polaroid Scrapbook page
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
          <span class="page-badge">${data.date || 'Memories'}</span>
          <span class="page-number">${pageNum} / ${totalPages}</span>
        </div>
        
        <!-- Polaroid Card Wrapper -->
        <div class="polaroid-card" style="transform: rotate(${rot}deg);">
          <div class="polaroid-media-box">
            ${isVideo ? `
              <div class="video-container">
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
          <span class="page-heart-btn" title="Thả tim">🤎</span>
        </div>
      </div>
    `;
  }

  attachPageInteractiveListeners() {
    // Replay button on back cover
    const replayBtn = document.getElementById('album-replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.goToPage(0);
      });
    }

    // Video click to toggle play/pause or unmute
    const videos = this.bookEl.querySelectorAll('.video-container');
    videos.forEach(vc => {
      const vid = vc.querySelector('video');
      const ind = vc.querySelector('.video-play-indicator');
      if (vid) {
        vc.addEventListener('click', (e) => {
          e.stopPropagation();
          if (vid.paused) {
            vid.play();
            if (ind) ind.style.opacity = '0';
          } else {
            vid.pause();
            if (ind) ind.style.opacity = '1';
          }
        });
      }
    });

    // Heart buttons on pages for cute pop sound & particle burst
    const hearts = this.bookEl.querySelectorAll('.page-heart-btn');
    hearts.forEach(h => {
      h.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.audioManager) window.audioManager.playPopSFX();
        if (window.particleEngine) {
          const rect = h.getBoundingClientRect();
          window.particleEngine.triggerConfetti(15, rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
        h.classList.add('heart-burst');
        setTimeout(() => h.classList.remove('heart-burst'), 600);
      });
    });

    // Birthday Candle Blow-out interaction
    this.setupCandleInteraction();
  }

  setupCandleInteraction() {
    const candleBtn = document.getElementById('btn-blow-candle');
    const candlesWrapper = document.getElementById('candles-container');
    const instruction = document.getElementById('cake-instruction');
    const banner = document.getElementById('cake-wish-banner');
    
    const blowCandles = (e) => {
      if (e) e.stopPropagation();
      const flames = document.querySelectorAll('.flame');
      flames.forEach(f => {
        f.classList.add('blown-out');
      });

      // Sound & Fireworks
      if (window.audioManager) window.audioManager.playCandleBlowSFX();
      if (window.particleEngine) {
        window.particleEngine.triggerGrandCelebration(5000);
      }

      if (instruction) instruction.classList.add('hidden');
      if (banner) {
        banner.classList.remove('hidden');
        banner.classList.add('show-banner');
      }
    };

    if (candleBtn) {
      candleBtn.addEventListener('click', blowCandles);
    }
    if (candlesWrapper) {
      candlesWrapper.addEventListener('click', blowCandles);
    }
  }

  bindEvents() {
    // Click left or right side of book to flip
    this.bookEl.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('video') || e.target.closest('.candle') || e.target.closest('.page-heart-btn')) {
        return;
      }
      
      const rect = this.bookEl.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      
      if (clickX > rect.width / 2) {
        this.nextPage();
      } else {
        this.prevPage();
      }
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        this.nextPage();
      } else if (e.key === 'ArrowLeft') {
        this.prevPage();
      }
    });

    // Mobile Swipe handling
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
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
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

  nextPage() {
    const now = Date.now();
    if (this.isFlipping && (now - (this.lastFlipTime || 0) < 900)) return;
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
      
      currentSheet.element.classList.add('flipped');
      currentSheet.element.style.zIndex = this.currentPageIndex + 1;
      
      this.currentPageIndex++;
      this.updateContainerCentering();
      this.handleVideoPlayback();
      this.updateUI();
      
      setTimeout(() => {
        this.isFlipping = false;
      }, 700);
    };

    if (window.penguinManager) {
      window.penguinManager.requestPageFlip('next', executeFlip);
    } else {
      executeFlip();
    }
  }

  prevPage() {
    const now = Date.now();
    if (this.isFlipping && (now - (this.lastFlipTime || 0) < 900)) return;
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
      
      prevSheet.element.classList.remove('flipped');
      prevSheet.element.style.zIndex = this.totalSheets - this.currentPageIndex;
      
      this.updateContainerCentering();
      this.handleVideoPlayback();
      this.updateUI();
      
      setTimeout(() => {
        this.isFlipping = false;
      }, 700);
    };

    if (window.penguinManager) {
      window.penguinManager.requestPageFlip('prev', executeFlip);
    } else {
      executeFlip();
    }
  }

  goToPage(sheetIdx) {
    if (sheetIdx < 0 || sheetIdx > this.totalSheets) return;
    
    while (this.currentPageIndex < sheetIdx) {
      const sheet = this.sheets[this.currentPageIndex];
      sheet.element.classList.add('flipped');
      sheet.element.style.zIndex = this.currentPageIndex + 1;
      this.currentPageIndex++;
    }
    while (this.currentPageIndex > sheetIdx) {
      this.currentPageIndex--;
      const sheet = this.sheets[this.currentPageIndex];
      sheet.element.classList.remove('flipped');
      sheet.element.style.zIndex = this.totalSheets - this.currentPageIndex;
    }
    
    if (window.audioManager) window.audioManager.playPageFlipSFX();
    this.updateContainerCentering();
    this.handleVideoPlayback();
    this.updateUI();
  }

  // 🌟 CĂN GIỮA DYNAMIC THEO TRẠNG THÁI SÁCH 🌟
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

  // 🌟 TỰ ĐỘNG PHÁT VÀ LẶP TẤT CẢ VIDEO TRÊN TRANG ĐANG XEM 🌟
  handleVideoPlayback() {
    const allVideos = this.bookEl.querySelectorAll('video');
    const visibleVideos = [];
    
    // Xác định tất cả các video đang nằm trên trang đang mở (cả trang trái & trang phải)
    if (this.currentPageIndex === 0) {
      // Đang ở Bìa: Chỉ có Sheet 0 Front hiển thị
      if (this.sheets[0]) {
        const front = this.sheets[0].element.querySelector('.sheet-front');
        if (front) visibleVideos.push(...front.querySelectorAll('video'));
      }
    } else if (this.currentPageIndex >= this.totalSheets) {
      // Đang ở Bìa Sau: Chỉ có Sheet cuối Back hiển thị
      const lastSheet = this.sheets[this.totalSheets - 1];
      if (lastSheet) {
        const back = lastSheet.element.querySelector('.sheet-back');
        if (back) visibleVideos.push(...back.querySelectorAll('video'));
      }
    } else {
      // Đang ở giữa Album (2 trang mở ra):
      // Trang trái: Sheet (currentPageIndex - 1) mặt Back
      const leftSheet = this.sheets[this.currentPageIndex - 1];
      if (leftSheet) {
        const back = leftSheet.element.querySelector('.sheet-back');
        if (back) visibleVideos.push(...back.querySelectorAll('video'));
      }
      // Trang phải: Sheet (currentPageIndex) mặt Front
      const rightSheet = this.sheets[this.currentPageIndex];
      if (rightSheet) {
        const front = rightSheet.element.querySelector('.sheet-front');
        if (front) visibleVideos.push(...front.querySelectorAll('video'));
      }
    }

    // 1. Tạm dừng các video không thuộc trang hiện tại
    allVideos.forEach(v => {
      if (!visibleVideos.includes(v)) {
        try {
          v.pause();
          v.currentTime = 0;
          const ind = v.parentElement.querySelector('.video-play-indicator');
          if (ind) ind.style.opacity = '1';
        } catch(e) {}
      }
    });

    // 2. Tự động phát và lặp lại liên tục tất cả video trên trang hiện tại
    visibleVideos.forEach(v => {
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.autoplay = true;
      
      const ind = v.parentElement.querySelector('.video-play-indicator');
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (ind) ind.style.opacity = '0';
        }).catch(err => {
          // Retry playback
          v.muted = true;
          v.play().catch(() => {});
        });
      }
    });
  }

  toggleAutoPlay() {
    this.isAutoPlaying = !this.isAutoPlaying;
    const btn = document.getElementById('btn-autoplay');
    
    if (this.isAutoPlaying) {
      if (btn) btn.classList.add('active');
      this.autoPlayTimer = setInterval(() => {
        if (this.currentPageIndex >= this.totalSheets) {
          this.goToPage(0);
        } else {
          this.nextPage();
        }
      }, 5500);
    } else {
      if (btn) btn.classList.remove('active');
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    }
  }

  updateUI() {
    const indicator = document.getElementById('page-indicator-text');
    const progressBar = document.getElementById('book-progress-fill');
    const prevBtn = document.getElementById('nav-prev-btn');
    const nextBtn = document.getElementById('nav-next-btn');
    
    const displayCurrent = Math.min(this.currentPageIndex * 2, this.pagesData.length);
    const totalPages = this.pagesData.length;
    
    if (indicator) {
      if (this.currentPageIndex === 0) {
        indicator.innerText = `Bìa Sách (Bùi Khánh Linh)`;
      } else if (this.currentPageIndex >= this.totalSheets) {
        indicator.innerText = `Trang Cuối (Yêu Mchouu 🤎)`;
      } else {
        indicator.innerText = `Trang ${displayCurrent} / ${totalPages}`;
      }
    }

    if (progressBar) {
      const pct = (this.currentPageIndex / this.totalSheets) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (prevBtn) prevBtn.disabled = (this.currentPageIndex === 0);
    if (nextBtn) nextBtn.disabled = (this.currentPageIndex >= this.totalSheets);
  }
}

// Global AlbumBook instance
window.AlbumBook = AlbumBook;
