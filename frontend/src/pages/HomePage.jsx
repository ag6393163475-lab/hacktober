import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, RotateCcw, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import api from '../api/client';
import ProductCard from '../components/product/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const { data } = await api.get('/products');
        if (data.success) {
          setProducts(data.products || []);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  return (
    <div className="space-y-20 pb-20 font-sans">
      {/* 1. Ultra-Aesthetic Editorial Hero Banner */}
      <section className="relative overflow-hidden bg-[#0F0F11] text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#24242A]">
        {/* Subtle Luxury Radial Gold Lighting */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C8A26A]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#C8A26A]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-[#C8A26A]/40 px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.22em] text-[#E8DBC3] shadow-sm">
              <Sparkles className="w-3 h-3 text-[#C8A26A] animate-spin-slow" />
              <span>THE ARCHIVAL RENTAL COLLECTION • 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08]">
              Wear Haute Couture at{' '}
              <span className="font-normal italic text-[#C8A26A] underline decoration-[#C8A26A]/30 decoration-1 underline-offset-8">
                20% of Retail
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed font-light">
              Experience the pinnacle of designer fashion without full retail ownership. Sabyasachi bridal lehengas, bespoke Tom Ford tuxedos, Christian Louboutin heels, and Chanel accessories — verified before every rental with multi-angle Cloudinary visual evidence.
            </p>

            {/* Business Model Formula Banner */}
            <div className="bg-[#17171B]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-lg text-left grid grid-cols-3 gap-3 text-xs shadow-aesthetic">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Rental Fee</span>
                <span className="text-emerald-400 font-bold text-sm sm:text-base">20% of MRP</span>
                <span className="text-[9px] text-gray-400 block">Save 80%</span>
              </div>
              <div className="space-y-0.5 border-l border-white/10 pl-3">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Security Deposit</span>
                <span className="text-[#C8A26A] font-bold text-sm sm:text-base">30% (Refundable)</span>
                <span className="text-[9px] text-gray-400 block">Instant Wallet / Source</span>
              </div>
              <div className="space-y-0.5 border-l border-white/10 pl-3">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Initial Payment</span>
                <span className="text-white font-bold text-sm sm:text-base">50% Total</span>
                <span className="text-[9px] text-gray-400 block">Rent + Deposit</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/catalog"
                className="bg-[#C8A26A] hover:bg-[#9E7A45] text-[#0F0F11] font-bold px-8 py-3.5 rounded-full text-xs tracking-[0.18em] uppercase transition shadow-lg flex items-center space-x-2"
              >
                <span>Explore Wardrobe</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/catalog?category=CLOTHES"
                className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-full text-xs tracking-[0.18em] uppercase transition"
              >
                Bridal & Evening Gowns
              </Link>
            </div>
          </div>

          {/* Right Editorial Lookbook Spotlight */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm bg-gradient-to-b from-[#24242A] to-[#0F0F11] p-3 rounded-3xl border border-white/10 shadow-2xl">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                  alt="Sabyasachi Heritage Lehenga"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11]/90 via-transparent to-black/20"></div>

                {/* Cloudinary Floating Pill */}
                <div className="absolute top-3 left-3 bg-[#0F0F11]/85 backdrop-blur-md text-[#E8DBC3] text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full border border-[#C8A26A]/40 flex items-center space-x-1.5 shadow">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8A26A]" />
                  <span>5-Angle Cloudinary Proof</span>
                </div>

                {/* Details Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs space-y-1.5">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A26A] font-bold block">
                    Sabyasachi Heritage
                  </span>
                  <h4 className="font-serif text-lg font-medium text-[#FAF8F5]">
                    Royal Crimson Bridal Lehenga
                  </h4>
                  <div className="flex justify-between items-center pt-2 text-[11px] border-t border-white/15">
                    <span className="text-gray-400">Retail: <strike>₹1,20,000</strike></span>
                    <span className="text-emerald-400 font-bold text-sm">Rent: ₹24,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Luxury Gateways (Clothes, Shoes, Accessories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7A45] font-bold block mb-1">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#0F0F11]">
            Explore by Haute Category
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Sanitized, UV-sterilized, pressed, and insured designer fashion delivered with white-glove logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Clothes */}
          <Link
            to="/catalog?category=CLOTHES"
            className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-900 shadow-aesthetic hover:shadow-aesthetic-hover transition-all duration-500 border border-[#E8E3D9]"
          >
            <img
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
              alt="Haute Couture Clothes"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11]/90 via-[#0F0F11]/25 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A26A] font-bold block">
                Volume 01 • Garments
              </span>
              <h3 className="font-serif text-2xl font-medium">Clothes & Gowns</h3>
              <p className="text-xs text-gray-300 font-light">
                Bridal lehengas, velvet tuxedos, and silk cocktail dresses.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-[#E8DBC3] group-hover:text-white transition">
                <span>Browse Clothes</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </Link>

          {/* Shoes */}
          <Link
            to="/catalog?category=SHOES"
            className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-900 shadow-aesthetic hover:shadow-aesthetic-hover transition-all duration-500 border border-[#E8E3D9]"
          >
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
              alt="Designer Footwear"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11]/90 via-[#0F0F11]/25 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A26A] font-bold block">
                Volume 02 • Footwear
              </span>
              <h3 className="font-serif text-2xl font-medium">Designer Shoes</h3>
              <p className="text-xs text-gray-300 font-light">
                Christian Louboutin red-bottom pumps, Gucci loafers, and satin flats.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-[#E8DBC3] group-hover:text-white transition">
                <span>Browse Footwear</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </Link>

          {/* Accessories */}
          <Link
            to="/catalog?category=ACCESSORIES"
            className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-900 shadow-aesthetic hover:shadow-aesthetic-hover transition-all duration-500 border border-[#E8E3D9]"
          >
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
              alt="Luxury Accessories"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11]/90 via-[#0F0F11]/25 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A26A] font-bold block">
                Volume 03 • Heritage
              </span>
              <h3 className="font-serif text-2xl font-medium">Fine Accessories</h3>
              <p className="text-xs text-gray-300 font-light">
                Chanel quilted caviar flap bags, Kundan choker necklaces, and brooches.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-[#E8DBC3] group-hover:text-white transition">
                <span>Browse Accessories</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Featured Archival Wardrobe Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 border-b border-[#E8E3D9] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7A45] font-bold block mb-1">
              The Curated Archive
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#0F0F11]">
              Trending Runway Pieces
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs uppercase tracking-[0.18em] font-bold text-[#0F0F11] hover:text-[#9E7A45] transition flex items-center space-x-1"
          >
            <span>View All ({products.length} pieces)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="aspect-[3/4] bg-[#F3EFE6] rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map(prod => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        )}
      </section>

      {/* 4. The Cloudinary Visual Condition Lifecycle Showcase */}
      <section className="bg-[#FAF8F5] border-y border-[#E8E3D9] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A5C2D] font-bold bg-[#F3EFE6] px-3.5 py-1.5 rounded-full border border-[#E8E3D9]">
              Visual Accountability Engine
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#0F0F11] mt-3">
              The 5-Stage Cloudinary Condition Audit
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 font-light">
              Never get charged for pre-existing damage. Every garment's journey is verified before dispatch and upon return.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8E3D9] shadow-aesthetic hover:shadow-aesthetic-hover transition duration-300">
              <span className="font-serif text-2xl font-light text-[#C8A26A] block mb-2">01.</span>
              <h4 className="font-serif text-base font-semibold text-[#0F0F11]">Pre-Dispatch Proof</h4>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-light">
                Admin captures 5 Cloudinary angles (Front, Back, Left, Right, Close-up) before packaging into vacuum garment bags.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E3D9] shadow-aesthetic hover:shadow-aesthetic-hover transition duration-300">
              <span className="font-serif text-2xl font-light text-[#C8A26A] block mb-2">02.</span>
              <h4 className="font-serif text-base font-semibold text-[#0F0F11]">Customer Verification</h4>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-light">
                Customer verifies intact condition or submits video evidence under the 7-Day Defective Product Policy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E3D9] shadow-aesthetic hover:shadow-aesthetic-hover transition duration-300">
              <span className="font-serif text-2xl font-light text-[#C8A26A] block mb-2">03.</span>
              <h4 className="font-serif text-base font-semibold text-[#0F0F11]">Return Proof</h4>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-light">
                Customer and delivery logistics partner upload return photos before collection to Cloudinary CDN.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E3D9] shadow-aesthetic hover:shadow-aesthetic-hover transition duration-300">
              <span className="font-serif text-2xl font-light text-[#C8A26A] block mb-2">04.</span>
              <h4 className="font-serif text-base font-semibold text-[#0F0F11]">Inspection & Refund</h4>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-light">
                Admin reviews Before vs After images side-by-side. 30% deposit is refunded to your App Wallet or Original Card.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
