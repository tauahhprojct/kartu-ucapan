/**
 * Default track: user-provided orchestra version of the Bleachers song below.
 * "Bleachers — Merry Christmas, Please Don't Call"
 * Key: D Major | Tempo: 112 BPM | Chords: D - D/F# - Bm - G (- A)
 * Visitors can still load a different local audio file (.mp3/.m4a/.wav).
 */

export interface SynthBar {
  chordName: string;
  bassFreq: number;
  chordFreqs: number[];
  /** 8 eighth-note melody steps per bar (null = rest) */
  melody: Array<number | null>;
}

export const MUSIC_TRACK_TITLE = 'Bleachers — Merry Christmas, Please Don\'t Call';
export const MUSIC_TRACK_BPM = 112;
const DEFAULT_AUDIO_SRC = '/bleachers-merry-christmas-please-dont-call.mp3';
const DEFAULT_AUDIO_LABEL = `${MUSIC_TRACK_TITLE} (Orchestra Version)`;

export const BLEACHERS_TRIBUTE_PROGRESSION: SynthBar[] = [
  {
    // Bar 1: D Major (D3, A3, D4, F#4)
    chordName: 'D',
    bassFreq: 73.42, // D2
    chordFreqs: [146.83, 220.0, 293.66, 369.99],
    melody: [587.33, null, 659.25, 739.99, null, 659.25, 587.33, null],
  },
  {
    // Bar 2: D/F# (F#3, A3, D4, F#4)
    chordName: 'D/F#',
    bassFreq: 92.5, // F#2
    chordFreqs: [185.0, 220.0, 293.66, 369.99],
    melody: [587.33, null, 659.25, 739.99, 880.0, null, 739.99, null],
  },
  {
    // Bar 3: Bm (B2, D3, F#3, B3, D4)
    chordName: 'Bm',
    bassFreq: 123.47, // B2
    chordFreqs: [146.83, 185.0, 246.94, 293.66],
    melody: [739.99, null, 659.25, 587.33, null, 587.33, 659.25, null],
  },
  {
    // Bar 4: G Major (G2, B3, D4, G4)
    chordName: 'G',
    bassFreq: 98.0, // G2
    chordFreqs: [196.0, 246.94, 293.66, 392.0],
    melody: [587.33, null, 493.88, 587.33, null, 659.25, 587.33, null],
  },
  {
    // Bar 5: D Major (Chorus lift)
    chordName: 'D',
    bassFreq: 73.42,
    chordFreqs: [146.83, 220.0, 293.66, 369.99],
    melody: [880.0, null, 739.99, 659.25, 587.33, null, 739.99, 659.25],
  },
  {
    // Bar 6: D/F#
    chordName: 'D/F#',
    bassFreq: 92.5,
    chordFreqs: [185.0, 220.0, 293.66, 369.99],
    melody: [587.33, null, 659.25, 739.99, null, 880.0, 739.99, null],
  },
  {
    // Bar 7: Bm
    chordName: 'Bm',
    bassFreq: 123.47,
    chordFreqs: [146.83, 185.0, 246.94, 293.66],
    melody: [739.99, 659.25, 587.33, null, 493.88, 587.33, 659.25, null],
  },
  {
    // Bar 8: G -> A turnaround
    chordName: 'G/A',
    bassFreq: 110.0, // A2
    chordFreqs: [196.0, 220.0, 277.18, 329.63],
    melody: [587.33, null, 554.37, 493.88, null, 554.37, 659.25, null],
  },
];

class BleachersTributePlayer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private timerId: number | null = null;
  private playing = false;
  private eighthStep = 0;

  // Optional user-loaded MP3/audio file
  private audioEl: HTMLAudioElement | null = null;
  private customObjectUrl: string | null = null;
  private customFileName: string | null = null;

  constructor() {
    this.audioEl = new Audio(DEFAULT_AUDIO_SRC);
    this.audioEl.loop = true;
    this.audioEl.volume = 0.7;
  }

  private ensureNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null;
    if (this.noiseBuffer) return this.noiseBuffer;
    const sampleRate = this.ctx.sampleRate;
    const length = Math.floor(sampleRate * 0.14);
    const buffer = this.ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  private playSynthPad(freqs: number[], durationSec: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1900, now);
    filter.frequency.exponentialRampToValueAtTime(900, now + durationSec);
    filter.connect(this.masterGain);

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime(idx % 2 === 0 ? -4 : 4, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.042, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(now);
      osc.stop(now + durationSec + 0.05);
    });
  }

  private playDrivingBass(freq: number, durationSec: number, accent: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(accent ? 0.17 : 0.11, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + durationSec + 0.03);
  }

  private playBellHook(freq: number, durationSec: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Warm synth-bell + octave shimmer
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const shimmerGain = this.ctx.createGain();
    shimmerGain.gain.setValueAtTime(0.22, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.11, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc1.connect(gain);
    osc2.connect(shimmerGain);
    shimmerGain.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec + 0.04);
    osc2.stop(now + durationSec + 0.04);
  }

  private playKick() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(46, now + 0.1);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  private playGatedSnareOrShaker(isBackbeatSnare: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const buffer = this.ensureNoiseBuffer();
    if (!buffer) return;

    const now = this.ctx.currentTime;
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = isBackbeatSnare ? 'bandpass' : 'highpass';
    filter.frequency.setValueAtTime(isBackbeatSnare ? 1900 : 5800, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(isBackbeatSnare ? 0.07 : 0.018, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (isBackbeatSnare ? 0.13 : 0.06));

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start(now);
    source.stop(now + 0.14);
  }

  private scheduleTick = () => {
    if (!this.playing || this.audioEl) return;
    const eighthMs = (60 / MUSIC_TRACK_BPM / 2) * 1000;
    const barIndex = Math.floor(this.eighthStep / 8) % BLEACHERS_TRIBUTE_PROGRESSION.length;
    const stepInBar = this.eighthStep % 8;
    const bar = BLEACHERS_TRIBUTE_PROGRESSION[barIndex];
    const barDurationSec = (eighthMs * 8) / 1000;

    // Warm 80s synth pad on beat 1 of each bar
    if (stepInBar === 0) {
      this.playSynthPad(bar.chordFreqs, barDurationSec * 0.96);
    }

    // Driving 8th-note bass pulse typical of Bleachers' indie-pop
    this.playDrivingBass(bar.bassFreq, (eighthMs / 1000) * 0.9, stepInBar % 2 === 0);

    // Classic indie-pop drum groove: kick on 1 & 3, gated snare on 2 & 4
    if (stepInBar === 0 || stepInBar === 4) {
      this.playKick();
    }
    this.playGatedSnareOrShaker(stepInBar === 2 || stepInBar === 6);

    // Shimmering lead melody
    const melodyFreq = bar.melody[stepInBar];
    if (melodyFreq) {
      this.playBellHook(melodyFreq, (eighthMs / 1000) * 1.9);
    }

    this.eighthStep += 1;
    this.timerId = window.setTimeout(this.scheduleTick, eighthMs);
  };

  public setCustomAudioFile(file: File): string {
    this.pause();
    if (this.customObjectUrl) {
      URL.revokeObjectURL(this.customObjectUrl);
    }
    this.customObjectUrl = URL.createObjectURL(file);
    this.customFileName = file.name;
    this.audioEl = new Audio(this.customObjectUrl);
    this.audioEl.loop = true;
    this.audioEl.volume = 0.7;
    return file.name;
  }

  public getTrackLabel(): string {
    return this.customFileName ? this.customFileName : DEFAULT_AUDIO_LABEL;
  }

  public start(): boolean {
    if (this.playing) return true;
    if (this.audioEl) {
      this.playing = true;
      void this.audioEl.play().catch(() => {
        this.playing = false;
      });
      return true;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return false;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }
      if (!this.masterGain) {
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.55;
        this.masterGain.connect(this.ctx.destination);
      }
      this.playing = true;
      this.scheduleTick();
      return true;
    } catch {
      this.playing = false;
      return false;
    }
  }

  public pause(): void {
    this.playing = false;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public isPlaying(): boolean {
    return this.playing;
  }

  public dispose(): void {
    this.pause();
    if (this.audioEl) {
      this.audioEl.src = '';
      this.audioEl = null;
    }
    if (this.customObjectUrl) {
      URL.revokeObjectURL(this.customObjectUrl);
      this.customObjectUrl = null;
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      void this.ctx.close();
    }
    this.ctx = null;
    this.masterGain = null;
    this.noiseBuffer = null;
  }
}

export const musicBox = new BleachersTributePlayer();
