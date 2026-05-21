export type ComponentTag =
  | "头部"
  | "胸腔"
  | "左臂"
  | "右臂"
  | "腰部"
  | "左腿"
  | "右腿"
  | "前左腿"
  | "前右腿"
  | "后左腿"
  | "后右腿"
  | "躯干"
  | "头部传感器";

export type MaterialCategory = "机加工件" | "塑胶件" | "标准件" | "电子料" | "线材" | "其他";

export interface BOMItem {
  id: string;
  name: string;
  partNumber: string;
  category: MaterialCategory;
  quantity: number;
  material?: string;
  surfaceTreatment?: string;
  supplier?: string;
  unitPrice?: number;
  purchaseLink?: string;
  remark?: string;
}

export interface ScanMessage {
  text: string;
  delay: number;
}

export interface ComponentData {
  tag: ComponentTag;
  label: string;
  bomItems: BOMItem[];
  scanMessages: ScanMessage[];
}

export interface DFMWarning {
  id: string;
  level: "warning" | "error" | "info";
  title: string;
  description: string;
  suggestion: string;
  category: "标准化" | "装配风险" | "空间干涉" | "工艺优化";
}

export const humanoidHotspots = [
  { id: "头部", label: "头部模组", x: 50, y: 8, description: "摄像头、传感器、散热模组" },
  { id: "胸腔", label: "胸腔主控", x: 50, y: 25, description: "主控系统、电源管理、通信模块" },
  { id: "左臂", label: "左臂关节", x: 25, y: 32, description: "关节驱动、连杆结构、末端执行器" },
  { id: "右臂", label: "右臂关节", x: 75, y: 32, description: "关节驱动、连杆结构、末端执行器" },
  { id: "腰部", label: "腰部结构", x: 50, y: 48, description: "旋转关节、线缆通道、承载结构" },
  { id: "左腿", label: "左腿驱动", x: 38, y: 72, description: "髋关节、膝关节、踝关节驱动" },
  { id: "右腿", label: "右腿驱动", x: 62, y: 72, description: "髋关节、膝关节、踝关节驱动" },
] as const;

export const quadrupedHotspots = [
  { id: "头部传感器", label: "头部传感器", x: 82, y: 22, description: "激光雷达、深度摄像头、IMU" },
  { id: "躯干", label: "躯干主体", x: 50, y: 35, description: "主控电脑、电池组、散热系统" },
  { id: "前左腿", label: "前左腿", x: 30, y: 60, description: "髋关节、膝关节、足端传感器" },
  { id: "前右腿", label: "前右腿", x: 70, y: 60, description: "髋关节、膝关节、足端传感器" },
  { id: "后左腿", label: "后左腿", x: 30, y: 75, description: "髋关节、膝关节、足端传感器" },
  { id: "后右腿", label: "后右腿", x: 70, y: 75, description: "髋关节、膝关节、足端传感器" },
] as const;

export const componentDataMap: Record<string, ComponentData> = {
  "头部": {
    tag: "头部",
    label: "头部模组",
    scanMessages: [
      { text: "识别到深度摄像头模组...", delay: 500 },
      { text: "检测到散热风扇安装位...", delay: 800 },
      { text: "匹配到迷你主机安装结构...", delay: 600 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "H001", name: "i7-13620H 迷你主机", partNumber: "MC-i7-13620H", category: "电子料", quantity: 1, unitPrice: 2899, supplier: "天猫旗舰店", purchaseLink: "https://tmall.com", remark: "主控计算单元" },
      { id: "H002", name: "OAK-D Lite 深度摄像头", partNumber: "OAK-D-LITE", category: "电子料", quantity: 1, unitPrice: 799, supplier: "淘宝", purchaseLink: "https://taobao.com" },
      { id: "H003", name: "USB摄像头模组 200W", partNumber: "CAM-USB-200W", category: "电子料", quantity: 2, unitPrice: 45, supplier: "淘宝", purchaseLink: "https://taobao.com" },
      { id: "H004", name: "头部外壳-上盖", partNumber: "SH-HEAD-UP", category: "塑胶件", quantity: 1, material: "ABS", surfaceTreatment: "白色喷漆", unitPrice: 35 },
      { id: "H005", name: "头部外壳-面板", partNumber: "SH-HEAD-FACE", category: "塑胶件", quantity: 1, material: "PC", surfaceTreatment: "黑色半透明", unitPrice: 28 },
      { id: "H006", name: "散热风扇 4010", partNumber: "FAN-4010-5V", category: "电子料", quantity: 2, unitPrice: 12, supplier: "淘宝", purchaseLink: "https://taobao.com" },
      { id: "H007", name: "M3x8 内六角螺钉", partNumber: "M3x8-HEX", category: "标准件", quantity: 8, unitPrice: 0.15 },
      { id: "H008", name: "千兆扁平网线 0.3m", partNumber: "ETH-FLAT-03", category: "线材", quantity: 2, unitPrice: 8, supplier: "天猫", purchaseLink: "https://tmall.com", remark: "布线空间极窄，强制要求使用扁平线缆" },
    ],
  },
  "胸腔": {
    tag: "胸腔",
    label: "胸腔主控",
    scanMessages: [
      { text: "识别到电池包安装腔体...", delay: 600 },
      { text: "检测到主控板固定孔位...", delay: 700 },
      { text: "匹配到传感器安装接口...", delay: 500 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "C001", name: "定制电池包 24V 10Ah", partNumber: "BAT-24V-10AH", category: "电子料", quantity: 1, unitPrice: 1200, remark: "定制电池金属壳尺寸" },
      { id: "C002", name: "电池包外壳", partNumber: "SH-BAT-CASE", category: "机加工件", quantity: 1, material: "铝合金 6061", surfaceTreatment: "黑色阳极氧化", unitPrice: 180, supplier: "天猫", purchaseLink: "https://tmall.com" },
      { id: "C003", name: "YIS320 姿态传感器", partNumber: "YIS320-IMU", category: "电子料", quantity: 1, unitPrice: 680, supplier: "淘宝", purchaseLink: "https://taobao.com", remark: "9轴姿态传感器" },
      { id: "C004", name: "EtherCAT 主站控制板", partNumber: "ECAT-MASTER-V2", category: "电子料", quantity: 1, unitPrice: 1500 },
      { id: "C005", name: "胸腔侧板-左", partNumber: "MC-CHEST-L", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 220 },
      { id: "C006", name: "胸腔侧板-右", partNumber: "MC-CHEST-R", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 220 },
      { id: "C007", name: "后下壳", partNumber: "SH-CHEST-BACK", category: "塑胶件", quantity: 1, material: "ABS+PC", surfaceTreatment: "白色喷漆", unitPrice: 65 },
      { id: "C008", name: "DC-DC 降压模块 24V-5V", partNumber: "DCDC-24-5-10A", category: "电子料", quantity: 2, unitPrice: 35 },
      { id: "C009", name: "M3x14 内六角螺钉", partNumber: "M3x14-HEX", category: "标准件", quantity: 16, unitPrice: 0.2 },
      { id: "C010", name: "M4x20 内六角螺钉", partNumber: "M4x20-HEX", category: "标准件", quantity: 8, unitPrice: 0.3 },
    ],
  },
  "左臂": {
    tag: "左臂",
    label: "左臂关节",
    scanMessages: [
      { text: "识别到机加工法兰...", delay: 600 },
      { text: "检测到黑色阳极氧化要求...", delay: 800 },
      { text: "匹配到 PFR52-2 关节组件...", delay: 700 },
      { text: "分析交叉滚子轴承安装位...", delay: 500 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "LA001", name: "PFR52-2 关节组件", partNumber: "PFR52-2", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 2800, remark: "肩部旋转关节" },
      { id: "LA002", name: "输出保持架", partNumber: "MC-KEEPER-52", category: "机加工件", quantity: 1, material: "不锈钢 304", unitPrice: 150 },
      { id: "LA003", name: "交叉滚子轴承 RB5013", partNumber: "RB5013-CRB", category: "标准件", quantity: 1, unitPrice: 380 },
      { id: "LA004", name: "无框力矩电机 TM52", partNumber: "TM52-100W", category: "电子料", quantity: 2, unitPrice: 960 },
      { id: "LA005", name: "谐波减速器 CSF-17", partNumber: "CSF-17-50", category: "标准件", quantity: 2, unitPrice: 1200 },
      { id: "LA006", name: "M3x14 内六角螺钉", partNumber: "M3x14-HEX", category: "标准件", quantity: 12, unitPrice: 0.2 },
      { id: "LA007", name: "M2.5x10 内六角螺钉", partNumber: "M2.5x10-HEX", category: "标准件", quantity: 8, unitPrice: 0.15 },
      { id: "LA008", name: "上臂塑胶壳-外侧", partNumber: "SH-ARM-L-OUT", category: "塑胶件", quantity: 1, material: "ABS", surfaceTreatment: "白色喷漆", unitPrice: 42 },
      { id: "LA009", name: "上臂塑胶壳-内侧", partNumber: "SH-ARM-L-IN", category: "塑胶件", quantity: 1, material: "ABS", surfaceTreatment: "白色喷漆", unitPrice: 38 },
      { id: "LA010", name: "编码器 AS5048A", partNumber: "AS5048A-ATSM", category: "电子料", quantity: 2, unitPrice: 25 },
    ],
  },
  "右臂": {
    tag: "右臂",
    label: "右臂关节",
    scanMessages: [
      { text: "识别到机加工法兰（镜像）...", delay: 600 },
      { text: "检测到黑色阳极氧化要求...", delay: 700 },
      { text: "匹配到 PFR52-2 关节组件...", delay: 600 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "RA001", name: "PFR52-2 关节组件", partNumber: "PFR52-2-R", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 2800 },
      { id: "RA002", name: "输出保持架", partNumber: "MC-KEEPER-52-R", category: "机加工件", quantity: 1, material: "不锈钢 304", unitPrice: 150 },
      { id: "RA003", name: "交叉滚子轴承 RB5013", partNumber: "RB5013-CRB", category: "标准件", quantity: 1, unitPrice: 380 },
      { id: "RA004", name: "无框力矩电机 TM52", partNumber: "TM52-100W", category: "电子料", quantity: 2, unitPrice: 960 },
      { id: "RA005", name: "谐波减速器 CSF-17", partNumber: "CSF-17-50", category: "标准件", quantity: 2, unitPrice: 1200 },
      { id: "RA006", name: "M3x14 内六角螺钉", partNumber: "M3x14-HEX", category: "标准件", quantity: 12, unitPrice: 0.2 },
      { id: "RA007", name: "上臂塑胶壳-外侧", partNumber: "SH-ARM-R-OUT", category: "塑胶件", quantity: 1, material: "ABS", surfaceTreatment: "白色喷漆", unitPrice: 42 },
      { id: "RA008", name: "上臂塑胶壳-内侧", partNumber: "SH-ARM-R-IN", category: "塑胶件", quantity: 1, material: "ABS", surfaceTreatment: "白色喷漆", unitPrice: 38 },
    ],
  },
  "腰部": {
    tag: "腰部",
    label: "腰部结构",
    scanMessages: [
      { text: "识别到腰部旋转关节...", delay: 600 },
      { text: "检测到线缆通道结构...", delay: 700 },
      { text: "匹配到 PFR86-2 关节组件...", delay: 800 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "W001", name: "PFR86-2 关节组件", partNumber: "PFR86-2", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 4200, remark: "腰部大关节" },
      { id: "W002", name: "腰部承载框架", partNumber: "MC-WAIST-FRAME", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 350 },
      { id: "W003", name: "交叉滚子轴承 RB8016", partNumber: "RB8016-CRB", category: "标准件", quantity: 1, unitPrice: 620 },
      { id: "W004", name: "无框力矩电机 TM86", partNumber: "TM86-200W", category: "电子料", quantity: 1, unitPrice: 1800 },
      { id: "W005", name: "延长线C口直弯头 0.2m", partNumber: "USB-C-EXT-02", category: "线材", quantity: 3, unitPrice: 15, supplier: "天猫", purchaseLink: "https://tmall.com" },
      { id: "W006", name: "M4x16 内六角螺钉", partNumber: "M4x16-HEX", category: "标准件", quantity: 12, unitPrice: 0.25 },
      { id: "W007", name: "M5x20 内六角螺钉", partNumber: "M5x20-HEX", category: "标准件", quantity: 6, unitPrice: 0.4 },
    ],
  },
  "左腿": {
    tag: "左腿",
    label: "左腿驱动",
    scanMessages: [
      { text: "识别到髋关节驱动模组...", delay: 600 },
      { text: "检测到膝关节结构...", delay: 700 },
      { text: "匹配到踝关节六维力传感器...", delay: 800 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "LL001", name: "PFR86-2 髋关节组件", partNumber: "PFR86-2-HIP-L", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 4200 },
      { id: "LL002", name: "PFR52-2 膝关节组件", partNumber: "PFR52-2-KNEE-L", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 2800 },
      { id: "LL003", name: "六维力传感器", partNumber: "FT-6AXIS-ANKLE", category: "电子料", quantity: 1, unitPrice: 3500 },
      { id: "LL004", name: "大腿连杆", partNumber: "MC-THIGH-L", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 280 },
      { id: "LL005", name: "小腿连杆", partNumber: "MC-SHIN-L", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 260 },
      { id: "LL006", name: "M4x14 内六角螺钉", partNumber: "M4x14-HEX", category: "标准件", quantity: 16, unitPrice: 0.25 },
      { id: "LL007", name: "脚底橡胶垫", partNumber: "RUB-FOOT-L", category: "其他", quantity: 1, unitPrice: 25 },
    ],
  },
  "右腿": {
    tag: "右腿",
    label: "右腿驱动",
    scanMessages: [
      { text: "识别到髋关节驱动模组（镜像）...", delay: 600 },
      { text: "检测到膝关节结构...", delay: 700 },
      { text: "匹配到踝关节六维力传感器...", delay: 600 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "RL001", name: "PFR86-2 髋关节组件", partNumber: "PFR86-2-HIP-R", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 4200 },
      { id: "RL002", name: "PFR52-2 膝关节组件", partNumber: "PFR52-2-KNEE-R", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 2800 },
      { id: "RL003", name: "六维力传感器", partNumber: "FT-6AXIS-ANKLE", category: "电子料", quantity: 1, unitPrice: 3500 },
      { id: "RL004", name: "大腿连杆", partNumber: "MC-THIGH-R", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 280 },
      { id: "RL005", name: "小腿连杆", partNumber: "MC-SHIN-R", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 260 },
      { id: "RL006", name: "M4x14 内六角螺钉", partNumber: "M4x14-HEX", category: "标准件", quantity: 16, unitPrice: 0.25 },
      { id: "RL007", name: "脚底橡胶垫", partNumber: "RUB-FOOT-R", category: "其他", quantity: 1, unitPrice: 25 },
    ],
  },
  "头部传感器": {
    tag: "头部传感器",
    label: "头部传感器模组",
    scanMessages: [
      { text: "识别到激光雷达安装位...", delay: 600 },
      { text: "检测到 IMU 传感器接口...", delay: 700 },
      { text: "匹配到深度摄像头模组...", delay: 500 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "QH001", name: "Livox Mid-360 激光雷达", partNumber: "MID-360", category: "电子料", quantity: 1, unitPrice: 3999, supplier: "天猫", purchaseLink: "https://tmall.com" },
      { id: "QH002", name: "Intel RealSense D435i", partNumber: "D435i", category: "电子料", quantity: 1, unitPrice: 1899, supplier: "淘宝", purchaseLink: "https://taobao.com" },
      { id: "QH003", name: "YIS320 姿态传感器", partNumber: "YIS320-IMU", category: "电子料", quantity: 1, unitPrice: 680, supplier: "淘宝", purchaseLink: "https://taobao.com" },
      { id: "QH004", name: "传感器安装支架", partNumber: "MC-SENSOR-BRK", category: "机加工件", quantity: 1, material: "铝合金 6061", surfaceTreatment: "黑色阳极氧化", unitPrice: 120 },
    ],
  },
  "躯干": {
    tag: "躯干",
    label: "躯干主体",
    scanMessages: [
      { text: "识别到主控计算单元安装位...", delay: 600 },
      { text: "检测到电池组固定结构...", delay: 700 },
      { text: "匹配到散热系统...", delay: 600 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "QB001", name: "Jetson Orin NX 16GB", partNumber: "ORIN-NX-16G", category: "电子料", quantity: 1, unitPrice: 4599 },
      { id: "QB002", name: "定制电池包 48V 15Ah", partNumber: "BAT-48V-15AH", category: "电子料", quantity: 1, unitPrice: 2800, remark: "定制电池金属壳尺寸" },
      { id: "QB003", name: "电池包外壳", partNumber: "MC-BAT-CASE-Q", category: "机加工件", quantity: 1, material: "铝合金 6061", surfaceTreatment: "黑色阳极氧化", unitPrice: 350, supplier: "天猫", purchaseLink: "https://tmall.com" },
      { id: "QB004", name: "躯干框架", partNumber: "MC-BODY-FRAME", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 680 },
      { id: "QB005", name: "EtherCAT 主站控制板", partNumber: "ECAT-MASTER-V2", category: "电子料", quantity: 1, unitPrice: 1500 },
      { id: "QB006", name: "M4x12 内六角螺钉", partNumber: "M4x12-HEX", category: "标准件", quantity: 24, unitPrice: 0.22 },
    ],
  },
  "前左腿": {
    tag: "前左腿",
    label: "前左腿驱动",
    scanMessages: [
      { text: "识别到关节驱动模组...", delay: 600 },
      { text: "检测到足端力传感器...", delay: 700 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "QFL001", name: "髋关节电机模组", partNumber: "MOT-HIP-FL", category: "电子料", quantity: 2, unitPrice: 1800 },
      { id: "QFL002", name: "膝关节电机模组", partNumber: "MOT-KNEE-FL", category: "电子料", quantity: 1, unitPrice: 1500 },
      { id: "QFL003", name: "大腿连杆", partNumber: "MC-THIGH-FL", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 180 },
      { id: "QFL004", name: "小腿连杆", partNumber: "MC-SHIN-FL", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 160 },
      { id: "QFL005", name: "足端力传感器", partNumber: "FT-FOOT-FL", category: "电子料", quantity: 1, unitPrice: 450 },
      { id: "QFL006", name: "M3x10 内六角螺钉", partNumber: "M3x10-HEX", category: "标准件", quantity: 12, unitPrice: 0.18 },
    ],
  },
  "前右腿": {
    tag: "前右腿",
    label: "前右腿驱动",
    scanMessages: [
      { text: "识别到关节驱动模组（镜像）...", delay: 600 },
      { text: "检测到足端力传感器...", delay: 700 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "QFR001", name: "髋关节电机模组", partNumber: "MOT-HIP-FR", category: "电子料", quantity: 2, unitPrice: 1800 },
      { id: "QFR002", name: "膝关节电机模组", partNumber: "MOT-KNEE-FR", category: "电子料", quantity: 1, unitPrice: 1500 },
      { id: "QFR003", name: "大腿连杆", partNumber: "MC-THIGH-FR", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 180 },
      { id: "QFR004", name: "小腿连杆", partNumber: "MC-SHIN-FR", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 160 },
      { id: "QFR005", name: "足端力传感器", partNumber: "FT-FOOT-FR", category: "电子料", quantity: 1, unitPrice: 450 },
      { id: "QFR006", name: "M3x10 内六角螺钉", partNumber: "M3x10-HEX", category: "标准件", quantity: 12, unitPrice: 0.18 },
    ],
  },
  "后左腿": {
    tag: "后左腿",
    label: "后左腿驱动",
    scanMessages: [
      { text: "识别到关节驱动模组...", delay: 600 },
      { text: "检测到足端力传感器...", delay: 600 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "QBL001", name: "髋关节电机模组", partNumber: "MOT-HIP-BL", category: "电子料", quantity: 2, unitPrice: 1800 },
      { id: "QBL002", name: "膝关节电机模组", partNumber: "MOT-KNEE-BL", category: "电子料", quantity: 1, unitPrice: 1500 },
      { id: "QBL003", name: "大腿连杆", partNumber: "MC-THIGH-BL", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 180 },
      { id: "QBL004", name: "小腿连杆", partNumber: "MC-SHIN-BL", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 160 },
      { id: "QBL005", name: "足端力传感器", partNumber: "FT-FOOT-BL", category: "电子料", quantity: 1, unitPrice: 450 },
      { id: "QBL006", name: "M3x10 内六角螺钉", partNumber: "M3x10-HEX", category: "标准件", quantity: 12, unitPrice: 0.18 },
    ],
  },
  "后右腿": {
    tag: "后右腿",
    label: "后右腿驱动",
    scanMessages: [
      { text: "识别到关节驱动模组（镜像）...", delay: 600 },
      { text: "检测到足端力传感器...", delay: 600 },
      { text: "分析完成，生成 BOM 中...", delay: 400 },
    ],
    bomItems: [
      { id: "QBR001", name: "髋关节电机模组", partNumber: "MOT-HIP-BR", category: "电子料", quantity: 2, unitPrice: 1800 },
      { id: "QBR002", name: "膝关节电机模组", partNumber: "MOT-KNEE-BR", category: "电子料", quantity: 1, unitPrice: 1500 },
      { id: "QBR003", name: "大腿连杆", partNumber: "MC-THIGH-BR", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 180 },
      { id: "QBR004", name: "小腿连杆", partNumber: "MC-SHIN-BR", category: "机加工件", quantity: 1, material: "铝合金 7075", surfaceTreatment: "黑色阳极氧化", unitPrice: 160 },
      { id: "QBR005", name: "足端力传感器", partNumber: "FT-FOOT-BR", category: "电子料", quantity: 1, unitPrice: 450 },
      { id: "QBR006", name: "M3x10 内六角螺钉", partNumber: "M3x10-HEX", category: "标准件", quantity: 12, unitPrice: 0.18 },
    ],
  },
};

export const dfmWarnings: DFMWarning[] = [
  {
    id: "DFM001",
    level: "warning",
    title: "紧固件种类过多",
    description: "检测到当前设计使用了 7 种以上不同规格的螺钉（M2.5x10, M3x8, M3x10, M3x14, M4x12, M4x14, M4x16, M4x20, M5x20），增加了装配复杂度和库存管理成本。",
    suggestion: "建议统一紧固件规格至 3-4 种，优先使用 M3x14 和 M4x16 作为主力规格。",
    category: "标准化",
  },
  {
    id: "DFM002",
    level: "error",
    title: "关键装配步骤缺少扭矩校验",
    description: "参考 SOP 作业指导书中提到的「扭矩到位咔嚓声」判定方式依赖人工经验，关节组件 PFR52-2 和 PFR86-2 的装配扭矩要求严格（12\u00B10.5 N\u00B7m）。",
    suggestion: "建议在关键步骤增加扭矩传感器校验，并记录实际扭矩值以实现质量追溯。",
    category: "装配风险",
  },
  {
    id: "DFM003",
    level: "warning",
    title: "布线空间冗余度低",
    description: "头部至胸腔的千兆扁平网线通道宽度仅 8mm，且存在弯折半径小于 15mm 的区域，长期使用可能导致信号衰减。",
    suggestion: "强制要求使用扁平线缆（已采用），建议增加线缆固定夹并预留 20% 空间冗余。",
    category: "空间干涉",
  },
  {
    id: "DFM004",
    level: "info",
    title: "建议增加定位销以辅助装配",
    description: "胸腔侧板与承载框架之间仅通过螺钉连接，无定位特征，装配时需人工对齐，效率低且一致性差。",
    suggestion: "建议在侧板上增加 2 个 \u03A64 定位销孔，实现「先定位后紧固」的装配流程。",
    category: "工艺优化",
  },
  {
    id: "DFM005",
    level: "warning",
    title: "定制电池金属壳公差要求高",
    description: "电池包金属壳为定制件，尺寸公差要求 \u00B10.05mm，需要精密 CNC 加工，交期较长且成本较高。",
    suggestion: "建议评估是否可以放宽公差至 \u00B10.1mm，或采用钣金冲压方案降低成本。",
    category: "工艺优化",
  },
  {
    id: "DFM006",
    level: "error",
    title: "阳极氧化后螺纹孔配合问题",
    description: "多个机加工件要求黑色阳极氧化处理，氧化膜厚度约 10-15\u03BCm，可能影响螺纹孔与螺钉的配合精度。",
    suggestion: "建议对螺纹孔区域进行遮蔽处理，或在阳极氧化后进行螺纹修整。",
    category: "工艺优化",
  },
];

export const categoryColors: Record<MaterialCategory, string> = {
  "机加工件": "#3B82F6",
  "塑胶件": "#8B5CF6",
  "标准件": "#6B7280",
  "电子料": "#22C55E",
  "线材": "#F59E0B",
  "其他": "#94A3B8",
};
