import { Button } from '@/components/ui/button'
import { usePatientRegisterStep } from '@/lib/store/hospital/patients/selected-patient'
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
        push(`patients/?owner_id=${ownerId}`)
      }}
    >
      선택
    </Button>
  )
}
