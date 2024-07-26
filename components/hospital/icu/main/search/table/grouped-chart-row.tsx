import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { pasteChartwhenRegistering } from '@/lib/services/icu/paste-order'
import { selectedChartOrderList } from '@/lib/services/icu/search-charts'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import {
  useIcuRegisteringPatient,
  usePatientRegisterDialog,
} from '@/lib/store/icu/icu-register'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type { SearchedChart } from '@/types/icu'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
export default function GroupedChartRow({
  chart,
  index,
  type,
}: {
  chart: SearchedChart
  index: number
  type: 'search' | 'register' | 'bookmark'
}) {
  const { target_date } = useParams()
  const { registeringPatient } = useIcuRegisteringPatient()
  const { setSelectedPatient } = useIcuSelectedPatientStore()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setIsRegisterDialogOpen } = usePatientRegisterDialog()
  const { setPreviewModalOpen } = useOrderPreviewStore()
  const [isCopying, setIsLoading] = useState(false)
  const [isPreviwing, setIsPreviewing] = useState(false)
  const { setCopiedChartId, setCopiedChartOrder, copiedChartOrder } =
    useCopiedChartStore()

  const fetchChartOrderList = async () => {
    const fetchedChartOrders = await selectedChartOrderList(chart.icu_chart_id)
    const selectedChartOrders = fetchedChartOrders.sort(
      (prev, next) =>
        DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
          (order) => order === prev.icu_chart_order_type,
        ) -
        DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
          (order) => order === next.icu_chart_order_type,
        ),
    )
    setCopiedChartOrder(selectedChartOrders)
  }

  const handleOpenPreviewDialog = async () => {
    setIsPreviewing(true)
    setCopiedChartId(chart.icu_chart_id)
    await fetchChartOrderList()
    setPreviewModalOpen(true)
    setIsPreviewing(false)
  }

  const handleAction = async () => {
    setIsLoading(true)

    setCopiedChartId(chart.icu_chart_id)
    await fetchChartOrderList()

    if (type === 'search') {
      toast({
        title: '차트 복사 완료',
        description: '해당 차트가 클립보드에 복사되었습니다',
      })
    }

    if (type === 'register') {
      await pasteChartwhenRegistering(
        target_date as string,
        registeringPatient!.patientId,
        chart.icu_chart_id,
        registeringPatient!.ageInDays,
        copiedChartOrder!,
      )

      setSelectedPatient({
        patientId: registeringPatient!.patientId,
        patientName: registeringPatient!.patientName,
      })

      toast({
        title: '차트를 생성하였습니다',
        description: '퇴원 예정일을 입력해주세요',
      })

      setIsRegisterDialogOpen(false)
      setSelectedIcuMainView('chart')
      setIsLoading(false)
    }

    setIsLoading(false)
  }
  return (
    <TableRow key={chart.icu_chart_id}>
      <TableCell className="text-center">{index + 1} 일차</TableCell>
      <TableCell className="text-center">{chart.target_date}</TableCell>
      <TableCell className="text-center">
        <Button
          size="sm"
          variant="outline"
          onClick={handleOpenPreviewDialog}
          disabled={isPreviwing}
          className="w-[68px]"
        >
          {isPreviwing ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            '미리보기'
          )}
        </Button>
      </TableCell>
      <TableCell className="text-center">
        <Button
          onClick={handleAction}
          disabled={isCopying}
          size="sm"
          className="w-[45px]"
        >
          {isCopying ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {type === 'register' && '선택'}
              {type === 'search' && '복사'}
            </>
          )}
        </Button>
      </TableCell>
    </TableRow>
  )
}
