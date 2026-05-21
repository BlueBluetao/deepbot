"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  CheckCircle2,
  Package,
  Cpu,
  X,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { componentDataMap, type BOMItem, type ScanMessage } from "@/data/mockData";

export default function UploadPanel() {
  const {
    selectedHotspot,
    uploadedComponents,
    uploadingComponent,
    scanProgress,
    setUploadingComponent,
    setScanProgress,
    setScanMessage,
    addUploadedComponent,
    selectHotspot,
  } = useStore();
  const [dragOver, setDragOver] = useState(false);
  const [localMessages, setLocalMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  const startUpload = useCallback(
    async (hotspotId: string) => {
      const data = componentDataMap[hotspotId];
      if (!data) return;

      setUploadingComponent(hotspotId);
      setLocalMessages([]);
      setScanProgress(0);

      const messages = data.scanMessages;
      const step = 100 / (messages.length + 1);

      for (let i = 0; i < messages.length; i++) {
        await new Promise((r) => setTimeout(r, messages[i].delay));
        setLocalMessages((prev) => [...prev, messages[i].text]);
        setScanProgress(Math.round(step * (i + 1)));
      }

      await new Promise((r) => setTimeout(r, 400));
      setScanProgress(100);

      addUploadedComponent({
        tag: data.tag,
        label: data.label,
        bomItems: data.bomItems,
        uploadedAt: new Date(),
      });
      setLocalMessages([]);
    },
    [setUploadingComponent, setScanProgress, setScanMessage, addUploadedComponent]
  );

  const handleUpload = useCallback(() => {
    if (!selectedHotspot || uploadedComponents[selectedHotspot] || uploadingComponent) return;
    startUpload(selectedHotspot);
  }, [selectedHotspot, uploadedComponents, uploadingComponent, startUpload]);

  if (!selectedHotspot) return null;
  const isUploaded = !!uploadedComponents[selectedHotspot];
  const isUploading = uploadingComponent === selectedHotspot;
  const data = componentDataMap[selectedHotspot];
  const bomItems: BOMItem[] | undefined = uploadedComponents[selectedHotspot]?.bomItems;

  return (
    <AnimatePresence>
      <motion.div
        key="upload-panel"
        initial={{ x: 320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 320, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 250 }}
        className="absolute right-0 top-0 h-full w-80 bg-white border-l border-[#E2E8F0] flex flex-col shadow-lg z-20"
      >
        <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#1E293B] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#0068B7]" />
            {data?.label ?? selectedHotspot}
          </h3>
          <button onClick={() => selectHotspot(null)} className="text-[#94A3B8] hover:text-[#475569] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!isUploaded && !isUploading && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(); }}
              onClick={handleUpload}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                dragOver
                  ? "border-[#0068B7] bg-[#DBEAFE]/40"
                  : "border-[#E2E8F0] hover:border-[#0068B7]/40 hover:bg-[#F8FAFC]"
              }`}
            >
              <Upload className="w-8 h-8 text-[#94A3B8] mx-auto mb-3" />
              <p className="text-sm text-[#475569] font-medium mb-1">拖放或点击上传图纸</p>
              <p className="text-xs text-[#94A3B8]">支持 STEP / DXF / PDF 格式</p>
            </div>
          )}

          {isUploading && (
            <div className="space-y-3">
              <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#0068B7] font-medium">智能解析中</span>
                  <span className="text-xs text-[#64748B]">{scanProgress}%</span>
                </div>
                <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0068B7] to-[#3B8FD4] rounded-full"
                    style={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0] max-h-40 overflow-y-auto font-mono text-xs text-[#475569] space-y-1">
                {localMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-[#0068B7]">{">"}</span>
                    <span>{msg}</span>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {isUploaded && bomItems && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-[#16A34A] font-medium bg-[#F0FDF4] rounded-lg px-3 py-2 border border-[#BBF7D0]">
                <CheckCircle2 className="w-4 h-4" />
                解析完成
              </div>
              <div className="text-xs text-[#94A3B8] font-medium px-1">快速 BOM 预览</div>
              <div className="space-y-1.5">
                {bomItems.slice(0, 5).map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0068B7]/30 transition-colors"
                  >
                    <Package className="w-3.5 h-3.5 text-[#0068B7]" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-[#1E293B] font-medium truncate">{item.name}</div>
                      <div className="text-xs text-[#94A3B8]">{item.material} \u00D7 {item.quantity}</div>
                    </div>
                  </motion.div>
                ))}
                {bomItems.length > 5 && (
                  <p className="text-xs text-[#94A3B8] text-center py-1">+{bomItems.length - 5} 项 (在 BOM 面板查看完整列表)</p>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
