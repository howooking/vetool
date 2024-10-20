import { userLogFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-schema'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { upsertIcuTx } from '@/lib/services/icu/chart/tx-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import type { TxLog } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function TxSelectUserStep() {
  const {
    txLocalState,
    setStep,
    setIsMutationCanceled,
    reset: txLocalStateReset,
  } = useTxMutationStore()
  const { selectedTxPendingQueue, reset: orderQueueReset } = useIcuOrderStore()
  const { hos_id } = useParams()

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const form = useForm<z.infer<typeof userLogFormSchema>>({
    resolver: zodResolver(userLogFormSchema),
    defaultValues: {
      userLog: '',
    },
  })

  const handleUpsertTx = useCallback(
    async (values: z.infer<typeof userLogFormSchema>) => {
      const newLog: TxLog = {
        result: txLocalState?.txResult ?? '',
        name: values.userLog,
        createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
      }

      const updatedLogs = [...(txLocalState?.txLog ?? []), newLog]

      if (selectedTxPendingQueue.length) {
        selectedTxPendingQueue.forEach(
          async (item) =>
            await upsertIcuTx(
              hos_id as string,
              {
                txId: item.txId,
                txResult: txLocalState?.txResult,
                txComment: txLocalState?.txComment,
                time: item.orderTime,
                icuChartOrderId: item.orderId,
              },
              updatedLogs,
            ),
        )
        setStep('closed')
        orderQueueReset()
        txLocalStateReset()

        return toast({
          title: '처치 내역이 업데이트 되었습니다',
        })
      }

      setStep('closed')

      await upsertIcuTx(hos_id as string, txLocalState, updatedLogs)

      txLocalStateReset()
      toast({
        title: '처치 내역이 업데이트 되었습니다',
      })
    },
    [
      hos_id,
      selectedTxPendingQueue,
      txLocalStateReset,
      setStep,
      txLocalState,
      orderQueueReset,
    ],
  )

  const handleCancel = useCallback(() => {
    setStep('closed')
    setIsMutationCanceled(true)
    txLocalStateReset()
  }, [txLocalStateReset, setIsMutationCanceled, setStep])

  return (
    <>
      <DialogHeader>
        <DialogTitle>처치자 선택</DialogTitle>
        <DialogDescription>
          처치자의 코드 또는 이름을 입력해주세요
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpsertTx)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="userLog"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    {...field}
                    className="h-8 text-sm"
                    autoComplete="off"
                    ref={inputRef}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="col-span-2 ml-auto font-semibold">
            <Button
              type="button"
              variant="outline"
              tabIndex={-1}
              onClick={handleCancel}
            >
              취소
            </Button>

            <Button type="submit" className="ml-2">
              확인
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
