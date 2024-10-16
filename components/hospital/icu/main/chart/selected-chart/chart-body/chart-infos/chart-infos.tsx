import ChiefComplaint from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/chief-complaint'
import CpcrEtTube from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/cpcr-et-tube/cpcr-et-tube'
import Diagnosis from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/diagnosis'
import Group from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/group/group'
import InAndOutDate from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/in-and-out-date/in-and-out-date'
import OwnerName from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/owner-name'
import Vets from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/vets/vets'
import type { SelectedChart } from '@/types/icu/chart'
import Weight from './weight/weight'

export default function ChartInfos({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const {
    icu_io,
    patient,
    main_vet,
    sub_vet,
    icu_chart_id,
    in_charge,
    weight,
    weight_measured_date,
  } = chartData

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-11">
      <div className="col-span-2">
        <InAndOutDate
          icuIoId={icu_io.icu_io_id}
          inDate={icu_io.in_date}
          outDueDate={icu_io.out_due_date}
          outDate={icu_io.out_date}
        />
      </div>

      <div className="order-last col-span-4 md:order-none">
        <Vets
          mainVet={main_vet}
          subVet={sub_vet}
          icuChartId={icu_chart_id}
          inCharge={in_charge}
        />
      </div>

      <div className="order-last col-span-3 md:order-none md:col-span-5">
        <Diagnosis diagnosis={icu_io.icu_io_dx} icuIoId={icu_io.icu_io_id} />
      </div>

      <div className="col-span-1">
        <CpcrEtTube cpcrEtTube={icu_io.cpcr} icuIoId={icu_io.icu_io_id} />
      </div>

      <div className="col-span-1">
        <OwnerName
          ownerName={patient.owner_name}
          patientId={patient.patient_id}
        />
      </div>

      <div className="col-span-2 md:order-none">
        <Weight
          weight={weight}
          weightMeasuredDate={weight_measured_date}
          icuChartId={icu_chart_id}
        />
      </div>

      <div className="col-span-2 md:order-none">
        <Group currentGroups={icu_io.group_list} icuIoId={icu_io.icu_io_id} />
      </div>

      <div className="order-last col-span-2 md:order-none md:col-span-5">
        <ChiefComplaint
          chiefComplaint={icu_io.icu_io_cc}
          icuIoId={icu_io.icu_io_id}
        />
      </div>
    </div>
  )
}
