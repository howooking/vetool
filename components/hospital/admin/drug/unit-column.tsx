import { Input } from '@/components/ui/input'
import React from 'react'

export default function UnitColumn({ unit, id }: { unit: string; id: string }) {
  return <Input value={unit} className="mx-auto w-12" />
}
