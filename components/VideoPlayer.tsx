'use client';

import { useState, useRef } from 'react';
import { getVideoUrl, getAudioDownloadUrl, getVideoDownloadUrl, VIDEO_TYPES, VideoType } from '@/lib/videos';

// Daf page images are hosted on assets.dafapp.com
// URL pattern: https://assets.dafapp.com/dappim/{masechta}/{daf}/a.png
function getDafImageUrl(masechta: string, daf: number, side: 'a' | 'b') {
  return `https://assets.dafapp.com/dappim/${masechta}/${daf}/${side}.png`;
}

type Props = {
  masechta: string;
  daf: number;
  initialType?: VideoType;
};

export default function VideoPlayer({ masechta, daf, initialType = 'intro' }: Props) {
  const [selectedType, setSelectedType] = useState<VideoType>(initialType);
  const [mode, setMode] = useState<'video' | 'audio'>('video');
  const [dafSide, setDafSide] = useState<'a' | 'b'>('a');
  const [imgError, setImgError] = useState(false);

  const mediaUrl = getVideoUrl(masechta, daf, selectedType);

  return (
    <div className="w-full space-y-3">

      {/* ── Type tabs ── */}
      <div className="grid grid-cols-3 gap-2">
        {VIDEO_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => { setSelectedType(type.id); setImgError(false); }}
            className={`py-2.5 px-2 rounded-xl text-sm font-semibold transition-all border ${
              selectedType === type.id
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-500 border-gray-200 hover:border-gray-300 hover:text-slate-700'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* ── Shiur: split layout (daf image + small rabbi video) ── */}
      {selectedType === 'shiur' ? (
        <div className="space-y-3">
          {/* Side A / Side B toggle */}
          <div className="flex gap-2">
            {(['a', 'b'] as const).map((side) => (
              <button
                key={side}
                onClick={() => setDafSide(side)}
                className={`py-1.5 px-4 rounded-full text-xs font-semibold border transition-colors ${
                  dafSide === side
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-white text-slate-400 border-gray-200 hover:border-slate-300'
                }`}
              >
                {side === 'a' ? 'Amud Aleph (א)' : 'Amud Beis (ב)'}
              </button>
            ))}
          </div>

          {/* Split view */}
          <div className="flex flex-col lg:flex-row gap-4 items-start">

            {/* Daf image — large */}
            <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden bg-stone-50 min-h-96 flex items-center justify-center">
              {!imgError ? (
                <img
                  key={`${masechta}-${daf}-${dafSide}`}
                  src={getDafImageUrl(masechta, daf, dafSide)}
                  alt={`${masechta} ${daf}${dafSide}`}
                  className="w-full h-auto"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="text-center py-16 px-6">
                  <p className="text-slate-400 text-sm font-medium">Daf image not available</p>
                  <p className="text-slate-300 text-xs mt-1">Audio shiur playing below</p>
                </div>
              )}
            </div>

            {/* Rabbi video — small */}
            <div className="w-full lg:w-72 flex-shrink-0 space-y-3">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                Rabbi Shlomie Schwartzberg
              </p>
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-black">
                {mode === 'video' ? (
                  <video
                    key={`${masechta}-${daf}-shiur-video`}
                    src={mediaUrl}
                    controls
                    autoPlay
                    className="w-full aspect-video"
                    preload="metadata"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 gap-4 bg-slate-900">
                    <audio
                      key={`${masechta}-${daf}-shiur-audio`}
                      src={mediaUrl}
                      controls
                      autoPlay
                      className="w-full max-w-xs"
                      preload="metadata"
                    />
                  </div>
                )}
              </div>

              {/* Video / Audio toggle */}
              <div className="flex gap-2">
                {(['video', 'audio'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`py-1.5 px-3 rounded-full text-xs font-semibold border transition-colors ${
                      mode === m
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-white text-slate-400 border-gray-200 hover:border-slate-300'
                    }`}
                  >
                    {m === 'video' ? 'Video' : 'Audio Only'}
                  </button>
                ))}
              </div>

              {/* Download links */}
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Download:</span>
                <a href={getAudioDownloadUrl(masechta, daf)} className="hover:text-indigo-600 transition-colors font-medium" target="_blank" rel="noopener noreferrer">Audio</a>
                <span>&middot;</span>
                <a href={getVideoDownloadUrl(masechta, daf)} className="hover:text-indigo-600 transition-colors font-medium" target="_blank" rel="noopener noreferrer">Video</a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Intro / Review: standard full video player ── */
        <div className="space-y-3">
          {/* Video / Audio toggle */}
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

          {/* Player */}
          <div className="rounded-xl overflow-hidden border border-gray-200 bg-black">
            {mode === 'video' ? (
              <video
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

          {/* Download links */}
          <div className="flex items-center gap-4 pt-1 text-sm text-slate-400">
            <span>Download:</span>
            <a href={getAudioDownloadUrl(masechta, daf)} className="hover:text-indigo-600 transition-colors font-medium" target="_blank" rel="noopener noreferrer">Audio</a>
            <span>&middot;</span>
            <a href={getVideoDownloadUrl(masechta, daf)} className="hover:text-indigo-600 transition-colors font-medium" target="_blank" rel="noopener noreferrer">Video</a>
          </div>
        </div>
      )}

    </div>
  );
}
