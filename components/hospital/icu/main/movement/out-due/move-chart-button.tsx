import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

export default function MoveChartButton({ patientId }: { patientId: string }) {
  const { hos_id, target_date } = useParams()
  const { push } = useRouter()

  const handlePatientButtonClick = useCallback(() => {
    push(`/hospital/${hos_id}/icu/${target_date}/chart/${patientId}`)
  }, [hos_id, target_date, patientId, push])

  return (
    <Button variant="outline" size="sm" onClick={handlePatientButtonClick}>
      이동
    </Button>
  )
}
