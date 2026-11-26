import { motion } from 'motion/react';
import { useMemo } from 'react';

interface ConfettiPiece {
  id: number;
  xPercent: number;
  delay: number;
  duration: number;
  rotation: number;
  kind: 'petal' | 'star' | 'heart';
  color: string;
  scale: number;
}

const PALETTE = ['#FF94AB', '#B098F0', '#FFE066', '#6FD6B2', '#8FD3F4', '#F46E8C'];

export function ConfettiBurst({ active }: { active: boolean }) {
  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      xPercent: (i * 3.7 + ((i % 3) * 7)) % 96 + 2,
      delay: (i % 7) * 0.14,
      duration: 2.8 + (i % 4) * 0.45,
      rotation: (i % 2 === 0 ? 1 : -1) * (120 + (i % 5) * 45),
      kind: i % 3 === 0 ? 'star' : i % 3 === 1 ? 'heart' : 'petal',
      color: PALETTE[i % PALETTE.length],
      scale: 0.8 + (i % 3) * 0.25,
    }));
  }, []);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            y: -40,
            opacity: 0,
            rotate: 0,
            scale: piece.scale,
          }}
          animate={{
            y: '105vh',
            opacity: [0, 0.95, 0.95, 0],
            rotate: piece.rotation,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ left: `${piece.xPercent}%` }}
          className="absolute top-0"
        >
          {piece.kind === 'petal' && (
            <span
              className="block h-3.5 w-2.5 rounded-full"
              style={{ backgroundColor: piece.color }}
            />
          )}
          {piece.kind === 'star' && (
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill={piece.color}>
              <path d="M10 1L12.6 7.1L19 7.8L14.2 12.1L15.6 18.5L10 15.1L4.4 18.5L5.8 12.1L1 7.8L7.4 7.1L10 1Z" />
            </svg>
          )}
          {piece.kind === 'heart' && (
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill={piece.color}>
              <path d="M10 17C10 17 3 12.2 3 7C3 4.8 4.8 3 7 3C8.5 3 9.5 3.9 10 4.9C10.5 3.9 11.5 3 13 3C15.2 3 17 4.8 17 7C17 12.2 10 17 10 17Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
