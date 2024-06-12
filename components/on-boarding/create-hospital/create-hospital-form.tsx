'use client'

import { newHospitalFormSchema } from '@/components/on-boarding/create-hospital/schema'
import { Button } from '@/components/ui/button'
import {
  Form,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { ADDRESS } from '@/constants/hospital/create/address'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function CreateHospitalForm() {
  const [districts, setDistricts] = useState([''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { back, push, replace, refresh } = useRouter()
  const form = useForm<z.infer<typeof newHospitalFormSchema>>({
    resolver: zodResolver(newHospitalFormSchema),
    defaultValues: {
      name: undefined,
      city: '서울특별시',
      district: undefined,
      businessNumber: undefined,
    },
  })
  const supabase = createClient()
  const city = form.watch('city')

  useEffect(() => {
    if (city) {
      const selectedCity = ADDRESS.find((value) => value.city === city)
      if (selectedCity) setDistricts(selectedCity.districts)
    }
  }, [city])

  const handleSubmit = async (
    values: z.infer<typeof newHospitalFormSchema>,
  ) => {
    setIsSubmitting(true)

    const { city, district, name, businessNumber } = values
    const { data: hosId, error } = await supabase.rpc(
      'insert_user_data_when_create_hospital',
      {
        name_input: name,
        city_input: city,
        district_input: district,
        business_number_input: businessNumber,
      },
    )

    if (error) {
      toast({
        variant: 'destructive',
        title: error.message,
        description: '관리자에게 문의하세요',
      })

      return
    }

    toast({
      variant: 'default',
      title: `${name} 등록 성공`,
      description: '잠시후 페이지가 이동됩니다.',
    })

    replace(`/hospital/${hosId}`)
    refresh()

    setIsSubmitting(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="py-3">
              <FormLabel className="pb-2 text-base font-semibold">
                병원 이름
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="병원명 입력"
                  {...field}
                  className="h-[40px] border bg-transparent px-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="min-w-44 py-3">
                <FormLabel className="pb-2 text-base font-semibold">
                  병원 주소
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="시·도" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ADDRESS.map((value) => (
                      <SelectItem key={value.city} value={value.city}>
                        {value.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem className="mt-auto min-w-44 py-3 pl-4">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="시·군·구" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="businessNumber"
          render={({ field }) => (
            <FormItem className="py-3">
              <FormLabel className="pb-2 text-base font-semibold">
                사업자 등록번호
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="10자리 사업자 등록번호"
                  {...field}
                  className="h-[40px] bg-transparent px-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-3">
          <Button type="button" variant="outline" onClick={() => back()}>
            이전
          </Button>
          <Button
            type="submit"
            className="font-semibold"
            disabled={isSubmitting}
          >
            다음
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}
