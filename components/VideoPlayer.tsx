'use client';

import { useState, useRef } from 'react';
import { getVideoUrl, getAudioDownloadUrl, getVideoDownloadUrl, VIDEO_TYPES, VideoType } from '@/lib/videos';

type Props = {
  masechta: string;
  daf: number;
  initialType?: VideoType;
};

export default function VideoPlayer({ masechta, daf, initialType = 'intro' }: Props) {
  const [selectedType, setSelectedType] = useState<VideoType>(initialType);
  const [mode, setMode] = useState<'video' | 'audio'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const mediaUrl = getVideoUrl(masechta, daf, selectedType);

  return (
    <div className="w-full space-y-3">

      {/* ── Type tabs ── */}
      <div className="grid grid-cols-3 gap-2">
        {VIDEO_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`py-2.5 px-2 rounded-xl text-sm font-semibold transition-all border ${
              selectedType === type.id
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white text-slate-500 border-gray-200 hover:border-gray-300 hover:text-slate-700'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* ── Video / Audio toggle ── */}
      <div className="flex gap-2">
        {(['video', 'audio'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`py-1.5 px-4 rounded-full text-xs font-semibold border transition-colors ${
              mode === m
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-400 border-gray-200 hover:border-slate-300'
            }`}
          >
            {m === 'video' ? 'Video' : 'Audio Only'}
          </button>
        ))}
      </div>

      {/* ── Player ── */}
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-black">
        {mode === 'video' ? (
          <video
            ref={videoRef}
            key={`${masechta}-${daf}-${selectedType}-video`}
            src={mediaUrl}
            controls
            autoPlay
            className="w-full aspect-video"
            preload="metadata"
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-5 bg-slate-900">
            <p className="text-slate-400 text-sm font-medium">
              {VIDEO_TYPES.find(t => t.id === selectedType)?.label}
            </p>
            <audio
              ref={audioRef}
              key={`${masechta}-${daf}-${selectedType}-audio`}
              src={mediaUrl}
              controls
              autoPlay
              className="w-full max-w-sm"
              preload="metadata"
            />
          </div>
        )}
      </div>

      {/* ── Download links ── */}
      <div className="flex items-center gap-4 pt-1 text-sm text-slate-400">
        <span>Download:</span>
        <a
          href={getAudioDownloadUrl(masechta, daf)}
          className="hover:text-amber-500 transition-colors font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          Audio
        </a>
        <span>&middot;</span>
        <a
          href={getVideoDownloadUrl(masechta, daf)}
          className="hover:text-amber-500 transition-colors font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          Video
        </a>
      </div>

    </div>
  );
}
