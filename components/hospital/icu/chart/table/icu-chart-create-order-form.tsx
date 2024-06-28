import { GroupCheckFormSchema } from '@/components/hospital/icu/chart/table/schema'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/'
import {
  TIME,
  TX_ORDER_TIME_INTERVAL,
} from '@/constants/hospital/icu/chart/time'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function IcuChartCreateOrderForm() {
  const { refresh } = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startTime, setStartTime] = useState<string | undefined>(undefined)
  const [timeTerm, setTimeTerm] = useState<string | undefined>(undefined)

  const form = useForm<z.infer<typeof GroupCheckFormSchema>>({
    resolver: zodResolver(GroupCheckFormSchema),
  })

  const handleSubmit = async (data: z.infer<typeof GroupCheckFormSchema>) => {
    setIsSubmitting(true)

    // const supabase = createClient()
    // const { error: groupUpdateError } = await supabase
    //   .from('icu_chart_order')
    //   .update({ group_list: data.items })
    //   .match({ patient_id: patientId })

    // if (groupUpdateError) {
    //   console.log(groupUpdateError)
    //   toast({
    //     variant: 'destructive',
    //     title: groupUpdateError.message,
    //   })
    //   return
    // }

    // toast({
    //   title: '그룹을 변경하였습니다.',
    // })
    refresh()
    setIsSubmitting(false)
  }

  useEffect(() => {
    const start = Number(startTime)
    const term = Number(timeTerm)

    const indicesToSetTrue = []

    for (let i = start; i <= 24; i += term) {
      indicesToSetTrue.push(i)
    }

    for (let i = 1; i <= 24; i += 1) {
      form.setValue(
        `icu_chart_order_tx_${i}` as keyof z.infer<typeof GroupCheckFormSchema>,
        indicesToSetTrue.includes(i),
      )
    }
  }, [form, startTime, timeTerm])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-8"
      >
        {/* 처치 타입 */}
        <FormField
          control={form.control}
          name="icu_chart_order_type"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-semibold">처치 타입*</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-3 space-x-2"
                >
                  {DEFAULT_ICU_ORDER_TYPE.map((item) => (
                    <FormItem
                      key={item.value}
                      className="flex items-center space-x-2 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
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

        {/* 처치 이름 */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="icu_chart_order_name"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel className="font-semibold">처치명*</FormLabel>
                <FormControl>
                  <Input placeholder="처치명을 입력해주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 처치 설명 */}
          <FormField
            control={form.control}
            name="icu_chart_order_comment"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel className="font-semibold">처치 설명*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="처치에 대한 설명을 입력해주세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 처치 시간 */}
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span>처치 시간 설정</span>
          <div>
            {/* 처치 시간 - 시작 시간 */}
            <Select onValueChange={setStartTime} value={startTime}>
              <SelectTrigger className="h-6 text-xs">
                <SelectValue placeholder="시작 시간" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TIME.map((element) => (
                    <SelectItem
                      value={element.toString()}
                      key={element}
                      className="text-xs"
                    >
                      {element}시 시작
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* 처치 시간 - 시간 간격 */}
          <div>
            <Select onValueChange={setTimeTerm} value={timeTerm}>
              <SelectTrigger className="h-6 text-xs">
                <SelectValue placeholder="시간 간격" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>시간간격</SelectLabel>
                  {TX_ORDER_TIME_INTERVAL.map((element) => (
                    <SelectItem
                      value={element.toString()}
                      key={element}
                      className="text-xs"
                    >
                      {element}시간 간격
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>전체선택</div>
          <div>전체취소</div>
        </div>
        {/* 처치 시간 - 타임 테이블 */}
        <div className="col-span-2 flex w-full">
          {TIME.map((element, index) => (
            <FormField
              key={element}
              control={form.control}
              name={`icu_chart_order_tx_${element}`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    className={cn(
                      'flex h-7 w-full cursor-pointer items-center justify-center border hover:opacity-80',
                      field.value ? 'bg-primary text-white' : 'bg-white',
                      index === 0 ? 'border-l-2' : 'border-l',
                      index === TIME.length - 1 ? 'border-r-2' : 'border-r',
                      'border-b border-t border-slate-600',
                    )}
                  >
                    {element}
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      className="hidden"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button type="submit" disabled={isSubmitting} className="ml-auto w-16">
          추가
          <LoaderCircle
            className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </form>
    </Form>
  )
}
