'use client'

import IcuRegisterPatientForm from '@/components/hospital/icu/register/icu-register-patient-form'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { useIcuRegisterPatientStore } from '@/lib/store/hospital/icu/register-patient'
import { useSelectedPatientStore } from '@/lib/store/hospital/patients/selected-patient'
import { createClient } from '@/lib/supabase/client'
import { IcuDialogProps } from '@/types/hospital/icu'

export default function IcuSelectPatientDialog({
  hosId,
  icuIoId,
  patients,
  groupList,
  vets,
}: IcuDialogProps) {
  const supabase = createClient()
  const { patientId } = useSelectedPatientStore()
  const { isNextStep, setIsNextStep } = useIcuRegisterPatientStore()

  const handleNextButtonClick = async () => {
    const { data: patientData, error: patientError } = await supabase
      .from('icu_io')
      .select('in_date,out_date')
      .match({ patient_id: patientId })
      .order('created_at', { ascending: false })
      .maybeSingle()

    if (patientError) {
      console.log(patientError)
      throw new Error(patientError.message)
    }

    // 입원일은 존재하나, 퇴원일이 존재하지 않을 때 (이미 입원중인 환자)
    if (patientData?.in_date && !patientData?.out_date) {
      toast({
        variant: 'destructive',
        title: '입원중인 환자',
        description:
          '이미 입원중인 환자입니다 환자 혹은 입원 관리를 재확인해주세요',
      })
      return
    }

    setIsNextStep()
  }

  return (
    <Dialog>
      <DialogHeader>
        <DialogTitle>{isNextStep ? '입원 등록' : '환자 조회'}</DialogTitle>
      </DialogHeader>

      <DialogFooter>
        {!isNextStep && (
          <Button
            type="button"
            onClick={handleNextButtonClick}
            disabled={!patientId}
          >
            다음
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  )
}
