"use client";

import { motion } from "framer-motion";
import {
  X,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  FileText,
  Download,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { dfmWarnings } from "@/data/mockData";

export default function DFMReport() {
  const { showDFMReport, setShowDFMReport, uploadedComponents } = useStore();
  if (!showDFMReport) return null;

  const uploadedCount = Object.keys(uploadedComponents).length;
  const totalWarnings = dfmWarnings.length;
  const errorCount = dfmWarnings.filter((w) => w.level === "error").length;
  const warnCount = dfmWarnings.filter((w) => w.level === "warning").length;
  const infoCount = dfmWarnings.filter((w) => w.level === "info").length;

  const levelConfig = {
    error: { icon: AlertCircle, color: "#DC2626", bg: "#FEF2F2", border: "#FECACA", label: "\u4e25\u91cd" },
    warning: { icon: AlertTriangle, color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", label: "\u8b66\u544a" },
    info: { icon: Info, color: "#0068B7", bg: "#EFF6FF", border: "#BFDBFE", label: "\u5efa\u8bae" },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={() => setShowDFMReport(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#E2E8F0]"
      >
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0068B7]/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#0068B7]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1E293B]">DFM 分析报告</h2>
              <p className="text-xs text-[#94A3B8]">已分析 {uploadedCount} 个模组 · {totalWarnings} 条检查结果</p>
            </div>
          </div>
          <button onClick={() => setShowDFMReport(false)} className="text-[#94A3B8] hover:text-[#475569] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="text-center p-3 rounded-xl bg-white border border-[#E2E8F0]">
            <div className="text-2xl font-bold text-[#DC2626]">{errorCount}</div>
            <div className="text-xs text-[#94A3B8] mt-0.5">严重问题</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-white border border-[#E2E8F0]">
            <div className="text-2xl font-bold text-[#D97706]">{warnCount}</div>
            <div className="text-xs text-[#94A3B8] mt-0.5">警告</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-white border border-[#E2E8F0]">
            <div className="text-2xl font-bold text-[#0068B7]">{infoCount}</div>
            <div className="text-xs text-[#94A3B8] mt-0.5">优化建议</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {dfmWarnings.map((w, i) => {
            const cfg = levelConfig[w.level];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl p-4 border"
                style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: cfg.color }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: cfg.color + "18", color: cfg.color }}>
                        {cfg.label}
                      </span>
                      <span className="text-xs text-[#94A3B8]">{w.category}</span>
                    </div>
                    <p className="text-sm text-[#1E293B] font-medium">{w.description}</p>
                    <p className="text-xs text-[#64748B] mt-1">{w.suggestion}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="px-6 py-4 border-t border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC]">
          <div className="flex items-center gap-2 text-sm text-[#16A34A]">
            <CheckCircle2 className="w-4 h-4" />
            <span>初步 DFM 检查完成</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0068B7] text-white text-sm font-medium rounded-lg hover:bg-[#005A9E] transition-colors">
            <Download className="w-4 h-4" />
            导出报告
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
