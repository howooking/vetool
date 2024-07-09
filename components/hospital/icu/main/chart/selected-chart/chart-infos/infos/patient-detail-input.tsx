import { Input } from '@/components/ui/input'
import { ChangeEventHandler, FocusEventHandler } from 'react'

type PatientDetailInputProps = {
  label: string
  value: string | null
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
  className?: string
  hasWeightUnit?: boolean
}

export default function PatientDetailInput({
  label,
  value,
  onChange,
  onBlur,
  className,
  hasWeightUnit,
}: PatientDetailInputProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-sm text-muted-foreground">{label}</label>
      <div className="flex items-center gap-1">
        <Input
          type="text"
          value={value ?? '없음'}
          onBlur={onBlur}
          onChange={onChange}
          className={className}
        />
        <span>{hasWeightUnit ? 'kg' : ''}</span>
      </div>
    </div>
  )
}
