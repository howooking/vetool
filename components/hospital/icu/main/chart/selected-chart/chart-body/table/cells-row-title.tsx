'use client'

import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback, useMemo } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function CellsRowTitle({
  order,
  preview,
}: {
  order: SelectedIcuOrder
  preview?: boolean
}) {
  const { order_comment, order_type, order_id } = order

  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  const {
    setStep,
    setIsEditMode,
    setSelectedChartOrder,
    orderPendingQueue,
    setOrderPendingQueue,
  } = useIcuOrderStore()

  const isInPendingQueue = useMemo(() => {
    return orderPendingQueue.some((order) => order.order_id === order_id)
  }, [order_id, orderPendingQueue])

  const debouncedMultipleOrders = useDebouncedCallback(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key)
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        event.preventDefault()

        toast({
          title: '오더 복사 완료',
          description: '붙여넣기 할 차트로 이동해주세요',
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, 1000)

  const handleEditOrderDialogOpen = useCallback(
    (e: React.MouseEvent) => {
      if (preview) return

      if (e.metaKey || e.ctrlKey) {
        e.preventDefault()
        setOrderPendingQueue((prev) => [...prev, order])

        return debouncedMultipleOrders()
      }

      setStep('upsert')
      setIsEditMode(true)
      setSelectedChartOrder(order)
    },
    [
      preview,
      setStep,
      setIsEditMode,
      setSelectedChartOrder,
      order,
      setOrderPendingQueue,
      debouncedMultipleOrders,
    ],
  )

  return (
    <TableCell
      className="w-[320px] p-0"
      style={{
        background: orderColorsData[order_type as keyof IcuOrderColors],
      }}
    >
      <Button
        variant="ghost"
        onClick={handleEditOrderDialogOpen}
        className={cn(
          'flex h-11 w-[320px] justify-between rounded-none bg-transparent px-2 outline-none ring-inset ring-primary',
          preview ? 'cursor-not-allowed' : 'cursor-pointer',
          isInPendingQueue && 'ring-2',
        )}
      >
        <span className="truncate">{order.order_name.split('#')[0]}</span>
        <span className="min-w-16 truncate text-right text-xs text-muted-foreground">
          {order_comment} {order_type === 'fluid' && 'ml/hr'}
        </span>
      </Button>
    </TableCell>
  )
}
