import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { getIcuIoByPatientId } from '@/lib/services/icu/get-icu-io-by-patient-id'
import {
  useIcuRegisteringPatient,
  usePatientRegisterStep,
} from '@/lib/store/icu/icu-register'
import { cn, getDaysSince } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function PatientSelectButton({
  patientId,
  isIcu,
  birth,
  patientName,
}: {
  patientId: string
  isIcu: boolean
  birth: string
  patientName: string
}) {
  const { setStep } = usePatientRegisterStep()
  const { setRegisteringPatient } = useIcuRegisteringPatient()
  const [isLoading, setIsLoading] = useState(false)

  const handlePatientClick = async () => {
    setIsLoading(true)
    const icuIoData = await getIcuIoByPatientId(patientId)
    setIsLoading(false)

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
      patientName,
      ageInDays: getDaysSince(birth),
    })
  }

  return (
    <Button
      type="button"
      size="sm"
      onClick={handlePatientClick}
      className={cn(isIcu ? 'flex' : 'hidden', 'w-11')}
      disabled={isLoading}
    >
      {isLoading ? <LoaderCircle size={16} className="animate-spin" /> : '선택'}
    </Button>
  )
}
