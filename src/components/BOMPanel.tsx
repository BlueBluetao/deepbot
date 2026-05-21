"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Package, Cpu, Wrench, Layers, Cable, Box } from "lucide-react";
import { useStore } from "@/store/useStore";
import { categoryColors } from "@/data/mockData";
import type { BOMItem, MaterialCategory } from "@/data/mockData";

const categoryIcons: Record<MaterialCategory, React.ElementType> = {
  "机加工件": Wrench,
  "塑胶件": Layers,
  "标准件": Package,
  "电子料": Cpu,
  "线材": Cable,
  "其他": Box,
};

export default function BOMPanel() {
  const { uploadedComponents, setSupplyModalItem } = useStore();

  const allBomItems = useMemo(() => {
    const items: BOMItem[] = [];
    Object.values(uploadedComponents).forEach((c) => {
      items.push(...c.bomItems);
    });
    return items;
  }, [uploadedComponents]);

  const categorized = useMemo(() => {
    const map: Partial<Record<MaterialCategory, BOMItem[]>> = {};
    allBomItems.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category]!.push(item);
    });
    return map;
  }, [allBomItems]);

  const totalCost = useMemo(
    () =>
      allBomItems.reduce((sum, item) => sum + (item.unitPrice || 0) * item.quantity, 0),
    [allBomItems]
  );

  if (allBomItems.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#8C85B2] px-6">
        <Package className="w-12 h-12 mb-4 opacity-30" />
        <p className="text-sm text-center">点击左侧骨架上的热点节点，上传组件图纸后将自动生成物料清单</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Summary header */}
      <div className="px-5 py-4 border-b border-[#231E45]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white">智能 BOM 清单</h3>
          <span className="px-2 py-0.5 bg-[#8B5CF6]/10 text-[#A78BFA] text-xs rounded-full font-mono">
            {allBomItems.length} 项
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 bg-[#231E45] rounded-lg">
            <p className="text-xs text-[#8C85B2]">零件总数</p>
            <p className="text-lg font-bold text-white font-mono">
              {allBomItems.reduce((s, i) => s + i.quantity, 0)}
            </p>
          </div>
          <div className="p-2.5 bg-[#231E45] rounded-lg">
            <p className="text-xs text-[#8C85B2]">预估成本</p>
            <p className="text-lg font-bold text-[#22C55E] font-mono">
              ¥{totalCost.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Category tags */}
      <div className="px-5 py-3 border-b border-[#231E45] flex flex-wrap gap-1.5">
        {Object.entries(categorized).map(([cat, items]) => {
          const Icon = categoryIcons[cat as MaterialCategory];
          return (
            <div
              key={cat}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs"
              style={{
                backgroundColor: `${categoryColors[cat as MaterialCategory]}15`,
                color: categoryColors[cat as MaterialCategory],
              }}
            >
              <Icon className="w-3 h-3" />
              {cat}
              <span className="opacity-70">({items!.length})</span>
            </div>
          );
        })}
      </div>

      {/* BOM list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        <AnimatePresence>
          {Object.entries(categorized).map(([cat, items]) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <h4
                className="text-xs font-medium px-2 py-1"
                style={{ color: categoryColors[cat as MaterialCategory] }}
              >
                {cat}
              </h4>
              {items!.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group px-3 py-2.5 bg-[#231E45]/60 hover:bg-[#231E45] rounded-lg transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: categoryColors[cat as MaterialCategory] }}
                        />
                        <span className="text-sm text-white truncate">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 ml-3.5">
                        <span className="text-xs text-[#8C85B2] font-mono">{item.partNumber}</span>
                        <span className="text-xs text-[#8C85B2]">x{item.quantity}</span>
                        {item.unitPrice !== undefined && (
                          <span className="text-xs text-[#B8B2D8]">
                            ¥{item.unitPrice}
                          </span>
                        )}
                      </div>
                      {(item.surfaceTreatment || item.material || item.remark) && (
                        <div className="flex flex-wrap gap-1 mt-1.5 ml-3.5">
                          {item.surfaceTreatment && (
                            <span className="px-1.5 py-0.5 bg-[#8B5CF6]/10 text-[#A78BFA] text-[10px] rounded">
                              {item.surfaceTreatment}
                            </span>
                          )}
                          {item.material && (
                            <span className="px-1.5 py-0.5 bg-[#C084FC]/10 text-[#D8B4FE] text-[10px] rounded">
                              {item.material}
                            </span>
                          )}
                          {item.remark && (
                            <span className="px-1.5 py-0.5 bg-[#F59E0B]/10 text-[#FBBF24] text-[10px] rounded">
                              {item.remark}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {item.purchaseLink && (
                      <button
                        onClick={() => setSupplyModalItem(item)}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-[#8C85B2] hover:bg-[#37306A] hover:text-[#A78BFA] transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                        title="查看供应链"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
