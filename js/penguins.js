/**
 * =========================================================
 * 🐧 CUTE PENGUIN HELPERS ENGINE 🐧
 * 4 Autonomous Waddling Penguins with Page-Pulling Mechanics
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
    
    this.width = 65;
    this.height = 75;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.direction = this.vx >= 0 ? 1 : -1; // 1 = right, -1 = left
    this.state = 'WALKING'; // WALKING, IDLE, RUNNING_TO_PULL, PULLING, CELEBRATING
    
    this.targetX = null;
    this.targetY = null;
    this.homeY = startY;
    
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
      accessorySVG = `
        <g class="acc-bow">
          <path d="M26 18 L18 12 L18 24 Z" fill="#ff758c"/>
          <path d="M34 18 L42 12 L42 24 Z" fill="#ff758c"/>
          <circle cx="30" cy="18" r="4" fill="#ff4b72"/>
        </g>
      `;
    } else if (this.accessory === 'hat') {
      accessorySVG = `
        <g class="acc-hat">
          <polygon points="30,2 20,20 40,20" fill="#ffd700"/>
          <circle cx="30" cy="2" r="3" fill="#ff758c"/>
          <path d="M22 14 L38 14" stroke="#ff5376" stroke-width="2"/>
        </g>
      `;
    } else if (this.accessory === 'scarf') {
      accessorySVG = `
        <g class="acc-scarf">
          <path d="M18 36 Q30 42 42 36 Q44 42 40 46 Q30 50 18 42 Z" fill="#d4a373"/>
          <path d="M34 42 L36 56 L42 54 L39 40 Z" fill="#8d5b4c"/>
        </g>
      `;
    } else {
      accessorySVG = `
        <g class="acc-star">
          <polygon points="30,12 32,17 38,17 33,21 35,26 30,23 25,26 27,21 22,17 28,17" fill="#ffd700"/>
        </g>
      `;
    }

    this.el.innerHTML = `
      <div class="penguin-bubble hidden"></div>
      <div class="penguin-body-wrapper">
        <svg viewBox="0 0 60 70" class="penguin-svg">
          <!-- Shadow -->
          <ellipse cx="30" cy="67" rx="20" ry="4" fill="rgba(60,30,20,0.2)"/>
          
          <!-- Feet -->
          <ellipse class="foot foot-left" cx="22" cy="65" rx="8" ry="4" fill="#ff9f43"/>
          <ellipse class="foot foot-right" cx="38" cy="65" rx="8" ry="4" fill="#ff9f43"/>
          
          <!-- Outer Body -->
          <ellipse cx="30" cy="38" rx="22" ry="26" fill="#3e2723"/>
          
          <!-- White Belly -->
          <ellipse cx="30" cy="42" rx="16" ry="20" fill="#fffdfa"/>
          
          <!-- Blushing Cheeks -->
          <circle cx="19" cy="32" r="4" fill="rgba(255, 117, 140, 0.45)"/>
          <circle cx="41" cy="32" r="4" fill="rgba(255, 117, 140, 0.45)"/>
          
          <!-- Eyes -->
          <circle class="eye eye-left" cx="22" cy="26" r="3.5" fill="#111"/>
          <circle class="eye eye-right" cx="38" cy="26" r="3.5" fill="#111"/>
          <circle cx="23" cy="25" r="1.2" fill="#fff"/>
          <circle cx="39" cy="25" r="1.2" fill="#fff"/>
          
          <!-- Cute Beak -->
          <polygon class="beak" points="26,30 34,30 30,36" fill="#ff9f43"/>
          
          <!-- Wings / Flippers -->
          <g class="flipper flipper-left">
            <ellipse cx="10" cy="38" rx="5" ry="12" fill="#3e2723" transform="rotate(15 10 38)"/>
          </g>
          <g class="flipper flipper-right">
            <ellipse cx="50" cy="38" rx="5" ry="12" fill="#3e2723" transform="rotate(-15 50 38)"/>
          </g>
          
          <!-- Accessory -->
          ${accessorySVG}
        </svg>
      </div>
    `;

    this.bubbleEl = this.el.querySelector('.penguin-bubble');

    // Click penguin for cute bounce & heart burst
    this.el.addEventListener('click', (e) => {
      e.stopPropagation();
      this.cheer("Cháu chúc cô sinh nhật vui vẻ ạ! 💖");
      if (window.audioManager) window.audioManager.playPopSFX();
      if (window.particleEngine) {
        window.particleEngine.triggerConfetti(12, this.x + 30, this.y);
      }
    });

    const container = document.getElementById('penguins-container');
    if (container) container.appendChild(this.el);
  }

  say(text, duration = 2500) {
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
    }, 1800);
  }

  update(dt, screenW, screenH, bookRect) {
    if (this.state === 'WALKING') {
      this.walkTimer += dt;
      
      // Wander bounds (bottom area around screen)
      const minX = 20;
      const maxX = screenW - this.width - 20;
      
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
      
      // Randomly change speed or pause
      if (Math.random() < 0.005) {
        this.state = 'IDLE';
        this.idleTimer = Math.random() * 2000 + 1000;
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
      
      if (dist < 15) {
        // Reached target -> Start pulling!
        this.x = this.targetX;
        this.y = this.targetY;
        this.startPulling();
      } else {
        const speed = 7.5; // Fast run speed
        this.x += (dx / dist) * speed;
        this.y += (dy / dist) * speed;
      }
      
    } else if (this.state === 'PULLING') {
      // Moves with the page pull stroke
      if (this.pullProgress !== undefined) {
        this.x = this.pullStartX + (this.pullEndX - this.pullStartX) * this.pullProgress;
        this.y = this.pullStartY + Math.sin(this.pullProgress * Math.PI) * -20;
      }
    }

    // Apply Position & Direction to DOM
    this.render();
  }

  render() {
    this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scaleX(${this.direction})`;
  }

  // Action: Called by PenguinManager when a page flip is requested
  assignToPullPage(targetX, targetY, endX, endY, onArrived, onComplete) {
    this.state = 'RUNNING_TO_PULL';
    this.targetX = targetX;
    this.targetY = targetY;
    this.pullStartX = targetX;
    this.pullStartY = targetY;
    this.pullEndX = endX;
    this.pullEndY = endY;
    this.onArrivedToPull = onArrived;
    this.onPullComplete = onComplete;
    
    const phrases = ["Để em giúp lật trang! 🐧💨", "Em tới đâyyy! ✨", "Kéo trang sang nè! 💖", "Lật xem tiếp nàoo! 🌟"];
    this.say(phrases[Math.floor(Math.random() * phrases.length)], 1600);
  }

  startPulling() {
    this.state = 'PULLING';
    this.el.classList.remove('running');
    this.el.classList.add('pulling');
    
    if (this.onArrivedToPull) {
      this.onArrivedToPull();
    }
    
    // Animate pulling progress over 700ms (synced with CSS 3D page turn)
    const startTime = Date.now();
    const duration = 750;
    
    const pullStep = () => {
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
    this.cheer("Xong rồii! Đẹp quaaa 💖");
    
    if (this.onPullComplete) {
      this.onPullComplete();
    }
    
    // Run back to floor area
    setTimeout(() => {
      this.state = 'WALKING';
      this.targetX = null;
      this.targetY = null;
      this.y = this.homeY;
    }, 1200);
  }
}

// =========================================================
// 🐧 PENGUIN MANAGER (Coordinates the 4 helpers)
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
    const floorY = h - 90; // Bottom floor
    
    // Create 4 Cute Penguins
    const configs = [
      { id: 1, name: "Poby", acc: "bow", x: w * 0.12, y: floorY },
      { id: 2, name: "Bibi", acc: "hat", x: w * 0.32, y: floorY - 10 },
      { id: 3, name: "Mimi", acc: "scarf", x: w * 0.68, y: floorY - 8 },
      { id: 4, name: "Lili", acc: "star", x: w * 0.88, y: floorY }
    ];

    this.penguins = configs.map(c => new PenguinHelper(c.id, c.name, c.acc, c.x, c.y, this));
    
    // Start RAF loop
    this.lastTime = performance.now();
    this.loop();
    
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    const floorY = window.innerHeight - 90;
    this.penguins.forEach(p => {
      p.homeY = floorY;
      if (p.state === 'WALKING' || p.state === 'IDLE') {
        p.y = floorY;
      }
    });
  }

  loop(currentTime = performance.now()) {
    const dt = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    
    this.penguins.forEach(p => p.update(dt, screenW, screenH));
    
    requestAnimationFrame((t) => this.loop(t));
  }

  // 🌟 Trigger nearest penguin to run & pull the page
  requestPageFlip(direction, performFlipCallback) {
    if (this.isBusyPulling) {
      // If already pulling, perform direct flip immediately
      performFlipCallback();
      return;
    }
    
    const bookEl = document.getElementById('album-book');
    if (!bookEl) {
      performFlipCallback();
      return;
    }
    
    const rect = bookEl.getBoundingClientRect();
    
    // Target position: right edge for next page, left edge for prev page
    let startX, startY, endX, endY;
    
    if (direction === 'next') {
      startX = rect.right - 25;
      startY = rect.bottom - 40;
      endX = rect.left - 30;
      endY = startY;
    } else {
      startX = rect.left - 20;
      startY = rect.bottom - 40;
      endX = rect.right - 25;
      endY = startY;
    }
    
    // Find the closest available penguin
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
    
    if (!nearestPenguin) {
      nearestPenguin = this.penguins[0];
    }
    
    this.isBusyPulling = true;
    
    // Nearest penguin runs up and pulls the page!
    nearestPenguin.assignToPullPage(
      startX,
      startY,
      endX,
      endY,
      () => {
        // When penguin reaches the edge, trigger the actual 3D page flip!
        performFlipCallback();
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
