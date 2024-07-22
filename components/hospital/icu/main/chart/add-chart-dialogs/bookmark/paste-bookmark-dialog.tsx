import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import {
  pasteChartOrderWithRegisterPatient,
  pasteRegisteredPatientChartOrder,
} from '@/lib/services/icu/paste-order'
import { selectedChartOrderList } from '@/lib/services/icu/select-chart-list'
import { useIcuBookmarkStore } from '@/lib/store/icu/bookmark'
import {
  useIcuRegisteringPatient,
  usePatientRegisterDialog,
} from '@/lib/store/icu/icu-register'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import { IcuChartOrderJoined } from '@/types/icu'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PasteBookmarkDialog({ chartId }: { chartId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedChartOrders, setSelectedChartOrders] = useState<
    IcuChartOrderJoined[]
  >([])

  const { target_date } = useParams()
  const { refresh } = useRouter()
  const { setBookmarkModalOpen } = useIcuBookmarkStore()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { selectedPatient, setSelectedPatient } = useIcuSelectedPatientStore()
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
    const fetchChartOrderList = async () => {
      const fetchedChartOrders = await selectedChartOrderList(chartId)

      const selectedChartOrders = fetchedChartOrders.sort(
        (prev, next) =>
          DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
            (itme) => itme === prev.icu_chart_order_type,
          ) -
          DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
            (itme) => itme === next.icu_chart_order_type,
          ),
      )
      setSelectedChartOrders(selectedChartOrders)
    }

    fetchChartOrderList()
  }, [chartId])

  const handleOkButtonClick = async () => {
    // EdgeCase: registeringPatient == null
    if (isRegisterDialogOpen && !registeringPatient) {
      toast({
        title: '차트를 생성할 환자를 먼저 선택해주세요',
        variant: 'destructive',
      })

      setIsDialogOpen(false)
      setBookmarkModalOpen(false)
      return
    }

    setIsSubmitting(true)

    if (selectedPatient && !isRegisterDialogOpen) {
      await pasteRegisteredPatientChartOrder(
        target_date as string,
        selectedPatient.patientId,
        chartId,
        selectedChartOrders,
      )

      toast({
        title: '선택하신 차트를 생성하였습니다',
      })
    } else {
      await pasteChartOrderWithRegisterPatient(
        target_date as string,
        registeringPatient.patientId,
        chartId,
        registeringPatient.ageInDays,
      )

      toast({
        title: '선택하신 차트를 생성하였습니다',
        description: '퇴원 예정일을 선택해주세요',
      })

      setSelectedIcuMainView('chart')
      setSelectedPatient({
        patientId: registeringPatient.patientId,
        patientName: registeringPatient.patientName,
      })
    }

    setIsDialogOpen(false)
    setBookmarkModalOpen(false)
    setIsSubmitting(false)
    setIsRegisterDialogOpen(false)
    refresh()
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button className="h-6">선택</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>선택한 차트 생성</AlertDialogTitle>
          <AlertDialogDescription>
            선택한 차트를 생성하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleOkButtonClick}
            disabled={isSubmitting}
          >
            확인
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
