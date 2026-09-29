import { useCallback, useEffect, useRef, useState } from "react";

export function useSoftMusic() {
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorRefs = useRef<OscillatorNode[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = useCallback(() => {
    gainRef.current?.gain.setTargetAtTime(0, contextRef.current?.currentTime ?? 0, 0.08);
    window.setTimeout(() => {
      oscillatorRefs.current.forEach((oscillator) => oscillator.stop());
      oscillatorRefs.current = [];
      contextRef.current?.close();
      contextRef.current = null;
      gainRef.current = null;
    }, 260);
    setIsPlaying(false);
  }, []);

  const start = useCallback(async () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContextClass();
    const gain = audioContext.createGain();
    gain.gain.value = 0;
    gain.connect(audioContext.destination);

    const notes = [261.63, 329.63, 392, 523.25];
    const oscillators = notes.map((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const noteGain = audioContext.createGain();
      oscillator.type = index === 0 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      noteGain.gain.value = index === 0 ? 0.18 : 0.055;
      oscillator.connect(noteGain);
      noteGain.connect(gain);
      oscillator.start();
      return oscillator;
    });

    contextRef.current = audioContext;
    gainRef.current = gain;
    oscillatorRefs.current = oscillators;
    gain.gain.setTargetAtTime(0.055, audioContext.currentTime, 0.16);
    setIsPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
      return;
    }

    void start();
  }, [isPlaying, start, stop]);

  useEffect(() => stop, [stop]);

  return { isPlaying, toggle };
}
