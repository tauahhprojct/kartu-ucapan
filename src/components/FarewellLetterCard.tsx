import { ArrowUp, MailOpen } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { FAREWELL_CLOSING, FAREWELL_MESSAGE_PARAGRAPHS } from '../data/memories';
import {
  BotanicalSprig,
  HeartSticker,
  PostageStampDoodle,
  RibbonSticker,
} from './ScrapbookDoodles';

interface FarewellLetterCardProps {
  onBackToGallery: () => void;
}

export function FarewellLetterCard({ onBackToGallery }: FarewellLetterCardProps) {
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <section
      id="surat"
      aria-labelledby="surat-heading"
      className="relative mx-auto max-w-4xl px-5 sm:px-8 pt-8 pb-20"
    >
      <div className="mb-8 text-center">
        <p className="text-xs font-medium tracking-wider text-[#1D6B57] uppercase">
          Catatan Perpisahan
        </p>
        <h2
          id="surat-heading"
          className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#1E263B] text-balance"
        >
          Sepucuk Surat Terima Kasih
        </h2>
      </div>

      <div className="relative mx-auto max-w-2xl">
        {/* Decorative scrapbook doodles around the card */}
        <RibbonSticker className="pointer-events-none absolute -top-5 -left-4 z-20 -rotate-12" />
        <PostageStampDoodle className="pointer-events-none absolute -top-6 -right-4 z-20 h-16 w-14 rotate-8 hidden sm:block" />
        <HeartSticker className="pointer-events-none absolute -bottom-4 -right-3 z-20 rotate-12" />

        <AnimatePresence mode="wait" initial={false}>
          {!isCardOpen ? (
            <motion.div
              key="closed-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-[#DFD5FA] bg-gradient-to-br from-[#FFF6F8] via-[#FFFDF2] to-[#ECFAF4] p-8 sm:p-12 text-center shadow-[0_20px_44px_-18px_rgba(30,38,59,0.16)]"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#F4C4D0] bg-[#FFE685]/80 text-[#B83556]">
                <MailOpen className="h-6 w-6" aria-hidden="true" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E263B]">
                Ada Pesan Hangat untuk Pak Budi
              </h3>
              <p className="mx-auto mt-2.5 max-w-md text-sm sm:text-base text-[#525B76]">
                Klik tombol di bawah untuk membuka kartu surat perpisahan dari kami seksi pelayanan.
              </p>

              <button
                type="button"
                onClick={() => setIsCardOpen(true)}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#B83556] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(184,53,86,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#9E2946] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#B83556] cursor-pointer whitespace-nowrap"
              >
                <span>Buka Surat Perpisahan</span>
              </button>

              <div className="mt-8 flex justify-center opacity-90">
                <BotanicalSprig className="w-28" />
              </div>
            </motion.div>
          ) : (
            <motion.article
              key="open-card"
              initial={{ opacity: 0, rotateX: -12, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="lined-letter-paper relative rounded-2xl border border-[#DFD5FA] px-6 py-8 sm:px-12 sm:py-11 shadow-[0_24px_50px_-18px_rgba(30,38,59,0.18)]"
            >
              {/* Soft pastel top accent stripe */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-2.5 rounded-t-2xl bg-gradient-to-r from-[#FF9BB0] via-[#FFE07D] via-[#9AE0C4] to-[#B7A2F2]"
              />

              <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#E7E1F2] pb-4">
                <div>
                  <p className="font-serif text-lg font-semibold text-[#1E263B]">
                    Untuk Pak Budi,
                  </p>
                  <p className="text-xs text-[#525B76] mt-0.5">
                    Kepala Seksi · Dengan penuh rasa hormat &amp; terima kasih
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCardOpen(false)}
                  className="rounded-lg border border-[#D7CEF0] bg-[#FAF8FF] px-3 py-1.5 text-xs font-medium text-[#525B76] transition-colors hover:bg-[#EFEAFC] hover:text-[#1E263B] cursor-pointer whitespace-nowrap"
                >
                  Lipat Kartu
                </button>
              </div>

              <div className="space-y-4 text-[15px] sm:text-base leading-[2rem] text-[#1E263B]">
                {FAREWELL_MESSAGE_PARAGRAPHS.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <p className="mt-7 font-serif text-lg sm:text-xl italic font-medium text-[#B83556]">
                {FAREWELL_CLOSING}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#E7E1F2] pt-5">
                <BotanicalSprig className="w-24 opacity-90" />

                <button
                  type="button"
                  onClick={onBackToGallery}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#BEEAD7] bg-[#F2FBF7] px-4 py-2 text-xs sm:text-sm font-medium text-[#1D6B57] transition-colors hover:bg-[#E2F6ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6B57] cursor-pointer whitespace-nowrap"
                >
                  <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Lihat Kenangan Lagi</span>
                </button>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
