// Web Audio API engine for authentic sacred mandir sounds: Bell (घंटी), Conch (शंख), and Meditative Om Drone

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Rings an authentic high-resonance temple brass bell (मंदिर की घंटी)
 */
export function playTempleBell() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Harmonic frequencies typical of a sacred Indian bronze bell
    const freqs = [587.33, 1174.66, 1760.0, 2489.0, 3135.96]; // D5 and bright bell harmonics
    const gains = [0.4, 0.3, 0.15, 0.08, 0.04];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Strike attack and long natural bronze bell decay
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gains[idx], now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3.2);
    });
  } catch (err) {
    console.error('Audio bell error:', err);
  }
}

/**
 * Sacred Conch (शंखनाद) resonance
 */
export function playConchSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const baseFreq = 220; // A3 root
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    // Conch wind pitch drift
    osc.frequency.setValueAtTime(baseFreq * 0.95, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.05, now + 0.8);
    osc.frequency.linearRampToValueAtTime(baseFreq, now + 2.5);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, now);
    filter.Q.setValueAtTime(3.5, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.4);
    gain.gain.setValueAtTime(0.3, now + 2.0);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 3.0);
  } catch (err) {
    console.error('Conch audio error:', err);
  }
}

/**
 * Meditative Om Tanpura Drone active state
 */
let droneOscillators: { stop: () => void } | null = null;

export function toggleOmDrone(shouldPlay: boolean, onEnded?: () => void) {
  try {
    const ctx = getAudioContext();

    if (!shouldPlay) {
      if (droneOscillators) {
        droneOscillators.stop();
        droneOscillators = null;
      }
      return;
    }

    if (droneOscillators) {
      droneOscillators.stop();
    }

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.01, now);
    masterGain.gain.linearRampToValueAtTime(0.2, now + 1.5);
    masterGain.connect(ctx.destination);

    // Warm sacred C# fundamental with fifths (Pa-Sa)
    const tones = [138.59, 207.65, 277.18, 415.3];
    const oscs: OscillatorNode[] = [];

    tones.forEach((pitch) => {
      const osc = ctx.createOscillator();
      const toneGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      toneGain.gain.setValueAtTime(0.12, now);

      // Subtle vibrato LFO
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.2, now);
      lfoGain.gain.setValueAtTime(1.2, now);
      lfo.connect(osc.frequency);
      lfo.start(now);

      osc.connect(toneGain);
      toneGain.connect(masterGain);
      osc.start(now);
      oscs.push(osc);
    });

    droneOscillators = {
      stop: () => {
        try {
          const fadeTime = ctx.currentTime;
          masterGain.gain.linearRampToValueAtTime(0.0001, fadeTime + 0.8);
          setTimeout(() => {
            oscs.forEach((o) => {
              try {
                o.stop();
              } catch (_) {}
            });
            if (onEnded) onEnded();
          }, 850);
        } catch (_) {}
      },
    };
  } catch (err) {
    console.error('Om drone error:', err);
  }
}
