import type { IcuOrderColors } from '@/types/adimin'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuUserList,
} from '@/types/icu'
import HeaderCenter from './header-center/bookmark-and-signalments'
import HeaderRightButtons from './header-right-buttons/header-right-buttons'

export default function ChartHeader({
  isPatientOut,
  ageInDays,
  icuIoId,
  chartData,
  selectedChartOrders,
  isFirstChart,
  captureRef,
  vetsList,
  orderColors,
  dx,
  cc,
}: {
  isPatientOut: boolean
  ageInDays: number
  icuIoId: string
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  selectedChartOrders: IcuChartOrderJoined[]
  isFirstChart: boolean
  captureRef: React.RefObject<HTMLDivElement>
  vetsList: IcuUserList[]
  orderColors: IcuOrderColors
  dx: string
  cc: string
}) {
  const {
    weight,
    weight_measured_date,
    icu_chart_id,
    bookmark_id,
    patient_id: { breed, name, gender, species, patient_id },
  } = chartData

  return (
    <header className="left-0 top-0 w-full md:fixed">
      <HeaderCenter
        isPatientOut={isPatientOut}
        ageInDays={ageInDays}
        bookmartData={bookmark_id}
        species={species}
        icuChartId={icu_chart_id}
        gender={gender}
        breed={breed}
        name={name}
        weight_measured_date={weight_measured_date}
        patientId={patient_id}
        weight={weight}
      />

      <HeaderRightButtons
        icuChartId={icu_chart_id}
        chartData={chartData}
        captureRef={captureRef}
        isFirstChart={isFirstChart}
        icuIoId={icuIoId}
        name={name}
        isPatientOut={isPatientOut}
        selectedChartOrders={selectedChartOrders}
        vetsList={vetsList}
        orderColors={orderColors}
        dx={dx}
        cc={cc}
      />
    </header>
  )
}
