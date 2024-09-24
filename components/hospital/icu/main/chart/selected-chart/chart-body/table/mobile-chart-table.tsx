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
  weight,
}: {
  selectedChartOrders: IcuChartOrderJoined[]
  orderColors: IcuOrderColors
  weight: string
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

        <DialogContent className="flex max-h-[95vh] min-h-[40vh] max-w-full flex-col justify-start overflow-hidden px-2 pb-10">
          <DialogHeader>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
          <div className="min-h-[calc(70vh)] overflow-auto">
            <DesktopChartTable
              orderColors={orderColors}
              selectedChartOrders={selectedChartOrders}
              weight={weight}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
