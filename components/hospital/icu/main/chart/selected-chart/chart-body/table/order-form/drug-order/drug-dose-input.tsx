import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ReactNode } from 'react'

export default function DrugDoseInput({
  value,
  label,
  onChange,
  unit,
  onFocus,
}: {
  value?: string
  label?: ReactNode
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  unit: string
  onFocus?: () => void
}) {
  return (
    <div className="relative">
      <Label>{label}</Label>

      <Input value={value || ''} onChange={onChange} onFocus={onFocus} />
      <span className="absolute right-2 top-[30px] text-sm text-muted-foreground">
        {unit}
      </span>
    </div>
  )
}
