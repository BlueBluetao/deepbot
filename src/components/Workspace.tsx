"use client";

import { useStore } from "@/store/useStore";
import Sidebar from "./Sidebar";
import HumanoidSkeleton from "./HumanoidSkeleton";
import QuadrupedSkeleton from "./QuadrupedSkeleton";
import UploadPanel from "./UploadPanel";
import BOMPanel from "./BOMPanel";
import DFMReport from "./DFMReport";
import SupplyModal from "./SupplyModal";

export default function Workspace() {
  const { robotType } = useStore();

  return (
    <div className="flex h-screen bg-[#0F172A] overflow-hidden">
      {/* Left sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 min-w-0">
        {/* Center - 3D preview / skeleton */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-5 py-3 border-b border-[#1E293B] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">
                {robotType === "humanoid" ? "人形机器人" : "四足机器人"} · 结构预览
              </h2>
              <p className="text-xs text-[#64748B]">点击热点节点上传对应组件图纸</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse-glow" />
              <span className="text-xs text-[#64748B]">待上传</span>
              <div className="w-2 h-2 rounded-full bg-[#F59E0B] ml-2" />
              <span className="text-xs text-[#64748B]">分析中</span>
              <div className="w-2 h-2 rounded-full bg-[#22C55E] ml-2" />
              <span className="text-xs text-[#64748B]">已完成</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10 w-full h-full max-w-xl">
              {robotType === "humanoid" ? <HumanoidSkeleton /> : <QuadrupedSkeleton />}
            </div>
          </div>
        </div>

        {/* Right panel - BOM or Upload */}
        <div className="w-80 border-l border-[#1E293B] flex flex-col bg-[#0F172A]">
          <BOMPanel />
        </div>

        {/* Upload slide panel */}
        <UploadPanel />
      </div>

      {/* Modals */}
      <DFMReport />
      <SupplyModal />
    </div>
  );
}
