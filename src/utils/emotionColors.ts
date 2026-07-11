export const emotionColors: Record<string, string> = {
  '喜び': '#FFF59D', '信頼': '#C8E6C9', '恐れ': '#B2DFDB', '驚き': '#B3E5FC',
  '悲しみ': '#BBDEFB', '嫌悪': '#E1BEE7', '怒り': '#FFCDD2', '期待': '#FFE0B2',
  '幸せ': '#FFF59D', '歓喜': '#FFF59D', '満足': '#FFF59D', '安らぎ': '#FFF59D',
  '尊敬': '#C8E6C9', '安心': '#C8E6C9', '受け入れ': '#C8E6C9', '親近感': '#C8E6C9',
  '恐怖': '#B2DFDB', '不安': '#B2DFDB', '心配': '#B2DFDB', '焦り': '#B2DFDB',
  '驚愕': '#B3E5FC', '動揺': '#B3E5FC', '戸惑い': '#B3E5FC', '圧倒': '#B3E5FC',
  '悲観': '#BBDEFB', '憂鬱': '#BBDEFB', '寂しさ': '#BBDEFB', '切なさ': '#BBDEFB',
  '憎悪': '#E1BEE7', '退屈': '#E1BEE7', '嫌気': '#E1BEE7', '拒絶': '#E1BEE7',
  '激怒': '#FFCDD2', '苛立ち': '#FFCDD2', '不満': '#FFCDD2', '反発': '#FFCDD2',
  '警戒': '#FFE0B2', '関心': '#FFE0B2', '希望': '#FFE0B2', 'ワクワク': '#FFE0B2'
};

export const plutchikEmotions = [
  { name: '喜び', color: '#FFF59D', angle: -90 }, // Top
  { name: '信頼', color: '#C8E6C9', angle: -45 },
  { name: '恐れ', color: '#B2DFDB', angle: 0 },   // Right
  { name: '驚き', color: '#B3E5FC', angle: 45 },
  { name: '悲しみ', color: '#BBDEFB', angle: 90 },  // Bottom
  { name: '嫌悪', color: '#E1BEE7', angle: 135 },
  { name: '怒り', color: '#FFCDD2', angle: 180 },   // Left
  { name: '期待', color: '#FFE0B2', angle: 225 },
];

export const subEmotionsMap: Record<string, string[]> = {
  '喜び': ['幸せ', '歓喜', '満足', '安らぎ'],
  '信頼': ['尊敬', '安心', '受け入れ', '親近感'],
  '恐れ': ['恐怖', '不安', '心配', '焦り'],
  '驚き': ['驚愕', '動揺', '戸惑い', '圧倒'],
  '悲しみ': ['悲観', '憂鬱', '寂しさ', '切なさ'],
  '嫌悪': ['憎悪', '退屈', '嫌気', '拒絶'],
  '怒り': ['激怒', '苛立ち', '不満', '反発'],
  '期待': ['警戒', '関心', '希望', 'ワクワク']
};
