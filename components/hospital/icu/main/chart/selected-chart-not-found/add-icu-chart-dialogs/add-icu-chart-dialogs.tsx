import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/icu'
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
  return (
    <div className="flex h-icu-chart w-full items-center justify-center gap-10">
      {/* <CopyPrevChartDialog
        prevSelectedChart={prevSelectedChart}
        preSelectedChartOrders={preSelectedChartOrders}
      />

      <AddDefaultChartDialog prevSelectedChart={prevSelectedChart} />

      <CopyBookmarkDialog /> */}
    </div>
  )
}
