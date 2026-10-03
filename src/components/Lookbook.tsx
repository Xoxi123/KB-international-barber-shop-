import React, { useState } from 'react';
import { LOOKBOOK_ITEMS, LookbookItem } from '../data/barbershopData';
import { Calendar, Sparkles, Clock, Compass, Maximize2, X, Check } from 'lucide-react';

interface LookbookProps {
  onSelectServiceAndBook: (serviceId: string) => void;
  onOpenQuiz: () => void;
}

export const Lookbook: React.FC<LookbookProps> = ({
  onSelectServiceAndBook,
  onOpenQuiz,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePreview, setActivePreview] = useState<LookbookItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Signature Cuts' },
    { id: 'fades', label: '360 Waves & Tapers' },
    { id: 'beard', label: 'Beard Sculpting' },
    { id: 'afro', label: 'Burst & Afro Textures' },
    { id: 'locs', label: 'Dreadlocs & Braids' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? LOOKBOOK_ITEMS
      : LOOKBOOK_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="lookbook" className="py-20 bg-[#0c0c0e] relative border-t border-[#1f1f23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Artisanal Lookbook</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-white text-balance">
              HAIRSTYLES FOR THE{' '}
              <span className="text-gold-gradient">NIGERIAN GENTLEMAN</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl mt-3">
              Explore authentic cuts mastered by our resident artisans at Smart Junction, Ogijo. High-definition fades, wave depth, clean edges, and regal beard contours.
            </p>
          </div>

          <button
            onClick={onOpenQuiz}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white bg-[#18181b] border border-[#d4af37]/40 hover:border-[#d4af37] rounded-lg transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#d4af37]" />
            <span>Find Your Signature Cut Quiz</span>
          </button>
        </div>

        {/* Category Filter Buttons (Interactive filter controls allowed as functional buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#d4af37] text-black font-semibold shadow-[0_2px_12px_rgba(212,175,55,0.3)]'
                  : 'bg-[#18181b] text-neutral-300 hover:text-white hover:bg-[#27272a] border border-[#27272a]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#121215] rounded-xl overflow-hidden border border-[#27272a] hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-80" />

                {/* Quick Expand Button */}
                <button
                  onClick={() => setActivePreview(item)}
                  className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/90 text-white rounded-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="View full image"
                >
                  <Maximize2 className="w-4 h-4 text-[#d4af37]" />
                </button>

                {/* Duration indicator */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-neutral-300 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{item.timeRequired}</span>
                </div>
              </div>

              {/* Content Block */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed tags with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#d4af37] font-medium mb-2.5">
                    {item.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span>{tag}</span>
                        {idx < item.tags.length - 1 && <span className="text-neutral-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-cinzel text-white group-hover:text-[#fcedaf] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Master Barber Grooming Advice */}
                  <div className="bg-[#18181b]/80 border-l-2 border-[#d4af37] p-3 rounded-r-md mb-5 text-xs text-neutral-300">
                    <span className="font-semibold text-[#fcedaf] block mb-1">Barber&apos;s Maintenance Tip:</span>
                    <p className="italic text-neutral-400">{item.barberTip}</p>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onSelectServiceAndBook(item.serviceId)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-[#d4af37] to-[#f4d884] hover:brightness-110 active:scale-[0.98] rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Book This Style</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePreview && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-[#121215] border border-[#d4af37]/40 rounded-xl overflow-hidden shadow-2xl animate-scaleUp">
            <button
              onClick={() => setActivePreview(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-[#d4af37]" />
            </button>

            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-black">
              <img
                src={activePreview.image}
                alt={activePreview.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-[#121215] border-t border-[#27272a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold font-cinzel text-white">
                  {activePreview.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-md">
                  {activePreview.description}
                </p>
              </div>

              <button
                onClick={() => {
                  const service = activePreview.serviceId;
                  setActivePreview(null);
                  onSelectServiceAndBook(service);
                }}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-black bg-[#d4af37] hover:bg-[#e6c35c] rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
