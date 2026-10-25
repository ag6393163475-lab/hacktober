import React, { useState } from 'react';
import { Sparkles, ZoomIn } from 'lucide-react';
import { getOptimizedImageUrl, getThumbnailUrl, getDetailImageUrl } from '../../services/cloudinaryUtils';

export default function MultiAngleGallery({ images = [], title = 'Product' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-[#F3EFE6] rounded-2xl flex items-center justify-center text-gray-400 font-serif text-sm">
        No photographic evidence logged
      </div>
    );
  }

  const activeImage = images[selectedIndex] || images[0];
  const detailUrl = getDetailImageUrl(activeImage.secureUrl);

  const angleLabels = {
    FRONT: 'Front View',
    BACK: 'Back View',
    SIDE: 'Side Silhouette',
    CLOSEUP: 'Fabric & Zari Macro',
    TAG: 'Brand Tag & Hologram'
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 font-sans">
      {/* 1. Thumbnail Selector Strip */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-thin">
        {images.map((img, idx) => {
          const isSelected = idx === selectedIndex;
          const thumbUrl = getThumbnailUrl(img.secureUrl);

          return (
            <button
              key={idx}
              onClick={() => {
                setSelectedIndex(idx);
                setIsZoomed(false);
              }}
              className={`relative flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border transition-all duration-300 text-left group ${
                isSelected
                  ? 'border-[#C8A26A] ring-2 ring-[#C8A26A]/40 shadow-sm scale-102'
                  : 'border-[#E8E3D9] hover:border-gray-400 opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={thumbUrl}
                alt={`${title} - ${img.viewType}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <span className="absolute bottom-0 inset-x-0 bg-[#0F0F11]/85 text-[8px] font-bold uppercase tracking-widest text-white text-center py-0.5 truncate px-1">
                {img.viewType}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Main Large Image Display */}
      <div className="relative flex-1 bg-[#F3EFE6] rounded-3xl overflow-hidden border border-[#E8E3D9] shadow-aesthetic aspect-[3/4] max-h-[660px] group">
        <img
          src={detailUrl}
          alt={`${title} - ${activeImage.viewType}`}
          className={`w-full h-full object-cover object-top transition duration-500 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in group-hover:scale-102'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Cloudinary Metadata Pill */}
        <div className="absolute top-4 left-4 bg-[#0F0F11]/80 backdrop-blur-md text-[#E8DBC3] text-xs px-3.5 py-1.5 rounded-full flex items-center space-x-2 border border-white/10 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A26A] animate-spin-slow" />
          <span className="font-medium tracking-wide">{angleLabels[activeImage.viewType] || activeImage.viewType}</span>
          <span className="text-[9px] uppercase tracking-widest bg-[#C8A26A]/20 text-[#E8DBC3] px-2 py-0.5 rounded font-bold">
            f_auto,q_auto
          </span>
        </div>

        {/* Zoom Hint */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-lg backdrop-blur-sm transition"
          title="Click to Zoom"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Cloudinary Public ID Indicator */}
        <div className="absolute bottom-4 left-4 bg-[#0F0F11]/70 backdrop-blur-sm text-[10px] text-gray-300 px-3 py-1 rounded-full font-mono border border-white/10">
          ID: {activeImage.publicId || activeImage.cloudinaryPublicId || 'fashion_rental/asset'}
        </div>
      </div>
    </div>
  );
}
