import { useState, useEffect, useRef } from 'react';

// Live high-quality background audio tracks
const AUDIO_SOURCES = [
  'https://assets.mixkit.co/music/preview/mixkit-forest-flute-1090.mp3', // Relaxing traditional oriental flute
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'       // Relaxing ambient background track
];

export function useAudio(audioPath: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const synthActiveRef = useRef<boolean>(false);
  const synthCleanupRef = useRef<(() => void) | null>(null);

  // Play procedural synth music if network files fail
  const playProceduralMusic = () => {
    if (synthActiveRef.current) return;
    synthActiveRef.current = true;
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Warm tanpura-like continuous drone oscillators
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const droneGain = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(220, ctx.currentTime); // A3 (220Hz)
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(330, ctx.currentTime); // E4 (330Hz) - Perfect fifth
      
      droneGain.gain.setValueAtTime(0.04, ctx.currentTime);
      
      osc1.connect(droneGain);
      osc2.connect(droneGain);
      droneGain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      
      // Melodic notes play periodically on top of the drone (Traditional scale)
      const playNote = (freq: number, startTime: number, duration: number) => {
        if (!synthActiveRef.current || ctx.state === 'closed') return;
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(freq, startTime);
        
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.05, startTime + 0.15);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        
        noteOsc.start(startTime);
        noteOsc.stop(startTime + duration);
      };

      // Pentatonic / peaceful Raga melody notes
      const melody = [440, 554.37, 659.25, 739.99, 659.25, 554.37]; // A4, C#5, E5, F#5
      let currentTime = ctx.currentTime + 0.5;

      const triggerMelody = () => {
        if (!synthActiveRef.current || ctx.state === 'closed') return;
        melody.forEach((freq, idx) => {
          playNote(freq, currentTime + idx * 1.6, 2.8);
        });
        currentTime += melody.length * 1.6;
      };

      triggerMelody();
      const intervalId = setInterval(triggerMelody, melody.length * 1600);

      synthCleanupRef.current = () => {
        try {
          osc1.stop();
          osc2.stop();
          ctx.close();
        } catch (_) {}
        clearInterval(intervalId);
        synthActiveRef.current = false;
      };
    } catch (e) {
      console.warn("Procedural synthesizer failed", e);
      synthActiveRef.current = false;
    }
  };

  useEffect(() => {
    // Determine path to load (use AUDIO_SOURCES list or custom override)
    const currentUrl = AUDIO_SOURCES[sourceIndex] || audioPath;
    const audio = new Audio(currentUrl);
    audio.loop = true;
    audioRef.current = audio;

    const handleError = (e: Event) => {
      console.warn(`Audio source ${currentUrl} failed to load. Trying next fallback...`, e);
      if (sourceIndex + 1 < AUDIO_SOURCES.length) {
        setSourceIndex(prev => prev + 1);
      } else {
        console.warn("All audio files failed to load. Activating procedural sound generator.");
        // If playing state is active, play synth immediately
        if (isPlaying) {
          playProceduralMusic();
        }
      }
    };

    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
      if (synthCleanupRef.current) {
        synthCleanupRef.current();
        synthCleanupRef.current = null;
      }
    };
  }, [sourceIndex, audioPath]);

  const play = async () => {
    setIsPlaying(true);
    
    // If the procedural synthesizer is needed, play it
    if (synthActiveRef.current) {
      return;
    }

    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.warn("Standard audio playback was prevented, trying fallbacks or synth", err);
        // Fallback to procedural synth if audio element is blocked
        playProceduralMusic();
      }
    } else {
      playProceduralMusic();
    }
  };

  const pause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (synthCleanupRef.current) {
      synthCleanupRef.current();
      synthCleanupRef.current = null;
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return { isPlaying, play, pause, toggle };
}
