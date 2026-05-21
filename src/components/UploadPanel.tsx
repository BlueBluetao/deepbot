"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileImage, Loader2, CheckCircle2, Scan } from "lucide-react";
import { useStore } from "@/store/useStore";
import { componentDataMap } from "@/data/mockData";

export default function UploadPanel() {
  const {
    selectedHotspot,
    showUploadPanel,
    selectHotspot,
    uploadingComponent,
    setUploadingComponent,
    addUploadedComponent,
    setScanProgress,
    setScanMessage,
    scanProgress,
    scanMessage,
    uploadedComponents,
  } = useStore();

  const [isDragOver, setIsDragOver] = useState(false);

  const componentData = selectedHotspot ? componentDataMap[selectedHotspot] : null;
  const isUploaded = selectedHotspot ? !!uploadedComponents[selectedHotspot] : false;
  const isUploading = uploadingComponent === selectedHotspot;

  const simulateUpload = useCallback(async () => {
    if (!selectedHotspot || !componentData) return;

    setUploadingComponent(selectedHotspot);
    setScanProgress(0);
    setScanMessage("初始化几何特征提取引擎...");

    const messages = componentData.scanMessages;
    const totalSteps = messages.length + 2;
    let step = 0;

    await new Promise((r) => setTimeout(r, 600));
    step++;
    setScanProgress((step / totalSteps) * 100);
    setScanMessage("正在进行几何特征提取...");

    for (const msg of messages) {
      await new Promise((r) => setTimeout(r, msg.delay));
      step++;
      setScanProgress((step / totalSteps) * 100);
      setScanMessage(msg.text);
    }

    await new Promise((r) => setTimeout(r, 500));
    step++;
    setScanProgress(100);
    setScanMessage("正在匹配工艺库...");

    await new Promise((r) => setTimeout(r, 800));

    addUploadedComponent({
      tag: selectedHotspot,
      label: componentData.label,
      bomItems: componentData.bomItems,
      uploadedAt: new Date(),
    });
  }, [selectedHotspot, componentData, setUploadingComponent, setScanProgress, setScanMessage, addUploadedComponent]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (!isUploaded && !isUploading) simulateUpload();
    },
    [isUploaded, isUploading, simulateUpload]
  );

  if (!showUploadPanel || !selectedHotspot) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="w-80 h-full bg-[#15122B] border-l border-[#231E45] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#231E45] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">
              {componentData?.label || selectedHotspot}
            </h3>
            <p className="text-xs text-[#8C85B2] mt-0.5">组件图纸上传</p>
          </div>
          <button
            onClick={() => selectHotspot(null)}
            className="w-7 h-7 rounded-md flex items-center justify-center text-[#8C85B2] hover:bg-[#231E45] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Upload area */}
          {!isUploaded && !isUploading && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                isDragOver
                  ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                  : "border-[#37306A] hover:border-[#8B5CF6]/50"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#231E45] flex items-center justify-center mx-auto mb-4">
                <Upload className="w-5 h-5 text-[#A78BFA]" />
              </div>
              <p className="text-sm text-[#B8B2D8] mb-2">拖拽图纸文件至此处</p>
              <p className="text-xs text-[#8C85B2] mb-4">
                支持 .step / .stp / .iges / .dxf / .pdf
              </p>
              <button
                onClick={simulateUpload}
                className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-sm rounded-lg hover:from-[#7C3AED] hover:to-[#9333EA] transition-all shadow-[0_0_12px_rgba(139,92,246,0.2)]"
              >
                选择文件上传
              </button>
            </div>
          )}

          {/* Scanning animation */}
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="relative h-40 rounded-xl bg-[#231E45] border border-[#37306A] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileImage className="w-16 h-16 text-[#37306A]" />
                </div>
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent animate-scan-line" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#15122B] to-transparent">
                  <div className="flex items-center gap-2">
                    <Scan className="w-3.5 h-3.5 text-[#A78BFA] animate-pulse" />
                    <span className="text-xs text-[#A78BFA] font-mono">{scanMessage}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#B8B2D8]">分析进度</span>
                  <span className="text-[#A78BFA] font-mono">{Math.round(scanProgress)}%</span>
                </div>
                <div className="h-2 bg-[#231E45] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] rounded-full animate-breathe"
                    style={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#8C85B2]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8B5CF6]" />
                正在进行智能解析，请稍候...
              </div>
            </motion.div>
          )}

          {/* Upload complete */}
          {isUploaded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 p-4 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#22C55E]">解析完成</p>
                  <p className="text-xs text-[#B8B2D8] mt-0.5">
                    已识别 {uploadedComponents[selectedHotspot]?.bomItems.length || 0} 个零部件
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-[#8C85B2] uppercase tracking-wider mb-2">
                  识别到的零部件
                </h4>
                <div className="space-y-1.5">
                  {uploadedComponents[selectedHotspot]?.bomItems.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between px-3 py-2 bg-[#231E45] rounded-lg text-xs animate-fade-in-up"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor:
                              item.category === "机加工件" ? "#8B5CF6"
                              : item.category === "塑胶件" ? "#C084FC"
                              : item.category === "标准件" ? "#6B7280"
                              : item.category === "电子料" ? "#22C55E"
                              : "#F59E0B",
                          }}
                        />
                        <span className="text-[#F5F3FF] truncate">{item.name}</span>
                      </div>
                      <span className="text-[#8C85B2] ml-2 flex-shrink-0">x{item.quantity}</span>
                    </div>
                  ))}
                  {(uploadedComponents[selectedHotspot]?.bomItems.length || 0) > 5 && (
                    <p className="text-xs text-[#8C85B2] text-center py-1">
                      还有 {(uploadedComponents[selectedHotspot]?.bomItems.length || 0) - 5} 个零部件...
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-[#8C85B2] uppercase tracking-wider mb-2">
                  自动识别属性
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {uploadedComponents[selectedHotspot]?.bomItems
                    .filter((i) => i.surfaceTreatment)
                    .map((item) => (
                      <span
                        key={item.id}
                        className="px-2 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-md text-xs text-[#A78BFA]"
                      >
                        {item.surfaceTreatment}
                      </span>
                    ))}
                  {uploadedComponents[selectedHotspot]?.bomItems
                    .filter((i) => i.material)
                    .slice(0, 3)
                    .map((item) => (
                      <span
                        key={item.id + "-mat"}
                        className="px-2 py-1 bg-[#C084FC]/10 border border-[#C084FC]/30 rounded-md text-xs text-[#D8B4FE]"
                      >
                        {item.material}
                      </span>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
