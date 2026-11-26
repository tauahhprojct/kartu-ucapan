export type PolaroidFrameStyle =
  | 'pink-washi'
  | 'lavender-corners'
  | 'butter-double-tape'
  | 'cream-ribbon'
  | 'gingham-heart';

export type StickerKind = 'daisy' | 'star' | 'ribbon' | 'paperclip' | 'heart';

export interface MemoryPhoto {
  id: string;
  index: number;
  /** Mudah diganti dengan menaruh file baru di folder public/images/ */
  src: string;
  alt: string;
  defaultCaption: string;
  memoryNote: string;
  dateLabel: string;
  frameStyle: PolaroidFrameStyle;
  sticker: StickerKind;
  tiltDeg: number;
  offsetClass: string;
}

export const RECIPIENT_NAME = 'Pak Budi';

export const MEMORIES: MemoryPhoto[] = [
  {
    id: 'foto-1',
    index: 1,
    src: '/images/foto1.jpeg',
    alt: 'Pak Budi dan seorang rekan berfoto bersama dua pegawai yang memegang dokumen',
    defaultCaption: 'Senyum bersama dan dua dokumen yang menjadi bagian dari cerita hari ini.',
    memoryNote:
      'Momen berfoto bersama dua rekan yang memegang dokumen, di tengah suasana akrab di kantor.',
    dateLabel: 'Kenangan 01',
    frameStyle: 'pink-washi',
    sticker: 'daisy',
    tiltDeg: -2.2,
    offsetClass: 'lg:translate-y-0',
  },
  {
    id: 'foto-2',
    index: 2,
    src: '/images/foto2.jpeg',
    alt: 'Pak Budi dan seorang rekan menunjuk ke arah dua pegawai yang memegang dokumen',
    defaultCaption: 'Dua rekan menunjukkan dokumen, disambut senyum dan gestur bangga.',
    memoryNote:
      'Potret kebersamaan di kantor yang menangkap dukungan dan kebanggaan untuk rekan-rekan.',
    dateLabel: 'Kenangan 02',
    frameStyle: 'lavender-corners',
    sticker: 'paperclip',
    tiltDeg: 1.8,
    offsetClass: 'lg:translate-y-8',
  },
  {
    id: 'foto-3',
    index: 3,
    src: '/images/foto3.jpeg',
    alt: 'Sekelompok rekan kerja berfoto bersama di kantor sambil membawa kue',
    defaultCaption: 'Satu ruangan, banyak senyum, dan kue untuk dirayakan bersama.',
    memoryNote:
      'Rekan-rekan berkumpul di kantor untuk merayakan momen bersama dengan sebuah kue.',
    dateLabel: 'Kenangan 03',
    frameStyle: 'butter-double-tape',
    sticker: 'star',
    tiltDeg: -1.4,
    offsetClass: 'lg:translate-y-2',
  },
  {
    id: 'foto-4',
    index: 4,
    src: '/images/foto4.jpeg',
    alt: 'Rekan-rekan kerja berpose ceria bersama di kantor sambil mengelilingi kue',
    defaultCaption: 'Pose ceria dan jari-jari yang kompak menunjuk ke tengah.',
    memoryNote:
      'Suasana perayaan terasa makin meriah dengan ekspresi dan gaya unik dari setiap orang.',
    dateLabel: 'Kenangan 04',
    frameStyle: 'cream-ribbon',
    sticker: 'ribbon',
    tiltDeg: 2.1,
    offsetClass: 'lg:-translate-y-2',
  },
  {
    id: 'foto-5',
    index: 5,
    src: '/images/foto5.jpeg',
    alt: 'Potret kelompok rekan kerja di kantor dengan Pak Budi memegang kue di tengah',
    defaultCaption: 'Berkumpul mengelilingi kue, menyimpan satu momen untuk dikenang.',
    memoryNote:
      'Potret bersama di kantor, dengan Pak Budi dan kue menjadi pusat perhatian.',
    dateLabel: 'Kenangan 05',
    frameStyle: 'gingham-heart',
    sticker: 'heart',
    tiltDeg: -1.8,
    offsetClass: 'lg:translate-y-5',
  },
];

export const FAREWELL_MESSAGE_PARAGRAPHS = [
  'Terima kasih atas segala bimbingan, arahan, pengalaman, dan kebaikan yang telah diberikan selama ini.',
  'Setiap langkah dan cerita selama perjalanan pelayanan akan menjadi kenangan yang berharga bagi kami.',
  'Selamat menikmati masa purna tugas. Semoga selalu diberikan kesehatan, kebahagiaan, dan waktu yang menyenangkan bersama keluarga.',
  'Terima kasih telah menjadi bagian dari cerita kami.',
];

export const FAREWELL_CLOSING = 'Your dedication will always be remembered. ♡';
