import DialogFooterButtons from '@/components/common/dialog-footer-buttons'
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
import { upsertIcuChartTxAndUpdateIcuChartOrder } from '@/lib/services/icu/upsert-chart-tx'
import { useUpsertTxStore } from '@/lib/store/icu/upsert-tx'
import type { TxLog } from '@/types/icu'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { userLogFormSchema } from './schema'

export default function TxSelectUserStep() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { txLocalState, reset, setStep } = useUpsertTxStore()
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
  const handleUpsertTx = async (values: z.infer<typeof userLogFormSchema>) => {
    setIsSubmitting(true)

    const newLog: TxLog = {
      result: txLocalState?.txResult ?? '',
      name: values.userLog,
      createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
    }

    const updatedLogs = [...(txLocalState?.txLog ?? []), newLog]

    await upsertIcuChartTxAndUpdateIcuChartOrder(
      txLocalState,
      updatedLogs,
      hos_id as string,
    )

    toast({
      title: '처치 내역이 업데이트 되었습니다',
    })

    reset()
    setIsSubmitting(false)
  }

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
          <DialogFooterButtons
            buttonName="확인"
            isLoading={isSubmitting}
            setIsDialogOpen={() => setStep('closed')}
          />
        </form>
      </Form>
    </>
  )
}
