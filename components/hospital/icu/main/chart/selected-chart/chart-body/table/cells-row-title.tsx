'use client'

import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useCallback, useEffect, useMemo } from 'react'

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
    selectedOrderPendingQueue,
    setSelectedOrderPendingQueue,
    setCopiedOrderPendingQueue,
    reset,
  } = useIcuOrderStore()

  const isInPendingQueue = useMemo(() => {
    return selectedOrderPendingQueue.some(
      (order) => order.order_id === order_id,
    )
  }, [order_id, selectedOrderPendingQueue])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        event.preventDefault()

        if (selectedOrderPendingQueue.length > 0) {
          setCopiedOrderPendingQueue(selectedOrderPendingQueue)
          setSelectedOrderPendingQueue([])

          toast({
            title: '오더 복사 완료',
            description: '붙여넣기 할 차트로 이동해주세요',
          })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    selectedOrderPendingQueue,
    setCopiedOrderPendingQueue,
    setSelectedOrderPendingQueue,
  ])

  const handleEditOrderDialogOpen = useCallback(
    (e: React.MouseEvent) => {
      if (preview) return

      if (e.metaKey || e.ctrlKey) {
        e.preventDefault()

        setSelectedOrderPendingQueue((prev) => {
          const existingIndex = prev.findIndex(
            (item) => item.order_id === order.order_id,
          )

          if (existingIndex !== -1) {
            return prev.filter((_, index) => index !== existingIndex)
          } else {
            return [...prev, order]
          }
        })

        return
      }

      reset()
      setStep('upsert')
      setIsEditMode(true)
      setSelectedChartOrder(order)
    },
    [
      preview,
      order,
      setSelectedOrderPendingQueue,
      setSelectedChartOrder,
      setStep,
      setIsEditMode,
      reset,
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
