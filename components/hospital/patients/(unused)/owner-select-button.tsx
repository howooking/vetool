import { Button } from '@/components/ui/button'
import { useIcuRegisterStore } from '@/lib/store/icu/icu-register'
import { useRouter } from 'next/navigation'

export default function OwnerSelectButton({ ownerId }: { ownerId: string }) {
  const { setStep } = useIcuRegisterStore()
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
