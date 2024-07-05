'use client'

import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import { createClient } from '@/lib/supabase/client'
import type { IcuChartJoined, Vet } from '@/types/hospital'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { format } from 'date-fns'
import PatientDetailInput from './items/patient-detail-input'
import PatientDetailItem from './items/patient-detail-item'
import PatientDetailVetsDialog from './items/patient-detail-vets-dialog'
import PatientDetailGroup from './items/patient-detail-group'

export default function IcuChartPatientDetail({
  chartData,
  vetsData,
}: {
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  vetsData: Vet[]
}) {
  const supabase = createClient()
  const { refresh } = useRouter()
  const { selectedDate } = useIcuSelectedDateStore()
  const { name, gender, breed, patient_id: patientId } = chartData.patient_id
  const {
    dx,
    cc,
    group_list: group,
    age_in_days: ageInDays,
  } = chartData.icu_io_id
  const {
    weight,
    caution,
    weight_measured_date: weightMeasuredDate,
  } = chartData
  const { name: mainVetName, user_id: mainVetId } = chartData.main_vet
  const { name: subVetName, user_id: subVetId } = chartData.sub_vet
  const { group_list: groupList } = chartData.hos_id

  const [dxValue, setDxValue] = useState(dx)
  const [ccValue, setCcValue] = useState(cc)
  const [cautionValue, setCautionValue] = useState(caution)
  const [weightValue, setWeightValue] = useState(weight)

  // DX 변경 핸들러
  const handleDxBlur = async () => {
    if (dx === dxValue) return

    const { error } = await supabase
      .from('icu_io')
      .update({ dx: dxValue })
      .match({ patient_id: patientId })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: 'DX가 변경되었습니다',
    })

    refresh()
  }

  // CC 변경 핸들러
  const handleCcBlur = async () => {
    if (cc === ccValue) return

    const { error } = await supabase
      .from('icu_io')
      .update({ cc: ccValue })
      .match({ patient_id: patientId })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: 'CC가 변경되었습니다',
    })

    refresh()
  }

  // 주치의 변경 핸들러
  const handleMainVetChange = async (mainVetId: string) => {
    const { error } = await supabase
      .from('icu_chart')
      .update({ main_vet: mainVetId })
      .match({ patient_id: patientId, target_date: selectedDate })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: '주치의가 변경되었습니다',
    })

    refresh()
  }

  // 부치의 변경 핸들러
  const handleSubVetChange = async (subVetId: string) => {
    const { error } = await supabase
      .from('icu_chart')
      .update({ sub_vet: subVetId })
      .match({ patient_id: patientId, target_date: selectedDate })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: '부치의가 변경되었습니다',
    })

    refresh()
  }

  // 주의 사항 변경 핸들러
  const handleCautionBlur = async () => {
    if (caution === cautionValue) return

    const { error } = await supabase
      .from('icu_chart')
      .update({ caution: cautionValue })
      .match({ patient_id: patientId, target_date: selectedDate })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: '주의 사항이 변경되었습니다',
    })

    refresh()
  }

  // 체중 변경 핸들러
  const handleWeightBlur = async () => {
    if (weight === weightValue) return

    const { error } = await supabase
      .from('icu_chart')
      .update({
        weight: weightValue,
        weight_measured_date: format(new Date(), 'yyyy-MM-dd'),
      })
      .match({ patient_id: patientId, target_date: selectedDate })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: '체중 측정일이 변경되었습니다',
    })
  }

  return (
    <div className="w-full rounded-md border p-4">
      <PatientDetailItem
        name={name}
        breed={breed}
        gender={gender}
        ageInDays={ageInDays}
        patientId={patientId}
        selectedDate={selectedDate}
        weightMeasuredDate={weightMeasuredDate}
      />
      <Separator className="my-4" />

      {/* DX */}
      <div className="flex h-16 items-center space-x-4 text-sm">
        <PatientDetailInput
          label="DX"
          value={dxValue}
          onChange={(e) => setDxValue(e.target.value)}
          onBlur={handleDxBlur}
          className="max-w-32"
        />
        <Separator orientation="vertical" />

        {/* CC */}
        <PatientDetailInput
          label="CC"
          value={ccValue}
          onChange={(e) => setCcValue(e.target.value)}
          onBlur={handleCcBlur}
          className="max-w-48"
        />
        <Separator orientation="vertical" />

        {/* 주치의 / 부주치의 */}
        <PatientDetailVetsDialog
          mainVetName={mainVetName}
          subVetName={subVetName}
          mainVetId={mainVetId}
          subVetId={subVetId}
          onMainVetChange={handleMainVetChange}
          onSubVetChange={handleSubVetChange}
          vetsData={vetsData}
        />
        <Separator orientation="vertical" />

        {/* 주의 사항 */}
        <PatientDetailInput
          label="주의사항"
          value={cautionValue}
          onChange={(e) => setCautionValue(e.target.value)}
          onBlur={handleCautionBlur}
          className="max-w-48"
        />
        <Separator orientation="vertical" />

        {/* 그룹 */}
        <PatientDetailGroup
          label="그룹"
          groupList={groupList}
          group={group}
          name={name}
          patientId={patientId}
        />
        <Separator orientation="vertical" />

        {/* 체중 */}
        <PatientDetailInput
          label="체중"
          value={weight}
          onChange={(e) => setWeightValue(e.target.value)}
          onBlur={handleWeightBlur}
          className="max-w-24"
        />
      </div>
    </div>
  )
}
