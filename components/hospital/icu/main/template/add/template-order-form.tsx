'use client'

import DeleteDefaultOrderAlertDialog from '@/components/hospital/admin/icu-settings/default-orders/delete-default-order-alert-dialog'
import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-schema'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTemplateStore } from '@/lib/store/icu/template'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function TemplateOrderForm() {
  const { setStep, selectedChartOrder, isEditMode, reset } = useIcuOrderStore()
  const { setTemplateOrders } = useTemplateStore()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      icu_chart_order_type: selectedChartOrder.order_type ?? undefined,
      icu_chart_order_name: selectedChartOrder.order_name ?? '',
      icu_chart_order_comment: selectedChartOrder.order_comment ?? '',
    },
  })

  const handleSubmit = useCallback(
    async (values: z.infer<typeof orderSchema>) => {
      setIsSubmitting(true)

      const trimmedOrderName = values.icu_chart_order_name.trim()
      const orderComment = values.icu_chart_order_comment ?? ''
      const orderType = values.icu_chart_order_type

      setTemplateOrders({
        icu_chart_order_name: trimmedOrderName,
        icu_chart_order_comment: orderComment,
        icu_chart_order_type: orderType,
      })

      reset()
      form.resetField('icu_chart_order_name')
      form.resetField('icu_chart_order_comment')

      setIsSubmitting(false)
    },
    [setTemplateOrders, reset, form],
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="icu_chart_order_type"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel
                htmlFor="icu_chart_order_type"
                className="font-semibold"
              >
                오더 타입*
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  {DEFAULT_ICU_ORDER_TYPE.map((item) => (
                    <FormItem
                      key={item.value}
                      className="flex items-center space-x-1 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem
                          id={`order-type-${item.value}`}
                          value={item.value}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={`order-type-${item.value}`}
                        className="font-normal"
                      >
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icu_chart_order_name"
          render={({ field }) => (
            <FormItem className="w-full space-y-2">
              <FormLabel
                htmlFor="icu_chart_order_name"
                className="font-semibold"
              >
                오더명*
              </FormLabel>
              <FormControl>
                <Input
                  id="icu_chart_order_name"
                  placeholder="오더명을 입력해주세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icu_chart_order_comment"
          render={({ field }) => (
            <FormItem className="w-full space-y-2">
              <FormLabel
                htmlFor="icu_chart_order_comment"
                className="font-semibold"
              >
                오더 설명
              </FormLabel>
              <FormControl>
                <Input
                  id="icu_chart_order_comment"
                  placeholder="오더에 대한 설명을 입력해주세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
          {isEditMode && (
            <DeleteDefaultOrderAlertDialog
              selectedChartOrder={selectedChartOrder}
              setStep={setStep}
            />
          )}

          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              닫기
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isSubmitting}>
            {isEditMode ? '변경' : '추가'}
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
