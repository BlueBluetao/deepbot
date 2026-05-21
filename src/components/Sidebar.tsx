"use client";

import { motion } from "framer-motion";
import {
  Bot,
  LayoutDashboard,
  FileText,
  ShoppingCart,
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
    showDFMReport,
    setShowDFMReport,
    reset,
  } = useStore();

  const hotspots = robotType === "humanoid" ? humanoidHotspots : quadrupedHotspots;
  const uploadedCount = Object.keys(uploadedComponents).length;
  const totalCount = hotspots.length;

  return (
    <div className="w-64 h-full flex flex-col bg-[#15122B] border-r border-[#231E45]">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[#231E45]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.3)]">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">聚深智能</h1>
            <p className="text-xs text-[#8C85B2]">DFM 分析平台</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-5 py-3 border-b border-[#231E45]">
        <div className="flex items-center justify-between text-xs text-[#B8B2D8] mb-2">
          <span>上传进度</span>
          <span>{uploadedCount}/{totalCount}</span>
        </div>
        <div className="h-1.5 bg-[#231E45] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(uploadedCount / totalCount) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Structure Tree */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="text-xs text-[#8C85B2] font-medium uppercase tracking-wider px-2 mb-2">
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
                    ? "bg-[#8B5CF6]/15 text-[#A78BFA]"
                    : "text-[#B8B2D8] hover:bg-[#231E45] hover:text-white"
                }`}
              >
                {isUploaded ? (
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-[#37306A] flex-shrink-0" />
                )}
                <span className="flex-1 text-left truncate">{h.label}</span>
                {isSelected && <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="px-3 py-3 border-t border-[#231E45] space-y-1.5">
        <button
          onClick={() => setShowDFMReport(true)}
          disabled={uploadedCount === 0}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white hover:from-[#7C3AED] hover:to-[#9333EA] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_12px_rgba(139,92,246,0.2)]"
        >
          <FileText className="w-4 h-4" />
          生成 DFM 报告
        </button>
        <button
          onClick={reset}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#8C85B2] hover:bg-[#231E45] hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          重新选择模板
        </button>
      </div>
    </div>
  );
}
