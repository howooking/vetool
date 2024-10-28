export const INSTRUCTIONS = [
  {
    id: 1,
    title: '환자 입원 / 퇴원',
    slides: [
      {
        id: 1,
        video: '/instruction/register1.mp4',
        description: '1. 좌측 상단의 환자입원 버튼 클릭',
      },
      {
        id: 2,
        video: '/instruction/register2.mp4',
        description: '2. 환자 검색 후 선택하여 입원 등록을 진행',
      },
      {
        id: 3,
        video: '/instruction/register3.mp4',
        description: '3. 환자가 없을 경우 신규 환자 등록을 진행',
      },
      {
        id: 4,
        video: '/instruction/register4.mp4',
        description: '4. 퇴원, 퇴원 취소',
      },
    ],
  },
  {
    id: 2,
    title: '차트 생성',
    slides: [
      {
        id: 1,
        video: '/instruction/chart1.mp4',
        description: '1. 기본차트 생성',
      },
      {
        id: 2,
        video: '/instruction/chart2.mp4',
        description: '2. 차트 붙여넣기',
      },
      {
        id: 3,
        video: '/instruction/chart3.mp4',
        description: '3. 템플릿 붙여넣기',
      },
      {
        id: 4,
        video: '/instruction/chart3.mp4',
        description: '4. 전일차트 붙여넣기 (전날의 차트가 있는 경우)',
      },
    ],
  },
  {
    id: 3,
    title: '오더 등록',
    slides: [
      {
        id: 1,
        video: '/instruction/order1.mp4',
        description: '1. 단일 오더 추가 (단축키 ctrl + o)',
      },
      {
        id: 2,
        video: '/instruction/order2.mp4',
        description: '2. 오더 시간 추가, 변경 (ctrl 누른상태 + 우클릭)',
      },
      {
        id: 3,
        video: '/instruction/order3.mp4',
        description: '3. 오더 순서 변경 (단축키 ctrl + s)',
      },
      {
        id: 4,
        video: '/instruction/order4.mp4',
        description:
          '4. 오더 삭제 - 개별 삭제, 다수 오더 선택(ctrl + 오더클릭) → delete키',
      },
      {
        id: 5,
        video: '/instruction/order5.mp4',
        description: '5. 템플릿 오더 추가',
      },
      {
        id: 6,
        video: '/instruction/order6.mp4',
        description:
          '4. 오더 복사 : 다수 오더 선택(ctrl + 오더클릭) → ctrl + c → ctrl + v (동일 또는 타른 차트에 붙여넣기 가능)',
      },
    ],
  },
  {
    id: 4,
    title: '처치 입력',
    slides: [
      {
        id: 1,
        video: '/instruction/treatment1.mp4',
        description: '1. 처치표 확인 → 간단 처치 입력',
      },
      {
        id: 2,
        video: '/instruction/treatment2.mp4',
        description: '2. 상세 처치 입력(마우스 0.8초간 좌클릭)',
      },
      {
        id: 3,
        video: '/instruction/treatment3.mp4',
        description:
          '2-1. 간편 상세 처치 입력("처치결과" + "$" + "처치코멘트")',
      },
      {
        id: 4,
        video: '/instruction/treatment4.mp4',
        description:
          '3. 다중 처치 입력 - 다수 처치 선택(ctrl누른 상태 + 좌클릭)',
      },
      {
        id: 5,
        video: '/instruction/treatment5.mp4',
        description:
          '4. 처치 삭제 - 마우스 0.8초간 좌클릭 → 삭제버튼 or 다수 처치 선택(ctrl누른 상태 + 좌클릭) → 삭제 버튼',
      },
    ],
  },
] as const
