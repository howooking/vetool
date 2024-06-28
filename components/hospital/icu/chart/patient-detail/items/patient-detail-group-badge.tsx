import { Badge } from '@/components/ui/badge'
import React from 'react'

export default function PatientDetailGroupBadge({
  group,
}: {
  group: string[] | null
}) {
  return (
    <>
      {!group && <Badge variant="destructive">미분류</Badge>}
      <ul className="flex items-center gap-1">
        {group?.map((item) => (
          <li key={item}>
            <Badge>{item}</Badge>
          </li>
        ))}
      </ul>
    </>
  )
}
