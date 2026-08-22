/**
 * =========================================================
 * 🐧 ULTRA-KAWAII CHIBI PENGUINS (100% BULLETPROOF & NO TEXT MIRRORING) 🐧
 * 4 Cute Waddling Chibi Helpers with Reliable Page-Pulling & Crisp Vietnamese Text
 * =========================================================
 */

class PenguinHelper {
  constructor(id, name, accessory, startX, startY, manager) {
    this.id = id;
    this.name = name;
    this.accessory = accessory;
    this.x = startX;
    this.y = startY;
    this.manager = manager;

    this.width = 64;
    this.height = 76;
    this.vx = (id % 2 === 0 ? 1 : -1) * (0.8 + Math.random() * 0.4);
    this.direction = this.vx >= 0 ? 1 : -1;
    this.state = 'WALKING'; // WALKING, IDLE, RUNNING_TO_PULL, PULLING, CELEBRATING

    this.targetX = null;
    this.targetY = null;
    this.homeY = startY;

    this.stateTimer = 0;
    this.idleDuration = 1500;
    this.sayTimer = null;
    this.pullProgress = 0;

    this.createDOM();
  }

  createDOM() {
    this.el = document.createElement('div');
    this.el.className = 'cute-penguin';
    this.el.id = `penguin-${this.id}`;

    let accessorySVG = '';
    if (this.accessory === 'bow') {
      accessorySVG = `
        <g class="acc-bow" transform="translate(30, 20)">
          <path d="M-10 -6 Q-18 -12 -18 0 Q-18 8 -8 2 Z" fill="#ff758c"/>
          <path d="M10 -6 Q18 -12 18 0 Q18 8 8 2 Z" fill="#ff758c"/>
          <circle cx="0" cy="0" r="4.5" fill="#ff4b72"/>
          <circle cx="0" cy="3.5" r="2.5" fill="#ffd700"/>
        </g>
      `;
    } else if (this.accessory === 'hat') {
      accessorySVG = `
        <g class="acc-hat" transform="translate(30, 9)">
          <polygon points="0,-16 -12,7 12,7" fill="url(#hat-grad-${this.id})"/>
          <circle cx="0" cy="-16" r="3.5" fill="#ffd700"/>
          <path d="M-8 0 Q0 6 8 0" stroke="#ffffff" stroke-width="2.5" fill="none"/>
          <path d="M-10 5 Q0 11 10 5" stroke="#ff758c" stroke-width="2" fill="none"/>
        </g>
      `;
    } else if (this.accessory === 'scarf') {
      accessorySVG = `
        <g class="acc-scarf" transform="translate(30, 40)">
          <path d="M-16 -3 Q0 5 16 -3 Q18 4 14 7 Q0 13 -14 7 Z" fill="#d4a373"/>
          <path d="M6 3 L9 17 L15 16 L12 2 Z" fill="#8d5b4c"/>
          <path d="M8 17 L15 16" stroke="#ffd700" stroke-width="1.8" stroke-dasharray="2 1"/>
        </g>
      `;
    } else {
      accessorySVG = `
        <g class="acc-crown" transform="translate(30, 10)">
          <polygon points="-12,6 -15,-6 -6,0 0,-10 6,0 15,-6 12,6" fill="#ffd700"/>
          <circle cx="-15" cy="-6" r="2" fill="#ff4b72"/>
          <circle cx="0" cy="-10" r="2.5" fill="#ff758c"/>
          <circle cx="15" cy="-6" r="2" fill="#ff4b72"/>
          <circle cx="0" cy="2" r="1.8" fill="#fff"/>
        </g>
      `;
    }

    this.el.innerHTML = `
      <div class="penguin-bubble hidden"></div>
      <div class="penguin-body-wrapper">
        <svg viewBox="0 0 60 72" class="penguin-svg">
          <defs>
            <radialGradient id="body-grad-${this.id}" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#4a3733"/>
              <stop offset="60%" stop-color="#34231f"/>
              <stop offset="100%" stop-color="#241613"/>
            </radialGradient>
            <radialGradient id="belly-grad-${this.id}" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="75%" stop-color="#fff5ed"/>
              <stop offset="100%" stop-color="#faebd7"/>
            </radialGradient>
            <linearGradient id="hat-grad-${this.id}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ff9a9e"/>
              <stop offset="100%" stop-color="#fecfef"/>
            </linearGradient>
            <filter id="blush-blur-${this.id}" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5"/>
            </filter>
          </defs>

          <!-- Shadow -->
          <ellipse cx="30" cy="68" rx="20" ry="4" fill="rgba(50,25,15,0.25)"/>
          
          <!-- Feet -->
          <g class="foot foot-left">
            <ellipse cx="21" cy="66" rx="7.5" ry="4" fill="#ff9f43"/>
            <circle cx="16" cy="65" r="2.5" fill="#ffa952"/>
            <circle cx="21" cy="65.5" r="2.5" fill="#ffa952"/>
          </g>
          <g class="foot foot-right">
            <ellipse cx="39" cy="66" rx="7.5" ry="4" fill="#ff9f43"/>
            <circle cx="39" cy="65.5" r="2.5" fill="#ffa952"/>
            <circle cx="44" cy="65" r="2.5" fill="#ffa952"/>
          </g>
          
          <!-- Main Body -->
          <path d="M30 14 C17 14 11 26 11 44 C11 58 19 66 30 66 C41 66 49 58 49 44 C49 26 43 14 30 14 Z" fill="url(#body-grad-${this.id})"/>
          
          <!-- Fluffy Belly -->
          <path d="M30 25 C21 25 17 34 17 46 C17 58 22 64 30 64 C38 64 43 58 43 46 C43 34 39 25 30 25 Z" fill="url(#belly-grad-${this.id})"/>
          
          <!-- Rosy Cheeks -->
          <ellipse cx="18" cy="38" rx="4.5" ry="3" fill="#ff758c" opacity="0.65" filter="url(#blush-blur-${this.id})"/>
          <ellipse cx="42" cy="38" rx="4.5" ry="3" fill="#ff758c" opacity="0.65" filter="url(#blush-blur-${this.id})"/>
          
          <!-- Big Kawaii Anime Eyes -->
          <g class="eye-group eye-left">
            <ellipse cx="22" cy="32" rx="3.8" ry="4.8" fill="#1b120f"/>
            <ellipse cx="23" cy="30.5" rx="1.8" ry="2.2" fill="#ffffff"/>
            <circle cx="20.8" cy="34.2" r="0.9" fill="#ffffff"/>
          </g>
          <g class="eye-group eye-right">
            <ellipse cx="38" cy="32" rx="3.8" ry="4.8" fill="#1b120f"/>
            <ellipse cx="39" cy="30.5" rx="1.8" ry="2.2" fill="#ffffff"/>
            <circle cx="36.8" cy="34.2" r="0.9" fill="#ffffff"/>
          </g>
          
          <!-- Beak -->
          <path d="M26 35 Q30 32 34 35 Q30 42 26 35 Z" fill="#ff9f43"/>
          <ellipse cx="30" cy="35" rx="3" ry="1.2" fill="#ffb775"/>
          
          <!-- Tiny Smile Line -->
          <path d="M28 38 Q30 40 32 38" stroke="#d35400" stroke-width="0.8" fill="none"/>
          
          <!-- Flippers -->
          <g class="flipper flipper-left">
            <path d="M12 36 Q5 44 8 52 Q12 55 14 44 Z" fill="#34231f"/>
          </g>
          <g class="flipper flipper-right">
            <path d="M48 36 Q55 44 52 52 Q48 55 46 44 Z" fill="#34231f"/>
          </g>
          
          <!-- Accessory -->
          ${accessorySVG}
        </svg>
      </div>
    `;

    this.bubbleEl = this.el.querySelector('.penguin-bubble');
    this.bodyWrapper = this.el.querySelector('.penguin-body-wrapper');

    // Click penguin interaction
    this.el.addEventListener('click', (e) => {
      e.stopPropagation();
      const wishes = [
        "Chúc Khánh Linh sinh nhật vui vẻ! 🌸",
        "Mchouu lúc nào cũng xinh nhất! 💖",
        "Chúc chị Linh tuổi 19 thật rực rỡ! 🎂",
        "Luôn cười tươi và hạnh phúc nha! ✨"
      ];
      this.cheer(wishes[Math.floor(Math.random() * wishes.length)]);
      if (window.audioManager) window.audioManager.playPopSFX();
      if (window.particleEngine) {
        window.particleEngine.triggerConfetti(15, this.x + 30, this.y);
      }
    });

    const container = document.getElementById('penguins-container');
    if (container) container.appendChild(this.el);
  }

  say(text, duration = 2200) {
    if (!this.bubbleEl) return;
    this.bubbleEl.innerText = text;
    this.bubbleEl.classList.remove('hidden');
    this.bubbleEl.classList.add('pop-in');

    if (this.sayTimer) clearTimeout(this.sayTimer);
    this.sayTimer = setTimeout(() => {
      if (this.bubbleEl) {
        this.bubbleEl.classList.remove('pop-in');
        this.bubbleEl.classList.add('hidden');
      }
    }, duration);
  }

  cheer(msg = "Yay! ✨") {
    this.state = 'CELEBRATING';
    this.stateTimer = 0;
    this.el.classList.add('celebrating');
    this.say(msg);
  }

  update(dt, screenW, screenH) {
    this.stateTimer += dt;

    if (this.state === 'WALKING') {
      const minX = 15;
      const maxX = screenW - this.width - 15;

      this.x += this.vx;

      if (this.x <= minX) {
        this.x = minX;
        this.vx = Math.abs(this.vx);
        this.direction = 1;
      } else if (this.x >= maxX) {
        this.x = maxX;
        this.vx = -Math.abs(this.vx);
        this.direction = -1;
      }

      if (Math.random() < 0.005) {
        this.state = 'IDLE';
        this.stateTimer = 0;
        this.idleDuration = Math.random() * 1500 + 800;
        this.el.classList.remove('walking');
      } else {
        this.el.classList.add('walking');
      }

    } else if (this.state === 'IDLE') {
      if (this.stateTimer >= this.idleDuration) {
        this.state = 'WALKING';
        this.stateTimer = 0;
        this.vx = (Math.random() > 0.5 ? 1 : -1) * (0.8 + Math.random() * 0.4);
        this.direction = this.vx >= 0 ? 1 : -1;
      }

    } else if (this.state === 'RUNNING_TO_PULL') {
      this.el.classList.add('running');
      this.el.classList.remove('walking');

      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      this.direction = dx >= 0 ? 1 : -1;

      // Reach destination or safety timeout (500ms)
      if (dist < 25 || this.stateTimer > 500) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.startPulling();
      } else {
        const speed = 14.0; // Very fast & responsive dash
        this.x += (dx / dist) * speed;
        this.y += (dy / dist) * speed;
      }

    } else if (this.state === 'PULLING') {
      if (this.pullProgress !== undefined) {
        this.x = this.pullStartX + (this.pullEndX - this.pullStartX) * this.pullProgress;
        this.y = this.pullStartY + Math.sin(this.pullProgress * Math.PI) * -16;
      }
      if (this.stateTimer > 750) {
        this.finishPulling();
      }

    } else if (this.state === 'CELEBRATING') {
      if (this.stateTimer > 1300) {
        this.el.classList.remove('celebrating');
        this.state = 'WALKING';
        this.stateTimer = 0;
        this.y = this.homeY;
      }
    }

    this.render();
  }

  render() {
    // Position outer element without scaleX so speech bubble is NEVER mirrored!
    if (this.el && this.el.style) {
      this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
    }

    // Scale only body wrapper so character faces walking direction
    if (this.bodyWrapper && this.bodyWrapper.style) {
      this.bodyWrapper.style.transform = `scaleX(${this.direction})`;
    }
  }

  assignToPullPage(targetX, targetY, endX, endY, onArrived, onComplete) {
    this.state = 'RUNNING_TO_PULL';
    this.stateTimer = 0;
    this.targetX = targetX;
    this.targetY = targetY;
    this.pullStartX = targetX;
    this.pullStartY = targetY;
    this.pullEndX = endX;
    this.pullEndY = endY;
    this.onArrivedToPull = onArrived;
    this.onPullComplete = onComplete;
    this.pullProgress = 0;
  }

  startPulling() {
    this.state = 'PULLING';
    this.stateTimer = 0;
    this.el.classList.remove('running');
    this.el.classList.add('pulling');

    if (this.onArrivedToPull) {
      const cb = this.onArrivedToPull;
      this.onArrivedToPull = null;
      cb();
    }

    const startTime = Date.now();
    const duration = 650;

    const pullStep = () => {
      if (this.state !== 'PULLING') return;
      const elapsed = Date.now() - startTime;
      this.pullProgress = Math.min(1, elapsed / duration);

      if (this.pullProgress < 1) {
        requestAnimationFrame(pullStep);
      } else {
        this.finishPulling();
      }
    };

    requestAnimationFrame(pullStep);
  }

  finishPulling() {
    this.el.classList.remove('pulling');
    this.state = 'CELEBRATING';
    this.stateTimer = 0;
    this.el.classList.add('celebrating');

    if (this.onPullComplete) {
      const cb = this.onPullComplete;
      this.onPullComplete = null;
      cb();
    }

    this.targetX = null;
    this.targetY = null;
    this.y = this.homeY;
  }
}

// =========================================================
// 🐧 PENGUIN MANAGER (ZERO FREEZE GUARANTEE)
// =========================================================
class PenguinManager {
  constructor() {
    this.container = document.getElementById('penguins-container');
    this.penguins = [];
    this.isBusy = false;
    this.init();
  }

  init() {
    if (!this.container) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w <= 600;
    const floorY = h - (isMobile ? 54 : 85);

    const configs = [
      { id: 1, name: "Poby Bé Nơ", acc: "bow", x: w * 0.10, y: floorY },
      { id: 2, name: "Bibi Mũ Tiệc", acc: "hat", x: w * 0.35, y: floorY },
      { id: 3, name: "Mimi Khăn Ấm", acc: "scarf", x: w * 0.65, y: floorY },
      { id: 4, name: "Lili Vương Miện", acc: "crown", x: w * 0.88, y: floorY }
    ];

    this.penguins = configs.map(c => new PenguinHelper(c.id, c.name, c.acc, c.x, c.y, this));

    this.lastTime = performance.now();
    this.loop();

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    const isMobile = window.innerWidth <= 600;
    const floorY = window.innerHeight - (isMobile ? 54 : 85);
    this.penguins.forEach(p => {
      p.homeY = floorY;
      p.width = isMobile ? 44 : 64;
      p.height = isMobile ? 54 : 76;
      if (p.state === 'WALKING' || p.state === 'IDLE' || p.state === 'CELEBRATING') {
        p.y = floorY;
      }
    });
  }

  loop(currentTime = performance.now()) {
    const dt = Math.min(64, currentTime - this.lastTime);
    this.lastTime = currentTime;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    this.penguins.forEach(p => p.update(dt, screenW, screenH));

    requestAnimationFrame((t) => this.loop(t));
  }

  // 🌟 RELIABLE PAGE FLIP: Always triggers flip, never hangs
  requestPageFlip(direction, performFlipCallback) {
    let triggered = false;
    const safeFlip = () => {
      if (!triggered) {
        triggered = true;
        performFlipCallback();
      }
    };

    // If another flip is currently animating, execute flip immediately
    if (this.isBusy) {
      safeFlip();
      return;
    }

    const container = document.getElementById('book-container') || document.getElementById('album-book');
    if (!container) {
      safeFlip();
      return;
    }

    const rect = container.getBoundingClientRect();
    let startX, startY, endX, endY;

    if (direction === 'next') {
      startX = Math.min(window.innerWidth - 70, rect.right - 20);
      startY = Math.max(80, rect.bottom - 45);
      endX = Math.max(20, rect.left + 25);
      endY = startY;
    } else {
      startX = Math.max(20, rect.left + 20);
      startY = Math.max(80, rect.bottom - 45);
      endX = Math.min(window.innerWidth - 70, rect.right - 25);
      endY = startY;
    }

    // Pick closest penguin
    let nearestPenguin = null;
    let minDist = Infinity;

    this.penguins.forEach(p => {
      const d = Math.abs(p.x - startX);
      if (d < minDist) {
        minDist = d;
        nearestPenguin = p;
      }
    });

    if (!nearestPenguin) {
      nearestPenguin = this.penguins[0];
    }

    this.isBusy = true;

    // Hard fallback timer (max 450ms wait for penguin arrival)
    const watchdog = setTimeout(() => {
      safeFlip();
      this.isBusy = false;
    }, 450);

    nearestPenguin.assignToPullPage(
      startX,
      startY,
      endX,
      endY,
      () => {
        clearTimeout(watchdog);
        safeFlip();
      },
      () => {
        this.isBusy = false;
      }
    );
  }

  // 💬 NGẪU NHIÊN LỜI THOẠI DỄ THƯƠNG KHI CHUYỂN TRANG
  triggerPageFlipDialogue(direction = 'next', pageIndex = 0) {
    if (!this.penguins || this.penguins.length === 0) return;

    // Chọn ngẫu nhiên 1 chú chim cánh cụt
    const p = this.penguins[Math.floor(Math.random() * this.penguins.length)];
    if (!p) return;

    let quote = "";

    // Lời thoại theo trang đặc biệt
    if (pageIndex === 0) {
      const coverQuotes = [
        "Chào mừng chị Linh đến với Album Kỷ Niệm! ✨📖",
        "Mở trang đầu tiên ra xem ảnh xinh nha chị! 💖",
        "Happy 19th Birthday Khánh Linh! 🎂✨"
      ];
      quote = coverQuotes[Math.floor(Math.random() * coverQuotes.length)];
    } else if (pageIndex === 33) {
      const cakeQuotes = [
        "Sắp tới giờ thổi nến ước nguyện rùi nè chị Linh! 🎂🕯️",
        "Bánh kem ngọt ngào dành riêng cho Mchouu nè! 🎂✨",
        "Ước một điều ước thật đẹp nha chị Linh ơii! 💖"
      ];
      quote = cakeQuotes[Math.floor(Math.random() * cakeQuotes.length)];
    } else if (pageIndex >= 34) {
      const backQuotes = [
        "Hành trình yêu thương sẽ còn viết tiếp mãi! 💖✨",
        "Forever & Always with Mchouu! 🤎",
        "Nhấn 'Xem Lại' để cùng ngắm lại từ đầu nha! 🔄✨"
      ];
      quote = backQuotes[Math.floor(Math.random() * backQuotes.length)];
    } else if (direction === 'prev') {
      const prevQuotes = [
        "Xem lại trang trước nha chị! 🔄",
        "Trang hồi nãy đẹp quá đúng hơm! 💖",
        "Để tụi em lật lùi lại nè! 🐧✨",
        "Kỷ niệm nào cũng muốn ngắm mãi thui! 🌸",
        "Ngắm lại nụ cười ngọt ngào của Mchouu nà! 🤎",
        "Lùi lại xem cho kỹ nha chị ơii! 🌟",
        "Quay lại ngắm ảnh xinh của chị Linh nè! 📸",
        "Trang nào cũng muốn lưu giữ mãi thôi! 🍂"
      ];
      quote = prevQuotes[Math.floor(Math.random() * prevQuotes.length)];
    } else {
      const nextQuotes = [
        "Xem trang tiếp theo thôii! ✨",
        "Chị Linh trang này xinh xỉu! 💖",
        "Kỷ niệm này ngọt ngào quá nè! 🌸",
        "Oa, khoảnh khắc đáng yêu ghê! 🐧✨",
        "Để tụi em lật tiếp cho chị xem nha! 💨",
        "Mỗi trang đều là một điều kỳ diệu! 🌟",
        "Chị Mchouu lúc nào cũng rạng rỡ! 🤎",
        "Khoảnh khắc này dễ thương quá chừng! 🌷",
        "Tình yêu đong đầy từng trang sách luôn! 💕",
        "Lật tiếp để xem bất ngờ phía sau nàoo! 🎁",
        "Góc này chị Linh cười xinh lắm á! 📸",
        "Trang này kỷ niệm đáng nhớ ghê! 🍂",
        "Cùng đi tiếp hành trình yêu thương nha! ✨",
        "Chị Linh tuổi 19 mãi hạnh phúc nhé! 🎂",
        "Em thích ngắm nụ cười của chị Linh nhất! 💖",
        "Xinh đẹp tuyệt vời luôn chị ơii! 👑",
        "Trang nào của Mchouu cũng lung linh hết á! ✨",
        "Trang tiếp theo có điều bất ngờ nè! 🌈",
        "Càng xem càng thấy yêu chị Linh hơn! 🥰",
        "Bé cánh cụt mê chị Linh nhất trần đời! 🐧💕"
      ];
      quote = nextQuotes[Math.floor(Math.random() * nextQuotes.length)];
    }

    p.say(quote, 2800);
  }
}

// Global Export
window.PenguinHelper = PenguinHelper;
window.PenguinManager = PenguinManager;

// Global instance
window.addEventListener('DOMContentLoaded', () => {
  window.penguinManager = new PenguinManager();
});
