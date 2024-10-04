'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-privider'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ordererSchema } from './orderer-schema'

export default function OrdererSelectStep({
  icuChartId,
}: {
  icuChartId: string
}) {
  const { hos_id } = useParams()
  const {
    basicHosData: { vetsListData },
  } = useBasicHosDataContext()

  const { reset, selectedChartOrder, isEditMode, setStep } = useIcuOrderStore()

  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpsertOrder = async (values: z.infer<typeof ordererSchema>) => {
    setIsUpdating(true)

    await upsertOrder(
      hos_id as string,
      icuChartId,
      selectedChartOrder.order_id!,
      selectedChartOrder.order_times!.map((time) =>
        time === '1' ? values.orderer : time,
      ),
      {
        icu_chart_order_name: selectedChartOrder.order_name!,
        icu_chart_order_comment: selectedChartOrder.order_comment!,
        icu_chart_order_type: selectedChartOrder.order_type!,
      },
    )

    toast({
      title: `${selectedChartOrder.order_name!} 오더를 
      ${isEditMode ? '수정' : '추가'}
      하였습니다`,
    })

    reset()
    setStep('closed')

    setIsUpdating(false)
  }

  const form = useForm<z.infer<typeof ordererSchema>>({
    resolver: zodResolver(ordererSchema),
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpsertOrder)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="orderer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>오더결정 수의사</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? undefined}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="수의사를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vetsListData.map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.name}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <Image
                            unoptimized
                            src={vet.avatar_url ?? ''}
                            alt={vet.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                        )}

                        <span>{vet.name}</span>
                        {vet.position && (
                          <span className="text-xs">({vet.position})</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            onClick={() => setStep('upsert')}
            variant="outline"
            type="button"
          >
            뒤로
          </Button>
          <Button type="submit" disabled={isUpdating}>
            확인
            <LoaderCircle
              className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}
