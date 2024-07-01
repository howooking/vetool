'use client'

import { Button } from '@/components/ui/button'
import { useIcuSelectedChartCategoryStore } from '@/lib/store/hospital/icu/icu-selected-category'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import { cn } from '@/lib/utils'
import { IcuIoPatientsJoined } from '@/types/hospital'

export default function IcuChartPatientList({
  icuIoData,
}: {
  icuIoData: IcuIoPatientsJoined[]
}) {
  const { selectedPatientId, setSelectedPatientId, setSelectedPatientName } =
    useIcuSelectedPatientStore()
  const { selectedDate } = useIcuSelectedDateStore()
  const { setSelectedCategory } = useIcuSelectedChartCategoryStore()

  const handlePatientButtonClick = (data: IcuIoPatientsJoined) => {
    setSelectedPatientId(data.patient_id.patient_id)
    setSelectedPatientName(data.patient_id.name)
    setSelectedCategory('icuChart')
  }

  const selectedDaysChartData = icuIoData?.filter(
    ({ in_date, out_date }) =>
      in_date! <= selectedDate &&
      (out_date == null || out_date >= selectedDate),
  )

  return (
    <>
      {selectedDaysChartData?.length ? (
        selectedDaysChartData?.map((data) => (
          <li key={data.icu_io_id} className="flex w-full items-center">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'w-full justify-between px-2',
                selectedPatientId === data.patient_id.patient_id
                  ? 'border-2 border-primary'
                  : '',
              )}
              onClick={() => handlePatientButtonClick(data)}
            >
              <span className="max-w-14 truncate pr-1 text-xs">
                {data.patient_id.name}
              </span>
              <span className="max-w-14 truncate text-[10px] text-slate-600">
                {data.patient_id.breed}
              </span>
            </Button>
          </li>
        ))
      ) : (
        <span className="text-xs">입원 환자 없음</span>
      )}
    </>
  )
}
