'use client'

import { Separator } from '@/components/ui/separator'
import type { IcuChartJoined, IcuVetList } from '@/types/icu'
import Caution from './infos/caution'
import ChiefComplaint from './infos/chief-complaint'
import Diagnosis from './infos/diagnosis'
import Group from './infos/group/group'
import HeaderSignalments from './infos/header-signalment'
import { MainSubVet } from './infos/main-sub-vet/main-sub-vet'

export default function ChartInfos({
  chartData,
  vetsData,
}: {
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  vetsData: IcuVetList[]
}) {
  return (
    <div>
      <HeaderSignalments
        ageInDays={chartData.icu_io_id.age_in_days}
        breed={chartData.patient_id.breed}
        name={chartData.patient_id.name}
        gender={chartData.patient_id.gender}
        weightMeasuredDate={chartData.weight_measured_date}
        weight={chartData.weight}
        species={chartData.patient_id.species}
      />

      <div className="flex items-center gap-2">
        <Diagnosis
          diagnosis={chartData.icu_io_id.dx}
          icuIoId={chartData.icu_io_id.icu_io_id}
        />

        <Separator orientation="vertical" className="h-8" />

        <ChiefComplaint
          chiefComplaint={chartData.icu_io_id.cc}
          icuIoId={chartData.icu_io_id.icu_io_id}
        />

        <Separator orientation="vertical" className="h-8" />

        <MainSubVet
          mainVet={chartData.main_vet}
          subVet={chartData.sub_vet}
          vetsData={vetsData}
          icuChartId={chartData.icu_chart_id}
        />

        <Separator orientation="vertical" className="h-8" />

        <Caution
          caution={chartData.caution}
          icuChartId={chartData.icu_chart_id}
        />

        <Separator orientation="vertical" className="h-8" />

        <Group
          hosGroupList={chartData.hos_id.group_list}
          currentGroups={chartData.icu_io_id.group_list}
          icuIoId={chartData.icu_io_id.icu_io_id}
        />
      </div>
    </div>
  )
}
