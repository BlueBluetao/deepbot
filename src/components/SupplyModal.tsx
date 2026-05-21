"use client";

import { motion } from "framer-motion";
import { X, ShoppingCart, ExternalLink, Star, Truck, ShieldCheck } from "lucide-react";
import { useStore } from "@/store/useStore";

const mockSuppliers = [
  { name: "\u5de5\u54c1\u6c47\u91c7\u8d2d", rating: 4.8, delivery: "3-5\u5929", cert: true, url: "#" },
  { name: "\u6df1\u5733\u534e\u5f3a\u7cbe\u5bc6\u5236\u9020", rating: 4.6, delivery: "5-7\u5929", cert: true, url: "#" },
  { name: "\u4e1c\u839e\u6a21\u5177\u4e16\u754c", rating: 4.3, delivery: "7-10\u5929", cert: false, url: "#" },
];

export default function SupplyModal() {
  const { showSupplyModal, setShowSupplyModal } = useStore();
  if (!showSupplyModal) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={() => setShowSupplyModal(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#E2E8F0]"
      >
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0068B7]/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-[#0068B7]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1E293B]">供应链追溯</h2>
              <p className="text-xs text-[#94A3B8]">推荐供应商 · 一键跳转采购</p>
            </div>
          </div>
          <button onClick={() => setShowSupplyModal(false)} className="text-[#94A3B8] hover:text-[#475569] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {mockSuppliers.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0068B7]/30 transition-colors group"
            >
              <div className="w-11 h-11 rounded-lg bg-[#0068B7]/8 flex items-center justify-center text-[#0068B7] font-bold text-sm">
                {s.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#1E293B]">{s.name}</div>
                <div className="flex items-center gap-3 text-xs text-[#94A3B8] mt-1">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-[#D97706]" />{s.rating}</span>
                  <span className="flex items-center gap-1"><Truck className="w-3 h-3" />{s.delivery}</span>
                  {s.cert && <span className="flex items-center gap-1 text-[#16A34A]"><ShieldCheck className="w-3 h-3" />已认证</span>}
                </div>
              </div>
              <a href={s.url} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#0068B7] bg-[#0068B7]/8 hover:bg-[#0068B7]/15 transition-colors">
                <ExternalLink className="w-3 h-3" />
                采购
              </a>
            </motion.div>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-[#E2E8F0] text-center text-xs text-[#94A3B8] bg-[#F8FAFC]">
          数据来源：聚深智能供应链数据库（Demo）
        </div>
      </motion.div>
    </motion.div>
  );
}
