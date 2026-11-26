import type { StickerKind } from '../data/memories';

export function WashiTape({
  variant,
  className = '',
}: {
  variant: 'pink' | 'lavender' | 'butter' | 'gingham';
  className?: string;
}) {
  const styles: Record<typeof variant, string> = {
    pink: 'bg-[#FFB8C8]/88 border-y border-[#F27A96]/35',
    lavender: 'bg-[#D7C9FB]/88 border-y border-[#9B82E3]/35',
    butter: 'bg-[#FFE785]/90 border-y border-[#E5B832]/35',
    gingham:
      'bg-[#BEEFD9]/90 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.55)_0,rgba(255,255,255,0.55)_6px,transparent_6px,transparent_12px)] border-y border-[#49A886]/35',
  };

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none block h-6 w-24 shadow-xs backdrop-blur-[1px] ${styles[variant]} ${className}`}
      style={{
        clipPath: 'polygon(3% 0%, 97% 2%, 100% 50%, 96% 98%, 2% 100%, 0% 48%)',
      }}
    />
  );
}

export function DaisySticker({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className={`h-10 w-10 drop-shadow-xs ${className}`}
      fill="none"
    >
      <circle cx="24" cy="11" r="6" fill="#FFFFFF" stroke="#B7A2F2" strokeWidth="1.3" />
      <circle cx="35" cy="18" r="6" fill="#FFFFFF" stroke="#B7A2F2" strokeWidth="1.3" />
      <circle cx="32" cy="31" r="6" fill="#FFFFFF" stroke="#B7A2F2" strokeWidth="1.3" />
      <circle cx="16" cy="31" r="6" fill="#FFFFFF" stroke="#B7A2F2" strokeWidth="1.3" />
      <circle cx="13" cy="18" r="6" fill="#FFFFFF" stroke="#B7A2F2" strokeWidth="1.3" />
      <circle cx="24" cy="22" r="5.5" fill="#FFE270" stroke="#E0A81E" strokeWidth="1.3" />
    </svg>
  );
}

export function RibbonSticker({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 56 44"
      className={`h-9 w-11 drop-shadow-xs ${className}`}
      fill="none"
    >
      <path
        d="M27 20C18 11 8 10 8 18C8 25 18 24 27 20Z"
        fill="#FFB8C8"
        stroke="#D94E6A"
        strokeWidth="1.4"
      />
      <path
        d="M29 20C38 11 48 10 48 18C48 25 38 24 29 20Z"
        fill="#FFB8C8"
        stroke="#D94E6A"
        strokeWidth="1.4"
      />
      <path
        d="M26 22L17 37L23 34L27 23"
        fill="#FFB8C8"
        stroke="#D94E6A"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M30 22L39 37L33 34L29 23"
        fill="#FFB8C8"
        stroke="#D94E6A"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="20" r="3.5" fill="#FF8FA7" stroke="#D94E6A" strokeWidth="1.3" />
    </svg>
  );
}

export function StarSticker({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={`h-8 w-8 drop-shadow-xs ${className}`}
      fill="none"
    >
      <path
        d="M20 4L24.3 13.7L34.8 14.9L26.9 22L29.1 32.4L20 27L10.9 32.4L13.1 22L5.2 14.9L15.7 13.7L20 4Z"
        fill="#FFE270"
        stroke="#DE9F14"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartSticker({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={`h-8 w-8 drop-shadow-xs ${className}`}
      fill="none"
    >
      <path
        d="M20 33C20 33 7 24.4 7 14.8C7 10.6 10.2 7.5 14.1 7.5C16.8 7.5 19 9 20 11C21 9 23.2 7.5 25.9 7.5C29.8 7.5 33 10.6 33 14.8C33 24.4 20 33 20 33Z"
        fill="#FFA3B8"
        stroke="#D94E6A"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PaperclipSticker({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 54"
      className={`h-11 w-7 drop-shadow-xs ${className}`}
      fill="none"
    >
      <path
        d="M11 16V37C11 42 14.5 45.5 19 45.5C23.5 45.5 27 42 27 37V13C27 7 22.5 3 16.5 3C10.5 3 6 7 6 13V34"
        stroke="#48A888"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StickerBadge({
  kind,
  className = '',
}: {
  kind: StickerKind;
  className?: string;
}) {
  switch (kind) {
    case 'daisy':
      return <DaisySticker className={className} />;
    case 'ribbon':
      return <RibbonSticker className={className} />;
    case 'star':
      return <StarSticker className={className} />;
    case 'heart':
      return <HeartSticker className={className} />;
    case 'paperclip':
      return <PaperclipSticker className={className} />;
  }
}

export function BotanicalSprig({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 48"
      className={className}
      fill="none"
    >
      <path
        d="M10 34C34 32 62 24 106 14"
        stroke="#2E8B6E"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M34 30C29 22 33 14 41 16C43 22 39 27 34 30Z"
        fill="#BEEFD9"
        stroke="#2E8B6E"
        strokeWidth="1.2"
      />
      <path
        d="M58 25C57 16 64 10 70 15C69 21 64 24 58 25Z"
        fill="#FFB8C8"
        stroke="#D94E6A"
        strokeWidth="1.2"
      />
      <path
        d="M80 20C82 11 90 9 94 14C90 20 85 21 80 20Z"
        fill="#DED4FA"
        stroke="#8F75D6"
        strokeWidth="1.2"
      />
      <circle cx="108" cy="13" r="3.5" fill="#FFE270" stroke="#DE9F14" strokeWidth="1" />
    </svg>
  );
}

export function PostageStampDoodle({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 72"
      className={className}
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="56"
        height="64"
        rx="4"
        fill="#FFFFFF"
        stroke="#B7A2F2"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <rect
        x="10"
        y="10"
        width="44"
        height="52"
        rx="2"
        fill="#F5FBFA"
        stroke="#BEEFD9"
        strokeWidth="1.3"
      />
      <path
        d="M32 45C32 45 21 37.8 21 30C21 26.5 23.6 24 27 24C29.3 24 31.1 25.2 32 26.8C32.9 25.2 34.7 24 37 24C40.4 24 43 26.5 43 30C43 37.8 32 45 32 45Z"
        fill="#FFA3B8"
        stroke="#D94E6A"
        strokeWidth="1.2"
      />
    </svg>
  );
}
