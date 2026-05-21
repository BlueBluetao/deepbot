"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShoppingCart, Star, Truck, Shield } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function SupplyModal() {
  const { showSupplyModal, supplyModalItem, setShowSupplyModal } = useStore();

  if (!showSupplyModal || !supplyModalItem) return null;

  const mockPrice = supplyModalItem.unitPrice || 0;
  const suppliers = [
    {
      platform: "天猫",
      name: `${supplyModalItem.name} 官方旗舰店`,
      price: mockPrice,
      sales: Math.floor(Math.random() * 500 + 100),
      rating: (4 + Math.random()).toFixed(1),
      delivery: "包邮 · 次日达",
      color: "#FF4400",
    },
    {
      platform: "淘宝",
      name: `${supplyModalItem.name} 工业级供应`,
      price: Math.round(mockPrice * 0.92),
      sales: Math.floor(Math.random() * 300 + 50),
      rating: (3.8 + Math.random() * 0.8).toFixed(1),
      delivery: "包邮 · 3日内发货",
      color: "#FF6600",
    },
    {
      platform: "1688",
      name: `${supplyModalItem.name} 批发供应商`,
      price: Math.round(mockPrice * 0.75),
      sales: Math.floor(Math.random() * 1000 + 200),
      rating: (3.5 + Math.random()).toFixed(1),
      delivery: "满10件包邮 · 5日内发货",
      color: "#FF8800",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={() => setShowSupplyModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="w-full max-w-lg bg-[#15122B] border border-[#37306A] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.1)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#231E45] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">供应链溯源</h2>
                <p className="text-xs text-[#8C85B2]">{supplyModalItem.name}</p>
              </div>
            </div>
            <button
              onClick={() => setShowSupplyModal(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8C85B2] hover:bg-[#231E45] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product info */}
          <div className="px-6 py-4 border-b border-[#231E45]">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-[#231E45] flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-8 h-8 text-[#37306A]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-white mb-1">{supplyModalItem.name}</h3>
                <p className="text-xs text-[#8C85B2] font-mono mb-2">{supplyModalItem.partNumber}</p>
                <div className="flex flex-wrap gap-1.5">
                  {supplyModalItem.material && (
                    <span className="px-1.5 py-0.5 bg-[#C084FC]/10 text-[#D8B4FE] text-[10px] rounded">
                      {supplyModalItem.material}
                    </span>
                  )}
                  {supplyModalItem.surfaceTreatment && (
                    <span className="px-1.5 py-0.5 bg-[#8B5CF6]/10 text-[#A78BFA] text-[10px] rounded">
                      {supplyModalItem.surfaceTreatment}
                    </span>
                  )}
                  <span className="px-1.5 py-0.5 bg-[#22C55E]/10 text-[#22C55E] text-[10px] rounded">
                    需求: {supplyModalItem.quantity} {supplyModalItem.category === "标准件" ? "颗" : "件"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier list */}
          <div className="px-6 py-4 space-y-3 max-h-[300px] overflow-y-auto">
            {suppliers.map((s, i) => (
              <motion.div
                key={s.platform}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 bg-[#231E45]/60 rounded-xl border border-[#37306A]/50 hover:border-[#37306A] transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
                        style={{ backgroundColor: s.color }}
                      >
                        {s.platform}
                      </span>
                      <span className="text-sm text-white">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#8C85B2]">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#F59E0B]" />
                        {s.rating}
                      </span>
                      <span>{s.sales}+ 人付款</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-[#8C85B2]">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        {s.delivery}
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        正品保障
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#EF4444] font-mono">
                      ¥{s.price}
                    </p>
                    <button className="mt-1.5 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-xs rounded-lg hover:from-[#7C3AED] hover:to-[#9333EA] transition-all opacity-80 group-hover:opacity-100">
                      <ExternalLink className="w-3 h-3" />
                      前往购买
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-[#231E45]">
            <p className="text-[10px] text-[#4A4280] text-center">
              以上价格及链接仅供参考，实际采购请以供应商报价为准 · Demo 演示数据
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
