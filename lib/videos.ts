const CLOUDFRONT = 'https://d1dfww48jrranm.cloudfront.net';
const DAF_AUDIO  = 'https://audio.dafapp.com';
const OLD_API    = 'https://dafhachaim.org/api/dappim';

// Rackspace server — PDFs and other legacy resources live here.
// Update this one constant if the IP ever changes.
export const LEGACY_SERVER = 'http://198.101.226.202';

export type VideoType = 'intro' | 'shiur' | 'review';

export const VIDEO_TYPES: { id: VideoType; label: string; description: string }[] = [
  { id: 'intro',  label: '8 Minute Intro',  description: 'A concise visual introduction to the daf' },
  { id: 'shiur',  label: 'Full Daf Shiur',    description: 'Complete shiur with synchronized highlighted text' },
  { id: 'review', label: '8 Minute Review', description: 'Animated visual review of key concepts' },
];

// Older masechtos use .mp4 (not .webm) and review is on audio.dafapp.com
const LEGACY_MP4_MASECHTOS = new Set(['succah', 'horayos']);

export function getVideoUrl(masechta: string, daf: number, type: VideoType): string {
  if (type === 'shiur') {
    return `${DAF_AUDIO}/${masechta}_${daf}.shiur_150.webm`;
  }
  if (LEGACY_MP4_MASECHTOS.has(masechta)) {
    if (type === 'review') {
      return `${DAF_AUDIO}/${masechta}_${daf}.review_720.mp4`;
    }
    return `${CLOUDFRONT}/${masechta}_${daf}.intro_720.mp4`;
  }
  return `${CLOUDFRONT}/${masechta}_${daf}.${type}_720.webm`;
}

// Audio streams from the same file — browser plays just the audio track
export function getAudioUrl(masechta: string, daf: number, type: VideoType): string {
  return getVideoUrl(masechta, daf, type);
}

// Download links — routed through our proxy (/api/pdf/[...path]) which
// fetches from the Rackspace server server-side, bypassing its bad SSL cert.
export function getAudioDownloadUrl(masechta: string, daf: number): string {
  return `/api/pdf/${masechta}_${daf}/download/audio`;
}

export function getVideoDownloadUrl(masechta: string, daf: number): string {
  return `/api/pdf/${masechta}_${daf}/download/video`;
}

// PDFs are currently broken on the Rackspace server (500 error).
// These functions are kept for when the server is fixed.
export function getPdfColorUrl(masechta: string, daf: number): string {
  return `/api/pdf/${masechta}_${daf}/download/pdf/color`;
}

export function getPdfBwUrl(masechta: string, daf: number): string {
  return `/api/pdf/${masechta}_${daf}/download/pdf/bw`;
}
