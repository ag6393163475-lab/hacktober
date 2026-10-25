import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Sparkles, Search, X } from 'lucide-react';
import api from '../api/client';
import ProductCard from '../components/product/ProductCard';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [gender, setGender] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    setCategory(searchParams.get('category') || '');
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category) params.category = category;
        if (gender) params.gender = gender;
        if (searchTerm) params.search = searchTerm;
        if (sortBy) params.sort = sortBy;

        const { data } = await api.get('/products', { params });
        if (data.success) {
          setProducts(data.products || []);
        }
      } catch (err) {
        console.error('Filter fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
  }, [category, gender, sortBy, searchTerm]);

  const clearFilters = () => {
    setCategory('');
    setGender('');
    setSearchTerm('');
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-[#E8E3D9] gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7A45] font-bold block mb-1">
            Bespoke Wardrobe
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#0F0F11]">
            {category ? `${category.charAt(0) + category.slice(1).toLowerCase()} Collection` : 'The Complete Archival Wardrobe'}
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-light">
            Showing {products.length} designer pieces verified with Cloudinary condition audits.
          </p>
        </div>

        {/* Search & Sort Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search designer, collection..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs bg-[#F3EFE6] rounded-full pl-9 pr-4 py-2.5 border border-[#E8E3D9] focus:border-[#C8A26A] focus:bg-white focus:outline-none w-48 sm:w-64 transition"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs bg-white border border-[#E8E3D9] rounded-full px-4 py-2.5 focus:border-[#C8A26A] focus:outline-none text-gray-700 font-medium"
          >
            <option value="popular">Sort: Most Popular</option>
            <option value="price_asc">Rent: Low to High</option>
            <option value="price_desc">Rent: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Aesthetic Filter Sidebar */}
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-[#E8E3D9] shadow-sm h-fit">
          <div className="flex justify-between items-center pb-3 border-b border-[#E8E3D9]">
            <span className="font-semibold text-xs tracking-[0.2em] uppercase text-[#0F0F11] flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-2 text-[#C8A26A]" />
              Refine Archive
            </span>
            {(category || gender || searchTerm) && (
              <button
                onClick={clearFilters}
                className="text-[10px] uppercase tracking-wider text-[#B91C1C] hover:underline flex items-center font-bold"
              >
                <X className="w-3 h-3 mr-0.5" />
                Reset
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-[10px] font-bold text-[#9E7A45] uppercase tracking-[0.2em] mb-3">
              Haute Category
            </h4>
            <div className="space-y-2 text-xs text-gray-700">
              {[
                { id: '', label: 'All Collections' },
                { id: 'CLOTHES', label: 'Clothes (Lehengas & Tuxedos)' },
                { id: 'SHOES', label: 'Shoes (Heels & Loafers)' },
                { id: 'ACCESSORIES', label: 'Accessories (Handbags & Chokers)' }
              ].map(cat => (
                <label key={cat.id} className="flex items-center space-x-2.5 cursor-pointer hover:text-black">
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat.id}
                    onChange={() => setCategory(cat.id)}
                    className="accent-[#C8A26A]"
                  />
                  <span className={category === cat.id ? 'font-bold text-[#0F0F11]' : ''}>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div className="pt-4 border-t border-[#E8E3D9]">
            <h4 className="text-[10px] font-bold text-[#9E7A45] uppercase tracking-[0.2em] mb-3">
              Collection For
            </h4>
            <div className="space-y-2 text-xs text-gray-700">
              {[
                { id: '', label: 'All Collections' },
                { id: 'WOMEN', label: "Women's Couture" },
                { id: 'MEN', label: "Men's Formalwear" }
              ].map(g => (
                <label key={g.id} className="flex items-center space-x-2.5 cursor-pointer hover:text-black">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === g.id}
                    onChange={() => setGender(g.id)}
                    className="accent-[#C8A26A]"
                  />
                  <span className={gender === g.id ? 'font-bold text-[#0F0F11]' : ''}>{g.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pricing Model Info Card */}
          <div className="pt-4 border-t border-[#E8E3D9] text-[11px] bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E3D9] text-[#7A5C2D] space-y-1">
            <span className="font-bold flex items-center text-xs tracking-wide">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#C8A26A]" />
              Transparent Pricing Model
            </span>
            <p className="text-[10px] text-gray-500 font-light leading-relaxed">
              Every item: 20% Rent + 30% 100% Refundable Security Deposit upon return inspection.
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="aspect-[3/4] bg-[#F3EFE6] rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-[#E8E3D9]">
              <p className="font-serif text-lg text-gray-700 mb-2">No archival pieces found.</p>
              <p className="text-xs text-gray-500 mb-4 font-light">Try adjusting your filters or search keywords.</p>
              <button
                onClick={clearFilters}
                className="bg-[#0F0F11] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#C8A26A] hover:text-[#0F0F11] transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(prod => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
