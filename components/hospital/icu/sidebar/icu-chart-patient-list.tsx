'use client'

import { Button } from '@/components/ui/button'
import { useIcuSelectedChartCategoryStore } from '@/lib/store/hospital/icu/icu-selected-category'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import { cn } from '@/lib/utils'
import { IcuIoPatientsJoined } from '@/types/hospital'
import { Squirrel } from 'lucide-react'
import { useEffect, useState } from 'react'
import IcuPatientListSkeleton from './icu-patient-list-skeleton'

export default function IcuChartPatientList({
  icuIoData,
}: {
  icuIoData: IcuIoPatientsJoined[]
}) {
  const { selectedPatientId, setSelectedPatientId, setSelectedPatientName } =
    useIcuSelectedPatientStore()
  const { selectedCategory, setSelectedCategory } =
    useIcuSelectedChartCategoryStore()
  const { selectedDate } = useIcuSelectedDateStore()
  const [isLoading, setIsLoading] = useState(true)
  const [activeIcuIo, setActiveIcuIo] = useState<IcuIoPatientsJoined[]>([])

  useEffect(() => {
    const filteredIcuIo = icuIoData.filter(
      ({ in_date, out_date }) =>
        in_date <= selectedDate &&
        (out_date === null || out_date >= selectedDate),
    )
    setActiveIcuIo(filteredIcuIo)

    if (
      filteredIcuIo.length > 0 &&
      selectedCategory === 'icuChart' &&
      !selectedPatientId
    ) {
      setSelectedPatientId(filteredIcuIo[0].patient_id.patient_id)
    }

    setIsLoading(false)
  }, [
    icuIoData,
    selectedCategory,
    selectedDate,
    selectedPatientId,
    setSelectedPatientId,
  ])

  const handlePatientButtonClick = (data: IcuIoPatientsJoined) => {
    setSelectedPatientId(data.patient_id.patient_id)
    setSelectedPatientName(data.patient_id.name)
    setSelectedCategory('icuChart')
  }

  if (isLoading) return <IcuPatientListSkeleton />

  return (
    <>
      {activeIcuIo.length === 0 ? (
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2">
          <Squirrel size={40} className="hover:scale-x-[-1]" />
          <span className="text-xs font-bold">입원환자 없음</span>
        </div>
      ) : (
        activeIcuIo.map((data) => (
          <li key={data.icu_io_id} className="w-full">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'flex w-full items-center gap-2',
                selectedPatientId === data.patient_id.patient_id && 'bg-muted',
              )}
              onClick={() => handlePatientButtonClick(data)}
            >
              <span>{data.patient_id.name}</span>
              <span className="truncate text-xs">{data.patient_id.breed}</span>
            </Button>
          </li>
        ))
      )}
    </>
  )
}
