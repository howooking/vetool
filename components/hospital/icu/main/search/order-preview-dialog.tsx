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
import { useIcuBookmarkStore } from '@/lib/store/icu/bookmark'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import {
  useIcuRegisteringPatient,
  usePatientRegisterDialog,
} from '@/lib/store/icu/icu-register'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import type { IcuChartOrderJoined } from '@/types/icu'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const BUTTON_TEXT = {
  register: '해당 차트로 입원 진행',
  search: '차트 복사',
  bookmark: '차트 생성',
}

export default function OrderPreviewDialog({
  type,
}: {
  type: 'search' | 'register' | 'bookmark'
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChartOrders, setSelectedChartOrders] = useState<
    IcuChartOrderJoined[]
  >([])

  const { push, refresh } = useRouter()
  const { target_date } = useParams()
  const { selectedPatient, setSelectedPatient } = useIcuSelectedPatientStore()
  const { copiedChartId, setCopiedChartOrder } = useCopiedChartStore()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setBookmarkModalOpen } = useIcuBookmarkStore()
  const { isPreviewModalOpen, setPreviewModalOpen } = useOrderPreviewStore()
  const { isRegisterDialogOpen, setIsRegisterDialogOpen } =
    usePatientRegisterDialog()
  const { registeringPatient } = useIcuRegisteringPatient() as {
    registeringPatient: {
      patientId: string
      birth: string
      patientName: string
      ageInDays: number
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
  }, [copiedChartId])

  // 복사 버튼 클릭 핸들러
  const handleCopyChartOrder = () => {
    // 복사한 오더 저장
    setCopiedChartOrder(selectedChartOrders)
    // 미리보기 모달 Close
    setPreviewModalOpen(false)

    toast({
      title: '차트 복사 완료',
      description: '해당 차트가 클립보드에 복사되었습니다',
    })
  }

  // 입원 시 검색된 차트 선택 핸들러
  const handleRegisterSearchedChart = async () => {
    setIsSubmitting(true)

    // 복사한 차트 삽입
    await pasteChartOrderWithRegisterPatient(
      target_date as string,
      registeringPatient.patientId,
      copiedChartId,
      registeringPatient.ageInDays,
    )

    // 환자 정보 저장
    setSelectedPatient({
      patientId: registeringPatient.patientId,
      patientName: registeringPatient.patientName,
    })

    push(target_date as string)

    toast({
      title: '선택하신 입원 차트를 생성하였습니다',
      description: '퇴원 예정일을 선택해주세요',
    })

    setIsSubmitting(false)
    setPreviewModalOpen(false)
    setSelectedIcuMainView('chart')
    setIsRegisterDialogOpen(false)
    refresh()
  }

  // 북마크 오더 copy & paste 핸들러
  const handlePasteBookmarkChart = async () => {
    // EdgeCase: 입원 진행 중인 환자 정보가 없을 경우
    if (isRegisterDialogOpen && !registeringPatient) {
      toast({
        title: '차트를 생성할 환자를 먼저 선택해주세요',
        variant: 'destructive',
      })
      setPreviewModalOpen(false)
      setBookmarkModalOpen(false)
      return
    }

    setIsSubmitting(true)

    // 입원중인 환자가 새로운 차트 생성 시 북마크된 차트를 붙여넣는 경우
    if (selectedPatient && !isRegisterDialogOpen) {
      await pasteRegisteredPatientChartOrder(
        target_date as string,
        selectedPatient.patientId,
        copiedChartId,
        selectedChartOrders,
      )

      toast({
        title: '선택하신 차트를 생성하였습니다',
      })
      // 환자 입원 시 북마크 오더를 붙여넣기 하는 경우
    } else {
      await pasteChartOrderWithRegisterPatient(
        target_date as string,
        registeringPatient.patientId,
        copiedChartId,
        registeringPatient.ageInDays,
      )

      toast({
        title: '선택하신 차트를 생성하였습니다',
        description: '퇴원 예정일을 선택해주세요',
      })

      setSelectedPatient({
        patientId: registeringPatient.patientId,
        patientName: registeringPatient.patientName,
      })
      setSelectedIcuMainView('chart')
    }

    setPreviewModalOpen(false)
    setIsRegisterDialogOpen(false)
    setBookmarkModalOpen(false)
    setIsSubmitting(false)
    refresh()
  }

  const actions = {
    search: handleCopyChartOrder,
    register: handleRegisterSearchedChart,
    bookmark: handlePasteBookmarkChart,
  }[type]

  const handleClick = async () => {
    setIsSubmitting(true)

    await actions()

    setIsSubmitting(false)
  }

  return (
    <Dialog open={isPreviewModalOpen} onOpenChange={setPreviewModalOpen}>
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
          <Button type="submit" disabled={isSubmitting} onClick={handleClick}>
            {BUTTON_TEXT[type]}
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
