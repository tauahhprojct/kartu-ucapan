import { ArrowUp, Music } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MEMORIES, type MemoryPhoto } from '../data/memories';
import { musicBox } from '../utils/musicBox';
import {
  CAPTIONS_STORAGE_KEY,
  getNextLightboxIndex,
  mergeSavedCaptions,
  sanitizeCaption,
  type CaptionMap,
} from '../utils/scrapbookState';
import { FarewellLetterCard } from './FarewellLetterCard';
import { FloatingAmbience } from './FloatingAmbience';
import { MemoryLightbox } from './MemoryLightbox';
import { PolaroidCard } from './PolaroidCard';
import {
  BotanicalSprig,
  DaisySticker,
  PostageStampDoodle,
  StarSticker,
  WashiTape,
} from './ScrapbookDoodles';
import { TopBar } from './TopBar';

export function ScrapbookPage() {
  const [captions, setCaptions] = useState<CaptionMap>(() => {
    try {
      const saved = window.localStorage.getItem(CAPTIONS_STORAGE_KEY);
      return mergeSavedCaptions(MEMORIES, saved);
    } catch {
      return mergeSavedCaptions(MEMORIES, null);
    }
  });

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [trackLabel, setTrackLabel] = useState(() => musicBox.getTrackLabel());
  const audioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      musicBox.dispose();
    };
  }, []);

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      musicBox.pause();
      setIsMusicPlaying(false);
    } else {
      const started = musicBox.start();
      setIsMusicPlaying(started);
    }
  };

  const handleSelectAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    musicBox.setCustomAudioFile(file);
    setTrackLabel(musicBox.getTrackLabel());
    const started = musicBox.start();
    setIsMusicPlaying(started);
  };

  const handleUpdateCaption = useCallback((id: string, nextRawCaption: string) => {
    const target = MEMORIES.find((m) => m.id === id);
    if (!target) return;
    const cleaned = sanitizeCaption(nextRawCaption, target.defaultCaption);
    setCaptions((prev) => {
      const next = { ...prev, [id]: cleaned };
      try {
        window.localStorage.setItem(CAPTIONS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors in restricted environments
      }
      return next;
    });
  }, []);

  const handleOpenLightbox = useCallback((memory: MemoryPhoto) => {
    const idx = MEMORIES.findIndex((m) => m.id === memory.id);
    if (idx >= 0) {
      setActiveLightboxIndex(idx);
    }
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  const handleNavigateLightbox = useCallback((direction: 'prev' | 'next') => {
    setActiveLightboxIndex((prev) => {
      if (prev === null) return null;
      return getNextLightboxIndex(prev, direction, MEMORIES.length);
    });
  }, []);

  const handleBackToGallery = useCallback(() => {
    const el = document.getElementById('galeri');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const activeMemory =
    activeLightboxIndex !== null ? MEMORIES[activeLightboxIndex] ?? null : null;

  const topRowMemories = MEMORIES.slice(0, 3);
  const bottomRowMemories = MEMORIES.slice(3, 5);

  return (
    <div className="scrapbook-canvas relative min-h-screen text-[#1E263B]">
      <FloatingAmbience />

      <TopBar isMusicPlaying={isMusicPlaying} onToggleMusic={handleToggleMusic} />

      <main className="relative z-10">
        {/* Hero / Memory Book Cover Header */}
        <section
          id="beranda"
          className="relative mx-auto max-w-5xl px-5 sm:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto max-w-3xl"
          >
            {/* Subtle paperclip & floral doodles around hero */}
            <DaisySticker className="pointer-events-none absolute -top-11 left-3 sm:-top-6 sm:left-10 -rotate-12 opacity-95" />
            <StarSticker className="pointer-events-none absolute -top-10 right-3 sm:-top-4 sm:right-12 rotate-12 opacity-95" />

            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-[#1D6B57]">
              <span className="whitespace-nowrap">Purna Tugas Pak Budi · Kepala Seksi</span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap text-[#525B76]">A Little Memory, A Lifetime of Stories</span>
            </div>

            <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-semibold leading-[1.18] tracking-tight text-[#1E263B] text-balance">
              Terima Kasih atas Setiap Cerita dan Kenangan
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#525B76]">
              Lima potret sederhana, menyimpan begitu banyak cerita selama perjalanan pelayanan.
            </p>

            {/* Small pasted paper note & botanical flourish */}
            <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <div className="relative rounded-md border border-[#F0D86E] bg-[#FFF8D2] px-5 py-3 shadow-xs -rotate-1 max-w-xs">
                <div className="pointer-events-none absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <WashiTape variant="lavender" className="h-4 w-16" />
                </div>
                <p className="font-serif text-xs sm:text-sm italic text-[#38405A]">
                  “Klik foto untuk melihat lebih besar, atau ubah catatan kecil di bawah tiap potret.”
                </p>
              </div>

              <BotanicalSprig className="w-28 opacity-95 hidden sm:block" />
            </div>
          </motion.div>
        </section>

        {/* 5-Photo Polaroid Scrapbook Gallery */}
        <section
          id="galeri"
          aria-labelledby="galeri-heading"
          className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-6 pb-20"
        >
          <div className="mb-12 flex flex-col items-center text-center">
            <h2
              id="galeri-heading"
              className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E263B]"
            >
              Lima Potret Kenangan
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-[#525B76]">
              <span>Sekumpulan momen hangat di seksi pelayanan</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-medium text-[#B83556]">5 Foto</span>
            </div>
          </div>

          {/* Staggered Scrapbook Row 1: 3 Polaroids */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 items-start">
            {topRowMemories.map((memory) => (
              <PolaroidCard
                key={memory.id}
                memory={memory}
                caption={captions[memory.id] ?? memory.defaultCaption}
                onUpdateCaption={handleUpdateCaption}
                onOpenLightbox={handleOpenLightbox}
              />
            ))}
          </div>

          {/* Staggered Scrapbook Row 2: 2 Polaroids + Scrapbook Margin Doodle */}
          <div className="relative mt-12 lg:mt-16 mx-auto max-w-4xl">
            <PostageStampDoodle className="pointer-events-none absolute -left-8 top-1/2 -translate-y-1/2 h-20 w-16 -rotate-12 opacity-90 hidden xl:block" />

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:gap-14 items-start">
              {bottomRowMemories.map((memory) => (
                <PolaroidCard
                  key={memory.id}
                  memory={memory}
                  caption={captions[memory.id] ?? memory.defaultCaption}
                  onUpdateCaption={handleUpdateCaption}
                  onOpenLightbox={handleOpenLightbox}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Subtle divider */}
        <div className="mx-auto max-w-3xl px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-[#D7CEF0] to-transparent" />
        </div>

        {/* Interactive Farewell Letter Section */}
        <FarewellLetterCard onBackToGallery={handleBackToGallery} />

        {/* Secondary Back-to-Gallery Anchor (always reachable) */}
        <div className="pb-10 text-center">
          <button
            type="button"
            onClick={handleBackToGallery}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#D7CEF0] bg-[#FFFFFF] px-4 py-2 text-xs sm:text-sm font-medium text-[#525B76] transition-colors hover:bg-[#F3EEFF] hover:text-[#1E263B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6B57] cursor-pointer whitespace-nowrap"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Lihat Kenangan Lagi</span>
          </button>
        </div>
      </main>

      {/* Warm Editorial Footer */}
      <footer className="relative z-10 border-t border-[#E7E1F2] bg-gradient-to-b from-[#FAF7FF] to-[#F1FAF6] px-6 py-10 text-center">
        <p className="font-serif text-lg sm:text-xl italic text-[#1E263B]">
          “A chapter ends, but the memories stay.”
        </p>
        <p className="mt-2 text-xs text-[#525B76]">
          Hadiah Digital Purna Tugas untuk Pak Budi · Terima Kasih atas Pengabdian yang Hangat
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[#525B76]">
          <span className="inline-flex items-center gap-1.5">
            <Music className="h-3.5 w-3.5 text-[#B83556]" aria-hidden="true" />
            <span>{trackLabel}</span>
          </span>
          <span aria-hidden="true">·</span>
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            onChange={handleSelectAudioFile}
            className="sr-only"
            aria-label="Pilih file audio MP3 dari perangkat"
          />
          <button
            type="button"
            onClick={() => audioInputRef.current?.click()}
            className="font-medium text-[#1D6B57] underline underline-offset-4 hover:text-[#144E3F] cursor-pointer"
          >
            Muat File MP3 Sendiri
          </button>
        </div>
      </footer>

      {/* Lightbox Popup */}
      <MemoryLightbox
        memory={activeMemory}
        caption={
          activeMemory
            ? captions[activeMemory.id] ?? activeMemory.defaultCaption
            : ''
        }
        totalCount={MEMORIES.length}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
      />
    </div>
  );
}
