import React, { useState } from 'react';
import { ShieldCheck, Wrench, CheckCircle2, AlertTriangle, Calendar, User, Image as ImageIcon, Sparkles, X } from 'lucide-react';
import { getOptimizedImageUrl } from '../../services/cloudinaryUtils';

export default function ConditionTimeline({ history = [], currentCondition = 'EXCELLENT', title = '' }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!history || history.length === 0) {
    return (
      <div className="bg-white p-10 rounded-2xl border border-[#E8E3D9] text-center font-sans">
        <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
        <h4 className="font-serif text-lg font-medium text-gray-900">Pristine Archival Addition</h4>
        <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 font-light">
          This piece was freshly cataloged and verified in Excellent condition before entering our rental wardrobe.
        </p>
      </div>
    );
  }

  const getStageIcon = (stage) => {
    switch (stage) {
      case 'INITIAL_STOCK':
        return <Sparkles className="w-3.5 h-3.5 text-[#C8A26A]" />;
      case 'BEFORE_RENTAL':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />;
      case 'RETURNED':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      case 'INSPECTED':
        return <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />;
      case 'REPAIRED':
        return <Wrench className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <Calendar className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  const getBadgeStyle = (grade) => {
    switch (grade) {
      case 'EXCELLENT':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'MINOR_DAMAGE':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'MAJOR_DAMAGE':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'REPAIRED':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8E3D9] p-8 shadow-aesthetic font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E8E3D9] gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9E7A45] block mb-1">
            Cloudinary Visual Provenance
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0F0F11]">
            Product Condition Timeline
          </h3>
          <p className="text-xs text-gray-500 mt-1 font-light">
            Full lifecycle visual audit proof captured across rentals, dispatches, and returns.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Current State:</span>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getBadgeStyle(currentCondition)}`}>
            ⭐ {currentCondition}
          </span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E3D9]">
        {history.map((entry, index) => {
          const dateStr = new Date(entry.date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });

          return (
            <div key={index} className="relative group">
              {/* Bullet Node */}
              <div className="absolute -left-[27px] sm:-left-[35px] top-1 w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#C8A26A] flex items-center justify-center shadow-sm">
                {getStageIcon(entry.stage)}
              </div>

              {/* Event Card */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E8E3D9] hover:border-[#C8A26A] transition duration-300 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif text-base font-semibold text-[#0F0F11] tracking-wide">
                      {entry.stage.replace('_', ' ')}
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${getBadgeStyle(entry.conditionGrade || 'EXCELLENT')}`}>
                      {entry.conditionGrade || 'EXCELLENT'}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {dateStr}
                  </span>
                </div>

                {entry.customerName && (
                  <div className="flex items-center space-x-1.5 text-xs text-gray-600 font-light">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span>Rented to: <strong className="text-gray-900 font-medium">{entry.customerName}</strong></span>
                  </div>
                )}

                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  {entry.notes}
                </p>

                {/* Cloudinary Evidence Thumbnails */}
                {entry.evidence && entry.evidence.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-[#7A5C2D] uppercase tracking-[0.2em] block mb-2">
                      Cloudinary Verified Evidence:
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {entry.evidence.map((ev, evIdx) => {
                        const imgUrl = ev.secureUrl || ev.url;
                        const thumb = getOptimizedImageUrl(imgUrl, { width: 160, height: 160, crop: 'fill' });
                        return (
                          <div
                            key={evIdx}
                            onClick={() => setSelectedPhoto(imgUrl)}
                            className="relative w-16 h-20 rounded-xl overflow-hidden border border-[#E8E3D9] cursor-pointer hover:ring-2 hover:ring-[#C8A26A] transition group/photo shadow-sm"
                          >
                            <img
                              src={thumb}
                              alt="Cloudinary Evidence"
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition">
                              <ImageIcon className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="p-4 bg-[#0F0F11] text-white flex justify-between items-center text-xs">
              <span className="font-serif text-sm tracking-wide text-[#E8DBC3] flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-[#C8A26A]" />
                Cloudinary Authenticated Condition Proof
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 hover:bg-white/10 rounded-full transition"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>
            <div className="p-4 bg-[#FAF8F5] flex justify-center max-h-[75vh]">
              <img
                src={selectedPhoto}
                alt="Enlarged Evidence"
                className="max-h-full object-contain rounded-2xl shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
