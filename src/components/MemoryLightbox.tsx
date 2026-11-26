import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { MemoryPhoto } from '../data/memories';

interface MemoryLightboxProps {
  memory: MemoryPhoto | null;
  caption: string;
  totalCount: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function MemoryLightbox({
  memory,
  caption,
  totalCount,
  onClose,
  onNavigate,
}: MemoryLightboxProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [memory?.id]);

  useEffect(() => {
    if (!memory) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        onNavigate('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [memory, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau foto ${memory.index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#181F33]/78 p-4 sm:p-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-xl border border-[#E7E1F2] bg-[#FFFFFF] p-4 sm:p-6 shadow-2xl"
          >
            {/* Top bar inside modal */}
            <div className="mb-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#525B76]">
                <span className="font-medium text-[#1E263B]">{memory.dateLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {memory.index} / {totalCount}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup foto"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D7CEF0] bg-[#FAF8FF] text-[#1E263B] transition-colors hover:bg-[#EFEAFC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6B57] cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Large Photo Frame */}
            <div className="relative overflow-hidden rounded-lg bg-[#EEF6F2]">
              <div className="aspect-[4/3] w-full max-h-[62vh]">
                {!imageError ? (
                  <img
                    src={memory.src}
                    alt={memory.alt}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#FFB8C8]/45 via-[#FFFDF8] to-[#C8F0DF]/60 p-8 text-center">
                    <span className="font-serif text-xl font-medium text-[#1E263B]">
                      {memory.dateLabel}
                    </span>
                    <span className="mt-2 text-sm text-[#525B76]">
                      Letakkan foto di {memory.src}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Caption & Story Note + Prev/Next Controls */}
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="font-serif text-lg sm:text-xl italic leading-snug text-[#1E263B]">
                  “{caption}”
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#525B76]">
                  {memory.memoryNote}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end">
                <button
                  type="button"
                  onClick={() => onNavigate('prev')}
                  aria-label="Foto sebelumnya"
                  className="inline-flex h-10 items-center gap-1 rounded-lg border border-[#D7CEF0] bg-[#FFFFFF] px-3 text-xs font-medium text-[#1E263B] transition-colors hover:bg-[#F3EEFF] cursor-pointer whitespace-nowrap"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Sebelumnya</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('next')}
                  aria-label="Foto berikutnya"
                  className="inline-flex h-10 items-center gap-1 rounded-lg border border-[#D7CEF0] bg-[#FFFFFF] px-3 text-xs font-medium text-[#1E263B] transition-colors hover:bg-[#F3EEFF] cursor-pointer whitespace-nowrap"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
