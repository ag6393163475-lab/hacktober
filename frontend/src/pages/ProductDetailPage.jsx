import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Clock, CheckCircle2, Wallet, CreditCard, ChevronRight, Award, ArrowRight } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import MultiAngleGallery from '../components/product/MultiAngleGallery';
import ConditionTimeline from '../components/product/ConditionTimeline';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [selectedSize, setSelectedSize] = useState('');
  const [refundPreference, setRefundPreference] = useState('APP_WALLET');
  const [activeTab, setActiveTab] = useState('DETAILS'); // DETAILS, TIMELINE, POLICY
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        if (data.success) {
          setProduct(data.product);
          if (data.product.size && data.product.size.length > 0) {
            setSelectedSize(Array.isArray(data.product.size) ? data.product.size[0] : data.product.size);
          }
        }
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-10 h-10 border-2 border-[#C8A26A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-[#9E7A45] font-semibold">Retrieving Cloudinary Archival Media...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="font-serif text-xl text-gray-700 mb-4">Product not found.</p>
        <Link to="/catalog" className="text-xs font-semibold tracking-wider uppercase text-[#9E7A45] underline">
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Calculate pricing breakdown
  const actualPrice = product.actualPrice || 100000;
  const isTrusted = (user?.trustScore || 95) >= 90;
  const depositRate = isTrusted ? 0.20 : 0.30;
  const baseRental = Math.round(actualPrice * 0.20);
  const securityDeposit = Math.round(actualPrice * depositRate);
  const initialTotal = baseRental + securityDeposit;

  const handleBookRental = async () => {
    setBookingInProgress(true);
    setError('');

    try {
      const { data } = await api.post('/rentals', {
        productId: product._id,
        rentalDurationDays: selectedDuration,
        refundPreference
      });

      if (data.success) {
        setBookingSuccess(data.rental);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Rental booking failed. Please try again.');
    } finally {
      setBookingInProgress(false);
    }
  };

  const sizes = Array.isArray(product.size) ? product.size : (product.size ? [product.size] : ['Free Size']);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 font-sans">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-gray-400">
        <Link to="/" className="hover:text-black transition">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-300" />
        <Link to="/catalog" className="hover:text-black transition">Archive</Link>
        <ChevronRight className="w-3 h-3 text-gray-300" />
        <span className="text-[#0F0F11] font-semibold truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Cloudinary Multi-Angle Gallery */}
        <div className="lg:col-span-7">
          <MultiAngleGallery images={product.listingImages} title={product.title} />
        </div>

        {/* Right: Booking & Pricing Calculator */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9E7A45]">
                {product.brand}
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                Condition: {product.currentCondition || 'EXCELLENT'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#0F0F11] leading-snug">
              {product.title}
            </h1>

            <p className="text-xs text-gray-500 mt-2.5 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          {/* Transparent Pricing Breakdown Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E3D9] shadow-aesthetic space-y-5">
            <div className="flex justify-between items-baseline pb-4 border-b border-[#E8E3D9]">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">
                  Rental Fee (20% of Retail):
                </span>
                <span className="font-serif text-3xl font-bold text-[#0F0F11]">₹{baseRental.toLocaleString()}</span>
                <span className="text-xs text-gray-400 font-light ml-1.5">/ {selectedDuration} days</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 line-through block">Retail: ₹{actualPrice.toLocaleString()}</span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Save 80% with rental
                </span>
              </div>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block mb-2">
                Select Rental Duration:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { days: 3, label: '3 Days', tag: 'Weekend Gala' },
                  { days: 7, label: '7 Days', tag: 'Wedding Week' },
                  { days: 14, label: '14 Days', tag: 'Destination Event' }
                ].map(dur => (
                  <button
                    key={dur.days}
                    onClick={() => setSelectedDuration(dur.days)}
                    className={`p-3 rounded-xl border text-center transition ${
                      selectedDuration === dur.days
                        ? 'border-[#C8A26A] bg-[#FAF8F5] ring-1 ring-[#C8A26A] shadow-sm text-[#0F0F11] font-bold'
                        : 'border-[#E8E3D9] bg-white hover:bg-[#FAF8F5] text-gray-600'
                    }`}
                  >
                    <span className="text-xs block font-bold">{dur.label}</span>
                    <span className="text-[9px] text-gray-400 font-normal uppercase tracking-wider">{dur.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div>
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block mb-2">
                  Select Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-1.5 rounded-full border text-xs font-medium transition ${
                        selectedSize === sz
                          ? 'border-[#0F0F11] bg-[#0F0F11] text-white shadow-sm'
                          : 'border-[#E8E3D9] bg-white text-gray-700 hover:border-[#C8A26A]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Refund Preference UI */}
            <div className="pt-3 border-t border-[#E8E3D9]">
              <label className="text-[10px] font-bold text-[#7A5C2D] uppercase tracking-wider block mb-2">
                Where should your security deposit be refunded?
              </label>
              <div className="space-y-2">
                <label
                  onClick={() => setRefundPreference('APP_WALLET')}
                  className={`flex items-start p-3.5 rounded-xl border cursor-pointer transition ${
                    refundPreference === 'APP_WALLET'
                      ? 'bg-[#FAF8F5] border-[#C8A26A] ring-1 ring-[#C8A26A] text-[#0F0F11]'
                      : 'bg-white border-[#E8E3D9] text-gray-700 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <input
                    type="radio"
                    name="refundPreference"
                    checked={refundPreference === 'APP_WALLET'}
                    onChange={() => setRefundPreference('APP_WALLET')}
                    className="mt-0.5 mr-3 accent-[#C8A26A]"
                  />
                  <div>
                    <span className="text-xs font-bold flex items-center">
                      <Wallet className="w-3.5 h-3.5 mr-1 text-[#059669]" />
                      App Wallet (Instant Credit)
                    </span>
                    <p className="text-[11px] text-gray-500 mt-0.5 font-light leading-relaxed">
                      Instant clearance on return inspection. Use instantly for your next luxury rental.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setRefundPreference('ORIGINAL_PAYMENT_METHOD')}
                  className={`flex items-start p-3.5 rounded-xl border cursor-pointer transition ${
                    refundPreference === 'ORIGINAL_PAYMENT_METHOD'
                      ? 'bg-[#FAF8F5] border-[#C8A26A] ring-1 ring-[#C8A26A] text-[#0F0F11]'
                      : 'bg-white border-[#E8E3D9] text-gray-700 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <input
                    type="radio"
                    name="refundPreference"
                    checked={refundPreference === 'ORIGINAL_PAYMENT_METHOD'}
                    onChange={() => setRefundPreference('ORIGINAL_PAYMENT_METHOD')}
                    className="mt-0.5 mr-3 accent-[#C8A26A]"
                  />
                  <div>
                    <span className="text-xs font-bold flex items-center">
                      <CreditCard className="w-3.5 h-3.5 mr-1 text-[#9E7A45]" />
                      Original Payment Method (Card/UPI)
                    </span>
                    <p className="text-[11px] text-gray-500 mt-0.5 font-light leading-relaxed">
                      Refund credited back to your original source card or bank account (3-5 business days).
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Total Payable Summary */}
            <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#E8E3D9] space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Rental Fee (20%):</span>
                <span>₹{baseRental.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Refundable Deposit ({isTrusted ? '20% Trusted Renter' : '30%'}):</span>
                <span>₹{securityDeposit.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-[#E8E3D9] flex justify-between font-bold text-gray-950">
                <span className="text-sm">Customer Initial Payment:</span>
                <span className="font-serif text-lg text-[#9E7A45]">₹{initialTotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-light">
                * ₹{securityDeposit.toLocaleString()} deposit is 100% refunded after visual condition inspection.
              </p>
            </div>

            {error && (
              <div className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {error}
              </div>
            )}

            {/* Rent Button */}
            <button
              onClick={handleBookRental}
              disabled={bookingInProgress}
              className="w-full bg-[#0F0F11] text-white hover:bg-[#C8A26A] hover:text-[#0F0F11] py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#C8A26A]" />
              <span>{bookingInProgress ? 'Reserving...' : `Rent Now (₹${initialTotal.toLocaleString()})`}</span>
            </button>
          </div>

          {/* 7-Day Defective Product Policy Guarantee */}
          <div className="bg-[#FAF8F5] border border-[#E8E3D9] rounded-2xl p-4 flex items-start space-x-3 text-xs text-[#7A5C2D]">
            <Award className="w-5 h-5 text-[#C8A26A] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">7-Day Defective Product Guarantee</strong>
              <p className="text-gray-500 text-[11px] mt-0.5 leading-relaxed font-light">
                If the garment arrives with unexpected damage or zip failure, submit Cloudinary photo/video proof within the window for prompt replacement or full deposit release.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Details / Condition Timeline / Rental Policy */}
      <div className="pt-8 border-t border-[#E8E3D9]">
        <div className="flex space-x-8 border-b border-[#E8E3D9] mb-8">
          <button
            onClick={() => setActiveTab('DETAILS')}
            className={`pb-3 text-xs font-bold uppercase tracking-[0.18em] transition border-b-2 ${
              activeTab === 'DETAILS'
                ? 'border-[#C8A26A] text-[#0F0F11]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Garment Craftsmanship
          </button>
          <button
            onClick={() => setActiveTab('TIMELINE')}
            className={`pb-3 text-xs font-bold uppercase tracking-[0.18em] transition border-b-2 flex items-center ${
              activeTab === 'TIMELINE'
                ? 'border-[#C8A26A] text-[#0F0F11]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#C8A26A]" />
            Visual Condition Timeline ({product.conditionHistory?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('POLICY')}
            className={`pb-3 text-xs font-bold uppercase tracking-[0.18em] transition border-b-2 ${
              activeTab === 'POLICY'
                ? 'border-[#C8A26A] text-[#0F0F11]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Inspection & Dispute Protocol
          </button>
        </div>

        {/* Tab 1: Fabric details */}
        {activeTab === 'DETAILS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl border border-[#E8E3D9]">
            <div>
              <h4 className="font-serif text-xl font-medium text-[#0F0F11] mb-3">Garment Craftsmanship</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light mb-4">
                {product.description}
              </p>
              <div className="space-y-2 text-xs">
                <div><span className="text-gray-400 uppercase tracking-wider text-[10px]">Fabric / Material:</span> <strong className="text-gray-900 block font-medium">{product.fabricOrMaterial}</strong></div>
                <div><span className="text-gray-400 uppercase tracking-wider text-[10px]">Occasion:</span> <strong className="text-gray-900 block font-medium">{product.occasion}</strong></div>
                <div><span className="text-gray-400 uppercase tracking-wider text-[10px]">Color Palette:</span> <strong className="text-gray-900 block font-medium">{product.color}</strong></div>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8E3D9] text-xs space-y-3">
              <h5 className="font-serif font-bold text-sm text-[#0F0F11]">Cloudinary Authenticity & Media Tags</h5>
              <div className="space-y-1.5 text-gray-600 font-mono text-[11px]">
                {product.listingImages?.map((img, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-[#E8E3D9]">
                    <span>{img.viewType}: {img.publicId}</span>
                    <span className="text-emerald-700 font-semibold">{img.format}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Condition Timeline */}
        {activeTab === 'TIMELINE' && (
          <ConditionTimeline
            history={product.conditionHistory}
            currentCondition={product.currentCondition}
            title={product.title}
          />
        )}

        {/* Tab 3: Policy */}
        {activeTab === 'POLICY' && (
          <div className="bg-white p-6 rounded-2xl border border-[#E8E3D9] text-xs text-gray-600 space-y-4 font-light leading-relaxed">
            <h4 className="font-serif text-xl font-medium text-[#0F0F11]">Rental Agreement & Late Return Guidelines</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E3D9]">
                <strong className="text-[#0F0F11] font-semibold block mb-1">Late Return Fee:</strong>
                <span>Calculated strictly as <strong>2% of actual price per late day</strong>. Deducted directly from security deposit.</span>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E3D9]">
                <strong className="text-[#0F0F11] font-semibold block mb-1">Damage Assessment:</strong>
                <span>Damage penalties are NEVER charged automatically by AI. Our operations admin reviews side-by-side Before vs After Cloudinary evidence.</span>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E3D9]">
                <strong className="text-[#0F0F11] font-semibold block mb-1">Dispute Mechanism:</strong>
                <span>Customers can raise a formal dispute against any penalty within 48 hours accompanied by Cloudinary photo/video proof.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Confirmation Dialog */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-5 shadow-2xl border border-[#E8E3D9]">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-normal text-[#0F0F11]">
              Rental Reservation Confirmed
            </h3>

            <p className="text-xs text-gray-500 leading-relaxed font-light">
              Your booking for <strong>{product.title}</strong> (#{bookingSuccess.rentalNumber}) has been recorded. Pre-dispatch Cloudinary condition evidence will now be logged.
            </p>

            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E3D9] text-xs text-left space-y-1.5 text-gray-700">
              <div className="flex justify-between"><span>Rental Number:</span> <strong className="font-mono text-[#0F0F11]">{bookingSuccess.rentalNumber}</strong></div>
              <div className="flex justify-between"><span>Initial Payment:</span> <strong>₹{initialTotal.toLocaleString()}</strong></div>
              <div className="flex justify-between"><span>Refund Destination:</span> <strong className="text-emerald-700">{bookingSuccess.refundPreference === 'APP_WALLET' ? 'App Wallet (Instant)' : 'Original Source Card'}</strong></div>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-[#0F0F11] text-white hover:bg-[#C8A26A] hover:text-[#0F0F11] py-3 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition shadow"
            >
              Go to Customer Wardrobe
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
