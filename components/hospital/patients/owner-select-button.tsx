import { Button } from '@/components/ui/button'
import { usePatientRegisterStep } from '@/lib/store/hospital/icu/icu-register'
import { useRouter } from 'next/navigation'

export default function OwnerSelectButton({ ownerId }: { ownerId: string }) {
  const { setStep } = usePatientRegisterStep()
  const { push } = useRouter()

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        setStep('patientRegister')
        push(`?owner_id=${ownerId}`)
      }}
    >
      선택
    </Button>
  )
}
