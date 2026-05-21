"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Package, DollarSign, Layers, ExternalLink } from "lucide-react";
import { useStore } from "@/store/useStore";
import { categoryColors, type BOMItem, type MaterialCategory } from "@/data/mockData";

export default function BOMPanel() {
  const { uploadedComponents, setShowSupplyModal } = useStore();

  const allBomItems: BOMItem[] = Object.values(uploadedComponents).flatMap((c) => c.bomItems);
  if (allBomItems.length === 0) return null;

  const grouped = allBomItems.reduce<Record<string, BOMItem[]>>((acc, item) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const totalCost = allBomItems.reduce((sum, item) => sum + (item.unitPrice ?? 0) * item.quantity, 0);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#1E293B] flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#0068B7]" />
          BOM 清单
          <span className="text-xs font-normal text-[#94A3B8]">({allBomItems.length} 项)</span>
        </h3>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-[#1E293B]">
          <DollarSign className="w-3.5 h-3.5 text-[#D97706]" />
          \u00A5{totalCost.toLocaleString()}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColors[cat as MaterialCategory] ?? "#94A3B8" }} />
              <span className="text-xs font-medium text-[#64748B]">{cat}</span>
              <span className="text-xs text-[#94A3B8]">({items.length})</span>
            </div>
            <div className="space-y-1">
              <AnimatePresence>
                {items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0068B7]/30 transition-colors group"
                  >
                    <Package className="w-3.5 h-3.5 text-[#0068B7] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-[#1E293B] truncate">{item.name}</div>
                      <div className="text-xs text-[#94A3B8]">{item.material ?? item.category}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-medium text-[#1E293B]">\u00D7{item.quantity}</div>
                      <div className="text-xs text-[#94A3B8]">\u00A5{item.unitPrice}</div>
                    </div>
                    <button
                      onClick={() => setShowSupplyModal(true)}
                      className="opacity-0 group-hover:opacity-100 text-[#94A3B8] hover:text-[#0068B7] transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
