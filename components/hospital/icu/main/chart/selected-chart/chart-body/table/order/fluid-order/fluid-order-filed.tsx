import WarningMessage from '@/components/common/warning-message'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { calculatedMaintenaceRate } from '@/lib/calculators/maintenace-rate'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Calculator } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { orderSchema } from '../order-schema'
import FluidToolTip from './fluid-tool-tip'

export default function FluidOrderFiled({
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
    basicHosData: { maintenanceRateCalcMethod },
  } = useBasicHosDataContext()

  const { selectedChartOrder } = useIcuOrderStore()

  const [displayFluidName, setDisplayFluidName] = useState(
    selectedChartOrder.order_name?.split('#')[0] ?? '',
  )
  const [localMaintenaceRateCalcMethod, setLocalMaintenaceRateCalcMethod] =
    useState(
      selectedChartOrder.order_name?.split('#')[1] ?? maintenanceRateCalcMethod,
    )
  const [fold, setFold] = useState(
    selectedChartOrder.order_name?.split('#')[2] ?? '1',
  )

  useEffect(() => {
    const fullValue = `${displayFluidName}#${localMaintenaceRateCalcMethod}#${fold}`
    form.setValue('icu_chart_order_name', fullValue)
  }, [displayFluidName, fold, form, localMaintenaceRateCalcMethod])

  const calculateFluidRate = useCallback(() => {
    const result = calculatedMaintenaceRate(
      weight,
      species as 'canine' | 'feline',
      fold,
      localMaintenaceRateCalcMethod as 'a' | 'b' | 'c',
    )
    form.setValue('icu_chart_order_comment', result)
  }, [fold, form, localMaintenaceRateCalcMethod, species, weight])

  return (
    <>
      <FormField
        control={form.control}
        name="icu_chart_order_name"
        render={({ field }) => (
          <FormItem className="w-full space-y-2">
            <FormLabel className="font-semibold">수액 종류*</FormLabel>
            <FormControl>
              <Input
                placeholder="하트만 + KCl 5ml + Taurine 1ample ..."
                {...field}
                value={displayFluidName}
                onChange={(e) => setDisplayFluidName(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <FormField
          control={form.control}
          name="icu_chart_order_comment"
          render={({ field }) => (
            <FormItem className="w-full space-y-2">
              <FormLabel className="font-semibold">
                <div className="itmes-center flex gap-2">
                  <span className="leading-none">수액 속도</span>
                  <FluidToolTip />
                  {ageInDays <= 365 && (
                    <WarningMessage
                      className="text-sm"
                      text={`Pediatrics의 경우,  ${species === 'canine' ? 'Adult Dog * 3' : 'Adult Cat  * 2.5'}`}
                    />
                  )}
                </div>
              </FormLabel>

              <div className="flex items-center gap-2">
                <Select
                  value={localMaintenaceRateCalcMethod}
                  onValueChange={setLocalMaintenaceRateCalcMethod}
                  defaultValue={maintenanceRateCalcMethod}
                >
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="계산법" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>계산법</SelectLabel>
                      {species === 'canine' ? (
                        <>
                          <SelectItem value="a">
                            a. 60{' '}
                            <span className="text-sm text-muted-foreground">
                              ml/kg/day
                            </span>
                          </SelectItem>
                          <SelectItem value="b">
                            b. 132 * (몸무게) <sup>0.75</sup>{' '}
                            <span className="text-sm text-muted-foreground">
                              ml/day
                            </span>
                          </SelectItem>
                          <SelectItem value="c">
                            c. 30 * (몸무게) + 70{' '}
                            <span className="text-sm text-muted-foreground">
                              ml/day
                            </span>
                          </SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="a">
                            a. 40{' '}
                            <span className="text-sm text-muted-foreground">
                              ml/kg/day
                            </span>
                          </SelectItem>
                          <SelectItem value="b">
                            b. 80 * (몸무게) <sup>0.75</sup>{' '}
                            <span className="text-sm text-muted-foreground">
                              ml/day
                            </span>
                          </SelectItem>
                          <SelectItem value="c">
                            c. 30 * (몸무게) + 70{' '}
                            <span className="text-sm text-muted-foreground">
                              ml/day
                            </span>
                          </SelectItem>
                        </>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select value={fold} onValueChange={setFold}>
                  <SelectTrigger className="w-1/4">
                    <SelectValue placeholder="배수" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>유지속도 배수</SelectLabel>
                      <SelectItem value="1">1배</SelectItem>
                      <SelectItem value="1.5">1.5배</SelectItem>
                      <SelectItem value="2">2배</SelectItem>
                      <SelectItem value="2.5">2.5배</SelectItem>
                      <SelectItem value="3">3배</SelectItem>
                      <SelectItem value="3.5">3.5배</SelectItem>
                      <SelectItem value="4">4배</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  onClick={calculateFluidRate}
                >
                  <Calculator size={16} />
                </Button>

                <div className="relative">
                  <FormControl>
                    <Input placeholder="수액속도" {...field} />
                  </FormControl>
                  <span className="absolute right-2 top-2 text-sm text-muted-foreground">
                    ml/hr
                  </span>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}
