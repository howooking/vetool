import { Button } from '@/components/ui/button'
import { usePatientRegisterStep } from '@/lib/store/hospital/icu/icu-register'
import { usePathname, useRouter } from 'next/navigation'

export default function OwnerSelectButton({ ownerId }: { ownerId: string }) {
  const { setStep } = usePatientRegisterStep()
  const { push } = useRouter()
  const pathname = usePathname()

  const isIcuPage = pathname.includes('icu')

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        setStep('patientRegister')
        push(
          isIcuPage
            ? `icu/?owner_id=${ownerId}`
            : `patients/?owner_id=${ownerId}`,
        )
      }}
    >
      선택
    </Button>
  )
}
