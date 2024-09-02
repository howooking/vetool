export const DEFAULT_ICU_ORDER_TYPE = [
  {
    label: '체크리스트',
    value: 'checklist',
    color: '#ffedd5', // orange
  },
  {
    label: '수액',
    value: 'fluid',
    color: '#e0f2fe', // sky
  },
  {
    label: '주사',
    value: 'injection',
    color: '#ecfccb', // lime
  },
  {
    label: '경구',
    value: 'po',
    color: '#fae8ff', // fuchsia
  },
  {
    label: '검사',
    value: 'test',
    color: '#fef9c3', // amber
  },
  {
    label: '기타',
    value: 'manual',
    color: '#ccfbf1', // teal
  },
  {
    label: '식이',
    value: 'feed',
    color: '#fee2e2', // red
  },
] as const
