import { useEffect, useState } from 'react';

type Options = {
  typeSpeedMs?: number;
  deleteSpeedMs?: number;
  pauseMs?: number;
};

export function useTypewriter(
  phrases: string[],
  { typeSpeedMs = 55, deleteSpeedMs = 22, pauseMs = 1300 }: Options = {},
) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;
    const full = phrases[phraseIdx];

    if (!deleting && charIdx === full.length) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
      return;
    }

    const step = deleting ? deleteSpeedMs : typeSpeedMs;
    const t = setTimeout(() => {
      setCharIdx((c) => c + (deleting ? -1 : 1));
    }, step);
    return () => clearTimeout(t);
  }, [phrases, phraseIdx, charIdx, deleting, typeSpeedMs, deleteSpeedMs, pauseMs]);

  return phrases[phraseIdx].slice(0, charIdx);
}
