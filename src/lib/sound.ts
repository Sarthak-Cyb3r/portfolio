// Browser Web Audio API synthesizer for high-end SaaS micro-interactions.
// Zero external audio files required. Safe, lightweight, and respectful of user preferences.

const SOUND_PREF_KEY = "sarthak-portfolio-sound";

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(SOUND_PREF_KEY);
      // Default to true for rich SaaS feedback, but user can toggle anytime
      this.enabled = stored !== null ? stored === "true" : true;
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== "undefined") {
      localStorage.setItem(SOUND_PREF_KEY, String(val));
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.enabled);
    if (this.enabled) {
      this.playChime();
    }
    return this.enabled;
  }

  public vibrate(pattern: number | number[] = 10) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator && this.enabled) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  }

  public haptic(pattern: number | number[] = 12) {
    this.vibrate(pattern);
  }

  // Soft high-tech click
  public playClick(pitch = 1200) {
    this.vibrate(12);
    if (!this.enabled || typeof window === "undefined") return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // AudioContext policy catch
    }
  }

  // Futuristic blip for terminal / hover
  public playBlip(freq = 800) {
    if (!this.enabled || typeof window === "undefined") return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.setValueAtTime(freq * 1.25, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }

  // Pentatonic celebration chime for success / dice roll / test passes
  public playChime() {
    if (!this.enabled || typeof window === "undefined") return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime + i * 0.06);

        gain.gain.setValueAtTime(0, this.ctx!.currentTime + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.04, this.ctx!.currentTime + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + i * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + i * 0.06);
        osc.stop(this.ctx!.currentTime + i * 0.06 + 0.25);
      });
    } catch {
      // ignore
    }
  }

  // Ambient chords for Softify preview
  public playMelodyPreview(onTick?: (frequency: number) => void): () => void {
    if (typeof window === "undefined") return () => {};
    this.initCtx();
    if (!this.ctx) return () => {};

    const chords = [
      [261.63, 329.63, 392.0], // C
      [220.0, 261.63, 329.63], // Am
      [174.61, 220.0, 261.63], // F
      [196.0, 246.94, 293.66], // G
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (!this.ctx) return;
      const notes = chords[step % chords.length];
      notes.forEach((freq) => {
        try {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
          gain.gain.setValueAtTime(0.02, this.ctx!.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + 0.45);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start();
          osc.stop(this.ctx!.currentTime + 0.45);
        } catch {
          // ignore
        }
      });
      onTick?.(notes[1]);
      step++;
    }, 450);

    return () => clearInterval(interval);
  }
}

export const sound = new SoundManager();
