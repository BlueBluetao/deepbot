"use client";

import { useStore } from "@/store/useStore";
import RobotSelector from "@/components/RobotSelector";
import Workspace from "@/components/Workspace";

export default function Home() {
  const phase = useStore((s) => s.phase);

  return phase === "select" ? <RobotSelector /> : <Workspace />;
}
