import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useScreenSize from '@/hooks/use-screen-size'
import { IcuOrderColors } from '@/types/adimin'
import { IcuChartOrderJoined } from '@/types/icu'
import { Fullscreen } from 'lucide-react'
import DesktopChartTable from './desktop-chart-table'

export default function MobileChartTable({
  selectedChartOrders,
  orderColors,
}: {
  selectedChartOrders: IcuChartOrderJoined[]
  orderColors: IcuOrderColors
}) {
  const { height, width } = useScreenSize()

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex h-[240px] items-center justify-center gap-2"
          >
            <span className="">처치표 전체화면으로 보기</span>
            <Fullscreen size={20} />
          </Button>
        </DialogTrigger>

        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>

        <DialogContent
          isMobileChartTable
          className="max-w-fit rotate-90 overflow-auto p-0"
          style={{ width: height, height: width }}
        >
          <div>
            <DesktopChartTable
              orderColors={orderColors}
              selectedChartOrders={selectedChartOrders}
              preview
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
