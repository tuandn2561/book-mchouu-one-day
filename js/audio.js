/**
 * =========================================================
 * 🎵 AUDIO & SOUND EFFECTS ENGINE 🎵
 * Background Music Player + Web Audio API Synthesizer & SFX
 * =========================================================
 */

class AudioManager {
  constructor() {
    this.playlist = (window.CONFIG && window.CONFIG.audio && window.CONFIG.audio.playlist) || [];
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = (window.CONFIG && window.CONFIG.audio && window.CONFIG.audio.defaultVolume) || 0.7;

    // HTML5 Audio
    this.audioElement = new Audio();
    this.audioElement.crossOrigin = "anonymous";
    this.audioElement.volume = this.volume;
    this.audioElement.loop = false;

    // Web Audio API context for synthesized SFX & fallback music box
    this.audioCtx = null;
    this.isSynthPlaying = false;
    this.synthNotesTimer = null;

    this.initAudioEvents();
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initAudioEvents() {
    this.audioElement.addEventListener('ended', () => {
      this.nextTrack();
    });

    this.audioElement.addEventListener('error', (e) => {
      console.warn("HTML5 audio playback error, falling back to Web Audio Music Box synthesizer:", e);
      if (this.isPlaying) {
        this.startMusicBoxSynthesizer();
      }
    });
  }

  play() {
    this.initContext();
    this.isPlaying = true;

    if (this.playlist.length > 0) {
      const track = this.playlist[this.currentTrackIndex];
      if (this.audioElement.src !== track.src) {
        this.audioElement.src = track.src;
      }

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("Autoplay was prevented or audio failed, using Web Audio synth:", err);
          this.startMusicBoxSynthesizer();
        });
      }
    } else {
      this.startMusicBoxSynthesizer();
    }

    this.updateUIState();
  }

  pause() {
    this.isPlaying = false;
    this.audioElement.pause();
    this.stopMusicBoxSynthesizer();
    this.updateUIState();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  nextTrack() {
    if (this.playlist.length === 0) return;
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.stopMusicBoxSynthesizer();
    if (this.isPlaying) {
      this.audioElement.src = this.playlist[this.currentTrackIndex].src;
      this.audioElement.play().catch(() => this.startMusicBoxSynthesizer());
    }
    this.updateUIState();
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    this.audioElement.volume = this.isMuted ? 0 : this.volume;
    if (this.synthMasterGain) {
      this.synthMasterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.4, this.audioCtx.currentTime);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioElement.volume = this.isMuted ? 0 : this.volume;
    if (this.synthMasterGain && this.audioCtx) {
      this.synthMasterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.4, this.audioCtx.currentTime);
    }
    this.updateUIState();
  }

  getCurrentTrackInfo() {
    if (this.isSynthPlaying) {
      return { title: "Happy Birthday Music Box 🎶", artist: "Dreamy Bell Melody" };
    }
    if (this.playlist.length > 0) {
      return this.playlist[this.currentTrackIndex];
    }
    return { title: "Romantic Melody 🎵", artist: "Piano Love" };
  }

  updateUIState() {
    const playBtn = document.getElementById('music-play-btn');
    const vinyl = document.getElementById('music-vinyl');
    const titleEl = document.getElementById('music-track-title');
    const artistEl = document.getElementById('music-track-artist');

    if (playBtn) {
      playBtn.innerHTML = this.isPlaying ? '⏸' : '▶';
      playBtn.setAttribute('title', this.isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc');
    }

    if (vinyl) {
      if (this.isPlaying) {
        vinyl.classList.add('spinning');
      } else {
        vinyl.classList.remove('spinning');
      }
    }

    const info = this.getCurrentTrackInfo();
    if (titleEl) titleEl.innerText = info.title;
    if (artistEl) artistEl.innerText = info.artist || "";
  }

  // =========================================================
  // 🎹 SYNTHESIZED MUSIC BOX (FAILSAFE ROMANTIC MELODY)
  // Plays "Happy Birthday" & Romantic chord progression in music box chime tone
  // =========================================================
  startMusicBoxSynthesizer() {
    if (this.isSynthPlaying) return;
    this.initContext();
    if (!this.audioCtx) return;

    this.isSynthPlaying = true;
    this.synthMasterGain = this.audioCtx.createGain();
    this.synthMasterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.35, this.audioCtx.currentTime);
    this.synthMasterGain.connect(this.audioCtx.destination);

    // Notes frequency table
    const N = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77, C6: 1046.50
    };

    // "Happy Birthday" + Sweet Lullaby melody sequence
    const melody = [
      { note: N.C4, dur: 0.35 }, { note: N.C4, dur: 0.25 }, { note: N.D4, dur: 0.6 }, { note: N.C4, dur: 0.6 }, { note: N.F4, dur: 0.6 }, { note: N.E4, dur: 1.1 },
      { note: N.C4, dur: 0.35 }, { note: N.C4, dur: 0.25 }, { note: N.D4, dur: 0.6 }, { note: N.C4, dur: 0.6 }, { note: N.G4, dur: 0.6 }, { note: N.F4, dur: 1.1 },
      { note: N.C4, dur: 0.35 }, { note: N.C4, dur: 0.25 }, { note: N.C5, dur: 0.6 }, { note: N.A4, dur: 0.6 }, { note: N.F4, dur: 0.6 }, { note: N.E4, dur: 0.6 }, { note: N.D4, dur: 1.0 },
      { note: N.B4, dur: 0.35 }, { note: N.B4, dur: 0.25 }, { note: N.A4, dur: 0.6 }, { note: N.F4, dur: 0.6 }, { note: N.G4, dur: 0.6 }, { note: N.F4, dur: 1.5 },
      // Lullaby bridge
      { note: N.A4, dur: 0.5 }, { note: N.C5, dur: 0.5 }, { note: N.E5, dur: 0.8 }, { note: N.D5, dur: 0.5 }, { note: N.C5, dur: 0.8 },
      { note: N.G4, dur: 0.5 }, { note: N.B4, dur: 0.5 }, { note: N.D5, dur: 0.8 }, { note: N.C5, dur: 0.5 }, { note: N.A4, dur: 1.2 }
    ];

    let step = 0;
    const playNextNote = () => {
      if (!this.isSynthPlaying || !this.audioCtx) return;
      const item = melody[step];

      this.playChimeNote(item.note, item.dur * 0.9);
      // Play soft bass accompaniment every 2 beats
      if (step % 2 === 0) {
        this.playChimeNote(item.note / 2, item.dur * 1.5, 0.4);
      }

      step = (step + 1) % melody.length;
      this.synthNotesTimer = setTimeout(playNextNote, item.dur * 700);
    };

    playNextNote();
  }

  stopMusicBoxSynthesizer() {
    this.isSynthPlaying = false;
    if (this.synthNotesTimer) {
      clearTimeout(this.synthNotesTimer);
      this.synthNotesTimer = null;
    }
  }

  playChimeNote(freq, duration = 0.5, volumeScale = 1.0) {
    if (!this.audioCtx || this.isMuted) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Warm chime tone (sine wave + gentle harmonic)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const noteVol = (this.volume * 0.25) * volumeScale;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(noteVol, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.3);

      osc.connect(gain);
      gain.connect(this.synthMasterGain || this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.35);
    } catch (e) { }
  }

  // =========================================================
  // 🔊 SOUND EFFECTS (SFX)
  // =========================================================
  playPageFlipSFX() {
    this.initContext();
    if (!this.audioCtx || this.isMuted) return;
    try {
      const now = this.audioCtx.currentTime;
      // White noise buffer for realistic paper whoosh sound
      const bufferSize = this.audioCtx.sampleRate * 0.18;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(350, now + 0.16);
      filter.Q.value = 2.5;

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.15, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      whiteNoise.start(now);
    } catch (e) { }
  }

  playCandleBlowSFX() {
    this.initContext();
    if (!this.audioCtx || this.isMuted) return;
    try {
      const now = this.audioCtx.currentTime;
      // 1. Wind puff (low pass noise)
      const bufferSize = this.audioCtx.sampleRate * 0.4;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.35);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.3, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);
      noise.start(now);

      // 2. Magic sparkle chime cascade
      const chimeNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      chimeNotes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChimeNote(freq, 0.4, 0.8);
        }, 150 + idx * 70);
      });
    } catch (e) { }
  }

  playPopSFX() {
    this.initContext();
    if (!this.audioCtx || this.isMuted) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(this.volume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) { }
  }
}

// Global Audio Manager instance
window.audioManager = new AudioManager();
