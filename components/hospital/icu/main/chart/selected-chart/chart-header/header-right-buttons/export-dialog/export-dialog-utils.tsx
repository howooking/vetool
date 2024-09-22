import ExportChartBody from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-chart-body'
import { toast } from '@/components/ui/use-toast'
import { getIcuChartBodyData } from '@/lib/services/icu/get-icu-chart-body-data'
import { getIoDateRange } from '@/lib/services/icu/get-icu-io-chart'
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuUserList } from '@/types/icu'
import html2canvas from 'html2canvas'
import { createRoot } from 'react-dom/client'

// 현재 화면 기준 ScrollWidth & ScrollHeight를 가진 HTMLCanvasElement를 생성
export const captureContent = async (element: HTMLElement) => {
  return await html2canvas(element, {
    width: element.scrollWidth,
    height: element.scrollHeight,
    scale: 2,
  })
}

// 보이지 않는 곳에 DOM 요소 생성, captureContent를 사용하여 캡처 후 언마운트
export const renderExportChartBody = async (
  targetDate: string,
  hos_id: string,
  selectedPatientId: string,
  vetsList: IcuUserList[],
  orderColors: IcuOrderColors,
  captureRef: React.RefObject<HTMLDivElement>,
) => {
  const { selectedIoData, selectedChartData, selectedChartOrdersData } =
    await getIcuChartBodyData(hos_id, selectedPatientId, targetDate)

  const containerDiv = document.createElement('div')
  containerDiv.style.position = 'absolute'
  containerDiv.style.left = '-9999px'
  containerDiv.style.width = `${captureRef.current?.clientWidth}px`
  containerDiv.style.height = `${captureRef.current?.clientHeight}px`

  const root = createRoot(containerDiv)
  root.render(
    <ExportChartBody
      selectedIo={selectedIoData}
      selectedChart={selectedChartData}
      selectedChartOrders={selectedChartOrdersData}
      isPatientOut={true}
      vetsList={vetsList}
      orderColors={orderColors}
      targetDate={targetDate}
    />,
  )

  document.body.appendChild(containerDiv)
  await new Promise((resolve) => setTimeout(resolve, 100))
  const canvas = await captureContent(containerDiv)
  document.body.removeChild(containerDiv)
  root.unmount()

  return canvas
}

// isEntireChecked의 boolean 여부에 따라 단일 캡처, 입원일 전체 캡처 로직 수행
export const handleExport = async (
  isEntireChecked: boolean,
  icu_io_id: string,
  hos_id: string,
  selectedPatientId: string,
  vetsList: IcuUserList[],
  orderColors: IcuOrderColors,
  captureRef: React.RefObject<HTMLDivElement>,
  singleExportFn: (canvas: HTMLCanvasElement) => void,
  multipleExportFn: (canvases: HTMLCanvasElement[]) => void,
) => {
  try {
    if (isEntireChecked) {
      const dateRange = await getIoDateRange(icu_io_id)

      if (dateRange) {
        const canvases = await Promise.all(
          dateRange.map(({ target_date }) =>
            renderExportChartBody(
              target_date,
              hos_id,
              selectedPatientId,
              vetsList,
              orderColors,
              captureRef,
            ),
          ),
        )
        multipleExportFn(canvases)
      }
    } else {
      if (captureRef.current) {
        const canvas = await captureContent(captureRef.current)
        singleExportFn(canvas)
      }
    }

    toast({
      title: '저장 성공',
      description: '차트가 성공적으로 저장되었습니다.',
    })
  } catch (error) {
    console.error('Export error:', error)
    toast({
      variant: 'destructive',
      title: '저장 실패',
      description: '차트 저장에 실패하였습니다. 나중에 다시 시도해주세요.',
    })
  }
}
