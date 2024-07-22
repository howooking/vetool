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
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { pasteChartOrderWithRegisterPatient } from '@/lib/services/icu/paste-order'
import { selectedChartOrderList } from '@/lib/services/icu/select-chart-list'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useIcuRegisteringPatient } from '@/lib/store/icu/icu-register'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import type { IcuChartOrderJoined } from '@/types/icu'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function OrderPreviewDialog({
  type,
  setIsRegisterDialogOpen,
}: {
  type: 'search' | 'register' | 'bookmark'
  setIsRegisterDialogOpen?: Dispatch<SetStateAction<boolean>>
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChartOrders, setSelectedChartOrders] = useState<
    IcuChartOrderJoined[]
  >([])

  const { push, refresh } = useRouter()
  const { target_date } = useParams()
  const { setSelectedPatient } = useIcuSelectedPatientStore()
  const { copiedChartId, setCopiedChartOrder } = useCopiedChartStore()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { isPreviewModalOpen, onOpenChange } = useOrderPreviewStore()
  const { registeringPatient } = useIcuRegisteringPatient() as {
    registeringPatient: {
      patientId: string
      birth: string
      patientName: string
    }
  }

  useEffect(() => {
    setIsLoading(true)

    const fetchChartOrderList = async () => {
      const fetchedChartOrders = await selectedChartOrderList(copiedChartId)

      const selectedChartOrders = fetchedChartOrders.sort(
        (prev, next) =>
          DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
            (order) => order === prev.icu_chart_order_type,
          ) -
          DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
            (itme) => itme === next.icu_chart_order_type,
          ),
      )
      setSelectedChartOrders(selectedChartOrders)

      setIsLoading(false)
    }

    fetchChartOrderList()
  }, [])

  // 복사 버튼 클릭 핸들러
  const handleCopyChartOrder = () => {
    setCopiedChartOrder(selectedChartOrders)
    onOpenChange(false)

    toast({
      title: '차트 복사 완료',
      description: '해당 차트가 클립보드에 복사되었습니다',
    })
  }

  // 입원 시 특정 차트 선택 핸들러
  const handleRegisterPatientAndChartOrder = async () => {
    setIsSubmitting(true)

    setSelectedPatient({
      patientId: registeringPatient.patientId,
      patientName: registeringPatient.patientName,
    })

    await pasteChartOrderWithRegisterPatient(
      format(new Date(), 'yyyy-MM-dd'),
      registeringPatient.patientId,
      copiedChartId,
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

  const handlePasteBookmarkChartOrder = async () => {}

  return (
    <Dialog open={isPreviewModalOpen} onOpenChange={onOpenChange}>
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
            onClick={
              type === 'register'
                ? handleRegisterPatientAndChartOrder
                : type === 'search'
                  ? handleCopyChartOrder
                  : handlePasteBookmarkChartOrder
            }
          >
            {type === 'register'
              ? '해당 차트로 입원 진행'
              : type === 'search'
                ? '차트 복사'
                : '차트 생성'}
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
