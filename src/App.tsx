/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PriceMenu } from './components/PriceMenu';
import { Lookbook } from './components/Lookbook';
import { InstagramFeed } from './components/InstagramFeed';
import { VipLounge } from './components/VipLounge';
import { Testimonials } from './components/Testimonials';
import { BarbersTeam } from './components/BarbersTeam';
import { ReviewQRCodeSection } from './components/ReviewQRCodeSection';
import { LocationAndHours } from './components/LocationAndHours';
import { BookingModal } from './components/BookingModal';
import { HairstyleQuizModal } from './components/HairstyleQuizModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';
import { BarberService } from './data/barbershopData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId || null);
    setIsBookingOpen(true);
  };

  const handleBookService = (service: BarberService) => {
    setSelectedServiceId(service.id);
    setIsBookingOpen(true);
  };

  const handleSelectBarberAndBook = (barberId: string) => {
    // Open booking modal
    setIsBookingOpen(true);
  };

  const handleSelectInstagramStyle = (title: string) => {
    setIsBookingOpen(true);
  };

  const handleScrollToReviews = () => {
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToLookbook = () => {
    const el = document.getElementById('lookbook');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col selection:bg-[#d4af37]/30 selection:text-[#fcedaf]">
      {/* Top Bar Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenReviews={handleScrollToReviews}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreLookbook={handleScrollToLookbook}
        />

        {/* Services & Transparent Luxury Pricing */}
        <PriceMenu onBookService={handleBookService} />

        {/* Artisanal Lookbook featuring Black men and diverse hairstyles */}
        <Lookbook
          onSelectServiceAndBook={(serviceId) => handleOpenBooking(serviceId)}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Instagram Feed (9 posts grid in gold & black aesthetic) */}
        <InstagramFeed onSelectStyleToBook={handleSelectInstagramStyle} />

        {/* VIP Lounge & 24/7 Power Sanctuary */}
        <VipLounge onOpenBooking={() => handleOpenBooking('royal-kb-combo')} />

        {/* Testimonials from Distinguished Gentlemen */}
        <Testimonials />

        {/* Master Barbers & Craftsmen */}
        <BarbersTeam onSelectBarberAndBook={handleSelectBarberAndBook} />

        {/* Google Maps Review Section with Live QR Code */}
        <ReviewQRCodeSection />

        {/* Location & Operating Hours */}
        <LocationAndHours />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Booking System Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={selectedServiceId}
      />

      {/* Signature Hairstyle Quiz Modal */}
      <HairstyleQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectServiceAndBook={(serviceId) => handleOpenBooking(serviceId)}
      />

      {/* Floating WhatsApp Action Button (08056087919) */}
      <WhatsAppFloatingButton />
    </div>
  );
}
