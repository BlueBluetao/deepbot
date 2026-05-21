"use client";

import { motion } from "framer-motion";
import {
  Bot,
  FileText,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { humanoidHotspots, quadrupedHotspots } from "@/data/mockData";

export default function Sidebar() {
  const {
    robotType,
    uploadedComponents,
    selectedHotspot,
    selectHotspot,
    setShowDFMReport,
    reset,
  } = useStore();

  const hotspots = robotType === "humanoid" ? humanoidHotspots : quadrupedHotspots;
  const uploadedCount = Object.keys(uploadedComponents).length;
  const totalCount = hotspots.length;

  return (
    <div className="w-64 h-full flex flex-col bg-white border-r border-[#E2E8F0]">
      <div className="px-5 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0068B7] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#1E293B] leading-tight">聚深智能</h1>
            <p className="text-xs text-[#94A3B8]">DFM 分析平台</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between text-xs text-[#64748B] mb-2">
          <span>上传进度</span>
          <span>{uploadedCount}/{totalCount}</span>
        </div>
        <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#0068B7] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(uploadedCount / totalCount) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider px-2 mb-2">
          组件结构
        </div>
        <div className="space-y-0.5">
          {hotspots.map((h) => {
            const isUploaded = !!uploadedComponents[h.id];
            const isSelected = selectedHotspot === h.id;

            return (
              <button
                key={h.id}
                onClick={() => selectHotspot(h.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  isSelected
                    ? "bg-[#0068B7]/8 text-[#0068B7]"
                    : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
                }`}
              >
                {isUploaded ? (
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-[#CBD5E1] flex-shrink-0" />
                )}
                <span className="flex-1 text-left truncate">{h.label}</span>
                {isSelected && <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-3 py-3 border-t border-[#E2E8F0] space-y-1.5">
        <button
          onClick={() => setShowDFMReport(true)}
          disabled={uploadedCount === 0}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium bg-[#0068B7] text-white hover:bg-[#005A9E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <FileText className="w-4 h-4" />
          生成 DFM 报告
        </button>
        <button
          onClick={reset}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#475569] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          重新选择模板
        </button>
      </div>
    </div>
  );
}
