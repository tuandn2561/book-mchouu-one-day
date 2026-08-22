/**
 * =========================================================
 * 🐧 ULTRA-KAWAII CHIBI PENGUINS ENGINE (BUG-FREE & ROCK SOLID) 🐧
 * 4 Cute Waddling Chibi Penguins with Reliable Page-Pulling
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
    this.vx = (Math.random() - 0.5) * 1.4;
    if (Math.abs(this.vx) < 0.4) this.vx = 0.8;
    this.direction = this.vx >= 0 ? 1 : -1;
    this.state = 'WALKING'; // WALKING, IDLE, RUNNING_TO_PULL, PULLING, CELEBRATING
    
    this.targetX = null;
    this.targetY = null;
    this.homeY = startY;
    
    this.stateTimer = 0;
    this.walkTimer = 0;
    this.idleTimer = 0;
    
    this.createDOM();
  }

  createDOM() {
    this.el = document.createElement('div');
    this.el.className = 'cute-penguin';
    this.el.id = `penguin-${this.id}`;
    
    let accessorySVG = '';
    if (this.accessory === 'bow') {
      // Kawaii Pink Ribbon & Bell
      accessorySVG = `
        <g class="acc-bow" transform="translate(30, 20)">
          <path d="M-10 -6 Q-18 -12 -18 0 Q-18 8 -8 2 Z" fill="#ff758c"/>
          <path d="M10 -6 Q18 -12 18 0 Q18 8 8 2 Z" fill="#ff758c"/>
          <circle cx="0" cy="0" r="5" fill="#ff4b72"/>
          <circle cx="0" cy="4" r="3" fill="#ffd700"/>
        </g>
      `;
    } else if (this.accessory === 'hat') {
      // Sparkling Birthday Party Hat
      accessorySVG = `
        <g class="acc-hat" transform="translate(30, 8)">
          <polygon points="0,-16 -12,8 12,8" fill="url(#hat-grad-${this.id})"/>
          <circle cx="0" cy="-16" r="3.5" fill="#ffd700"/>
          <path d="M-8 0 Q0 6 8 0" stroke="#ffffff" stroke-width="2.5" fill="none"/>
          <path d="M-10 6 Q0 12 10 6" stroke="#ff758c" stroke-width="2" fill="none"/>
        </g>
      `;
    } else if (this.accessory === 'scarf') {
      // Cozy Knitted Scarf with Fringe
      accessorySVG = `
        <g class="acc-scarf" transform="translate(30, 40)">
          <path d="M-16 -3 Q0 5 16 -3 Q18 4 14 7 Q0 13 -14 7 Z" fill="#d4a373"/>
          <path d="M6 3 L9 18 L15 17 L12 2 Z" fill="#8d5b4c"/>
          <path d="M8 18 L15 17" stroke="#ffd700" stroke-width="2" stroke-dasharray="2 1"/>
        </g>
      `;
    } else {
      // Royal Cute Crown
      accessorySVG = `
        <g class="acc-crown" transform="translate(30, 10)">
          <polygon points="-12,6 -15,-6 -6,0 0,-10 6,0 15,-6 12,6" fill="#ffd700"/>
          <circle cx="-15" cy="-6" r="2" fill="#ff4b72"/>
          <circle cx="0" cy="-10" r="2.5" fill="#ff758c"/>
          <circle cx="15" cy="-6" r="2" fill="#ff4b72"/>
          <circle cx="0" cy="2" r="2" fill="#fff"/>
        </g>
      `;
    }

    this.el.innerHTML = `
      <div class="penguin-bubble hidden"></div>
      <div class="penguin-body-wrapper">
        <svg viewBox="0 0 60 72" class="penguin-svg">
          <defs>
            <!-- Smooth Gradients for Soft Kawaii Look -->
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

          <!-- Soft Drop Shadow on floor -->
          <ellipse cx="30" cy="68" rx="20" ry="4" fill="rgba(50,25,15,0.22)"/>
          
          <!-- Cute Chubby Feet -->
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
          
          <!-- Main Chubby Body (Egg Shape) -->
          <path d="M30 14 C17 14 11 26 11 44 C11 58 19 66 30 66 C41 66 49 58 49 44 C49 26 43 14 30 14 Z" fill="url(#body-grad-${this.id})"/>
          
          <!-- Fluffy Heart/Peach Belly -->
          <path d="M30 25 C21 25 17 34 17 46 C17 58 22 64 30 64 C38 64 43 58 43 46 C43 34 39 25 30 25 Z" fill="url(#belly-grad-${this.id})"/>
          
          <!-- Glowing Rosy Cheeks -->
          <ellipse cx="18" cy="38" rx="4.5" ry="3" fill="#ff758c" opacity="0.65" filter="url(#blush-blur-${this.id})"/>
          <ellipse cx="42" cy="38" rx="4.5" ry="3" fill="#ff758c" opacity="0.65" filter="url(#blush-blur-${this.id})"/>
          
          <!-- Big Kawaii Sparkling Eyes -->
          <g class="eye-group eye-left">
            <ellipse cx="22" cy="32" rx="3.8" ry="4.8" fill="#1b120f"/>
            <!-- Main Reflection -->
            <ellipse cx="23" cy="30.5" rx="1.8" ry="2.2" fill="#ffffff"/>
            <!-- Secondary Mini Twinkle -->
            <circle cx="20.8" cy="34.2" r="0.9" fill="#ffffff"/>
          </g>
          <g class="eye-group eye-right">
            <ellipse cx="38" cy="32" rx="3.8" ry="4.8" fill="#1b120f"/>
            <!-- Main Reflection -->
            <ellipse cx="39" cy="30.5" rx="1.8" ry="2.2" fill="#ffffff"/>
            <!-- Secondary Mini Twinkle -->
            <circle cx="36.8" cy="34.2" r="0.9" fill="#ffffff"/>
          </g>
          
          <!-- Chubby Sweet Beak -->
          <path d="M26 35 Q30 32 34 35 Q30 42 26 35 Z" fill="#ff9f43"/>
          <ellipse cx="30" cy="35" rx="3" ry="1.2" fill="#ffb775"/>
          
          <!-- Tiny Happy Mouth Line under Beak -->
          <path d="M28 38 Q30 40 32 38" stroke="#d35400" stroke-width="0.8" fill="none"/>
          
          <!-- Cute Flippers / Wings -->
          <g class="flipper flipper-left">
            <path d="M12 36 Q5 44 8 52 Q12 55 14 44 Z" fill="#34231f"/>
          </g>
          <g class="flipper flipper-right">
            <path d="M48 36 Q55 44 52 52 Q48 55 46 44 Z" fill="#34231f"/>
          </g>
          
          <!-- Special Accessory -->
          ${accessorySVG}
        </svg>
      </div>
    `;

    this.bubbleEl = this.el.querySelector('.penguin-bubble');

    // Click penguin for cute pop sound, speech & particle burst
    this.el.addEventListener('click', (e) => {
      e.stopPropagation();
      const wishes = [
        "Chúc Khánh Linh tuổi 19 thật rực rỡ! 🌸",
        "Mchouu lúc nào cũng cute nhất! 💖",
        "Chúc em sinh nhật ngập tràn hạnh phúc! 🎂",
        "Luôn luôn cười tươi như này nhé! ✨"
      ];
      this.cheer(wishes[Math.floor(Math.random() * wishes.length)]);
      if (window.audioManager) window.audioManager.playPopSFX();
      if (window.particleEngine) {
        window.particleEngine.triggerConfetti(14, this.x + 30, this.y);
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
    
    if (this.sayTimeout) clearTimeout(this.sayTimeout);
    this.sayTimeout = setTimeout(() => {
      this.bubbleEl.classList.remove('pop-in');
      this.bubbleEl.classList.add('hidden');
    }, duration);
  }

  cheer(msg = "Yay! ✨") {
    this.state = 'CELEBRATING';
    this.el.classList.add('celebrating');
    this.say(msg);
    setTimeout(() => {
      this.el.classList.remove('celebrating');
      this.state = 'WALKING';
    }, 1600);
  }

  update(dt, screenW, screenH) {
    this.stateTimer += dt;

    if (this.state === 'WALKING') {
      this.walkTimer += dt;
      
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
      
      if (Math.random() < 0.006) {
        this.state = 'IDLE';
        this.idleTimer = Math.random() * 1800 + 800;
        this.el.classList.remove('walking');
      } else {
        this.el.classList.add('walking');
      }
      
    } else if (this.state === 'IDLE') {
      this.idleTimer -= dt;
      if (this.idleTimer <= 0) {
        this.state = 'WALKING';
        this.vx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.8 + 0.8);
        this.direction = this.vx >= 0 ? 1 : -1;
      }
      
    } else if (this.state === 'RUNNING_TO_PULL') {
      this.el.classList.add('running');
      this.el.classList.remove('walking');
      
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      this.direction = dx >= 0 ? 1 : -1;
      
      // Safety timeout: If running takes > 700ms, force start pulling
      if (dist < 20 || this.stateTimer > 700) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.startPulling();
      } else {
        const speed = 11.0; // Fast and snappy run speed
        this.x += (dx / dist) * speed;
        this.y += (dy / dist) * speed;
      }
      
    } else if (this.state === 'PULLING') {
      if (this.pullProgress !== undefined) {
        this.x = this.pullStartX + (this.pullEndX - this.pullStartX) * this.pullProgress;
        this.y = this.pullStartY + Math.sin(this.pullProgress * Math.PI) * -18;
      }
      // Safety timeout: If pulling takes > 850ms, force finish
      if (this.stateTimer > 850) {
        this.finishPulling();
      }
    }

    this.render();
  }

  render() {
    this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scaleX(${this.direction})`;
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
    
    const phrases = ["Để em kéo trang nàoo! 🐧💨", "Em tới giúp chị Linh! ✨", "Kéo sang trang mới nè! 💖", "Lật tiếp nàoo! 🌟"];
    this.say(phrases[Math.floor(Math.random() * phrases.length)], 1500);
  }

  startPulling() {
    this.state = 'PULLING';
    this.stateTimer = 0;
    this.el.classList.remove('running');
    this.el.classList.add('pulling');
    
    if (this.onArrivedToPull) {
      this.onArrivedToPull();
      this.onArrivedToPull = null; // Prevent double invoke
    }
    
    const startTime = Date.now();
    const duration = 700;
    
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
    if (this.state !== 'PULLING' && this.state !== 'RUNNING_TO_PULL') return;
    
    this.el.classList.remove('pulling');
    this.state = 'CELEBRATING';
    this.cheer("Xong rồii! Siêu đẹp lun 💖");
    
    if (this.onPullComplete) {
      this.onPullComplete();
      this.onPullComplete = null;
    }
    
    setTimeout(() => {
      this.state = 'WALKING';
      this.targetX = null;
      this.targetY = null;
      this.y = this.homeY;
      this.el.classList.remove('celebrating');
    }, 1200);
  }
}

// =========================================================
// 🐧 PENGUIN MANAGER (FAIL-SAFE & NEVER FREEZES)
// =========================================================
class PenguinManager {
  constructor() {
    this.container = document.getElementById('penguins-container');
    this.penguins = [];
    this.isBusyPulling = false;
    
    this.init();
  }

  init() {
    if (!this.container) return;
    
    const w = window.innerWidth;
    const h = window.innerHeight;
    const floorY = h - 85;
    
    // 4 Cute Chibi Characters
    const configs = [
      { id: 1, name: "Poby Bé Nơ", acc: "bow", x: w * 0.12, y: floorY },
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
    const floorY = window.innerHeight - 85;
    this.penguins.forEach(p => {
      p.homeY = floorY;
      if (p.state === 'WALKING' || p.state === 'IDLE') {
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

  // 🌟 ROCK-SOLID PAGE FLIP DISPATCH (WITH WATCHDOG) 🌟
  requestPageFlip(direction, performFlipCallback) {
    // If already pulling, immediately perform flip to avoid any freeze
    if (this.isBusyPulling) {
      performFlipCallback();
      return;
    }
    
    const bookEl = document.getElementById('album-book');
    if (!bookEl) {
      performFlipCallback();
      return;
    }
    
    const rect = bookEl.getBoundingClientRect();
    let startX, startY, endX, endY;
    
    if (direction === 'next') {
      startX = Math.min(window.innerWidth - 70, rect.right - 20);
      startY = Math.max(100, rect.bottom - 45);
      endX = Math.max(20, rect.left - 25);
      endY = startY;
    } else {
      startX = Math.max(20, rect.left - 20);
      startY = Math.max(100, rect.bottom - 45);
      endX = Math.min(window.innerWidth - 70, rect.right - 20);
      endY = startY;
    }
    
    // Find closest penguin
    let nearestPenguin = null;
    let minDist = Infinity;
    
    this.penguins.forEach(p => {
      if (p.state === 'WALKING' || p.state === 'IDLE') {
        const d = Math.abs(p.x - startX);
        if (d < minDist) {
          minDist = d;
          nearestPenguin = p;
        }
      }
    });
    
    // If all are busy, pick first penguin and force state
    if (!nearestPenguin) {
      nearestPenguin = this.penguins[0];
      nearestPenguin.state = 'WALKING';
    }
    
    this.isBusyPulling = true;
    let hasTriggeredFlip = false;
    
    const safeTriggerFlip = () => {
      if (!hasTriggeredFlip) {
        hasTriggeredFlip = true;
        performFlipCallback();
      }
    };

    // 🛡️ WATCHDOG TIMER: Guarantees flip NEVER gets stuck under any circumstance!
    const watchdogTimer = setTimeout(() => {
      safeTriggerFlip();
      this.isBusyPulling = false;
    }, 700);
    
    nearestPenguin.assignToPullPage(
      startX,
      startY,
      endX,
      endY,
      () => {
        clearTimeout(watchdogTimer);
        safeTriggerFlip();
      },
      () => {
        this.isBusyPulling = false;
      }
    );
  }
}

// Global instance initialized on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.penguinManager = new PenguinManager();
});
