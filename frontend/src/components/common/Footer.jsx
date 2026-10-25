import React from 'react';
import { ShieldCheck, RotateCcw, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F0F11] text-gray-400 pt-16 pb-12 border-t border-[#24242A] font-sans">
      {/* 4 Core Guarantees Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#24242A] text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-[#C8A26A]/30 text-[#C8A26A] flex items-center justify-center mb-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-white font-medium text-base">Cloudinary Condition Proof</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              5-angle condition verification before dispatch. Immutable visual audit records.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-[#C8A26A]/30 text-[#C8A26A] flex items-center justify-center mb-1">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-white font-medium text-base">30% Refundable Deposit</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Returned upon inspection to your App Wallet (Instant) or Original Payment Source.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-[#C8A26A]/30 text-[#C8A26A] flex items-center justify-center mb-1">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-white font-medium text-base">7-Day Defective Policy</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Report defective zippers or fit issues on delivery with Cloudinary video evidence.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-[#C8A26A]/30 text-[#C8A26A] flex items-center justify-center mb-1">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-white font-medium text-base">Medical UV Sanitisation</h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Hospital-grade steam sanitization and bespoke garment pressing after every rental.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-3">
            <span className="font-serif text-2xl font-normal tracking-[0.2em] text-white">
              COUTURE
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C8A26A] font-semibold block">
              The Luxury Rental Archive
            </span>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              India's premier luxury fashion rental destination for designer lehengas, bespoke tuxedos, Christian Louboutin pumps, and heritage accessories.
            </p>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-[#C8A26A] font-medium pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cloudinary Visual Engine Integration</span>
            </div>
          </div>

          {/* Transparent Pricing Matrix */}
          <div>
            <h4 className="font-serif text-sm text-white font-medium tracking-wider uppercase mb-3 text-[#E8DBC3]">
              Transparent Pricing Rules
            </h4>
            <ul className="space-y-1.5 text-xs font-light">
              <li>Retail Price (MRP): <span className="text-white font-normal">100%</span></li>
              <li>Rental Fee: <span className="text-emerald-400 font-semibold">20% of retail</span></li>
              <li>Refundable Deposit: <span className="text-[#C8A26A] font-semibold">30% (Refunded)</span></li>
              <li>Customer Pays Initially: <span className="text-white font-semibold">50% Total</span></li>
              <li>Late Return: <span className="text-rose-400">2%/day overdue</span></li>
            </ul>
          </div>

          {/* Rental Collections */}
          <div>
            <h4 className="font-serif text-sm text-white font-medium tracking-wider uppercase mb-3 text-[#E8DBC3]">
              Haute Collections
            </h4>
            <ul className="space-y-1.5 text-xs font-light">
              <li><a href="/catalog?category=CLOTHES" className="hover:text-white transition">Bridal Lehengas & Gowns</a></li>
              <li><a href="/catalog?category=CLOTHES" className="hover:text-white transition">Silk-Velvet Tuxedos</a></li>
              <li><a href="/catalog?category=SHOES" className="hover:text-white transition">Louboutin Stilettos & Loafers</a></li>
              <li><a href="/catalog?category=ACCESSORIES" className="hover:text-white transition">Kundan Chokers & Chanel Flap Bags</a></li>
            </ul>
          </div>

          {/* Evidence Rights */}
          <div>
            <h4 className="font-serif text-sm text-white font-medium tracking-wider uppercase mb-3 text-[#E8DBC3]">
              Visual Accountability
            </h4>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed font-light">
              Every garment's visual inspection history is permanently recorded using Cloudinary public IDs and signed media tokens.
            </p>
            <div className="bg-[#17171B] border border-[#24242A] rounded-xl p-3 text-[11px] text-gray-300">
              <span className="text-[#C8A26A] font-semibold block mb-0.5">Renter Dispute Rights</span>
              Penalties are never auto-charged without side-by-side evidence inspection.
            </div>
          </div>
        </div>

        <div className="border-t border-[#24242A] pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 font-light">
          <p>© 2026 COUTURE Fashion Rental Inc. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Powered by React, Tailwind CSS, Express, MongoDB & Cloudinary API</p>
        </div>
      </div>
    </footer>
  );
}
