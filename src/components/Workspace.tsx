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
    <div className="flex h-screen bg-[#15122B] overflow-hidden">
      {/* Left sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 min-w-0">
        {/* Center - 3D preview / skeleton */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-5 py-3 border-b border-[#231E45] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">
                {robotType === "humanoid" ? "人形机器人" : "四足机器人"} · 结构预览
              </h2>
              <p className="text-xs text-[#8C85B2]">点击热点节点上传对应组件图纸</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse-glow" />
              <span className="text-xs text-[#8C85B2]">待上传</span>
              <div className="w-2 h-2 rounded-full bg-[#F59E0B] ml-2" />
              <span className="text-xs text-[#8C85B2]">分析中</span>
              <div className="w-2 h-2 rounded-full bg-[#22C55E] ml-2" />
              <span className="text-xs text-[#8C85B2]">已完成</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
            {/* Grid + mesh background */}
            <div className="absolute inset-0 tech-grid opacity-40" />
            <div className="absolute inset-0 purple-mesh-bg" />
            <div className="relative z-10 w-full h-full max-w-xl">
              {robotType === "humanoid" ? <HumanoidSkeleton /> : <QuadrupedSkeleton />}
            </div>
          </div>
        </div>

        {/* Right panel - BOM or Upload */}
        <div className="w-80 border-l border-[#231E45] flex flex-col bg-[#15122B]">
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
