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

// unused
// export const DEFAULT_ICU_ORDERS = {
//   checkList: {
//     order: 0,
//     label: '체크리스트',
//     orders: [
//       {
//         orderName: '체온(T)',
//         orderComment: '직장체온',
//       },
//       {
//         orderName: '심박수(P)',
//         orderComment: '분당 심박수',
//       },
//       {
//         orderName: '호흡수(R)',
//         orderComment: '①기침 ②맑은콧물 ③화농성콧물',
//       },
//       {
//         orderName: '혈압(BP)',
//         orderComment: '도플러 혈압계',
//       },
//       {
//         orderName: '활력',
//         orderComment: '①양호 ②저하 ③불량',
//       },
//       {
//         orderName: '구토',
//         orderComment: '①위액 ②음식물 ③혈액 ④거품 ⑤기타',
//       },
//       {
//         orderName: '배변',
//         orderComment: '①정상 ②약간무름 ③무름 ④설사 ⑤혈액 ⑥점액',
//       },
//       {
//         orderName: '배뇨',
//         orderComment: '①정상뇨 ②옅은뇨 ③진한뇨 ④혈뇨',
//       },
//     ],
//     color: '#ffedd5', // orange
//   },
//   fluid: {
//     order: 1,
//     label: '수액',
//     orders: [
//       {
//         orderName: '수액',
//         orderComment: '수액속도',
//       },
//       {
//         orderName: '라인확인',
//         orderComment: '',
//       },
//     ],
//     color: '#e0f2fe', // sky
//   },
//   injection: {
//     order: 2,
//     label: '주사',
//     orders: [
//       {
//         orderName: 'Famotidine 0.5mg/kg IV TID',
//         orderComment: '0.5ml/dog',
//       },
//     ],
//     color: '#ecfccb', // lime
//   },
//   po: {
//     order: 3,
//     label: '경구',
//     orders: [],
//     color: '#fae8ff', // fuchsia
//   },
//   test: {
//     order: 4,
//     label: '검사',
//     orders: [],
//     color: '#fef9c3', // amber
//   },
//   manual: {
//     order: 5,
//     label: '기타',
//     orders: [],
//     color: '#ccfbf1', // teal
//   },
//   feed: {
//     order: 6,
//     label: '식이',
//     orders: [
//       {
//         orderName: 'A/D 1/2캔',
//         orderComment: '',
//       },
//     ],
//     color: '#fee2e2', // red
//   },
// }
