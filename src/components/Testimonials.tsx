import React from 'react';
import { TESTIMONIALS, SHOP_INFO } from '../data/barbershopData';
import { Star, Quote, ShieldCheck, Award, ThumbsUp, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#0c0c0f] relative overflow-hidden border-t border-[#1f1f23]">
      {/* Subtle luxury gold glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] tracking-[0.25em] uppercase mb-3">
            <Award className="w-4 h-4 text-[#d4af37]" />
            <span>Client Acclaim & Distinction</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-white text-balance">
            PATRON VOICES OF{' '}
            <span className="text-gold-gradient">ROYAL REPUTE</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed font-light">
            Distinguished executives, professionals, and fathers across Ogun and Lagos share their experience with our atmosphere, surgical precision, and hospitality.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-gradient-to-br from-[#141418] via-[#101014] to-[#0a0a0c] border border-[#27272a] hover:border-[#d4af37]/60 rounded-2xl p-7 sm:p-9 transition-all duration-300 shadow-xl hover:shadow-[0_10px_35px_rgba(212,175,55,0.1)] flex flex-col justify-between group"
            >
              {/* Gold Quote Mark Watermark */}
              <div className="absolute top-6 right-6 text-[#d4af37]/15 group-hover:text-[#d4af37]/25 transition-colors">
                <Quote className="w-10 h-10 transform rotate-180" />
              </div>

              <div>
                {/* Highlight Badge */}
                <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold bg-[#18181b] border border-[#3f3f46] px-3 py-1 rounded-md mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{testimonial.highlight}</span>
                </div>

                {/* Star Ratings */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#d4af37] text-[#d4af37]"
                    />
                  ))}
                  <span className="text-xs text-neutral-400 ml-2 font-medium">5.0 / 5.0</span>
                </div>

                {/* Quote Content with Sophisticated Typographic Styling */}
                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed mb-6 font-light italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Distinguished Client Profile Footer */}
              <div className="pt-6 border-t border-[#27272a] flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Photo of Distinguished Gentleman */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#d4af37]/60 p-[2px] bg-gradient-to-tr from-[#d4af37] to-[#1f1f23] shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover object-center rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold font-cinzel text-white group-hover:text-[#fcedaf] transition-colors leading-snug">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-neutral-400 font-medium">
                      {testimonial.title}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-[#d4af37] mt-0.5">
                      <MapPin className="w-3 h-3 text-[#d4af37]" />
                      <span>{testimonial.companyOrLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Service Tag */}
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                    Service Experience
                  </span>
                  <span className="text-xs font-semibold text-neutral-300">
                    {testimonial.serviceReceived}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Review Callout Banner with Exact Link */}
        <div className="mt-14 p-6 sm:p-8 bg-[#121215] border border-[#27272a] rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <span>Verified Patron Reviews</span>
              <span>·</span>
              <span className="text-neutral-400">Smart Junction, Ogijo</span>
            </div>
            <h4 className="text-xl font-cinzel font-bold text-white">
              Have you experienced the K.B International chair?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Share your feedback directly on Google Maps and help fellow gentlemen in Ogun and Lagos find superior grooming.
            </p>
          </div>

          <a
            href={SHOP_INFO.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-black bg-[#d4af37] hover:bg-[#e6c35c] rounded-lg transition-colors whitespace-nowrap shadow-md cursor-pointer shrink-0"
          >
            <Star className="w-4 h-4 fill-black" />
            <span>Leave a Google Review</span>
          </a>
        </div>
      </div>
    </section>
  );
};
