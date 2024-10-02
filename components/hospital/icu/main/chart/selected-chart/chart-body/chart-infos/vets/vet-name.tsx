import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React from 'react'

export default function VetName({
  label,
  name,
  avatarUrl,
}: {
  label: string
  name: string
  avatarUrl: string | null
}) {
  return (
    <div className="flex items-center gap-2">
      <Label className="hidden text-[10px] leading-3 text-muted-foreground md:block">
        {label}
      </Label>
      <div className="flex items-center gap-1">
        {/* <Image
          unoptimized
          src={avatarUrl ?? ''}
          alt={name}
          width={16}
          height={16}
          className="rounded-full"
        /> */}
        <span className="text-xs">{name}</span>
      </div>
    </div>
  )
}
