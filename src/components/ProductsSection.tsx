import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { Product } from '../types';

interface ProductsSectionProps {
  products: Product[];
  onRequestQuote: (productName: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onRequestQuote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="products" className="py-20 sm:py-24 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200/60 mb-3">
            ✦ Premium Harvest Catalog
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight mb-3">
            Our Premium Rice
          </h2>
          <p className="text-slate-600 text-base max-w-xl mb-8">
            Hand-picked, lab-tested, and sourced directly from top farmers across Punjab & Sindh.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-md relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by variety, origin or spec..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition-shadow bg-white text-slate-900 shadow-xs text-sm sm:text-base placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((prod, index) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group bg-white border border-slate-200/80 flex flex-col"
            >
              <div className="h-64 overflow-hidden relative bg-slate-100">
                <img
                  src={prod.imageUrl}
                  alt={`${prod.name} – Verified Rice Trade in Pakistan | Mashallah Rice Broker`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 shadow-sm border border-white/10">
                  {prod.origin}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  <span className="text-lg sm:text-xl font-display font-extrabold text-amber-600">
                    {prod.price}
                  </span>
                  <button
                    onClick={() => onRequestQuote(prod.name)}
                    className="text-emerald-800 bg-emerald-50 hover:bg-emerald-700 hover:text-white border border-emerald-200 hover:border-emerald-700 px-4 py-2 rounded-xl transition-all text-sm font-bold cursor-pointer shadow-xs font-display"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              No products found matching "{searchQuery}".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-sm text-emerald-700 font-semibold underline hover:text-emerald-900 cursor-pointer"
            >
              Clear search filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
