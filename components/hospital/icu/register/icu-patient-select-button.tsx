import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import {
  usePatientRegisterStep,
  useSelectedPatientStore,
} from '@/lib/store/hospital/patients/selected-patient'
import { createClient } from '@/lib/supabase/client'

export default function IcuPatientSelectButton({
  patientId,
  isIcu,
}: {
  patientId: string
  isIcu: boolean
}) {
  const supabase = createClient()
  const { setStep } = usePatientRegisterStep()
  const { setPatientId } = useSelectedPatientStore()

  const handlePatientClick = async () => {
    const { data: icuIoData, error: icuIoError } = await supabase
      .from('icu_io')
      .select('in_date, out_date')
      .match({ patient_id: patientId })
      .order('created_at', { ascending: false })
      .maybeSingle()

    if (icuIoError) {
      console.log(icuIoError)
      throw new Error(icuIoError.message)
    }

    // 입원일은 존재하나, 퇴원일이 존재하지 않을 때 (이미 입원중인 환자)
    if (icuIoData?.in_date && !icuIoData?.out_date) {
      toast({
        variant: 'destructive',
        title: '입원중인 환자',
        description:
          '이미 입원중인 환자입니다 환자 혹은 입원 관리를 재확인해주세요',
      })
      return
    }

    setStep('icuRegister')
    setPatientId(patientId)
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handlePatientClick}
      className={isIcu ? 'block' : 'hidden'}
    >
      선택
    </Button>
  )
}
