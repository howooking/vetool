import IcuChart from '@/components/hospital/icu/chart/icu-chart'
import IcuDialog from '@/components/hospital/icu/dialog/icu-dialog'
import IcuHeaderDateSelector from '@/components/hospital/icu/header/icu-header-date-selector'
import { getAllPromises } from './actions'

export default async function IcuPage({
  params,
}: {
  params: { hos_id: string }
}) {
  // database로 부터 오는 데이터는 이름 + Data, 에러명은 data명 + Error
  const [
    { data: icuChartData, error: icuChartDataError },
    { data: icuChartOrderData, error: icuChartOrderDataError },
    { data: groupListData, error: groupListDataError },
    { data: vetsData, error: vetsDataError },
    { data: patientsData, error: patientsDataError },
    { data: ownersData, error: ownersDataError },
  ] = await getAllPromises(params.hos_id)

  if (
    icuChartDataError ||
    icuChartOrderDataError ||
    groupListDataError ||
    vetsDataError ||
    patientsDataError ||
    ownersDataError
  ) {
    console.log({
      icuChartDataError,
      icuChartOrderDataError,
      groupListDataError,
      vetsDataError,
      patientsDataError,
      ownersDataError,
    })
    throw new Error(
      icuChartDataError?.message ||
        icuChartOrderDataError?.message ||
        groupListDataError?.message ||
        vetsDataError?.message ||
        patientsDataError?.message ||
        ownersDataError?.message,
    )
  }

  return (
    <div className="h-icu-chart w-full overflow-y-scroll">
      <IcuHeaderDateSelector />
      <IcuDialog
        hosId={params.hos_id}
        patients={patientsData}
        vets={vetsData}
        groupList={groupListData[0].group_list}
        ownersData={ownersData}
      />
      <IcuChart
        icuChartData={icuChartData}
        icuChartOrderData={icuChartOrderData}
        vetsData={vetsData}
      />
    </div>
  )
}
