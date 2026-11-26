import { Pause, Play } from 'lucide-react';

interface TopBarProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export function TopBar({ isMusicPlaying, onToggleMusic }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#E7E1F2] bg-[#FFFDF8]/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 sm:gap-8 px-5 sm:px-8 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#beranda"
          className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-[#1E263B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D6B57]"
        >
          A Little Memory
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#525B76]"
        >
          <a
            href="#beranda"
            className="hover:text-[#B83556] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Beranda
          </a>
          <a
            href="#galeri"
            className="hover:text-[#B83556] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Galeri Kenangan
          </a>
          <a
            href="#surat"
            className="hover:text-[#B83556] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Surat Perpisahan
          </a>
        </nav>

        {/* Zone 3: Optional Music Play/Pause Control (never autoplays) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onToggleMusic}
            aria-pressed={isMusicPlaying}
            aria-label={
              isMusicPlaying
                ? 'Jeda lagu Bleachers - Merry Christmas'
                : 'Putar lagu Bleachers - Merry Christmas'
            }
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6B57] ${
              isMusicPlaying
                ? 'bg-[#1D6B57] text-white hover:bg-[#175746]'
                : 'border border-[#D7CEF0] bg-[#FFFFFF] text-[#1E263B] hover:bg-[#F3EEFF]'
            }`}
          >
            {isMusicPlaying ? (
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Play className="h-3.5 w-3.5 text-[#B83556]" aria-hidden="true" />
            )}
            <span>{isMusicPlaying ? 'Jeda Musik' : 'Putar Musik'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
