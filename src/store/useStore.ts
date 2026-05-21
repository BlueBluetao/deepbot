import { create } from "zustand";
import type { BOMItem, ComponentTag } from "@/data/mockData";

export type RobotType = "humanoid" | "quadruped";
export type AppPhase = "select" | "workspace";

interface UploadedComponent {
  tag: string;
  label: string;
  bomItems: BOMItem[];
  uploadedAt: Date;
}

interface AppState {
  phase: AppPhase;
  robotType: RobotType | null;
  selectedHotspot: string | null;
  uploadingComponent: string | null;
  uploadedComponents: Record<string, UploadedComponent>;
  scanProgress: number;
  scanMessage: string;
  showUploadPanel: boolean;
  showDFMReport: boolean;
  showSupplyModal: boolean;
  supplyModalItem: BOMItem | null;

  setPhase: (phase: AppPhase) => void;
  setRobotType: (type: RobotType) => void;
  selectHotspot: (id: string | null) => void;
  setUploadingComponent: (tag: string | null) => void;
  addUploadedComponent: (component: UploadedComponent) => void;
  setScanProgress: (progress: number) => void;
  setScanMessage: (message: string) => void;
  setShowUploadPanel: (show: boolean) => void;
  setShowDFMReport: (show: boolean) => void;
  setShowSupplyModal: (show: boolean) => void;
  setSupplyModalItem: (item: BOMItem | null) => void;
  reset: () => void;
}

const initialState = {
  phase: "select" as AppPhase,
  robotType: null as RobotType | null,
  selectedHotspot: null as string | null,
  uploadingComponent: null as string | null,
  uploadedComponents: {} as Record<string, UploadedComponent>,
  scanProgress: 0,
  scanMessage: "",
  showUploadPanel: false,
  showDFMReport: false,
  showSupplyModal: false,
  supplyModalItem: null as BOMItem | null,
};

export const useStore = create<AppState>((set) => ({
  ...initialState,

  setPhase: (phase) => set({ phase }),
  setRobotType: (type) => set({ robotType: type, phase: "workspace" }),
  selectHotspot: (id) => set({ selectedHotspot: id, showUploadPanel: id !== null }),
  setUploadingComponent: (tag) => set({ uploadingComponent: tag }),
  addUploadedComponent: (component) =>
    set((state) => ({
      uploadedComponents: {
        ...state.uploadedComponents,
        [component.tag]: component,
      },
      uploadingComponent: null,
      scanProgress: 0,
      scanMessage: "",
    })),
  setScanProgress: (progress) => set({ scanProgress: progress }),
  setScanMessage: (message) => set({ scanMessage: message }),
  setShowUploadPanel: (show) => set({ showUploadPanel: show }),
  setShowDFMReport: (show) => set({ showDFMReport: show }),
  setShowSupplyModal: (show) => set({ showSupplyModal: show, supplyModalItem: show ? undefined : null }),
  setSupplyModalItem: (item) => set({ supplyModalItem: item, showSupplyModal: item !== null }),
  reset: () => set(initialState),
}));
