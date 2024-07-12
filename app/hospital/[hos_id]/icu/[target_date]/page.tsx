import IcuHeader from '@/components/hospital/icu/header/icu-header'
import IcuMain from '@/components/hospital/icu/main/icu-main'
import { getPromiseAll } from '@/lib/services/icu/get-promise-all'

export default async function IcuPage({
  params,
}: {
  params: { hos_id: string; target_date: string }
}) {
  const {
    icuChartData,
    icuChartOrderData,
    groupListData,
    vetsData,
    patientsData,
    ownersData,
    userData,
    icuIoData,
  } = await getPromiseAll(params.hos_id, params.target_date)

  return (
    <div className="h-icu-chart overflow-y-scroll">
      <IcuHeader
        hosId={params.hos_id}
        patientsData={patientsData}
        vetsData={vetsData}
        groupList={groupListData.group_list}
        ownersData={ownersData}
      />

      <IcuMain
        icuChartData={icuChartData}
        icuChartOrderData={icuChartOrderData}
        vetsData={vetsData}
        targetDate={params.target_date}
        icuIoData={icuIoData}
        userName={userData.user.user_metadata.name}
      />
    </div>
  )
}
