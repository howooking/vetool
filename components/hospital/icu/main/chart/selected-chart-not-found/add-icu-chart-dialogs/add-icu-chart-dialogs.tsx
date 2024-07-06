import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/hospital'
import AddDefaultChartDialog from './add-default-chart-dialog'
import CopyBookmarkDialog from './copy-bookmark-dialog'
import CopyPrevChartDialog from './copy-prev-chart-dialog'

export default function AddIcuChartDialogs({
  prevSelectedChart,
  preSelectedChartOrders,
}: {
  prevSelectedChart: IcuChartJoined
  preSelectedChartOrders: IcuChartOrderJoined[]
}) {
  const { selectedDate } = useIcuSelectedDateStore()

  return (
    <div className="flex h-icu-chart w-full items-center justify-center gap-10">
      <CopyPrevChartDialog
        prevSelectedChart={prevSelectedChart}
        selectedDate={selectedDate}
        preSelectedChartOrders={preSelectedChartOrders}
      />

      <AddDefaultChartDialog
        selectedDate={selectedDate}
        prevSelectedChart={prevSelectedChart}
      />

      <CopyBookmarkDialog selectedDate={selectedDate} />
    </div>
  )
}
