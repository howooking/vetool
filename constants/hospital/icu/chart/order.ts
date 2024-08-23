export const DEFAULT_ICU_ORDER_NAME = [
  {
    orderName: '체온(T)',
    orderComment: '직장체온',
    dataType: 'checklist',
  },
  {
    orderName: '심박수(P)',
    orderComment: '분당 심박수',
    dataType: 'checklist',
  },
  {
    orderName: '호흡수(R)',
    orderComment: '①기침 ②맑은콧물 ③화농성콧물',
    dataType: 'checklist',
  },
  {
    orderName: '혈압(BP)',
    orderComment: '도플러 혈압계',
    dataType: 'checklist',
  },
  {
    orderName: '활력',
    orderComment: '①양호 ②저하 ③불량',
    dataType: 'checklist',
  },
  {
    orderName: '구토',
    orderComment: '①위액 ②음식물 ③혈액 ④거품 ⑤기타',
    dataType: 'checklist',
  },
  {
    orderName: '배변',
    orderComment: '①정상 ②약간무름 ③무름 ④설사 ⑤혈액 ⑥점액',
    dataType: 'checklist',
  },
  {
    orderName: '배뇨',
    orderComment: '①정상뇨 ②옅은뇨 ③진한뇨 ④혈뇨',
    dataType: 'checklist',
  },
  {
    orderName: '라인체크',
    orderComment: '',
    dataType: 'fluid',
  },
  {
    orderName: '수액',
    orderComment: '',
    dataType: 'fluid',
  },
  {
    orderName: '사료',
    orderComment: '①자발 ②핸드피딩 ③강제급여',
    dataType: 'feed',
  },
] as const

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
