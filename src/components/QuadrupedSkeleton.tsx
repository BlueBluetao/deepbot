"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { quadrupedHotspots } from "@/data/mockData";

export default function QuadrupedSkeleton() {
  const { selectedHotspot, selectHotspot, uploadedComponents, uploadingComponent } = useStore();

  return (
    <svg viewBox="0 0 100 60" className="w-full h-full max-w-lg mx-auto">
      <defs>
        <linearGradient id="quadBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.3" />
        </linearGradient>
        <filter id="quadGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="quadGlowStrong">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <path d="M25 15 L75 15 L78 28 L22 28 Z" fill="url(#quadBodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />
      <path d="M22 12 L32 12 L30 16 L24 16 Z" fill="url(#quadBodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />
      <path d="M24 28 L28 28 L30 45 L26 52 L22 52 L24 45 Z" fill="url(#quadBodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />
      <path d="M36 28 L40 28 L42 45 L38 52 L34 52 L36 45 Z" fill="url(#quadBodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />
      <path d="M60 28 L64 28 L66 45 L62 52 L58 52 L60 45 Z" fill="url(#quadBodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />
      <path d="M72 28 L76 28 L78 45 L74 52 L70 52 L72 45 Z" fill="url(#quadBodyGrad)" stroke="#CBD5E1" strokeWidth="0.4" />

      <g stroke="#94A3B8" strokeWidth="0.2" strokeDasharray="1,1" opacity="0.4">
        <line x1="50" y1="15" x2="50" y2="28" />
        <line x1="26" y1="28" x2="26" y2="52" />
        <line x1="38" y1="28" x2="38" y2="52" />
        <line x1="62" y1="28" x2="62" y2="52" />
        <line x1="74" y1="28" x2="74" y2="52" />
      </g>

      {quadrupedHotspots.map((h) => {
        const isUploaded = !!uploadedComponents[h.id];
        const isSelected = selectedHotspot === h.id;
        const isUploading = uploadingComponent === h.id;
        const baseColor = isUploaded ? "#16A34A" : isUploading ? "#D97706" : "#0068B7";

        return (
          <g key={h.id} className="hotspot-node" onClick={() => selectHotspot(h.id)} filter={isSelected ? "url(#quadGlowStrong)" : "url(#quadGlow)"}>
            {!isUploaded && (
              <circle cx={h.x} cy={h.y} r="3.5" fill="none" stroke={baseColor} strokeWidth="0.3" opacity="0.5" className="animate-pulse-glow" />
            )}
            <circle cx={h.x} cy={h.y} r="2" fill={isSelected ? baseColor : "transparent"} stroke={baseColor} strokeWidth={isSelected ? "0.8" : "0.5"} opacity={isSelected ? 1 : 0.7} />
            <circle cx={h.x} cy={h.y} r="0.8" fill={baseColor} opacity={0.9} />
            <text x={h.x} y={h.y - 4} textAnchor="middle" fill={isSelected ? "#1E293B" : "#64748B"} fontSize="2.5" fontWeight={isSelected ? "bold" : "normal"}>{h.label}</text>
            {!isUploaded && !isUploading && <text x={h.x} y={h.y + 5} textAnchor="middle" fill="#94A3B8" fontSize="1.8">待上传</text>}
            {isUploading && <text x={h.x} y={h.y + 5} textAnchor="middle" fill="#D97706" fontSize="1.8">分析中...</text>}
            {isUploaded && <text x={h.x} y={h.y + 5} textAnchor="middle" fill="#16A34A" fontSize="1.8">已完成</text>}
          </g>
        );
      })}
    </svg>
  );
}
