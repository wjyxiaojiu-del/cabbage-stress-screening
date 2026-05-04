// 舟山海岛小白菜抗逆品种筛选 - 数据集
const VARIETY_DATA = [
  { name: '跃春', score: 0.796, physioScore: 0.752, growthScore: 0.864, grade: '优异',
    growth: { weight: 23.5, height: 28.3, spread: 32.1, leafLen: 18.2, leafWidth: 12.5, leafCount: 15.2, chlorophyll: 42.8 },
    physio: { sugar: 13.85, protein: 2.15, proline: 22.79, mda: 5.08, pod: 82, cat: 48 },
    mdaStd: 0.62, podStd: 5.2, prolineStd: 2.85, sugarStd: 1.12 },
  { name: '迅雷', score: 0.731, physioScore: 0.708, growthScore: 0.765, grade: '优异',
    growth: { weight: 21.8, height: 26.5, spread: 30.8, leafLen: 17.5, leafWidth: 11.8, leafCount: 14.8, chlorophyll: 41.2 },
    physio: { sugar: 14.61, protein: 2.08, proline: 19.35, mda: 4.15, pod: 75, cat: 45 },
    mdaStd: 0.48, podStd: 4.8, prolineStd: 2.42, sugarStd: 1.05 },
  { name: '信福', score: 0.613, physioScore: 0.585, growthScore: 0.655, grade: '良好',
    growth: { weight: 20.2, height: 25.8, spread: 29.5, leafLen: 16.8, leafWidth: 11.2, leafCount: 14.2, chlorophyll: 39.5 },
    physio: { sugar: 14.65, protein: 1.95, proline: 17.82, mda: 5.35, pod: 75, cat: 42 },
    mdaStd: 0.55, podStd: 4.5, prolineStd: 2.15, sugarStd: 0.98 },
  { name: '冬春秀绿', score: 0.582, physioScore: 0.548, growthScore: 0.633, grade: '良好',
    growth: { weight: 19.8, height: 27.2, spread: 31.5, leafLen: 17.8, leafWidth: 12.0, leafCount: 13.5, chlorophyll: 40.1 },
    physio: { sugar: 12.45, protein: 1.88, proline: 16.55, mda: 5.82, pod: 68, cat: 40 },
    mdaStd: 0.58, podStd: 4.2, prolineStd: 2.05, sugarStd: 0.92 },
  { name: '华美甜脆快菜', score: 0.545, physioScore: 0.498, growthScore: 0.615, grade: '良好',
    growth: { weight: 22.5, height: 24.8, spread: 28.2, leafLen: 16.2, leafWidth: 11.5, leafCount: 13.8, chlorophyll: 38.8 },
    physio: { sugar: 11.85, protein: 1.82, proline: 15.28, mda: 6.15, pod: 62, cat: 38 },
    mdaStd: 0.65, podStd: 4.0, prolineStd: 1.95, sugarStd: 0.88 },
  { name: '冬绿', score: 0.512, physioScore: 0.475, growthScore: 0.568, grade: '良好',
    growth: { weight: 18.5, height: 25.5, spread: 29.8, leafLen: 16.5, leafWidth: 11.0, leafCount: 14.0, chlorophyll: 39.2 },
    physio: { sugar: 12.15, protein: 1.78, proline: 14.85, mda: 6.35, pod: 60, cat: 36 },
    mdaStd: 0.68, podStd: 3.8, prolineStd: 1.85, sugarStd: 0.85 },
  { name: '寒秀', score: 0.485, physioScore: 0.452, growthScore: 0.535, grade: '中等',
    growth: { weight: 17.8, height: 24.5, spread: 28.5, leafLen: 15.8, leafWidth: 10.8, leafCount: 13.2, chlorophyll: 37.5 },
    physio: { sugar: 11.55, protein: 1.72, proline: 13.95, mda: 6.58, pod: 58, cat: 35 },
    mdaStd: 0.72, podStd: 3.5, prolineStd: 1.75, sugarStd: 0.82 },
  { name: '春雷青梗菜', score: 0.452, physioScore: 0.418, growthScore: 0.503, grade: '中等',
    growth: { weight: 17.2, height: 23.8, spread: 27.5, leafLen: 15.2, leafWidth: 10.5, leafCount: 12.8, chlorophyll: 36.8 },
    physio: { sugar: 10.85, protein: 1.68, proline: 12.85, mda: 7.12, pod: 52, cat: 33 },
    mdaStd: 0.75, podStd: 3.2, prolineStd: 1.65, sugarStd: 0.78 },
  { name: '春冠青梗菜', score: 0.418, physioScore: 0.385, growthScore: 0.468, grade: '中等',
    growth: { weight: 16.5, height: 23.2, spread: 26.8, leafLen: 14.8, leafWidth: 10.2, leafCount: 12.5, chlorophyll: 35.5 },
    physio: { sugar: 10.55, protein: 1.62, proline: 11.95, mda: 7.45, pod: 48, cat: 31 },
    mdaStd: 0.78, podStd: 3.0, prolineStd: 1.55, sugarStd: 0.75 },
  { name: '早熟耐抽五号', score: 0.385, physioScore: 0.352, growthScore: 0.435, grade: '中等',
    growth: { weight: 15.8, height: 22.5, spread: 25.8, leafLen: 14.2, leafWidth: 9.8, leafCount: 12.0, chlorophyll: 34.8 },
    physio: { sugar: 10.15, protein: 1.55, proline: 11.25, mda: 7.68, pod: 45, cat: 30 },
    mdaStd: 0.82, podStd: 2.8, prolineStd: 1.45, sugarStd: 0.72 },
  { name: '浙研黄玉', score: 0.352, physioScore: 0.318, growthScore: 0.403, grade: '中等',
    growth: { weight: 15.2, height: 21.8, spread: 25.2, leafLen: 13.8, leafWidth: 9.5, leafCount: 11.5, chlorophyll: 33.5 },
    physio: { sugar: 9.85, protein: 1.48, proline: 10.55, mda: 7.92, pod: 42, cat: 28 },
    mdaStd: 0.85, podStd: 2.5, prolineStd: 1.35, sugarStd: 0.68 },
  { name: '春蔓青梗菜', score: 0.318, physioScore: 0.285, growthScore: 0.368, grade: '中等',
    growth: { weight: 14.5, height: 21.2, spread: 24.5, leafLen: 13.2, leafWidth: 9.2, leafCount: 11.2, chlorophyll: 32.8 },
    physio: { sugar: 9.55, protein: 1.42, proline: 9.85, mda: 8.15, pod: 40, cat: 27 },
    mdaStd: 0.88, podStd: 2.2, prolineStd: 1.25, sugarStd: 0.65 },
  { name: '黑叶苏州青', score: 0.285, physioScore: 0.252, growthScore: 0.335, grade: '较差',
    growth: { weight: 13.8, height: 20.5, spread: 23.8, leafLen: 12.8, leafWidth: 8.8, leafCount: 10.8, chlorophyll: 31.5 },
    physio: { sugar: 9.15, protein: 1.35, proline: 9.15, mda: 8.45, pod: 38, cat: 26 },
    mdaStd: 0.92, podStd: 2.0, prolineStd: 1.15, sugarStd: 0.62 },
  { name: '春华青梗油菜', score: 0.191, physioScore: 0.158, growthScore: 0.241, grade: '较差',
    growth: { weight: 12.5, height: 19.8, spread: 22.5, leafLen: 12.2, leafWidth: 8.5, leafCount: 10.2, chlorophyll: 30.2 },
    physio: { sugar: 8.55, protein: 1.25, proline: 8.25, mda: 8.95, pod: 32, cat: 24 },
    mdaStd: 0.95, podStd: 1.8, prolineStd: 1.05, sugarStd: 0.58 },
  { name: '好吃上海青', score: 0.142, physioScore: 0.108, growthScore: 0.193, grade: '较差',
    growth: { weight: 11.8, height: 19.2, spread: 21.8, leafLen: 11.8, leafWidth: 8.2, leafCount: 9.8, chlorophyll: 29.5 },
    physio: { sugar: 8.25, protein: 1.18, proline: 7.55, mda: 9.56, pod: 38, cat: 22 },
    mdaStd: 0.98, podStd: 1.5, prolineStd: 0.95, sugarStd: 0.55 },
  { name: '德高青荟', score: 0.137, physioScore: 0.095, growthScore: 0.200, grade: '较差',
    growth: { weight: 12.0, height: 18.5, spread: 21.2, leafLen: 11.5, leafWidth: 8.0, leafCount: 9.5, chlorophyll: 28.8 },
    physio: { sugar: 8.05, protein: 1.12, proline: 7.15, mda: 9.12, pod: 35, cat: 29 },
    mdaStd: 1.02, podStd: 1.2, prolineStd: 0.88, sugarStd: 0.52 }
];

// ANOVA结果
const ANOVA_RESULTS = [
  { indicator: 'MDA', fValue: 18.523, pValue: 0.0000, sig: '***' },
  { indicator: 'POD', fValue: 15.847, pValue: 0.0000, sig: '***' },
  { indicator: '脯氨酸', fValue: 12.365, pValue: 0.0000, sig: '***' },
  { indicator: '可溶性糖', fValue: 10.218, pValue: 0.0001, sig: '***' }
];

// 权重配置
const WEIGHT_CONFIG = {
  physio: {
    weight: 0.6,
    indicators: [
      { name: 'MDA', weight: 0.3, direction: 'negative', label: 'MDA(负向)' },
      { name: 'POD', weight: 0.25, direction: 'positive', label: 'POD(正向)' },
      { name: '脯氨酸', weight: 0.25, direction: 'positive', label: '脯氨酸(正向)' },
      { name: 'CAT', weight: 0.2, direction: 'positive', label: 'CAT(正向)' }
    ]
  },
  growth: {
    weight: 0.4,
    indicators: [
      { name: '单株重', weight: 0.4, direction: 'positive', label: '单株重(正向)' },
      { name: '株高', weight: 0.3, direction: 'positive', label: '株高(正向)' },
      { name: '叶绿素', weight: 0.3, direction: 'positive', label: '叶绿素(正向)' }
    ]
  }
};
