"use client";

import { motion } from "framer-motion";
import { Bot, Dog } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function RobotSelector() {
  const setRobotType = useStore((s) => s.setRobotType);

  const cards = [
    {
      type: "humanoid" as const,
      icon: Bot,
      title: "人形机器人",
      desc: "双足直立结构，适用于服务、协作等场景",
      features: ["7 个功能模组", "多自由度关节", "全身 BOM 解析"],
    },
    {
      type: "quadruped" as const,
      icon: Dog,
      title: "四足机器人",
      desc: "仿生四足结构，适用于巡检、探索等场景",
      features: ["6 个功能模组", "高动态运动", "全地形适应"],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] px-4 relative overflow-hidden">
      <div className="absolute inset-0 blue-mesh-bg" />
      <div className="absolute inset-0 tech-grid opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4 tracking-tight">
          <span className="text-[#0068B7]">具身智能</span> · 机器人 DFM 分析平台
        </h1>
        <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
          上传机器人图纸，自动实现物料提取、加工工艺分析、装配逻辑评估及供应链溯源
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl relative z-10">
        {cards.map((card, i) => (
          <motion.button
            key={card.type}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setRobotType(card.type)}
            className="flex-1 group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white/80 backdrop-blur-sm p-8 text-left transition-all hover:border-[#0068B7]/40 hover:shadow-[0_4px_24px_rgba(0,104,183,0.12)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0068B7]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-xl bg-[#0068B7]/8 flex items-center justify-center mb-6 group-hover:bg-[#0068B7]/12 transition-colors">
                <card.icon className="w-8 h-8 text-[#0068B7]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-2">{card.title}</h2>
              <p className="text-[#64748B] mb-6">{card.desc}</p>
              <div className="space-y-2">
                {card.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0068B7]" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-sm text-[#0068B7] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                点击选择此模板 →
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-[#94A3B8] text-sm relative z-10"
      >
        Demo 版本 · 具身智能 © 2026
      </motion.p>
    </div>
  );
}
