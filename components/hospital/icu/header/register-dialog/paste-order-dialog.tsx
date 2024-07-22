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
import { toast } from '@/components/ui/use-toast'
import { pasteChartOrderWithRegisterPatient } from '@/lib/services/icu/paste-order'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import {
  useIcuRegisteringPatient,
  usePatientRegisterDialog,
} from '@/lib/store/icu/icu-register'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PasteOrderDialog() {
  const { target_date } = useParams()
  const { push, refresh } = useRouter()
  const { setSelectedPatient } = useIcuSelectedPatientStore()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setIsRegisterDialogOpen } = usePatientRegisterDialog()
  const { copiedChartId, isCopyDialogOpen, setIsCopyDialogOpen } =
    useCopiedChartStore()
  const { registeringPatient } = useIcuRegisteringPatient() as {
    registeringPatient: {
      patientId: string
      birth: string
      patientName: string
      ageInDays: number
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOkButtonClick = async () => {
    setIsSubmitting(true)

    await pasteChartOrderWithRegisterPatient(
      target_date as string,
      registeringPatient.patientId,
      copiedChartId,
      registeringPatient.ageInDays,
    )

    // 선택된 환자 정보 저장
    setSelectedPatient({
      patientId: registeringPatient.patientId,
      patientName: registeringPatient.patientName,
    })

    toast({
      title: '선택하신 입원 차트를 생성하였습니다',
      description: '퇴원 예정일을 선택해주세요',
    })

    setIsCopyDialogOpen(false)
    setIsRegisterDialogOpen(false)
    setSelectedIcuMainView('chart')
    setIsSubmitting(false)
    push(target_date as string)
    refresh()
  }

  return (
    <AlertDialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>선택한 차트 생성</AlertDialogTitle>
          <AlertDialogDescription>
            선택한 차트로 환자를 입원하시겠습니까?
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
