'use client';

import { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    videoRef.current?.load();
    audioRef.current?.load();
  }, [selectedType]);

  return (
    <div className="w-full space-y-4">

      {/* ── Shiur type tabs ── */}
      <div className="grid grid-cols-3 gap-2">
        {VIDEO_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all border ${
              selectedType === type.id
                ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                : 'bg-white text-slate-600 border-gray-200 hover:border-amber-300 hover:text-amber-600'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* ── Video / Audio toggle ── */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('video')}
          className={`flex items-center gap-2 py-1.5 px-4 rounded-full text-sm font-medium border transition-colors ${
            mode === 'video'
              ? 'bg-slate-800 text-white border-slate-800'
              : 'bg-white text-slate-500 border-gray-200 hover:border-slate-400'
          }`}
        >
          🎬 Video
        </button>
        <button
          onClick={() => setMode('audio')}
          className={`flex items-center gap-2 py-1.5 px-4 rounded-full text-sm font-medium border transition-colors ${
            mode === 'audio'
              ? 'bg-slate-800 text-white border-slate-800'
              : 'bg-white text-slate-500 border-gray-200 hover:border-slate-400'
          }`}
        >
          🎧 Audio Only
        </button>
      </div>

      {/* ── Player ── */}
      <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
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
          <div className="flex flex-col items-center justify-center py-14 px-6 gap-5 bg-slate-800 min-h-48">
            <div className="text-7xl">🎧</div>
            <p className="text-slate-400 text-sm">{VIDEO_TYPES.find(t => t.id === selectedType)?.label}</p>
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
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-medium">Download Resources</p>
        <div className="flex flex-wrap gap-4">
          <a
            href={getAudioDownloadUrl(masechta, daf)}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            🎵 Audio Only
          </a>
          <span className="text-gray-300">|</span>
          <a
            href={getVideoDownloadUrl(masechta, daf)}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            📥 Video
          </a>
        </div>
      </div>

    </div>
  );
}
