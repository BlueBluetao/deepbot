"use client";

import Sidebar from "@/components/Sidebar";
import HumanoidSkeleton from "@/components/HumanoidSkeleton";
import QuadrupedSkeleton from "@/components/QuadrupedSkeleton";
import UploadPanel from "@/components/UploadPanel";
import BOMPanel from "@/components/BOMPanel";
import DFMReport from "@/components/DFMReport";
import SupplyModal from "@/components/SupplyModal";
import { useStore } from "@/store/useStore";

export default function Workspace() {
  const robotType = useStore((s) => s.robotType);

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 flex relative overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="absolute inset-0 blue-mesh-bg" />
          <div className="absolute inset-0 tech-grid opacity-40" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {robotType === "humanoid" ? <HumanoidSkeleton /> : <QuadrupedSkeleton />}
          </div>
        </div>

        <div className="w-80 border-l border-[#E2E8F0] bg-white overflow-hidden">
          <BOMPanel />
        </div>

        <UploadPanel />
      </div>

      <DFMReport />
      <SupplyModal />
    </div>
  );
}
