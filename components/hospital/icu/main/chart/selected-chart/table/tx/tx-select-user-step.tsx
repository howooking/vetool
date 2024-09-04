import { userLogFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/table/tx/tx-schema'
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
import { uploadTxImage } from '@/lib/services/icu/tx-image'
import { upsertIcuChartTxAndUpdateIcuChartOrder } from '@/lib/services/icu/tx-mutation'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import type { TxLog } from '@/types/icu'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function TxSelectUserStep({ chartId }: { chartId: string }) {
  const { txLocalState, txImageState, setStep, setIsMutationCanceled, reset } =
    useTxMutationStore()
  const { hos_id, target_date } = useParams()
  const { selectedPatientId } = useIcuSelectedPatientIdStore()

  // 상세입력 > 사용자선택 으로 넘어오면 자동포커싱이 되지 않음
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

      // setIsTxMutating(true)
      setStep('closed')

      const txId = await upsertIcuChartTxAndUpdateIcuChartOrder(
        hos_id as string,
        selectedPatientId as string,
        chartId,
        target_date as string,
        txLocalState,
        updatedLogs,
      )

      await uploadTxImage(txId, txImageState ?? [])
      // const test = await getTxImageList(txId)

      reset()

      toast({
        title: '처치 내역이 업데이트 되었습니다',
      })
    },
    [
      chartId,
      hos_id,
      reset,
      selectedPatientId,
      setStep,
      target_date,
      txImageState,
      txLocalState,
    ],
  )

  const handleCancel = useCallback(() => {
    setStep('closed')
    setIsMutationCanceled(true)
  }, [setIsMutationCanceled, setStep])

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
            <Button type="button" variant="outline" onClick={handleCancel}>
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
