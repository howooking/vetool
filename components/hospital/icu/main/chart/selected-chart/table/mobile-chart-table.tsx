import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex h-[240px] items-center justify-center gap-2"
          >
            <span className="">처치표 보기</span>
            <Fullscreen size={20} />
          </Button>
        </DialogTrigger>

        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>

        <DialogContent className="max-h-[95vh] overflow-hidden px-2 pb-2">
          <DialogHeader>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <div className="max-h-[calc(95vh-4rem)] overflow-auto">
            <DesktopChartTable
              orderColors={orderColors}
              selectedChartOrders={selectedChartOrders}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
