"use client";

import { useStore } from "@/store/useStore";
import { quadrupedHotspots } from "@/data/mockData";

export default function QuadrupedSkeleton() {
  const { selectedHotspot, selectHotspot, uploadedComponents, uploadingComponent } = useStore();

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full max-w-lg mx-auto">
      <defs>
        <linearGradient id="qBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1E293B" stopOpacity="0.3" />
        </linearGradient>
        <filter id="qGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="qGlowStrong">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Body */}
      <path d="M30 30 L70 30 L72 42 L28 42 Z" fill="url(#qBodyGrad)" stroke="#334155" strokeWidth="0.4" rx="3" />
      {/* Head/neck */}
      <path d="M70 30 L85 22 L88 28 L72 35" fill="url(#qBodyGrad)" stroke="#334155" strokeWidth="0.4" />
      {/* Head shape */}
      <rect x="82" y="20" width="8" height="10" rx="2" fill="url(#qBodyGrad)" stroke="#334155" strokeWidth="0.4" />
      {/* Tail */}
      <path d="M30 32 L20 28 L18 30" fill="none" stroke="#334155" strokeWidth="0.4" />

      {/* Front left leg */}
      <path d="M35 42 L32 58 L30 72 L34 72 L35 58 L37 42" fill="url(#qBodyGrad)" stroke="#334155" strokeWidth="0.4" />
      {/* Front right leg */}
      <path d="M63 42 L66 58 L68 72 L72 72 L69 58 L65 42" fill="url(#qBodyGrad)" stroke="#334155" strokeWidth="0.4" />
      {/* Rear left leg */}
      <path d="M32 42 L28 62 L26 82 L30 82 L31 62 L34 42" fill="url(#qBodyGrad)" stroke="#334155" strokeWidth="0.4" />
      {/* Rear right leg */}
      <path d="M66 42 L70 62 L72 82 L76 82 L73 62 L68 42" fill="url(#qBodyGrad)" stroke="#334155" strokeWidth="0.4" />

      {/* Skeleton lines */}
      <g stroke="#475569" strokeWidth="0.2" strokeDasharray="1,1" opacity="0.4">
        <line x1="50" y1="36" x2="86" y2="25" />
        <line x1="33" y1="42" x2="32" y2="72" />
        <line x1="65" y1="42" x2="70" y2="72" />
        <line x1="32" y1="42" x2="28" y2="82" />
        <line x1="67" y1="42" x2="74" y2="82" />
      </g>

      {/* Hotspots */}
      {quadrupedHotspots.map((h) => {
        const isUploaded = !!uploadedComponents[h.id];
        const isSelected = selectedHotspot === h.id;
        const isUploading = uploadingComponent === h.id;
        const baseColor = isUploaded ? "#22C55E" : isUploading ? "#F59E0B" : "#3B82F6";

        return (
          <g
            key={h.id}
            className="hotspot-node"
            onClick={() => selectHotspot(h.id)}
            filter={isSelected ? "url(#qGlowStrong)" : "url(#qGlow)"}
          >
            {!isUploaded && (
              <circle
                cx={h.x}
                cy={h.y}
                r="4"
                fill="none"
                stroke={baseColor}
                strokeWidth="0.3"
                opacity="0.5"
                className="animate-pulse-glow"
              />
            )}
            <circle
              cx={h.x}
              cy={h.y}
              r="2.5"
              fill={isSelected ? baseColor : "transparent"}
              stroke={baseColor}
              strokeWidth={isSelected ? "0.8" : "0.5"}
              opacity={isSelected ? 1 : 0.7}
            />
            <circle cx={h.x} cy={h.y} r="1" fill={baseColor} opacity={0.9} />
            <text
              x={h.x}
              y={h.y - 5}
              textAnchor="middle"
              fill={isSelected ? "#F8FAFC" : "#94A3B8"}
              fontSize="2.5"
              fontWeight={isSelected ? "bold" : "normal"}
            >
              {h.label}
            </text>
            {!isUploaded && !isUploading && (
              <text x={h.x} y={h.y + 6} textAnchor="middle" fill="#64748B" fontSize="1.8">
                待上传
              </text>
            )}
            {isUploading && (
              <text x={h.x} y={h.y + 6} textAnchor="middle" fill="#F59E0B" fontSize="1.8">
                分析中...
              </text>
            )}
            {isUploaded && (
              <text x={h.x} y={h.y + 6} textAnchor="middle" fill="#22C55E" fontSize="1.8">
                已完成
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
