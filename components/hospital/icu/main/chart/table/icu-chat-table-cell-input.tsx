import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TableCell } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import {
  updateIcuChartOrder,
  upsertIcuChartTx,
} from '@/lib/services/hospital/icu/upsert-chart-tx'
import { cn } from '@/lib/utils'
import { IcuChartTx, Vet } from '@/types/hospital'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import IcuChartTxVetsSelect from './icu-chart-tx-vets-select'

type TableCellInputProps = {
  time: number
  txData: IcuChartTx | null
  vetsData: Vet[]
  ioId: string
  chartOrderId: string
  hasOrder: boolean
}

type TxState = {
  icu_chart_tx_result: string | null
  icu_chart_tx_comment: string | null
  icu_chart_tx_images: string[] | null
  icu_chart_tx_log: string[] | null
}

export default function IcuChartTableCellInput({
  time,
  txData,
  vetsData,
  ioId,
  chartOrderId,
  hasOrder,
}: TableCellInputProps) {
  const txId = txData?.icu_chart_tx_id!
  const { refresh } = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [txState, setTxState] = useState<TxState>({
    icu_chart_tx_result: txData?.icu_chart_tx_result ?? '',
    icu_chart_tx_comment: txData?.icu_chart_tx_comment ?? '',
    icu_chart_tx_images: txData?.icu_chart_tx_images ?? [],
    icu_chart_tx_log: txData?.icu_chart_tx_log ?? [],
  })

  useEffect(() => {
    setTxState({
      icu_chart_tx_result: txData?.icu_chart_tx_result?.trim() ?? '',
      icu_chart_tx_comment: txData?.icu_chart_tx_comment?.trim() ?? '',
      icu_chart_tx_images: txData?.icu_chart_tx_images ?? [],
      icu_chart_tx_log: txData?.icu_chart_tx_log ?? [],
    })
  }, [txData])

  const handleInputChange =
    (field: keyof TxState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setTxState((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const handleTxBlur = async () => {
    setIsSubmitting(true)

    if (
      txState.icu_chart_tx_result === (txData?.icu_chart_tx_result ?? '') &&
      txState.icu_chart_tx_comment === (txData?.icu_chart_tx_comment ?? '')
    ) {
      setIsSubmitting(false)
      return
    }

    const fieldName = `icu_chart_order_tx_${time}`
    const icuChartTxData = await upsertIcuChartTx(
      txId,
      ioId,
      chartOrderId,
      txState,
    )

    await updateIcuChartOrder(
      chartOrderId,
      fieldName,
      icuChartTxData.icu_chart_tx_id,
    )

    toast({
      title: '처치 상세 내역',
      description: '처치 상세 내역이 업데이트 되었습니다',
    })

    setIsSubmitting(false)
    refresh()
  }

  return (
    <TableCell className="h-2 border-black p-0 leading-4">
      <ContextMenu>
        <ContextMenuTrigger>
          <Input
            className={cn(
              'rounded-none px-1 text-center focus-visible:border-2 focus-visible:border-primary focus-visible:ring-0',
              hasOrder ? 'bg-red-200' : 'bg-input',
            )}
            value={txState.icu_chart_tx_result ?? ''}
            onBlur={handleTxBlur}
            onChange={handleInputChange('icu_chart_tx_result')}
            disabled={isSubmitting}
          />
        </ContextMenuTrigger>

        <ContextMenuContent>
          {/* POPOVER */}
          <div className="grid gap-4 border p-4">
            {/* title */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium leading-none">처치 상세</h4>
                <p className="text-sm text-muted-foreground">
                  처치 상세 내역을 입력해주세요
                </p>
              </div>

              <IcuChartTxVetsSelect vetsData={vetsData} />
            </div>

            <div className="grid gap-2">
              {/* result */}
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="result">결과</Label>
                <Input
                  id="result"
                  type="text"
                  value={txState.icu_chart_tx_result ?? ''}
                  className="col-span-2 h-8"
                  onBlur={handleTxBlur}
                  onChange={handleInputChange('icu_chart_tx_result')}
                  placeholder="결과값 입력"
                />
              </div>

              {/* comment */}
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="comment">코멘트</Label>
                <Input
                  id="comment"
                  value={txState.icu_chart_tx_comment ?? ''}
                  className="col-span-2 h-8"
                  onBlur={handleTxBlur}
                  onChange={handleInputChange('icu_chart_tx_comment')}
                />
              </div>

              {/* TODO */}
              {/* images */}
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="image">이미지</Label>
                <Input
                  id="image"
                  className="col-span-2 h-8"
                  type="file"
                  onChange={() => {}}
                />
              </div>

              {/* TODO */}
              {/* log */}
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="log">처치 기록</Label>
                <Input
                  id="log"
                  value={txState.icu_chart_tx_comment ?? ''}
                  onChange={() => {}}
                  className="col-span-2 h-8"
                />
              </div>
            </div>
          </div>
        </ContextMenuContent>
      </ContextMenu>
    </TableCell>
  )
}
