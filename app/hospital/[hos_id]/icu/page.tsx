import IcuHeader from '@/components/hospital/icu/header/icu-header'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import { getAllPromises } from '../../../../lib/services/hospital/icu/get-all-promises'

export default async function IcuPage({
  params,
}: {
  params: { hos_id: string }
}) {
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
    <div className="h-icu-chart overflow-y-scroll">
      <IcuHeader
        hosId={params.hos_id}
        patients={patientsData}
        vets={vetsData}
        groupList={groupListData[0].group_list}
        ownersData={ownersData}
      />

      <IcuMain
        icuChartData={icuChartData}
        icuChartOrderData={icuChartOrderData}
        vetsData={vetsData}
      />
    </div>
  )
}
