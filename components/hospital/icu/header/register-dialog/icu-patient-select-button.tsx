import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { getIcuIoByPatientId } from '@/lib/services/icu/get-icu-io-by-patient-id'
import {
  useIcuRegisteringPatient,
  usePatientRegisterStep,
} from '@/lib/store/icu/icu-register'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function IcuPatientSelectButton({
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

    if (icuIoData?.in_date && !icuIoData?.out_date) {
      toast({
        variant: 'destructive',
        title: '입원중인 환자',
        description: '이미 입원중인 환자입니다',
      })
      setIsLoading(false)
      return
    }

    setStep('selectChartType')
    setRegisteringPatient({
      patientId,
      birth,
      patientName,
    })
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handlePatientClick}
      className={cn(isIcu ? 'block' : 'hidden', 'flex w-12')}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircle size={12} className={cn('ml-1 animate-spin')} />
      ) : (
        '선택'
      )}
    </Button>
  )
}
