import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { getOptimizedImageUrl } from '../../services/cloudinaryUtils';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  const images = product.listingImages || [];
  const frontImage = images.find(img => img.viewType === 'FRONT') || images[0];
  const backOrSideImage = images.find(img => img.viewType === 'BACK') || images.find(img => img.viewType === 'SIDE') || frontImage;

  const activeImage = isHovered && backOrSideImage ? backOrSideImage : frontImage;
  const imageUrl = activeImage?.secureUrl || 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80';

  const optimizedSrc = getOptimizedImageUrl(imageUrl, {
    width: 600,
    height: 800,
    crop: 'fill',
    gravity: 'auto'
  });

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#E8E3D9] shadow-sm hover:shadow-aesthetic-hover hover:-translate-y-1 transition-all duration-500 flex flex-col font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Editorial Image Container (3:4 ratio) */}
      <div className="relative aspect-[3/4] bg-[#F3EFE6] overflow-hidden">
        <img
          src={optimizedSrc}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Floating Aesthetic Cloudinary Tag */}
        <div className="absolute top-3 left-3 bg-[#0F0F11]/80 backdrop-blur-md text-[#E8DBC3] text-[9px] uppercase tracking-[0.18em] font-medium px-2.5 py-1 rounded-full border border-white/10 flex items-center space-x-1 shadow-sm">
          <Sparkles className="w-2.5 h-2.5 text-[#C8A26A]" />
          <span>Cloudinary Verified</span>
        </div>

        {/* Condition Grade Pill */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#0F0F11] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm border border-[#E8E3D9] flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{product.currentCondition || 'EXCELLENT'}</span>
        </div>

        {/* Angle View Hint */}
        {isHovered && backOrSideImage && (
          <div className="absolute bottom-3 right-3 bg-[#0F0F11]/85 text-[#E8DBC3] text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
            View: {backOrSideImage.viewType}
          </div>
        )}
      </div>

      {/* Editorial Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Brand & Category */}
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-[10px] font-bold text-[#9E7A45] uppercase tracking-[0.25em]">
              {product.brand}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold bg-[#F3EFE6] px-2 py-0.5 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Title in Cormorant Garamond */}
          <h3 className="font-serif text-lg font-medium text-[#0F0F11] group-hover:text-[#9E7A45] line-clamp-1 transition duration-300">
            {product.title}
          </h3>

          {/* Sizes */}
          <div className="flex items-center space-x-1.5 mt-1.5 text-[11px] text-gray-500 font-normal">
            <span className="text-gray-400">Available:</span>
            <span className="font-medium text-gray-700">
              {Array.isArray(product.size)
                ? product.size.join(', ')
                : (typeof product.size === 'string' ? product.size : 'Free Size')}
            </span>
          </div>
        </div>

        {/* Price Matrix */}
        <div className="pt-3 border-t border-[#E8E3D9]">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">
                Rental Fee (20%)
              </span>
              <span className="text-xl font-serif font-bold text-[#0F0F11]">
                ₹{product.rentalPrice?.toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-400 font-normal ml-1">/ 3 days</span>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-400 line-through block">
                ₹{product.actualPrice?.toLocaleString()}
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                Save 80%
              </span>
            </div>
          </div>

          {/* Deposit Note */}
          <div className="mt-2.5 flex justify-between items-center text-[10px] bg-[#F3EFE6] text-[#7A5C2D] px-2.5 py-1 rounded-lg border border-[#E8E3D9]">
            <span className="uppercase tracking-wider font-semibold">30% Refundable Deposit:</span>
            <span className="font-bold">₹{product.securityDeposit?.toLocaleString()}</span>
          </div>

          {/* Action CTA */}
          <Link
            to={`/product/${product._id}`}
            className="mt-3.5 w-full bg-[#0F0F11] text-white hover:bg-[#C8A26A] hover:text-[#0F0F11] py-2.5 rounded-xl text-xs font-semibold tracking-[0.15em] uppercase flex items-center justify-center space-x-1.5 transition-all duration-300 shadow-sm"
          >
            <span>View Piece & Rent</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
}
