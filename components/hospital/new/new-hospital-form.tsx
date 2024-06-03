'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { newHospitalFormSchema } from './schema'

export default function NewHospitalForm() {
  const { back, push, replace, refresh } = useRouter()
  const form = useForm<z.infer<typeof newHospitalFormSchema>>({
    resolver: zodResolver(newHospitalFormSchema),
    defaultValues: {
      name: undefined,
      city: undefined,
      district: undefined,
    },
  })
  const supabase = createClient()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (
    values: z.infer<typeof newHospitalFormSchema>,
  ) => {
    const { city, district, name } = values

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return
    }

    setIsSubmitting(true)

    // try {
    //   const { data, error: hospitalError } = await supabase
    //     .from('hospitals')
    //     .insert({
    //       business_no: businessNumber,
    //       master_id: user.id,
    //       name,
    //       address,
    //       phone_no: phoneNumber,
    //     })
    //     .select('hos_id')
    //     .single()

    //   if (hospitalError) {
    //     toast({
    //       variant: 'destructive',
    //       title: hospitalError.message,
    //       description: '관리자에게 문의하세요',
    //     })
    //     return
    //   }

    //   const { error: mappingError } = await supabase
    //     .from('hos_vet_mapping')
    //     .insert({
    //       hos_id: data.hos_id,
    //       vet_id: user.id,
    //       vet_approved: true,
    //       rank: 1,
    //     })

    //   if (mappingError) {
    //     toast({
    //       variant: 'destructive',
    //       title: mappingError.message,
    //       description: '관리자에게 문의하세요',
    //     })
    //     return
    //   }

    //   const { error: defaultHosError } = await supabase
    //     .from('vets')
    //     .update({ default_hos_id: data.hos_id })
    //     .eq('vet_id', user.id)
    //     .is('default_hos_id', null)

    //   if (defaultHosError) {
    //     toast({
    //       variant: 'destructive',
    //       title: defaultHosError.message,
    //       description: '관리자에게 문의하세요',
    //     })
    //     return
    //   }

    //   toast({
    //     title: '사업자등록증 확인 후 생성이 완료됩니다',
    //     description: '잠시 후 페이지가 이동합니다.',
    //   })
    //   replace(`/hospital/${data.hos_id}`)
    //   refresh()
    //   return
    // } catch (error) {
    //   // eslint-disable-next-line no-console
    //   console.error(error, 'error while adding a hospital')
    // } finally {
    //   setIsSubmitting(false)
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">병원 이름</FormLabel>
              <FormControl>
                <Input
                  placeholder="벳터핸즈 동물메디컬센터"
                  {...field}
                  className="border-2 h-[40px] px-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          {/* <Button type="button" variant="outline" onClick={() => router.back()}>
            뒤로가기
          </Button> */}
          <Button
            type="submit"
            className="font-semibold"
            disabled={isSubmitting}
          >
            병원등록
            {/* <AiOutlineLoading3Quarters
              className={cn('ml-2', isSubmitting ? 'animate-spin' : 'hidden')}
            /> */}
          </Button>
        </div>
      </form>
    </Form>
  )
}
