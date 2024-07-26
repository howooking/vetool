'use client'

import ChiefComplaint from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/chief-complaint'
import Diagnosis from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/diagnosis'
import Group from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/group/group'
import HeaderSignalments from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/header-signament/header-signalment'
import InAndOutDate from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/in-and-out-date/in-and-out-date'
import { MainSubVet } from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/main-sub-vet/main-sub-vet'
import OwnerName from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/onwer-name'
import SaveChartButton from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/save-chart-button'
import SearchTag from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/search-tag'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
} from '@/types/icu'

export default function ChartInfos({
  chartData,
  isPatientOut,
  selectedIo,
  selectedChartOrders,
  handleSaveChart,
}: {
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  isPatientOut: boolean
  selectedIo: IcuIoPatientJoined
  selectedChartOrders: IcuChartOrderJoined[]
  handleSaveChart: () => Promise<void>
}) {
  return (
    <div>
      <HeaderSignalments
        isPatientOut={isPatientOut}
        chartData={chartData}
        icuIoId={selectedIo.icu_io_id}
        ageInDays={selectedIo.age_in_days}
        selectedChartOrders={selectedChartOrders}
      />

      <div className="grid grid-cols-8 gap-2">
        <div className="col-span-2">
          <InAndOutDate
            icuIoId={selectedIo.icu_io_id}
            inDate={selectedIo.in_date}
            outDueDate={selectedIo.out_due_date}
            isPatientOut={isPatientOut}
            outDate={selectedIo.out_date}
          />
        </div>

        <div className="col-span-2">
          <MainSubVet
            mainVet={chartData.main_vet}
            subVet={chartData.sub_vet}
            icuChartId={chartData.icu_chart_id}
          />
        </div>

        <div className="col-span-4">
          <Diagnosis
            diagnosis={chartData.icu_chart_dx}
            icuChartId={chartData.icu_chart_id}
          />
        </div>

        <div className="col-span-1">
          <Group
            hosGroupList={chartData.hos_id.group_list}
            currentGroups={selectedIo.group_list}
            icuIoId={selectedIo.icu_io_id}
          />
        </div>

        <div className="col-span-1">
          <OwnerName
            ownerName={chartData.patient_id.owner_name}
            patientId={chartData.patient_id.patient_id}
          />
        </div>

        <div className="col-span-2">
          <SearchTag
            searchTags={chartData.search_tags}
            icuChartId={chartData.icu_chart_id}
          />
        </div>

        <div className="col-span-4 flex gap-2">
          <ChiefComplaint
            chiefComplaint={chartData.icu_chart_cc}
            icuChartId={chartData.icu_chart_id}
          />
          <SaveChartButton handleSaveChart={handleSaveChart} />
        </div>
      </div>
    </div>
  )
}
