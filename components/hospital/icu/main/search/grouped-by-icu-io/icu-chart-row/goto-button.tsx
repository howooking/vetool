import { Button } from '@/components/ui/button'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import type { SearchedIcuCharts } from '@/types/icu'
import { SquareArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function GotoButton({ chart }: { chart: SearchedIcuCharts }) {
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setSelectedPatientId } = useIcuSelectedPatientIdStore()
  const { push } = useRouter()

  const handleGoto = () => {
    push(`${chart.target_date}`)
    setSelectedIcuMainView('chart')
    setSelectedPatientId(chart.patient_id)
  }
  return (
    <Button onClick={handleGoto} size="icon" variant="ghost">
      <SquareArrowRight size={18} />
    </Button>
  )
}
