import React, { useState } from 'react';
import { INSTAGRAM_POSTS, InstagramPost, SHOP_INFO } from '../data/barbershopData';
import { Instagram, Heart, MessageCircle, ExternalLink, X, Calendar, Share2, Sparkles } from 'lucide-react';

interface InstagramFeedProps {
  onSelectStyleToBook: (title: string) => void;
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ onSelectStyleToBook }) => {
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);

  const openWhatsAppInquiry = (postTitle: string) => {
    const text = encodeURIComponent(
      `Hello KB International Barber Shop! I saw this cut on your Instagram ("${postTitle}") and I would like to book it.`
    );
    window.open(`https://wa.me/${SHOP_INFO.whatsappInternational}?text=${text}`, '_blank');
  };

  return (
    <section id="instagram-feed" className="py-20 bg-[#09090b] relative border-t border-[#18181b]">
      {/* Decorative Gold Radial Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#d4af37]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase mb-2">
              <Instagram className="w-4 h-4 text-[#d4af37]" />
              <span>Live Social Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-white text-balance">
              FRESH CUTS FROM{' '}
              <span className="text-gold-gradient">THE CHAIR</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl mt-3">
              Explore the latest client transformations straight from our Smart Junction salon. Follow our craft, tag your cuts, and join the royal brotherhood.
            </p>
          </div>

          {/* Social Stats & Direct Follow Link */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-white font-cinzel tracking-wider">
                {SHOP_INFO.instagramHandle}
              </div>
              <div className="text-xs text-[#d4af37]">4,800+ Active Clients & Followers</div>
            </div>

            <a
              href={SHOP_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#d4af37] to-[#f4d884] hover:brightness-110 active:scale-[0.98] rounded-lg transition-all shadow-md shadow-[#d4af37]/20 whitespace-nowrap"
            >
              <Instagram className="w-4 h-4 text-black" />
              <span>Follow On Instagram</span>
            </a>
          </div>
        </div>

        {/* 3x3 Grid of the Latest 9 Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group relative aspect-square bg-[#121215] rounded-xl overflow-hidden border border-[#27272a] hover:border-[#d4af37] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]"
            >
              {/* Post Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Top gradient badge: Instagram icon and date */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/10">
                  <Instagram className="w-3 h-3 text-[#d4af37]" />
                  <span>{SHOP_INFO.shortName}</span>
                </span>
                <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-neutral-300 border border-white/10">
                  {post.date}
                </span>
              </div>

              {/* Bottom Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              {/* Hover Details with Gold Styling */}
              <div className="absolute inset-x-0 bottom-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-white font-cinzel font-bold text-base sm:text-lg mb-1 drop-shadow-md text-gold-shimmer">
                  {post.title}
                </h4>

                <p className="text-neutral-300 text-xs line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {post.caption}
                </p>

                {/* Social Metrics & CTA */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/15">
                  <div className="flex items-center gap-4 text-neutral-200">
                    <span className="flex items-center gap-1 hover:text-rose-400 transition-colors">
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span className="font-semibold tabular-nums">{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1 hover:text-[#d4af37] transition-colors">
                      <MessageCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span className="font-semibold tabular-nums">{post.comments}</span>
                    </span>
                  </div>

                  <span className="text-[#fcedaf] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Post</span>
                    <ExternalLink className="w-3 h-3 text-[#d4af37]" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner to Connect to WhatsApp & Visit */}
        <div className="mt-12 bg-gradient-to-r from-[#18160f] via-[#1f1c14] to-[#18160f] border border-[#d4af37]/40 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Want to Feature on Our Wall of Royalty?</span>
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300">
              Tag <span className="text-[#fcedaf] font-semibold">{SHOP_INFO.instagramHandle}</span> in your post-cut selfie or send it to us on WhatsApp.
            </p>
          </div>

          <button
            onClick={() => onSelectStyleToBook('Instagram Cut')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-black bg-[#d4af37] hover:bg-[#e6c35c] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-md"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Book Next Appointment</span>
          </button>
        </div>
      </div>

      {/* Interactive Modal for Selected Instagram Post */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-[#121215] border border-[#d4af37]/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scaleUp">
            {/* Close Button */}
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-3 right-3 z-20 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-[#d4af37]" />
            </button>

            {/* Media Column */}
            <div className="md:w-1/2 aspect-square relative bg-black">
              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content Column */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between bg-[#121215]">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#27272a] mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#6f5511] p-[1.5px]">
                      <div className="w-full h-full bg-[#09090b] rounded-full flex items-center justify-center">
                        <Instagram className="w-4 h-4 text-[#d4af37]" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white font-cinzel">
                        {SHOP_INFO.shortName}
                      </div>
                      <div className="text-[10px] text-neutral-400">Ogijo, Ogun State</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#d4af37] font-medium">{activePost.date}</span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-white mb-2 text-gold-shimmer">
                  {activePost.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  {activePost.caption}
                </p>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {activePost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-[#d4af37] hover:underline cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-6 text-xs text-neutral-300 py-3 border-y border-[#27272a] mb-6">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <strong className="text-white">{activePost.likes}</strong> likes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-[#d4af37]" />
                    <strong className="text-white">{activePost.comments}</strong> comments
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    openWhatsAppInquiry(activePost.title);
                    setActivePost(null);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-[#15803d] hover:bg-[#16a34a] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Book This Cut on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    onSelectStyleToBook(activePost.title);
                    setActivePost(null);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-black bg-[#d4af37] hover:bg-[#e6c35c] rounded-lg transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Select in Booking System</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
