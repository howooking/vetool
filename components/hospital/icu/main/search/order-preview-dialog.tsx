import OrderPreviewSkeleton from '@/components/hospital/icu/main/search/order-preview-skeleton'
import OrderPreviewTable from '@/components/hospital/icu/main/search/order-preview-table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { ORDER_OF_ORDERS } from '@/constants/hospital/icu/chart/order'
import { pasteChartOrderWithRegisterPatient } from '@/lib/services/icu/paste-order'
import { selectedChartOrderList } from '@/lib/services/icu/select-chart-list'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useIcuRegisteringPatient } from '@/lib/store/icu/icu-register'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import type { IcuChartOrderJoined } from '@/types/icu'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function OrderPreviewDialog({
  open,
  onOpenChange,
  register,
  setIsRegisterDialogOpen,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  register?: boolean
  setIsRegisterDialogOpen?: Dispatch<SetStateAction<boolean>>
}) {
  const { push, refresh } = useRouter()
  const { setSelectedPatient } = useIcuSelectedPatientStore()
  const { copiedChartId, setCopiedChartOrder } = useCopiedChartStore()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { registeringPatient } = useIcuRegisteringPatient() as {
    registeringPatient: {
      patientId: string
      birth: string
      patientName: string
    }
  }
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChartOrders, setSelectedChartOrders] = useState<
    IcuChartOrderJoined[]
  >([])

  useEffect(() => {
    setIsLoading(true)

    const fetchChartOrderList = async () => {
      const fetchedChartOrders = await selectedChartOrderList(copiedChartId)

      const selectedChartOrders = fetchedChartOrders.sort(
        (prev, next) =>
          ORDER_OF_ORDERS.findIndex(
            (itme) => itme === prev.icu_chart_order_type,
          ) -
          ORDER_OF_ORDERS.findIndex(
            (itme) => itme === next.icu_chart_order_type,
          ),
      )
      setSelectedChartOrders(selectedChartOrders)

      setIsLoading(false)
    }

    fetchChartOrderList()
  }, [])

  const handleCopyButtonClick = () => {
    setCopiedChartOrder(selectedChartOrders)
    onOpenChange(false)

    toast({
      title: '차트 복사 완료',
      description: '해당 차트가 클립보드에 복사되었습니다',
    })
  }

  const handlePasteButtonClick = async () => {
    setIsSubmitting(true)
    setSelectedPatient({
      patientId: registeringPatient.patientId,
      patientName: registeringPatient.patientName,
    })

    await pasteChartOrderWithRegisterPatient(
      copiedChartId,
      registeringPatient.patientId,
      format(new Date(), 'yyyy-MM-dd'),
      0,
    )

    push(`${format(new Date(), 'yyyy-MM-dd')}`)

    toast({
      title: '선택하신 입원 차트를 생성하였습니다',
      description: '입원일과 퇴원 예정일을 선택해주세요',
    })

    // 오더 미리보기 Dialog Close
    onOpenChange(false)

    // isSubmitting = false
    setIsSubmitting(false)

    // Set MainView
    setSelectedIcuMainView('chart')

    // Register Dialog Close
    if (setIsRegisterDialogOpen) setIsRegisterDialogOpen(false)

    refresh()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:min-w-[1200px]">
        <DialogHeader>
          <DialogTitle>오더 미리보기</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <OrderPreviewSkeleton />
        ) : (
          <OrderPreviewTable selectedChartOrders={selectedChartOrders} />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              닫기
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={register ? handlePasteButtonClick : handleCopyButtonClick}
          >
            {register ? '차트 선택' : '차트 복사'}
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
