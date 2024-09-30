import ChartBody from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-body'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import { getIoDateRange } from '@/lib/services/icu/get-icu-io-chart'
import { getInitialIcuData } from '@/lib/services/icu/get-initial-icu-data'
import { Json } from '@/lib/supabase/database.types'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-privider'
import { IcuOrderColors } from '@/types/adimin'
import type { IcuSidebarData, SelectedChart, Vet } from '@/types/icu'
import { PatientData } from '@/types/patients'
import html2canvas from 'html2canvas'
import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

// 현재 화면 기준 ScrollWidth & ScrollHeight를 가진 HTMLCanvasElement를 생성
export const captureContent = async (element: HTMLElement) => {
  return await html2canvas(element, {
    width: element.scrollWidth,
    height: element.scrollHeight,
    scale: 1.2,
  })
}

export const ExportChartBody: React.FC<{
  chartData: SelectedChart
  onRender: (element: HTMLDivElement) => void
}> = ({ chartData, onRender }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      onRender(ref.current)
    }
  }, [onRender])

  return (
    <div ref={ref} className="p-4">
      <Badge className="mb-4">{chartData.target_date}</Badge>
      <ChartBody chartData={chartData} />
    </div>
  )
}

// ExportChartBody를 렌더링하고 캡처하는 함수
export const renderAndCaptureExportChartBody = (
  chartData: SelectedChart,
  initialIcuData: {
    icuSidebarData: IcuSidebarData[]
    vetsListData: Vet[]
    basicHosData: {
      order_color: Json
      group_list: string[]
      icu_memo_names: string[]
    }
    patientsData: PatientData[]
  },
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.width = document.body.clientWidth + 'px'
    container.style.height = document.body.clientHeight + 'px'

    document.body.appendChild(container)

    const handleRender = (element: HTMLDivElement) => {
      setTimeout(async () => {
        try {
          const canvas = await captureContent(element)
          document.body.removeChild(container)
          resolve(canvas)
        } catch (error) {
          reject(error)
        }
      }, 100)
    }

    const root = createRoot(container)
    root.render(
      <BasicHosDataProvider
        basicHosData={{
          vetsListData: initialIcuData.vetsListData,
          groupListData: initialIcuData.basicHosData.group_list,
          sidebarData: initialIcuData.icuSidebarData ?? [],
          orderColorsData: initialIcuData.basicHosData
            .order_color as IcuOrderColors,
          memoNameListData: initialIcuData.basicHosData.icu_memo_names,
        }}
      >
        <ExportChartBody chartData={chartData} onRender={handleRender} />,
      </BasicHosDataProvider>,
    )
  })
}

export const handleExport = async (
  chartData: SelectedChart,
  hosId: string,
  exportFn: (canvases: HTMLCanvasElement[]) => void,
) => {
  try {
    const dateRange = await getIoDateRange(chartData.icu_io.icu_io_id)
    const initialIcuData = await getInitialIcuData(hosId, chartData.target_date)

    if (dateRange) {
      const canvases = await Promise.all(
        dateRange.map(({ target_date }) =>
          renderAndCaptureExportChartBody(
            { ...chartData, target_date },
            initialIcuData,
          ),
        ),
      )

      exportFn(canvases)
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
