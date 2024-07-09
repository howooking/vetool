import IcuHeaderDatePicker from '@/components/hospital/icu/header/date-picker/icu-header-date-picker'
import { format } from 'date-fns'

type PatientDetailDatePickerProps = {
  label: string
  dateValue: string | null
  setDateValue: (value: string | null) => void
  onChange: (date: string) => Promise<void>
}

export default function PatientDetailDatePicker({
  label,
  dateValue,
  setDateValue,
  onChange,
}: PatientDetailDatePickerProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-1">
        <span className="min-w-20 text-sm">
          {dateValue ?? format(new Date(), 'yyyy-MM-dd')}
        </span>
<<<<<<<< HEAD:components/hospital/icu/main/chart/selected-chart/chart-infos/infos/patient-detail-date-picker.tsx
        {/* <IcuHeaderDatePicker
          selectedDate={dateValue ?? format(new Date(), 'yyyy-MM-dd')}
          setSelectedDate={setDateValue}
          onChange={onChange}
        /> */}
========
        <IcuHeaderDatePicker />
>>>>>>>> 74a6ca8fa89f994b68beed5956019d366c5bfdbe:components/hospital/icu/main/chart/selected-chart/patient-detail/items/patient-detail-date-picker.tsx
      </div>
    </div>
  )
}
