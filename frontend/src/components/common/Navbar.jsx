import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Wallet,
  Bell,
  Search,
  Truck,
  LayoutDashboard,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

export default function Navbar({ onSearch }) {
  const { user, switchRole, notifications } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
    navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
  };

  const unreadCount = (notifications || []).filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 transition-all font-sans">
      {/* 1. Haute Couture Editorial Marquee */}
      <div className="bg-[#0F0F11] text-[#E8DBC3] text-[10px] tracking-[0.2em] uppercase py-1.5 overflow-hidden border-b border-[#24242A]">
        <div className="animate-marquee whitespace-nowrap flex space-x-8 items-center font-medium">
          <span className="inline-flex items-center">
            <Sparkles className="w-2.5 h-2.5 mr-2 text-[#C8A26A]" />
            THE ARCHIVE • LUXURY RENTALS AT 20% OF RETAIL
          </span>
          <span>•</span>
          <span>100% REFUNDABLE 30% SECURITY DEPOSIT</span>
          <span>•</span>
          <span className="text-[#C8A26A]">POWERED BY CLOUDINARY VISUAL CONDITION AUDITING</span>
          <span>•</span>
          <span>7-DAY DEFECTIVE PRODUCT PROTECTION</span>
          <span>•</span>
          <span>SANITISED & BESPOKE STEAM-PRESSED</span>
          <span>•</span>
          <span className="inline-flex items-center">
            <Sparkles className="w-2.5 h-2.5 mr-2 text-[#C8A26A]" />
            THE ARCHIVE • LUXURY RENTALS AT 20% OF RETAIL
          </span>
          <span>•</span>
          <span>100% REFUNDABLE 30% SECURITY DEPOSIT</span>
          <span>•</span>
          <span className="text-[#C8A26A]">POWERED BY CLOUDINARY VISUAL CONDITION AUDITING</span>
        </div>
      </div>

      {/* 2. Hackathon Persona Switcher Bar */}
      <div className="bg-[#17171B] text-gray-300 py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center text-xs border-b border-[#24242A]">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase tracking-wider text-[#C8A26A] font-semibold flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A26A] animate-ping mr-2"></span>
            Persona Switcher:
          </span>
          <span className="text-[10px] tracking-wider text-gray-400 uppercase">Viewing as</span>
          <span className="bg-[#C8A26A]/20 text-[#E8DBC3] text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border border-[#C8A26A]/30">
            {user?.role || 'GUEST'}
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-[11px]">
          <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1 hidden md:inline">Quick Test:</span>
          <button
            onClick={() => switchRole('CUSTOMER')}
            className={`px-3 py-1 rounded-full transition text-[11px] font-medium ${
              user?.role === 'CUSTOMER'
                ? 'bg-[#C8A26A] text-[#0F0F11] font-bold shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            👤 Customer (Ananya)
          </button>
          <button
            onClick={() => switchRole('DELIVERY_PARTNER')}
            className={`px-3 py-1 rounded-full transition text-[11px] font-medium ${
              user?.role === 'DELIVERY_PARTNER'
                ? 'bg-[#C8A26A] text-[#0F0F11] font-bold shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            🚚 Logistics (Vikram)
          </button>
          <button
            onClick={() => switchRole('ADMIN')}
            className={`px-3 py-1 rounded-full transition text-[11px] font-medium ${
              user?.role === 'ADMIN'
                ? 'bg-[#C8A26A] text-[#0F0F11] font-bold shadow-sm'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            👑 Admin (Pooja)
          </button>
        </div>
      </div>

      {/* 3. Main Luxury Navigation Bar */}
      <div className="bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#E8E3D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo - High Fashion Serif */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-[#0F0F11] flex items-center justify-center text-[#E8DBC3] border border-[#C8A26A]/40 shadow-sm group-hover:scale-105 transition duration-300">
                <span className="font-serif text-2xl font-light italic">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.2em] text-[#0F0F11] group-hover:text-[#9E7A45] transition duration-300">
                  COUTURE
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9E7A45] font-semibold -mt-1">
                  Cloudinary Verified Rentals
                </span>
              </div>
            </Link>

            {/* Editorial Category Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.18em] font-semibold">
              <Link
                to="/catalog"
                className="text-gray-700 hover:text-[#9E7A45] transition-colors py-2 relative group"
              >
                <span>Collections</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8A26A] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/catalog?category=CLOTHES"
                className="text-gray-700 hover:text-[#9E7A45] transition-colors py-2 relative group"
              >
                <span>Clothes</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8A26A] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/catalog?category=SHOES"
                className="text-gray-700 hover:text-[#9E7A45] transition-colors py-2 relative group"
              >
                <span>Shoes</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8A26A] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/catalog?category=ACCESSORIES"
                className="text-gray-700 hover:text-[#9E7A45] transition-colors py-2 relative group"
              >
                <span>Accessories</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8A26A] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/product/timeline-preview"
                className="text-[#9E7A45] bg-[#F3EFE6] px-3 py-1.5 rounded-full border border-[#E8E3D9] hover:bg-[#E8DBC3]/40 transition flex items-center space-x-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A26A]" />
                <span className="text-[10px] tracking-widest">Visual Timeline</span>
              </Link>
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-xs mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search lehengas, tuxedos, shoes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#F3EFE6]/70 hover:bg-[#F3EFE6] focus:bg-white text-xs text-gray-800 rounded-full pl-9 pr-4 py-2 border border-[#E8E3D9] focus:border-[#C8A26A] focus:outline-none transition"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </form>

            {/* Status Pills & Action Center */}
            <div className="flex items-center space-x-3">
              {/* Trust Score Pill */}
              {user?.role === 'CUSTOMER' && (
                <div
                  title="Your Customer Trust Score provides security deposit discounts"
                  onClick={() => navigate('/dashboard')}
                  className="hidden sm:flex items-center bg-[#F3EFE6] border border-[#E8E3D9] text-[#7A5C2D] px-3 py-1 rounded-full text-xs font-semibold cursor-pointer hover:bg-[#E8DBC3]/30 transition shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8A26A] mr-1.5" />
                  <span className="tracking-wide">⭐ {user?.trustScore || 96}/100</span>
                  <span className="ml-1 text-[9px] uppercase tracking-wider bg-[#C8A26A]/20 text-[#7A5C2D] px-1.5 py-0.2 rounded font-bold">
                    {user?.loyaltyTier || 'SILVER'}
                  </span>
                </div>
              )}

              {/* Wallet Pill */}
              {user?.role === 'CUSTOMER' && (
                <div
                  title="App Wallet Balance for instant deposit refunds"
                  onClick={() => navigate('/dashboard')}
                  className="hidden sm:flex items-center bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] px-3 py-1 rounded-full text-xs font-semibold cursor-pointer hover:bg-[#D1FAE5] transition shadow-sm"
                >
                  <Wallet className="w-3.5 h-3.5 text-[#059669] mr-1.5" />
                  <span>₹{(user?.walletBalance || 0).toLocaleString()}</span>
                </div>
              )}

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-700 hover:text-black rounded-full hover:bg-[#F3EFE6] transition"
                  title="Rental Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#B91C1C] rounded-full ring-2 ring-[#FAF8F5]"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-[#E8E3D9] p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#E8E3D9]">
                      <span className="font-serif font-bold text-sm text-[#0F0F11]">Rental Alerts</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">{notifications.length} updates</span>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-gray-400 py-3 text-center">No alerts right now.</p>
                      ) : (
                        notifications.map((n, idx) => (
                          <div key={idx} className="text-xs bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E8E3D9]">
                            <p className="font-semibold text-gray-900">{n.title}</p>
                            <p className="text-gray-600 mt-0.5 text-[11px] leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Portal CTA */}
              {user?.role === 'ADMIN' ? (
                <Link
                  to="/admin"
                  className="bg-[#0F0F11] hover:bg-[#24242A] text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition flex items-center shadow-sm border border-[#24242A]"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 mr-1.5 text-[#C8A26A]" />
                  <span>Admin Hub</span>
                </Link>
              ) : user?.role === 'DELIVERY_PARTNER' ? (
                <Link
                  to="/delivery"
                  className="bg-[#0F766E] hover:bg-[#115E59] text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition flex items-center shadow-sm"
                >
                  <Truck className="w-3.5 h-3.5 mr-1.5" />
                  <span>Logistics</span>
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="bg-[#0F0F11] hover:bg-[#C8A26A] text-white hover:text-[#0F0F11] px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition duration-300 flex items-center space-x-1 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                  <span>My Wardrobe</span>
                </Link>
              )}

              {/* Mobile trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-black"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-[#E8E3D9] space-y-2 text-xs uppercase tracking-wider font-semibold">
              <Link to="/catalog" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-[#F3EFE6]">
                Collections
              </Link>
              <Link to="/catalog?category=CLOTHES" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-[#F3EFE6]">
                Clothes
              </Link>
              <Link to="/catalog?category=SHOES" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-[#F3EFE6]">
                Shoes
              </Link>
              <Link to="/catalog?category=ACCESSORIES" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-[#F3EFE6]">
                Accessories
              </Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-[#9E7A45] hover:bg-[#F3EFE6]">
                My Rentals & Wallet
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
