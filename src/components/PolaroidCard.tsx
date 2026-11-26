import { Check, Pencil, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { MemoryPhoto } from '../data/memories';
import { StickerBadge, WashiTape } from './ScrapbookDoodles';

interface PolaroidCardProps {
  memory: MemoryPhoto;
  caption: string;
  onUpdateCaption: (id: string, nextCaption: string) => void;
  onOpenLightbox: (memory: MemoryPhoto) => void;
}

export function PolaroidCard({
  memory,
  caption,
  onUpdateCaption,
  onOpenLightbox,
}: PolaroidCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(caption);
  const [imageError, setImageError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(caption);
  }, [caption]);

  useEffect(() => {
    setImageError(false);
  }, [memory.src]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    onUpdateCaption(memory.id, draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(caption);
    setIsEditing(false);
  };

  const frameTintMap: Record<MemoryPhoto['frameStyle'], string> = {
    'pink-washi': 'bg-[#FFFFFF] border-[#F6C8D4]',
    'lavender-corners': 'bg-[#FAF8FF] border-[#D8CDF7]',
    'butter-double-tape': 'bg-[#FFFDF2] border-[#F3DC86]',
    'cream-ribbon': 'bg-[#FFF7F9] border-[#F2B7C6] border-dashed',
    'gingham-heart': 'bg-[#F5FCF9] border-[#BEEAD7]',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, rotate: memory.tiltDeg }}
      whileInView={{ opacity: 1, y: 0, rotate: memory.tiltDeg }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.45, delay: memory.index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative mx-auto w-full max-w-[340px] ${memory.offsetClass}`}
    >
      {/* Unique Tape / Ribbon Top Accents per Polaroid */}
      {memory.frameStyle === 'pink-washi' && (
        <div className="pointer-events-none absolute -top-3 left-1/2 z-20 -translate-x-1/2 -rotate-2">
          <WashiTape variant="pink" />
        </div>
      )}

      {memory.frameStyle === 'lavender-corners' && (
        <>
          <div className="pointer-events-none absolute -top-2 -left-4 z-20 -rotate-35">
            <WashiTape variant="lavender" className="w-16 h-5" />
          </div>
          <div className="pointer-events-none absolute -top-2 -right-4 z-20 rotate-35">
            <WashiTape variant="lavender" className="w-16 h-5" />
          </div>
        </>
      )}

      {memory.frameStyle === 'butter-double-tape' && (
        <>
          <div className="pointer-events-none absolute -top-3 left-6 z-20 -rotate-12">
            <WashiTape variant="butter" className="w-16 h-5" />
          </div>
          <div className="pointer-events-none absolute -top-3 right-6 z-20 rotate-12">
            <WashiTape variant="butter" className="w-16 h-5" />
          </div>
        </>
      )}

      {memory.frameStyle === 'cream-ribbon' && (
        <div className="pointer-events-none absolute -top-4 left-1/2 z-20 -translate-x-1/2">
          <WashiTape variant="pink" className="w-20 h-5" />
        </div>
      )}

      {memory.frameStyle === 'gingham-heart' && (
        <div className="pointer-events-none absolute -top-3 left-1/2 z-20 -translate-x-1/2 rotate-2">
          <WashiTape variant="gingham" />
        </div>
      )}

      {/* Decorative Sticker around the frame */}
      <div
        className={`pointer-events-none absolute z-20 transition-transform duration-200 group-hover:scale-110 ${
          memory.index % 2 === 0 ? '-bottom-3 -left-3 -rotate-12' : '-bottom-3 -right-3 rotate-12'
        }`}
      >
        <StickerBadge kind={memory.sticker} />
      </div>

      {/* Main Polaroid Frame */}
      <div
        className={`relative rounded-sm border p-3.5 pb-5 polaroid-shadow transition-all duration-200 ease-out group-hover:-translate-y-1.5 group-hover:rotate-0 group-hover:polaroid-shadow-hover ${frameTintMap[memory.frameStyle]}`}
      >
        {/* Photo Click Area -> Opens Lightbox */}
        <button
          type="button"
          onClick={() => onOpenLightbox(memory)}
          aria-label={`Perbesar foto ${memory.index}: ${caption}`}
          className="relative block w-full overflow-hidden rounded-[2px] bg-[#EEF6F2] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#1D6B57] cursor-zoom-in"
        >
          <div className="aspect-[4/3] w-full overflow-hidden">
            {!imageError ? (
              <img
                src={memory.src}
                alt={memory.alt}
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="sync"
                onError={() => setImageError(true)}
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#FFB8C8]/45 via-[#FFFDF8] to-[#C8F0DF]/60 p-4 text-center">
                <span className="font-serif text-base font-medium text-[#1E263B]">
                  {memory.dateLabel}
                </span>
                <span className="mt-1 text-xs text-[#525B76]">
                  Letakkan foto di {memory.src}
                </span>
              </div>
            )}
          </div>

          {/* Subtle hover prompt inside photo corner */}
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-[#1E263B]/82 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Lihat Foto
          </span>
        </button>

        {/* Bottom Polaroid Margin: Index Label + Editable Caption */}
        <div className="mt-3.5 px-1">
          <div className="flex items-center justify-between text-xs text-[#5B647F]">
            <span>{memory.dateLabel}</span>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                aria-label={`Edit keterangan foto ${memory.index}`}
                className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium text-[#525B76] transition-colors hover:bg-[#F3EEFF] hover:text-[#1E263B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6B57] cursor-pointer"
              >
                <Pencil className="h-3 w-3" aria-hidden="true" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {!isEditing ? (
            <p className="mt-1.5 font-serif text-[15px] italic leading-snug text-[#1E263B]">
              “{caption}”
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="mt-2 space-y-2"
            >
              <label htmlFor={`caption-input-${memory.id}`} className="sr-only">
                Keterangan foto {memory.index}
              </label>
              <input
                ref={inputRef}
                id={`caption-input-${memory.id}`}
                type="text"
                maxLength={140}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    e.stopPropagation();
                    handleCancel();
                  }
                }}
                className="w-full rounded-md border border-[#C9BFF0] bg-white px-2.5 py-1.5 text-sm text-[#1E263B] focus:border-[#1D6B57] focus:outline-none"
                placeholder="Tulis catatan kenangan..."
              />
              <div className="flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center gap-1 rounded-md border border-[#D7CEF0] bg-white px-2.5 py-1 text-xs font-medium text-[#525B76] hover:bg-[#F5F2FC] cursor-pointer"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                  <span>Batal</span>
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-md bg-[#1D6B57] px-2.5 py-1 text-xs font-medium text-white hover:bg-[#175746] cursor-pointer"
                >
                  <Check className="h-3 w-3" aria-hidden="true" />
                  <span>Simpan</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.article>
  );
}
