/**
 * =========================================================
 * ✨ PARTICLES & FIREWORKS ENGINE ✨
 * Ambient Floating Hearts, Petals, Sparkles & Fireworks
 * =========================================================
 */

class ParticleEngine {
  constructor() {
    this.ambientCanvas = document.getElementById('particles-canvas');
    this.fireworksCanvas = document.getElementById('fireworks-canvas');
    
    if (this.ambientCanvas) {
      this.ctx = this.ambientCanvas.getContext('2d');
    }
    if (this.fireworksCanvas) {
      this.fCtx = this.fireworksCanvas.getContext('2d');
    }

    this.particles = [];
    this.fireworks = [];
    this.confetti = [];
    this.cursorTrails = [];
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Create initial ambient particles
    this.createAmbientParticles(45);
    
    // Setup mouse/touch cursor particle trail
    this.setupCursorEvents();
    
    // Start animation loop
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    if (this.ambientCanvas) {
      this.ambientCanvas.width = this.width;
      this.ambientCanvas.height = this.height;
    }
    if (this.fireworksCanvas) {
      this.fireworksCanvas.width = this.width;
      this.fireworksCanvas.height = this.height;
    }
  }

  createAmbientParticles(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push(this.generateParticle(true));
    }
  }

  generateParticle(randomY = false) {
    const types = ['heart', 'petal', 'sparkle', 'star'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : this.height + 20,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.6 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayWidth: Math.random() * 1.5 + 0.5,
      type: type,
      color: this.getRandomColor(type)
    };
  }

  getRandomColor(type) {
    if (type === 'heart') {
      const colors = ['#ff758c', '#ff7eb3', '#ff8da1', '#ff5376', '#fbc2eb', '#ff4b72'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    if (type === 'petal') {
      const colors = ['#ffd1dc', '#ffb7c5', '#ffc0cb', '#f8bbd0'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    const sparkles = ['#fff6a9', '#ffffff', '#ffd700', '#ffe4e1'];
    return sparkles[Math.floor(Math.random() * sparkles.length)];
  }

  setupCursorEvents() {
    let lastTime = 0;
    const addTrail = (x, y) => {
      const now = Date.now();
      if (now - lastTime < 30) return; // Throttling
      lastTime = now;
      
      for (let i = 0; i < 2; i++) {
        this.cursorTrails.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          size: Math.random() * 8 + 4,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
          decay: Math.random() * 0.03 + 0.02,
          type: Math.random() > 0.4 ? 'heart' : 'sparkle',
          color: Math.random() > 0.5 ? '#ff758c' : '#ffd700'
        });
      }
    };

    window.addEventListener('mousemove', (e) => addTrail(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        addTrail(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
  }

  drawHeart(ctx, x, y, size, color, opacity, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // Left curve
    ctx.bezierCurveTo(
      -size / 2, -topCurveHeight,
      -size, size / 3,
      0, size
    );
    // Right curve
    ctx.bezierCurveTo(
      size, size / 3,
      size / 2, -topCurveHeight,
      0, topCurveHeight
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawPetal(ctx, x, y, size, color, opacity, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.4, size * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawSparkle(ctx, x, y, size, color, opacity, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.lineTo(0, -size);
      ctx.lineTo(size * 0.25, -size * 0.25);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // ==========================================
  // 🎆 FIREWORKS & CONFETTI TRIGGERS
  // ==========================================
  triggerConfetti(count = 70, originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
    const colors = ['#ff4081', '#ff758c', '#ffd700', '#00e5ff', '#b388ff', '#76ff03', '#ff9100'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.confetti.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        gravity: 0.18,
        friction: 0.96,
        life: 1,
        decay: Math.random() * 0.015 + 0.008
      });
    }
  }

  triggerFireworks(startX = null, startY = null) {
    const x = startX || (Math.random() * (this.width * 0.7) + this.width * 0.15);
    const targetY = startY || (Math.random() * (this.height * 0.4) + this.height * 0.15);
    
    const colors = ['#ff4b72', '#ffd700', '#00e5ff', '#ff61d2', '#a0e7e5', '#b4f8c8', '#fbe7c6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Create explosion particles at target
    const particleCount = 60;
    const isHeartShape = Math.random() > 0.4;
    
    for (let i = 0; i < particleCount; i++) {
      let vx, vy;
      if (isHeartShape) {
        // Heart shape parametric formula
        const t = (Math.PI * 2 / particleCount) * i;
        const scale = (Math.random() * 0.4 + 0.8) * 4;
        vx = scale * (16 * Math.pow(Math.sin(t), 3)) / 12;
        vy = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 12;
      } else {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
      }
      
      this.fireworks.push({
        x: x,
        y: targetY,
        vx: vx,
        vy: vy,
        size: Math.random() * 3 + 2,
        color: color,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.012,
        gravity: 0.06,
        trail: []
      });
    }
  }

  triggerGrandCelebration(durationMs = 4000) {
    const startTime = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - startTime > durationMs) {
        clearInterval(interval);
        return;
      }
      this.triggerFireworks();
      this.triggerConfetti(25, Math.random() * this.width, Math.random() * this.height * 0.5);
    }, 350);
  }

  // ==========================================
  // 🔄 ANIMATION LOOP
  // ==========================================
  animate() {
    requestAnimationFrame(() => this.animate());
    
    // --- 1. Draw Ambient Particles ---
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.y -= p.speedY;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * p.swayWidth + p.speedX;
        p.rotation += p.rotationSpeed;
        
        if (p.type === 'heart') {
          this.drawHeart(this.ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.type === 'petal') {
          this.drawPetal(this.ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else {
          this.drawSparkle(this.ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        }
        
        // Reset when out of top screen
        if (p.y < -30) {
          this.particles[i] = this.generateParticle(false);
        }
      }
      
      // Draw cursor trails
      for (let i = this.cursorTrails.length - 1; i >= 0; i--) {
        const t = this.cursorTrails[i];
        t.x += t.speedX;
        t.y += t.speedY;
        t.life -= t.decay;
        
        if (t.life <= 0) {
          this.cursorTrails.splice(i, 1);
          continue;
        }
        
        if (t.type === 'heart') {
          this.drawHeart(this.ctx, t.x, t.y, t.size * t.life, t.color, t.life);
        } else {
          this.drawSparkle(this.ctx, t.x, t.y, t.size * t.life, t.color, t.life);
        }
      }
    }
    
    // --- 2. Draw Fireworks & Confetti Canvas ---
    if (this.fCtx) {
      this.fCtx.clearRect(0, 0, this.width, this.height);
      
      // Fireworks particles
      for (let i = this.fireworks.length - 1; i >= 0; i--) {
        const fw = this.fireworks[i];
        fw.x += fw.vx;
        fw.y += fw.vy;
        fw.vy += fw.gravity;
        fw.alpha -= fw.decay;
        
        if (fw.alpha <= 0) {
          this.fireworks.splice(i, 1);
          continue;
        }
        
        this.fCtx.save();
        this.fCtx.globalAlpha = fw.alpha;
        this.fCtx.fillStyle = fw.color;
        this.fCtx.shadowBlur = 8;
        this.fCtx.shadowColor = fw.color;
        this.fCtx.beginPath();
        this.fCtx.arc(fw.x, fw.y, fw.size, 0, Math.PI * 2);
        this.fCtx.fill();
        this.fCtx.restore();
      }
      
      // Confetti pieces
      for (let i = this.confetti.length - 1; i >= 0; i--) {
        const c = this.confetti[i];
        c.x += c.vx;
        c.y += c.vy;
        c.vx *= c.friction;
        c.vy += c.gravity;
        c.rotation += c.rotSpeed;
        c.life -= c.decay;
        
        if (c.life <= 0 || c.y > this.height + 50) {
          this.confetti.splice(i, 1);
          continue;
        }
        
        this.fCtx.save();
        this.fCtx.translate(c.x, c.y);
        this.fCtx.rotate(c.rotation);
        this.fCtx.globalAlpha = Math.min(1, c.life * 1.5);
        this.fCtx.fillStyle = c.color;
        this.fCtx.fillRect(-c.size / 2, -c.size / 3, c.size, c.size * 0.6);
        this.fCtx.restore();
      }
    }
  }
}

// Instantiate engine when script loads
window.particleEngine = new ParticleEngine();
