import React from 'react';
import { BrandLogo } from './BrandLogo';
import { SHOP_INFO } from '../data/barbershopData';
import { MapPin, Phone, MessageSquare, Star, Clock, ExternalLink, Instagram, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenQuiz }) => {
  return (
    <footer className="bg-[#070709] border-t border-[#1f1f24] text-neutral-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1f1f24]">
          {/* Brand & Mission (2 cols on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo size="md" />
              <div>
                <span className="font-cinzel text-lg font-bold text-white tracking-wider block">
                  K.B INTERNATIONAL
                </span>
                <span className="text-[11px] font-semibold text-[#d4af37] tracking-[0.2em] uppercase">
                  Barber&apos;s Shop · Ogijo
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Nigeria&apos;s gold-standard executive barbering sanctuary. Uninterrupted 24/7 power, surgical razor edge precision, 360 wave mastery, and authentic VIP hospitality at Smart Junction, Ogijo.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={SHOP_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#121215] border border-[#27272a] hover:border-[#d4af37] text-neutral-300 hover:text-[#d4af37] rounded-lg transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${SHOP_INFO.whatsappInternational}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#121215] border border-[#27272a] hover:border-[#22c55e] text-neutral-300 hover:text-[#22c55e] rounded-lg transition-colors"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href={SHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-[#121215] border border-[#27272a] hover:border-[#d4af37] text-neutral-300 hover:text-[#d4af37] rounded-lg transition-colors"
                title="Google Maps Review"
              >
                <Star className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Services & Pricing
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-[#d4af37] transition-colors">
                  Hairstyle Lookbook
                </a>
              </li>
              <li>
                <a href="#instagram-feed" className="hover:text-[#d4af37] transition-colors">
                  Instagram Gallery
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#d4af37] transition-colors">
                  Client Testimonials
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-[#d4af37] transition-colors text-left cursor-pointer"
                >
                  Style Finder Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-[#fcedaf] font-semibold hover:underline cursor-pointer"
                >
                  Book Your Chair
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white tracking-wider uppercase">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-neutral-500 block">Monday – Saturday</span>
                <span className="text-white font-medium">8:00 AM – 8:30 PM</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Sunday (Royal Session)</span>
                <span className="text-white font-medium">10:00 AM – 8:30 PM</span>
              </div>
              <div className="pt-1 text-[#22c55e] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span>24/7 Power Continuous</span>
              </div>
            </div>
          </div>

          {/* Location & Google Review Link */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white tracking-wider uppercase">
              Smart Junction Salon
            </h4>
            <p className="text-neutral-300">
              {SHOP_INFO.address}
            </p>
            <p className="text-[#fcedaf] font-mono text-sm font-bold">
              {SHOP_INFO.phone}
            </p>
            <div className="pt-1">
              <a
                href={SHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#d4af37] hover:underline font-semibold"
              >
                <span>Leave Google Review</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} {SHOP_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Smart Junction, Ogijo, Ogun State</span>
            <span>·</span>
            <span>WhatsApp: 08056087919</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
