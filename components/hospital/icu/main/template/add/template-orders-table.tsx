import NoResultSquirrel from '@/components/common/no-result-squirrel'
import TemplateOrderForm from '@/components/hospital/icu/main/template/add/template-order-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTemplateStore } from '@/lib/store/icu/template'
import { cn } from '@/lib/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Plus } from 'lucide-react'
import { useCallback, useMemo } from 'react'

export default function TemplateOrdersTable({
  isEditModalOpen,
}: {
  isEditModalOpen?: boolean
}) {
  const { templateOrders, setOrderIndex } = useTemplateStore()
  const {
    step,
    setStep,
    setSelectedChartOrder,
    isEditMode,
    setIsEditMode,
    reset,
  } = useIcuOrderStore()
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  const sortedOrders = useMemo(() => {
    if (templateOrders.length === 0) return []

    return templateOrders.sort(
      (prev, next) =>
        DEFAULT_ICU_ORDER_TYPE.findIndex(
          (order) => order.value === prev.order_type,
        ) -
        DEFAULT_ICU_ORDER_TYPE.findIndex(
          (order) => order.value === next.order_type,
        ),
    )
  }, [templateOrders])

  const handleOpenChange = useCallback(() => {
    if (step === 'closed') {
      setStep('upsert')
    } else {
      setStep('closed')
    }
    reset()
  }, [step, setStep, reset])

  const handleEditOrderDialogOpen = (
    order: Partial<SelectedIcuOrder>,
    index: number,
  ) => {
    setStep('upsert')
    setIsEditMode(true)
    setSelectedChartOrder(order)
    setOrderIndex(index)
  }

  return (
    <Table className="h-full border">
      <TableHeader>
        <TableRow>
          <TableHead className="relative flex items-center justify-center gap-2 text-center">
            <span>오더 목록</span>

            <Dialog open={step !== 'closed'} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-0.5"
                >
                  <Plus size={18} />
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>오더 {isEditMode ? '수정' : '추가'}</DialogTitle>
                  <DialogDescription />
                </DialogHeader>

                {step === 'upsert' && <TemplateOrderForm isEditModalOpen />}
              </DialogContent>
            </Dialog>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {!sortedOrders.length ? (
          <TableRow className="h-[360px]">
            <TableCell className="text-center" colSpan={5}>
              <NoResultSquirrel text="저장할 오더를 추가해주세요" />
            </TableCell>
          </TableRow>
        ) : (
          sortedOrders.map((order, index) => (
            <TableRow className={cn('divide-x')} key={index}>
              <TableCell
                className="p-0"
                style={{
                  background:
                    orderColorsData[order.order_type as keyof IcuOrderColors],
                }}
              >
                <Button
                  variant="ghost"
                  onClick={() =>
                    handleEditOrderDialogOpen(
                      {
                        order_id: order.order_id,
                        order_comment: order.order_comment,
                        order_name: order.order_name,
                        order_type: order.order_type,
                      },
                      index,
                    )
                  }
                  className="flex w-full justify-between rounded-none bg-transparent px-2"
                >
                  <span className="truncate">{order.order_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {order.order_comment}
                  </span>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
