import IcuHeaderDateSelector from '@/components/hospital/icu/header/date-picker/icu-header-date-selector'
import IcuRegisterDialog from '@/components/hospital/icu/header/register-dialog/icu-register-dialog'
import { getAllPromises } from './actions'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import IcuHeader from '@/components/hospital/icu/header/icu-header'

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
