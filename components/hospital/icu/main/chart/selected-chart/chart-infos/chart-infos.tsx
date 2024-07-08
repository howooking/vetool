'use client'

import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import {
  updateIcuChart,
  updateIcuIo,
  updateWeight,
} from '@/lib/services/hospital/icu/updateIcuChart'
import { createClient } from '@/lib/supabase/client'
import type { IcuChartJoined, Vet } from '@/types/hospital'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { format } from 'date-fns'
import PatientDetailInput from './infos/patient-detail-input'
import PatientDetailVetsDialog from './infos/patient-detail-vets-dialog'
import PatientDetailGroup from './infos/patient-detail-group'
import HeaderSignalments from './infos/header-signalment'

type ChartState = {
  dx: string | null
  cc: string | null
  caution: string | null
  weight: string | null
}

export default function ChartInfos({
  chartData,
  vetsData,
}: {
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  vetsData: Vet[]
}) {
  const { refresh } = useRouter()
  const { name, gender, breed, patient_id: patientId } = chartData.patient_id
  const {
    dx,
    cc,
    group_list: groupList,
    age_in_days: ageInDays,
  } = chartData.icu_io_id
  const {
    weight,
    caution,
    weight_measured_date: weightMeasuredDate,
  } = chartData

  const { name: mainVetName, user_id: mainVetId } = chartData.main_vet
  // const { name: subVetName, user_id: subVetId } = chartData.sub_vet
  const [chartState, setChartState] = useState<ChartState>({
    dx,
    cc,
    caution,
    weight,
  })

  const handleInputChange =
    (field: keyof ChartState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setChartState((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleInputBlur = async (field: keyof ChartState) => {
    if (field === 'dx' || field === 'cc') {
      if (chartState[field] === chartData.icu_io_id[field]) return

      await updateIcuIo(patientId, field, chartState[field])
    }

    if (field === 'caution') {
      if (chartState[field] === chartData[field]) return

      // await updateIcuChart(patientId, selectedDate, {
      //   [field]: chartState[field],
      // })
    }

    if (field === 'weight') {
      if (chartState[field] === chartData[field]) return

      // await updateWeight(patientId, selectedDate, chartState[field] ?? '0')
    }

    toast({ title: `${field.toUpperCase()}가 변경되었습니다` })
    refresh()
  }

  const handleVetChange = async (
    vetType: 'main_vet' | 'sub_vet',
    vetId: string,
  ) => {
    // await updateIcuChart(patientId, selectedDate, { [vetType]: vetId })

    toast({
      title: `${vetType === 'main_vet' ? '주치의' : '부치의'}가 변경되었습니다`,
    })

    refresh()
  }

  return (
    <div className="w-full rounded-md border p-4">
      <HeaderSignalments
        ageInDays={chartData.icu_io_id.age_in_days}
        breed={chartData.patient_id.breed}
        name={chartData.patient_id.name}
        gender={chartData.patient_id.gender}
        weightMeasuredDate={chartData.weight_measured_date}
        weight={chartData.weight}
        species={chartData.patient_id.species}
      />

      <div className="flex h-16 items-center space-x-4 text-sm">
        <PatientDetailInput
          label="DX"
          value={chartState.dx}
          onChange={handleInputChange('dx')}
          onBlur={() => handleInputBlur('dx')}
          className="max-w-32"
        />
        <Separator orientation="vertical" />

        <PatientDetailInput
          label="CC"
          value={chartState.cc}
          onChange={handleInputChange('cc')}
          onBlur={() => handleInputBlur('cc')}
          className="max-w-48"
        />
        <Separator orientation="vertical" />

        {/* <PatientDetailVetsDialog
          mainVet={chartData.main_vet}
          subVet={chartData.sub_vet}
          onMainVetChange={(id) => handleVetChange('main_vet', id)}
          onSubVetChange={(id) => handleVetChange('sub_vet', id)}
          vetsData={vetsData}
        /> */}
        <Separator orientation="vertical" />

        <PatientDetailInput
          label="주의사항"
          value={chartState.caution}
          onChange={handleInputChange('caution')}
          onBlur={() => handleInputBlur('caution')}
          className="max-w-48"
        />
        <Separator orientation="vertical" />

        <PatientDetailGroup
          label="그룹"
          groupList={groupList}
          group={groupList}
          name={name}
          patientId={patientId}
        />
        <Separator orientation="vertical" />

        <PatientDetailInput
          label="체중"
          value={chartState.weight}
          onChange={handleInputChange('weight')}
          onBlur={() => handleInputBlur('weight')}
          className="max-w-24 text-right"
          hasWeightUnit
        />
      </div>
    </div>
  )
}
