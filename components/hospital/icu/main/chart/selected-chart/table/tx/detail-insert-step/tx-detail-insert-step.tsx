import TxLog from '@/components/hospital/icu/main/chart/selected-chart/table/tx/detail-insert-step/tx-log'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { deleteIcuChartTx } from '@/lib/services/icu/upsert-chart-tx'
import { useUpsertTxStore } from '@/lib/store/icu/upsert-tx'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { txDetailRegisterFormSchema } from '../schema'

export default function TxDetailInsertStep() {
  const [isDeleting, setIsDeleting] = useState(false)
  const { reset, setStep, txLocalState, setTxLocalState } = useUpsertTxStore()

  const form = useForm<z.infer<typeof txDetailRegisterFormSchema>>({
    resolver: zodResolver(txDetailRegisterFormSchema),
    defaultValues: {
      result: txLocalState?.txResult ?? '',
      comment: txLocalState?.txComment ?? '',
    },
  })

  const handleNextStep = async (
    values: z.infer<typeof txDetailRegisterFormSchema>,
  ) => {
    setTxLocalState({
      txResult: values.result,
      txComment: values.comment,
    })
    setStep('seletctUser')
  }

  const handleDeleteTx = async () => {
    if (!confirm('처치를 삭제하시겠습니까?')) {
      return
    }

    setIsDeleting(true)

    await deleteIcuChartTx(
      txLocalState?.txId!,
      txLocalState?.icuChartOrderId!,
      txLocalState?.time!,
    )

    setIsDeleting(false)
    reset()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>처치 상세 입력</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleNextStep)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="result"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="">처치 결과*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-8 text-sm"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="">코멘트</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-8 text-sm"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* proplan에서만 제공 */}
          {/* <IcuChartTxImageInput
            images={txLocalState?.txImages ?? []}
            onImagesChange={(newImages) =>
              setTxLocalState({
                txImages: newImages,
              })
            }
          /> */}

          {txLocalState?.txLog?.length && <TxLog logs={txLocalState?.txLog} />}

          <div className="flex justify-between">
            {txLocalState?.txId && (
              <Button
                variant="destructive"
                onClick={handleDeleteTx}
                type="button"
                disabled={isDeleting}
              >
                삭제
                <LoaderCircle
                  className={cn(isDeleting ? 'ml-2 animate-spin' : 'hidden')}
                />
              </Button>
            )}
            <div className="ml-auto flex gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('closed')}
                  tabIndex={-1}
                >
                  닫기
                </Button>
              </DialogClose>
              <Button type="submit">다음</Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}
