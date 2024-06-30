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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ownerFormSchema } from './schema'
import HelperTooltip from '@/components/common/helper-tooltip'

export default function OwnerForm({
  setStep,
}: {
  setStep: (step: 'ownerSearch' | 'ownerRegister' | 'patientRegister') => void
}) {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const ownerName = searchParams.get('owner_name') ?? ''
  const hosOwnerId = searchParams.get('hos_owner_id') ?? ''
  const ownerAddress = searchParams.get('owner_address') ?? ''
  const ownerPhoneNumber = searchParams.get('owner_phone_number') ?? ''
  const ownerMemo = searchParams.get('owner_memo') ?? ''

  const form = useForm<z.infer<typeof ownerFormSchema>>({
    resolver: zodResolver(ownerFormSchema),
    defaultValues: {
      owner_name: undefined,
      hos_owner_id: undefined,
      owner_phone_number: '',
      owner_address: '',
      owner_memo: '',
    },
  })

  const handleBack = () => {
    setStep('ownerSearch')
    push('patients')
    form.reset()
  }

  useEffect(() => {
    form.reset({
      owner_name: ownerName,
      hos_owner_id: hosOwnerId,
      owner_address: ownerAddress,
      owner_phone_number: ownerPhoneNumber,
      owner_memo: ownerMemo,
    })
  }, [form, ownerAddress, hosOwnerId, ownerMemo, ownerName, ownerPhoneNumber])

  const handleSubmit = async (values: z.infer<typeof ownerFormSchema>) => {
    const {
      owner_name,
      owner_address,
      owner_phone_number,
      owner_memo,
      hos_owner_id,
    } = values

    push(
      `patients/?owner_name=${owner_name}&hos_owner_id=${hos_owner_id}&owner_address=${owner_address}&owner_phone_number=${owner_phone_number}&owner_memo=${owner_memo}`,
    )
    setStep('patientRegister')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="owner_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>보호자 이름*</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hos_owner_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-1 items-center gap-2">
                <FormLabel>보호자 번호*</FormLabel>
                <HelperTooltip>
                  메인차트에 등록된 고유한 보호자 등록번호로 반드시 입력해주세요
                  .
                </HelperTooltip>
              </div>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner_phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>보호자 전화번호</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>보호자 주소</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="owner_memo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>보호자 메모</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 ml-auto flex gap-2">
          <Button variant="outline" type="button" onClick={handleBack}>
            이전
          </Button>
          <Button type="submit" className="">
            다음
          </Button>
        </div>
      </form>
    </Form>
  )
}
