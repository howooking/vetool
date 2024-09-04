import { Button } from '@/components/ui/button'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { SquareArrowRight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function GotoIcuButton({
  patientId,
  targetDate,
}: {
  patientId: string
  targetDate: string
}) {
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setSelectedPatientId } = useIcuSelectedPatientIdStore()
  const { push } = useRouter()

  const handleGoto = () => {
    push(targetDate)
    setSelectedIcuMainView('chart')
    setSelectedPatientId(patientId)
  }
  return (
    <Button onClick={handleGoto} size="icon" variant="ghost">
      <SquareArrowRight size={18} />
    </Button>
  )
}
