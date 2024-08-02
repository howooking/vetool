import ChartInfos from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/chart-infos'
import ChartMemos from '@/components/hospital/icu/main/chart/selected-chart/chart-memos/chart-memos'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/table/chart-table'
import { toast } from '@/components/ui/use-toast'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
} from '@/types/icu'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRef, useState } from 'react'
import ChartHeader from './chart-header/chart-header'

export default function SelectedChart({
  selectedIo,
  selectedChart,
  selectedChartOrders,
  isPatientOut,
  isFirstChart,
}: {
  selectedIo: IcuIoPatientJoined
  selectedChart: IcuChartJoined
  selectedChartOrders: IcuChartOrderJoined[]
  isPatientOut: boolean
  isFirstChart: boolean
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const { memo_a, memo_b, memo_c, ...restChartData } = selectedChart

  const [showPatientInfo, setShowPatientInfo] = useState(false)

  const handleSaveChartAsPdf = async () => {
    // ref 하위 컴포넌트가 존재하지 않으면 early return
    if (!contentRef.current) return

    try {
      setShowPatientInfo(true)

      // 컴포넌트 스크린샷 중 PatientInfo 렌딩을 위해 0.1s timeout
      await new Promise((resolve) => setTimeout(resolve, 100))

      const content = contentRef.current
      const canvas = await html2canvas(contentRef.current, {
        width: content.clientWidth,
        height: content.scrollHeight,
        scale: 2,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      })

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
      pdf.save(
        `${restChartData.target_date}/${restChartData.patient_id.name}.pdf`,
      )

      setShowPatientInfo(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'PDF 저장 실패',
        description: 'PDF 저장에 실패하였습니다 나중에 다시 시도해주세요',
      })
    }
  }

  return (
    <div className="flex flex-col gap-2 p-2 pb-[48px]" ref={contentRef}>
      {/* {showPatientInfo && (
        <div className="relative mb-12">
          <HeaderSignalments
            isPatientOut={isPatientOut}
            chartData={restChartData}
            icuIoId={selectedIo.icu_io_id}
            ageInDays={selectedIo.age_in_days}
            selectedChartOrders={selectedChartOrders}
          />
        </div>
      )} */}

      <ChartHeader
        isPatientOut={isPatientOut}
        chartData={restChartData}
        icuIoId={selectedIo.icu_io_id}
        ageInDays={selectedIo.age_in_days}
        selectedChartOrders={selectedChartOrders}
        isFirstChart={isFirstChart}
      />

      <ChartInfos
        selectedIo={selectedIo}
        chartData={restChartData}
        isPatientOut={isPatientOut}
        handleSaveChart={handleSaveChartAsPdf}
      />

      <ChartTable selectedChartOrders={selectedChartOrders} />

      <ChartMemos
        memoA={memo_a}
        memoB={memo_b}
        memoC={memo_c}
        icuChartId={selectedChart.icu_chart_id}
        hosIcuMemoNames={selectedChart.hos_id.icu_memo_names}
      />
    </div>
  )
}
