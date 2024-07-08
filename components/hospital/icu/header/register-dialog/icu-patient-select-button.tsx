import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { getIcuIoByPatientId } from '@/lib/services/icu/get-icu-io-by-patient-id'
import {
  useIcuRegisteringPatient,
  usePatientRegisterStep,
} from '@/lib/store/icu/icu-register'

export default function IcuPatientSelectButton({
  patientId,
  isIcu,
  birth,
}: {
  patientId: string
  isIcu: boolean
  birth: string
}) {
  const { setStep } = usePatientRegisterStep()
  const { setRegisteringPatient } = useIcuRegisteringPatient()

  const handlePatientClick = async () => {
    const icuIoData = await getIcuIoByPatientId(patientId)

    if (icuIoData?.in_date && !icuIoData?.out_date) {
      toast({
        variant: 'destructive',
        title: '입원중인 환자',
        description: '이미 입원중인 환자입니다',
      })
      return
    }

    setStep('icuRegister')
    setRegisteringPatient({
      patientId,
      birth,
    })
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
