import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
}) => {
  const dimensions = {
    sm: { width: 36, height: 42, text: 'text-sm' },
    md: { width: 48, height: 56, text: 'text-base' },
    lg: { width: 68, height: 78, text: 'text-xl' },
    xl: { width: 96, height: 110, text: 'text-2xl' },
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Royal Crest inspired by K.B International Barber's Shop Official Shield */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="35%" stopColor="#E5C158" />
            <stop offset="70%" stopColor="#C49B28" />
            <stop offset="100%" stopColor="#8A6710" />
          </linearGradient>
          <linearGradient id="shieldDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b15" />
            <stop offset="50%" stopColor="#12110e" />
            <stop offset="100%" stopColor="#080705" />
          </linearGradient>
          <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C49B28" />
            <stop offset="50%" stopColor="#FFF1B8" />
            <stop offset="100%" stopColor="#8A6710" />
          </linearGradient>
        </defs>

        {/* Crown on top */}
        <g id="crown">
          <path
            d="M 35 22 L 40 8 L 50 16 L 60 4 L 70 16 L 80 8 L 85 22 Z"
            fill="url(#goldGrad)"
            stroke="#5c440b"
            strokeWidth="1.2"
          />
          <circle cx="40" cy="8" r="2.2" fill="#fff" />
          <circle cx="50" cy="16" r="1.8" fill="#fff" />
          <circle cx="60" cy="4" r="2.8" fill="#fff" />
          <circle cx="70" cy="16" r="1.8" fill="#fff" />
          <circle cx="80" cy="8" r="2.2" fill="#fff" />
          {/* Crown base band */}
          <rect x="34" y="21" width="52" height="4" rx="1.5" fill="url(#goldGrad)" stroke="#694d0c" strokeWidth="0.8" />
          <circle cx="45" cy="23" r="1" fill="#fff" />
          <circle cx="60" cy="23" r="1.2" fill="#fff" />
          <circle cx="75" cy="23" r="1" fill="#fff" />
        </g>

        {/* Main Shield Outline */}
        <path
          d="M 20 28 C 50 28, 70 28, 100 28 C 102 65, 96 95, 60 132 C 24 95, 18 65, 20 28 Z"
          fill="url(#shieldDark)"
          stroke="url(#goldGrad)"
          strokeWidth="3.5"
        />

        {/* Inner Gold Shield Border */}
        <path
          d="M 26 34 C 50 34, 70 34, 94 34 C 95 65, 90 90, 60 123 C 30 90, 25 65, 26 34 Z"
          fill="none"
          stroke="url(#goldStroke)"
          strokeWidth="1.2"
          strokeDasharray="2 1"
          opacity="0.8"
        />

        {/* Big "KB" Monogram */}
        <text
          x="60"
          y="65"
          fill="url(#goldGrad)"
          fontFamily="'Cinzel', Georgia, serif"
          fontWeight="900"
          fontSize="30"
          textAnchor="middle"
          letterSpacing="1.5"
          stroke="#3d2c05"
          strokeWidth="0.6"
        >
          KB
        </text>

        {/* Curved ribbon banner for INTERNATIONAL */}
        <path
          d="M 12 70 Q 60 76 108 70 L 105 82 Q 60 88 15 82 Z"
          fill="#0c0c0e"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
        />
        <text
          x="60"
          y="80"
          fill="#fbf5d9"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="7.5"
          textAnchor="middle"
          letterSpacing="1.8"
        >
          INTERNATIONAL
        </text>

        {/* Script: Barber's Shop */}
        <text
          x="60"
          y="93"
          fill="url(#goldGrad)"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontWeight="600"
          fontSize="8.5"
          textAnchor="middle"
        >
          Barber&apos;s Shop
        </text>

        {/* Crossed Barber Tools: Shears, Straight Razor & Trimmer Clipper */}
        <g id="tools" opacity="0.95">
          {/* Straight razor */}
          <line x1="38" y1="116" x2="72" y2="100" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="72" y1="100" x2="82" y2="108" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          
          {/* Scissors */}
          <line x1="82" y1="116" x2="48" y2="100" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="83" cy="117" r="2.8" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <circle cx="37" cy="117" r="2.8" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" />

          {/* Electric clipper center */}
          <rect x="56" y="99" width="8" height="15" rx="2" fill="url(#goldGrad)" stroke="#382803" strokeWidth="0.8" />
          <line x1="57" y1="99" x2="63" y2="99" stroke="#fff" strokeWidth="1.5" />
          <line x1="56" y1="102" x2="64" y2="102" stroke="#222" strokeWidth="0.7" />
        </g>
      </svg>

      {showSubtitle && (
        <div className="flex flex-col text-left">
          <span className="font-cinzel font-bold text-white tracking-wider leading-none text-base md:text-lg">
            K.B INTERNATIONAL
          </span>
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#d4af37] uppercase mt-0.5">
            Barber&apos;s Shop · Ogijo
          </span>
        </div>
      )}
    </div>
  );
};
