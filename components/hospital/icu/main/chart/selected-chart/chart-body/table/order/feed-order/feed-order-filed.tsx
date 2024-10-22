import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateRer } from '@/lib/calculators/rer'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Equal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { orderSchema } from '../order-schema'
import FeedToolTip from './\bfeed-tool-tip'
import RerDer from './rer-der'

export default function FeedOrderField({
  form,
  species,
  ageInDays,
  weight,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
  species: string
  ageInDays: number
  weight: string
}) {
  const {
    basicHosData: { rerCalcMethod },
  } = useBasicHosDataContext()

  const [fold, setFold] = useState('')

  const calculatedRer = useMemo(
    () =>
      calculateRer(
        weight,
        species as 'canine' | 'feline',
        rerCalcMethod as 'a' | 'b',
      ),
    [rerCalcMethod, species, weight],
  )

  const calculatedDer = useMemo(
    () => (Number(calculatedRer) * Number(fold)).toFixed(0),
    [calculatedRer, fold],
  )

  return (
    <>
      <FormField
        control={form.control}
        name="icu_chart_order_name"
        render={({ field }) => (
          <FormItem className="w-full space-y-2">
            <FormLabel className="font-semibold">사료*</FormLabel>
            <FormControl>
              <Input
                placeholder={`${'오더에 대한 이름을 입력해주세요'}`}
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
            <FormLabel className="font-semibold">급여방법, 설명</FormLabel>
            <FormControl>
              <Input
                placeholder={`${'오더에 대한 설명을 입력해주세요'}`}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div>
        <div className="flex items-center gap-2">
          <Label className="text-sm font-semibold">DER 계산</Label>
          <FeedToolTip rerCalcMethod={rerCalcMethod as 'a' | 'b'} />
        </div>

        <div className="mt-2 grid grid-cols-8 items-center justify-center gap-2">
          <RerDer calcuatedVal={calculatedRer} prefix="RER" />

          <X className="col-span-1 w-full" />

          <Input
            className="col-span-2 direction-reverse"
            placeholder="배수"
            value={fold}
            onChange={(e) => setFold(e.target.value)}
          />

          <Equal className="col-span-1 w-full" />

          <RerDer calcuatedVal={calculatedDer} prefix="DER" />
        </div>
      </div>
    </>
  )
}
