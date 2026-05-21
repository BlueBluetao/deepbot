"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  TrendingUp,
  Wrench,
  Shield,
  Zap,
  FileText,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { dfmWarnings, categoryColors } from "@/data/mockData";
import type { BOMItem } from "@/data/mockData";

const levelConfig = {
  error: { icon: AlertCircle, color: "#EF4444", bg: "#EF4444", label: "严重" },
  warning: { icon: AlertTriangle, color: "#F59E0B", bg: "#F59E0B", label: "警告" },
  info: { icon: Info, color: "#3B82F6", bg: "#3B82F6", label: "建议" },
};

function CircularProgress({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? "#22C55E" : score >= 70 ? "#F59E0B" : "#EF4444";

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#1E293B" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-[#64748B]">可制造性得分</span>
      </div>
    </div>
  );
}

export default function DFMReport() {
  const { showDFMReport, setShowDFMReport, uploadedComponents } = useStore();

  const allBomItems = useMemo(() => {
    const items: BOMItem[] = [];
    Object.values(uploadedComponents).forEach((c) => items.push(...c.bomItems));
    return items;
  }, [uploadedComponents]);

  const stats = useMemo(() => {
    const screwTypes = new Set(
      allBomItems.filter((i) => i.name.includes("螺钉")).map((i) => i.partNumber)
    );
    const machined = allBomItems.filter((i) => i.category === "机加工件").length;
    const totalCost = allBomItems.reduce((s, i) => s + (i.unitPrice || 0) * i.quantity, 0);
    return {
      totalParts: allBomItems.length,
      totalQuantity: allBomItems.reduce((s, i) => s + i.quantity, 0),
      screwTypes: screwTypes.size,
      machinedParts: machined,
      totalCost,
      anodizedParts: allBomItems.filter((i) => i.surfaceTreatment?.includes("阳极氧化")).length,
    };
  }, [allBomItems]);

  const dfmScore = useMemo(() => {
    let score = 100;
    if (stats.screwTypes > 5) score -= 8;
    if (stats.screwTypes > 3) score -= 4;
    if (stats.anodizedParts > 3) score -= 3;
    const errors = dfmWarnings.filter((w) => w.level === "error").length;
    const warnings = dfmWarnings.filter((w) => w.level === "warning").length;
    score -= errors * 5;
    score -= warnings * 2;
    return Math.max(0, Math.min(100, score));
  }, [stats]);

  if (!showDFMReport) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={() => setShowDFMReport(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className="w-full max-w-4xl max-h-[90vh] bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">DFM 分析报告</h2>
                <p className="text-xs text-[#64748B]">基于已上传的 {Object.keys(uploadedComponents).length} 个组件生成</p>
              </div>
            </div>
            <button
              onClick={() => setShowDFMReport(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#1E293B] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Score & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 flex items-center justify-center p-6 bg-[#1E293B]/50 rounded-xl border border-[#334155]/50">
                <CircularProgress score={dfmScore} />
              </div>
              <div className="md:col-span-2 grid grid-cols-2 gap-3">
                {[
                  { icon: TrendingUp, label: "零件种类", value: stats.totalParts, unit: "种", color: "#3B82F6" },
                  { icon: Wrench, label: "机加工件", value: stats.machinedParts, unit: "种", color: "#F59E0B" },
                  { icon: Shield, label: "紧固件规格", value: stats.screwTypes, unit: "种", color: stats.screwTypes > 5 ? "#EF4444" : "#22C55E" },
                  { icon: Zap, label: "阳极氧化件", value: stats.anodizedParts, unit: "件", color: "#8B5CF6" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-[#1E293B]/50 rounded-xl border border-[#334155]/50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                      <span className="text-xs text-[#64748B]">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white font-mono">{stat.value}</span>
                      <span className="text-xs text-[#64748B]">{stat.unit}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="p-4 bg-[#1E293B]/50 rounded-xl border border-[#334155]/50">
              <h3 className="text-sm font-bold text-white mb-3">成本预估</h3>
              <div className="flex items-center justify-between">
                <div className="flex gap-6">
                  {Object.entries(
                    allBomItems.reduce(
                      (acc, item) => {
                        const cat = item.category;
                        acc[cat] = (acc[cat] || 0) + (item.unitPrice || 0) * item.quantity;
                        return acc;
                      },
                      {} as Record<string, number>
                    )
                  ).map(([cat, cost]) => (
                    <div key={cat} className="text-center">
                      <p className="text-xs text-[#64748B] mb-1">{cat}</p>
                      <p
                        className="text-sm font-bold font-mono"
                        style={{ color: categoryColors[cat as keyof typeof categoryColors] || "#94A3B8" }}
                      >
                        ¥{Math.round(cost).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#64748B]">总计预估</p>
                  <p className="text-xl font-bold text-[#22C55E] font-mono">
                    ¥{stats.totalCost.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* DFM Warnings */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3">DFM 评估结果</h3>
              <div className="space-y-2.5">
                {dfmWarnings.map((warning, i) => {
                  const config = levelConfig[warning.level];
                  const Icon = config.icon;
                  return (
                    <motion.div
                      key={warning.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="p-4 rounded-xl border"
                      style={{
                        backgroundColor: `${config.bg}08`,
                        borderColor: `${config.bg}30`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${config.bg}15` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: config.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-white">{warning.title}</span>
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                              style={{ backgroundColor: `${config.bg}20`, color: config.color }}
                            >
                              {config.label}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#334155] text-[#94A3B8]">
                              {warning.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#94A3B8] mb-2 leading-relaxed">
                            {warning.description}
                          </p>
                          <div className="flex items-start gap-1.5 p-2.5 bg-[#0F172A]/50 rounded-lg">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-[#22C55E] leading-relaxed">
                              {warning.suggestion}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#1E293B] flex items-center justify-between">
            <p className="text-xs text-[#64748B]">
              报告生成时间: {new Date().toLocaleString("zh-CN")}
            </p>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#3B82F6] text-white text-sm rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              导出 PDF 报告
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
