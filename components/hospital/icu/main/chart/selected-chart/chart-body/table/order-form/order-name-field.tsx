import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-form/order-schema'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import DrugOrder from './drug-order/drug-order'

export default function OrderNameField({
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
      name="icu_chart_order_name"
      render={({ field }) => (
        <FormItem className="w-full space-y-2">
          <FormLabel className="font-semibold">
            {isInjection ? '약물명*' : '오더명*'}
          </FormLabel>
          <FormControl>
            {isInjection ? (
              <DrugOrder form={form} />
            ) : (
              <Input
                placeholder={`${'오더에 대한 이름을 입력해주세요'}`}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
