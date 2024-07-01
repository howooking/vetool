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
    orderName: '수액',
    orderComment: '',
    dataType: 'fluid',
  },
  {
    orderName: '사료',
    orderComment: '',
    dataType: 'feed',
  },
] as const

export const DEFAULT_ICU_ORDER_TYPE = [
  {
    label: '체크리스트',
    value: 'checklist',
  },
  {
    label: '수액',
    value: 'fluid',
  },
  {
    label: '주사',
    value: 'injection',
  },
  {
    label: '테스트',
    value: 'test',
  },
  {
    label: '메뉴얼',
    value: 'manual',
  },
  {
    label: '식이',
    value: 'feed',
  },
] as const
