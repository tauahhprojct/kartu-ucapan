import { motion } from 'motion/react';

const AMBIENT_ITEMS = [
  { id: 1, x: '6%', y: '14%', kind: 'sparkle', color: '#F0B429', size: 14, duration: 7 },
  { id: 2, x: '91%', y: '18%', kind: 'heart', color: '#F27A96', size: 15, duration: 8.5 },
  { id: 3, x: '4%', y: '48%', kind: 'star', color: '#9B82E3', size: 13, duration: 9 },
  { id: 4, x: '94%', y: '56%', kind: 'sparkle', color: '#42B893', size: 14, duration: 7.5 },
  { id: 5, x: '8%', y: '82%', kind: 'heart', color: '#9B82E3', size: 13, duration: 8 },
  { id: 6, x: '89%', y: '86%', kind: 'star', color: '#F0B429', size: 14, duration: 9.5 },
] as const;

export function FloatingAmbience() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {AMBIENT_ITEMS.map((item) => (
        <motion.div
          key={item.id}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.32, 0.58, 0.32],
            rotate: [-6, 6, -6],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute"
        >
          {item.kind === 'heart' && (
            <svg width={item.size} height={item.size} viewBox="0 0 20 20" fill={item.color}>
              <path d="M10 17C10 17 3 12.2 3 7C3 4.8 4.8 3 7 3C8.5 3 9.5 3.9 10 4.9C10.5 3.9 11.5 3 13 3C15.2 3 17 4.8 17 7C17 12.2 10 17 10 17Z" />
            </svg>
          )}
          {item.kind === 'star' && (
            <svg width={item.size} height={item.size} viewBox="0 0 20 20" fill={item.color}>
              <path d="M10 1L12.6 7.1L19 7.8L14.2 12.1L15.6 18.5L10 15.1L4.4 18.5L5.8 12.1L1 7.8L7.4 7.1L10 1Z" />
            </svg>
          )}
          {item.kind === 'sparkle' && (
            <svg width={item.size} height={item.size} viewBox="0 0 20 20" fill={item.color}>
              <path d="M10 1L11.8 8.2L19 10L11.8 11.8L10 19L8.2 11.8L1 10L8.2 8.2L10 1Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
