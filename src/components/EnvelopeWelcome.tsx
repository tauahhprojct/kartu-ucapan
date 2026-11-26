import { motion } from 'motion/react';
import { useState } from 'react';
import { BotanicalSprig, DaisySticker, StarSticker } from './ScrapbookDoodles';

interface EnvelopeWelcomeProps {
  onOpenComplete: () => void;
  onStartOpening: () => void;
}

export function EnvelopeWelcome({
  onOpenComplete,
  onStartOpening,
}: EnvelopeWelcomeProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    onStartOpening();
    window.setTimeout(() => {
      onOpenComplete();
    }, 950);
  };

  return (
    <main className="scrapbook-canvas relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      {/* Subtle botanical framing */}
      <div className="pointer-events-none absolute top-10 left-8 opacity-75 hidden sm:block">
        <BotanicalSprig className="w-28 -rotate-6" />
      </div>
      <div className="pointer-events-none absolute bottom-10 right-8 opacity-75 hidden sm:block">
        <BotanicalSprig className="w-28 rotate-172" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex w-full max-w-lg flex-col items-center text-center"
      >
        <p className="font-serif text-sm tracking-wide text-[#525B76] italic mb-6">
          A Little Memory, A Lifetime of Stories
        </p>

        {/* Animated pastel envelope */}
        <motion.div
          animate={
            isOpening
              ? { y: -10, scale: 1.03 }
              : { y: [0, -7, 0], rotate: [-0.6, 0.6, -0.6] }
          }
          transition={
            isOpening
              ? { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
              : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative mx-auto mb-8 w-full max-w-[340px] sm:max-w-[380px]"
        >
          {/* Decorative corner stickers */}
          <DaisySticker className="absolute -top-5 -left-4 z-30 -rotate-12" />
          <StarSticker className="absolute -top-3 -right-3 z-30 rotate-12" />

          {/* Envelope Outer Container */}
          <div className="relative h-56 sm:h-60 w-full rounded-xl bg-[#FCE6EC] shadow-[0_20px_44px_-14px_rgba(30,38,59,0.18)] border border-[#F4C4D0]">
            {/* Inner letter card peeking out */}
            <motion.div
              initial={false}
              animate={isOpening ? { y: -58, opacity: 1 } : { y: 12, opacity: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-5 top-4 bottom-5 z-10 flex flex-col items-center justify-center rounded-lg border border-[#D8D0F0] bg-[#FFFFFF] px-5 py-4 shadow-xs"
            >
              <span className="font-serif text-base sm:text-lg font-medium text-[#1E263B]">
                Kenangan Purna Tugas Pak Budi
              </span>
              <span className="mt-1.5 text-xs text-[#525B76]">
                5 potret kecil &amp; sepucuk surat hangat
              </span>
            </motion.div>

            {/* Left & Right envelope side folds */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-20 rounded-xl overflow-hidden pointer-events-none"
            >
              <div
                className="absolute inset-y-0 left-0 w-1/2 bg-[#DFF5EC]"
                style={{ clipPath: 'polygon(0 0, 100% 52%, 0 100%)' }}
              />
              <div
                className="absolute inset-y-0 right-0 w-1/2 bg-[#E6DFFC]"
                style={{ clipPath: 'polygon(100% 0, 0 52%, 100% 100%)' }}
              />
              {/* Bottom envelope pocket fold */}
              <div
                className="absolute inset-x-0 bottom-0 h-[62%] bg-[#FFF4C9] border-t border-[#F2DC88]/60"
                style={{ clipPath: 'polygon(0 100%, 50% 14%, 100% 100%)' }}
              />
            </div>

            {/* Top flap */}
            <motion.div
              initial={false}
              animate={
                isOpening
                  ? { rotateX: 165, opacity: 0.45 }
                  : { rotateX: 0, opacity: 1 }
              }
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
              className="absolute inset-x-0 top-0 z-25 h-[56%] pointer-events-none"
            >
              <div
                className="h-full w-full rounded-t-xl bg-[#FFC4D2] border-b border-[#F49EB2]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 96%)' }}
              />
            </motion.div>

            {/* Butter-yellow wax/paper seal */}
            <motion.div
              animate={isOpening ? { scale: 0.7, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 top-[48%] z-30 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE375] border-2 border-[#E5AE24] shadow-sm"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#B83556]" fill="currentColor">
                <path d="M12 20.5C12 20.5 4 14.8 4 8.8C4 6.1 6.1 4 8.7 4C10.3 4 11.4 4.8 12 6C12.6 4.8 13.7 4 15.3 4C17.9 4 20 6.1 20 8.8C20 14.8 12 20.5 12 20.5Z" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        <h1 className="font-serif text-2xl sm:text-3xl font-semibold leading-snug text-[#1E263B] text-balance max-w-md">
          Psst... Ada sedikit kenangan untuk Pak Budi!
        </h1>

        <p className="mt-2.5 text-sm sm:text-base text-[#525B76] max-w-sm">
          Sebuah hadiah digital kecil berisi momen-momen hangat selama perjalanan pelayanan.
        </p>

        <button
          type="button"
          onClick={handleOpen}
          disabled={isOpening}
          className="mt-7 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#B83556] px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_12px_26px_-8px_rgba(184,53,86,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9E2946] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#B83556] active:translate-y-0 disabled:opacity-70 cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>{isOpening ? 'Membuka Kenangan...' : 'Buka Kenangan'}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>
    </main>
  );
}
