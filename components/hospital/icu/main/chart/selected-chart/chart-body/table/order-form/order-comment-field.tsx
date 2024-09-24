import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-form/order-schema'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AutoComplete from '@/components/common/auto-complete/auto-complete'

export default function OrderCommentField({
  form,
  orderType,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
  orderType: string
}) {
  const isInjection = orderType === 'injection'

  return (
    <FormField
      control={form.control}
      name="icu_chart_order_comment"
      render={({ field }) => (
        <FormItem className="w-full space-y-2">
          <FormLabel className="font-semibold">
            {isInjection ? '약물 총량*' : '오더 설명*'}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={`${'오더에 대한 설명을 입력해주세요'}`}
              disabled={isInjection}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
