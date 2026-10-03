import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Calendar, MessageSquare, Menu, X, Phone, Star, MapPin } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenReviews: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenReviews }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'VIP Lounge', href: '#vip' },
    { label: 'Barbers', href: '#barbers' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsAppDirect = () => {
    const message = encodeURIComponent(
      `Hello KB International Barber Shop! I would like to book an appointment.`
    );
    window.open(`https://wa.me/${SHOP_INFO.whatsappInternational}?text=${message}`, '_blank');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-[#27272a] shadow-lg shadow-black/40 py-2.5'
            : 'bg-gradient-to-b from-[#09090b]/90 via-[#09090b]/60 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar 3-Zone Contract */}
          <div className="flex items-center justify-between gap-4">
            {/* Zone 1: Single text wordmark with brand crest */}
            <a
              href="#"
              className="group flex items-center gap-3 transition-opacity hover:opacity-90"
              aria-label="K.B International Barber's Shop Home"
            >
              <BrandLogo size="sm" />
              <div className="flex flex-col">
                <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-[#fcedaf] transition-colors whitespace-nowrap">
                  K.B INTERNATIONAL
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.22em] text-[#d4af37] font-medium uppercase whitespace-nowrap -mt-0.5">
                  Barber&apos;s Shop · Ogijo
                </span>
              </div>
            </a>

            {/* Zone 2: 4-6 Clean text navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#d4af37] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Zone 3: 1-2 Primary actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={openWhatsAppDirect}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-200 hover:text-white bg-[#18181b] border border-[#3f3f46] hover:border-[#22c55e]/60 rounded-md transition-all whitespace-nowrap"
                title="Chat on WhatsApp 08056087919"
              >
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
                <span>0805 608 7919</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#d4af37] hover:brightness-110 active:scale-[0.98] rounded-md transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Book Chair</span>
              </button>

              {/* Mobile menu toggle button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-[#18181b] rounded-md border border-[#27272a]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden pt-20 px-6 animate-fadeIn">
          <div className="bg-[#121215] border border-[#27272a] rounded-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
              <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
                Ogijo Executive Grooming
              </span>
              <span className="text-xs text-neutral-400">Open till 8:30 PM</span>
            </div>

            <div className="grid gap-3 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-2 px-3 rounded-lg text-neutral-200 hover:text-white hover:bg-[#1f1f23] font-medium text-sm transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#27272a] space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-black bg-gradient-to-r from-[#d4af37] to-[#f3d375] rounded-lg shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Online Appointment</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppDirect();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-[#15803d]/30 hover:bg-[#15803d]/40 border border-[#22c55e]/40 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#22c55e]" />
                <span>WhatsApp: 08056087919</span>
              </button>

              <a
                href={SHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 text-xs text-neutral-400 hover:text-[#d4af37] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Smart Junction, Ogijo, Ogun State</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
