import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { SHOP_INFO } from '../data/barbershopData';
import { Star, QrCode, ExternalLink, Copy, Check, Download, MapPin, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const ReviewQRCodeSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        SHOP_INFO.googleMapsUrl,
        {
          width: 240,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'H',
        },
        (error) => {
          if (!error) {
            setQrGenerated(true);
          }
        }
      );
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(SHOP_INFO.googleMapsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadQr = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'KB-International-Barber-Shop-Google-Review-QR.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <section id="reviews" className="py-20 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#141310] via-[#100f0c] to-[#0a0a0c] border-2 border-[#d4af37]/40 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-[#d4af37]/5">
          {/* Subtle gold decorative background accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#d4af37]/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase">
                <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                <span>Google Maps Verified Patron Portal</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-white text-balance leading-tight">
                RATE YOUR ROYALTY ON{' '}
                <span className="text-gold-gradient">GOOGLE MAPS</span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                Your satisfaction is our crown. Scan the official QR code with your smartphone camera or tap the direct review link below to leave your rating for{' '}
                <strong className="text-white font-medium">KB International Barber Shop</strong> at Smart Junction, Ogijo.
              </p>

              {/* Exact Google Review Link Card */}
              <div className="bg-[#18181c] border border-[#27272a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Direct Review URL
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-[#fcedaf] truncate select-all">
                    {SHOP_INFO.googleMapsUrl}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-200 hover:text-white bg-[#27272a] hover:bg-[#3f3f46] rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                        <span className="text-[#22c55e]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={SHOP_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e6c35c] rounded-lg transition-colors"
                  >
                    <span>Open Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="border-l-2 border-[#d4af37] pl-3 py-1">
                  <div className="text-xl font-bold font-cinzel text-white">4.9 ★★★★★</div>
                  <div className="text-xs text-neutral-400">Average Google Rating</div>
                </div>
                <div className="border-l-2 border-[#d4af37] pl-3 py-1">
                  <div className="text-xl font-bold font-cinzel text-white">100% Verified</div>
                  <div className="text-xs text-neutral-400">Ogijo & Lagos Patrons</div>
                </div>
                <div className="border-l-2 border-[#d4af37] pl-3 py-1 col-span-2 sm:col-span-1">
                  <div className="text-xl font-bold font-cinzel text-white">Quick Scan</div>
                  <div className="text-xs text-neutral-400">Instant Phone Link</div>
                </div>
              </div>
            </div>

            {/* Right Column: Physical Gold Counter Plaque with Live QR Code */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative bg-gradient-to-b from-[#1c1a14] via-[#12110c] to-[#0d0d0e] border-2 border-[#d4af37] rounded-2xl p-6 sm:p-8 text-center shadow-2xl shadow-black/80 max-w-xs sm:max-w-sm w-full">
                {/* Crest Top Header */}
                <div className="flex flex-col items-center mb-4">
                  <BrandLogo size="sm" />
                  <span className="font-cinzel text-sm font-bold text-white tracking-widest mt-2 uppercase">
                    K.B INTERNATIONAL
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase font-semibold">
                    Customer Review Plaque
                  </span>
                </div>

                {/* QR Code Container with High-Contrast White Background for Crisp Camera Scanning */}
                <div className="p-3 bg-white rounded-xl shadow-inner inline-block mx-auto mb-4 border border-[#e5c158]">
                  <canvas ref={canvasRef} className="block mx-auto rounded" />
                </div>

                <div className="space-y-1 mb-5">
                  <div className="text-xs font-bold text-white tracking-wider uppercase flex items-center justify-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Scan with Camera to Review</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Works instantly on iPhone & Android
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#27272a]">
                  <a
                    href={SHOP_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-black bg-[#d4af37] hover:bg-[#e6c35c] rounded-md transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Review Now</span>
                  </a>

                  <button
                    onClick={handleDownloadQr}
                    className="p-2 text-neutral-300 hover:text-white bg-[#18181b] hover:bg-[#27272a] border border-[#3f3f46] rounded-md transition-colors cursor-pointer"
                    title="Download Counter Plaque Image"
                  >
                    <Download className="w-4 h-4 text-[#d4af37]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
