const CLOUDFRONT = 'https://d1dfww48jrranm.cloudfront.net';
const DAF_AUDIO  = 'https://audio.dafapp.com';           // Shiur lives here
const OLD_API    = 'https://dafhachaim.org/api/dappim';

export type VideoType = 'intro' | 'shiur' | 'review';

export const VIDEO_TYPES: { id: VideoType; label: string; description: string }[] = [
  { id: 'intro',  label: 'One Minute Intro', description: 'A concise visual introduction to the daf' },
  { id: 'shiur',  label: 'Full Daf Shiur',   description: 'Complete shiur with synchronized highlighted text' },
  { id: 'review', label: 'Five Minute Review', description: 'Animated visual review of key concepts' },
];

export function getVideoUrl(masechta: string, daf: number, type: VideoType): string {
  if (type === 'shiur') {
    // Shiur is hosted on a different CDN at lower bitrate (audio + daf text display)
    return `${DAF_AUDIO}/${masechta}_${daf}.shiur_150.webm`;
  }
  return `${CLOUDFRONT}/${masechta}_${daf}.${type}_720.webm`;
}

// Audio streams from the same WebM file — browser plays just the audio track
export function getAudioUrl(masechta: string, daf: number, type: VideoType): string {
  return getVideoUrl(masechta, daf, type);
}

// Download links still use the old server API (will update once new hosting is set up)
export function getAudioDownloadUrl(masechta: string, daf: number): string {
  return `${OLD_API}/${masechta}_${daf}/download/audio`;
}

export function getVideoDownloadUrl(masechta: string, daf: number): string {
  return `${OLD_API}/${masechta}_${daf}/download/video`;
}
