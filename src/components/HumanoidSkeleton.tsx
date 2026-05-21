"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { humanoidHotspots } from "@/data/mockData";

export default function HumanoidSkeleton() {
  const { selectedHotspot, selectHotspot, uploadedComponents, uploadingComponent } = useStore();

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full max-w-md mx-auto">
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.3" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glowStrong">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <ellipse cx="50" cy="10" rx="7" ry="8" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />
      <rect x="48" y="18" width="4" height="4" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="0.3" />
      <path d="M38 22 L62 22 L60 50 L40 50 Z" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />
      <path d="M38 23 L25 28 L22 42 L26 42 L28 30 L38 26" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />
      <path d="M62 23 L75 28 L78 42 L74 42 L72 30 L62 26" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />
      <path d="M40 50 L60 50 L58 56 L42 56 Z" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />
      <path d="M42 56 L38 78 L36 90 L42 90 L43 78 L46 56" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />
      <path d="M54 56 L57 78 L58 90 L64 90 L62 78 L58 56" fill="url(#bodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />

      <g stroke="#94A3B8" strokeWidth="0.2" strokeDasharray="1,1" opacity="0.4">
        <line x1="50" y1="10" x2="50" y2="50" />
        <line x1="38" y1="25" x2="22" y2="42" />
        <line x1="62" y1="25" x2="78" y2="42" />
        <line x1="42" y1="56" x2="39" y2="90" />
        <line x1="58" y1="56" x2="61" y2="90" />
      </g>

      {humanoidHotspots.map((h) => {
        const isUploaded = !!uploadedComponents[h.id];
        const isSelected = selectedHotspot === h.id;
        const isUploading = uploadingComponent === h.id;
        const baseColor = isUploaded ? "#16A34A" : isUploading ? "#D97706" : "#0068B7";

        return (
          <g key={h.id} className="hotspot-node" onClick={() => selectHotspot(h.id)} filter={isSelected ? "url(#glowStrong)" : "url(#glow)"}>
            {!isUploaded && (
              <circle cx={h.x} cy={h.y} r="4" fill="none" stroke={baseColor} strokeWidth="0.3" opacity="0.5" className="animate-pulse-glow" />
            )}
            <circle cx={h.x} cy={h.y} r="2.5" fill={isSelected ? baseColor : "transparent"} stroke={baseColor} strokeWidth={isSelected ? "0.8" : "0.5"} opacity={isSelected ? 1 : 0.7} />
            <circle cx={h.x} cy={h.y} r="1" fill={baseColor} opacity={0.9} />
            <text x={h.x} y={h.y - 5} textAnchor="middle" fill={isSelected ? "#1E293B" : "#64748B"} fontSize="2.5" fontWeight={isSelected ? "bold" : "normal"}>{h.label}</text>
            {!isUploaded && !isUploading && <text x={h.x} y={h.y + 6} textAnchor="middle" fill="#94A3B8" fontSize="1.8">待上传</text>}
            {isUploading && <text x={h.x} y={h.y + 6} textAnchor="middle" fill="#D97706" fontSize="1.8">分析中...</text>}
            {isUploaded && <text x={h.x} y={h.y + 6} textAnchor="middle" fill="#16A34A" fontSize="1.8">已完成</text>}
          </g>
        );
      })}
    </svg>
  );
}
