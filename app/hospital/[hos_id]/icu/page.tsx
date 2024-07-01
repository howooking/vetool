import IcuChart from '@/components/hospital/icu/chart/icu-chart'
import IcuDialog from '@/components/hospital/icu/dialog/icu-dialog'
import IcuHeaderDateSelector from '@/components/hospital/icu/header/icu-header-date-selector'
import { createClient } from '@/lib/supabase/server'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/hospital'
import { PatientData } from '@/types/hospital/patients'

export default async function IcuPage({
  params,
}: {
  params: { hos_id: string }
}) {
  const hosId = params.hos_id
  const supabase = createClient()

  const { data: icuChartData, error: icuChartError } = await supabase
    .from('icu_chart')
    .select(
      `*,
        icu_io_id(*),
        patient_id("name", "gender", "breed", "patient_id"),
        main_vet("name", "user_id"),
        sub_vet("name", "user_id"),
        hos_id("group_list", "hos_id")
        `,
    )
    .match({ hos_id: hosId })
    .order('created_at', { ascending: true })
    .returns<IcuChartJoined[]>()

  if (icuChartError) {
    console.log(icuChartError)
    throw new Error(icuChartError.message)
  }

  const { data: icuChartOrderData, error: icuChartOrderError } = await supabase
    .from('icu_chart_order')
    .select(
      `*,
      icu_io_id!inner(*),
      icu_chart_order_tx_1(*),
      icu_chart_order_tx_2(*),
      icu_chart_order_tx_3(*),
      icu_chart_order_tx_4(*),
      icu_chart_order_tx_5(*),
      icu_chart_order_tx_6(*),
      icu_chart_order_tx_7(*),
      icu_chart_order_tx_8(*),
      icu_chart_order_tx_9(*),
      icu_chart_order_tx_10(*),
      icu_chart_order_tx_11(*),
      icu_chart_order_tx_12(*),
      icu_chart_order_tx_13(*),
      icu_chart_order_tx_14(*),
      icu_chart_order_tx_15(*),
      icu_chart_order_tx_16(*),
      icu_chart_order_tx_17(*),
      icu_chart_order_tx_18(*),
      icu_chart_order_tx_19(*),
      icu_chart_order_tx_20(*),
      icu_chart_order_tx_21(*),
      icu_chart_order_tx_22(*),
      icu_chart_order_tx_23(*),
      icu_chart_order_tx_24(*)
      `,
    )
    .match({ 'icu_io_id.hos_id': hosId })
    .order('created_at', { ascending: true })
    .returns<IcuChartOrderJoined[]>()

  if (icuChartOrderError) {
    console.log(icuChartOrderError)
    throw new Error(icuChartOrderError.message)
  }
  const { data: patientsData, error: patientsError } = await supabase
    .from('patients')
    .select(
      `
        *,
        owner_id(*)
      `,
    )
    .match({ hos_id: params.hos_id })
    .order('is_alive', { ascending: false })
    .order('created_at', { ascending: false })
    .returns<PatientData[]>()

  if (patientsError) {
    console.log(patientsError.message)
    throw new Error(patientsError.message)
  }

  const { data: vetsData, error: vetsError } = await supabase
    .from('users')
    .select('name, position, user_id')
    .match({ hos_id: hosId })

  if (vetsError) {
    console.log(vetsError)
    throw new Error(vetsError.message)
  }

  const { data: groupListData, error: groupListError } = await supabase
    .from('hospitals')
    .select('group_list')
    .match({ hos_id: hosId })

  if (groupListError) {
    console.log(groupListError)
    throw new Error(groupListError.message)
  }

  const { data: icuIoId, error: icuIoError } = await supabase
    .from('icu_io')
    .select('icu_io_id')
    .match({ hos_id: hosId })

  if (icuIoError) {
    console.log(icuIoError)
    throw new Error(icuIoError.message)
  }

  const { data: ownerData, error: ownerDataError } = await supabase
    .from('owners')
    .select('*')
    .match({ hos_id: params.hos_id })
    .order('created_at', { ascending: false })

  if (ownerDataError) {
    console.log(ownerDataError.message)
    throw new Error(ownerDataError.message)
  }

  return (
    <div className="h-icu-chart w-full overflow-y-scroll">
      <IcuHeaderDateSelector />
      <IcuDialog
        hosId={hosId}
        icuIoId={icuIoId.length ? icuIoId[0].icu_io_id : ''}
        patients={patientsData}
        vets={vetsData}
        groupList={groupListData[0].group_list}
        ownerData={ownerData}
      />
      <IcuChart
        icuChartData={icuChartData}
        icuChartOrderData={icuChartOrderData}
        vetsData={vetsData}
      />
    </div>
  )
}
