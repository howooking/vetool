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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const signupFormSchema = z.object({
  name: z
    .string({ required_error: '이름을 입력해주세요.' })
    .min(2, { message: '2자 이상 입력해주세요.' })
    .max(10, { message: '10자 이하로 입력해주세요.' }),
  isVet: z.enum(['true', 'false']),
})
export function SignupForm() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: undefined,
      isVet: 'true',
    },
  })

  const [option, setOption] = useState<'select' | 'create' | undefined>(
    undefined,
  )
  const { push } = useRouter()

  const handleSubmit = (values: z.infer<typeof signupFormSchema>) => {
    if (option === 'select') {
      push(
        `/on-boarding/select-hospital?name=${values.name}&is_vet=${values.isVet}`,
      )
    }
    if (option === 'create') {
      push(
        `/on-boarding/create-hospital?name=${values.name}&is_vet=${values.isVet}`,
      )
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름을 입력해주세요.</FormLabel>
              <FormControl>
                <Input placeholder="김벳툴" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isVet"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>수의사이신가요?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      Yes, 수의사입니다.
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      No, 수의사가 아닙니다.
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-4">
          <Button
            className="w-full"
            type="submit"
            onClick={() => setOption('select')}
          >
            가입된 병원에 등록
          </Button>
          <Button
            className="w-full"
            type="submit"
            onClick={() => setOption('create')}
          >
            새로운 병원 등록
          </Button>
        </div>
      </form>
    </Form>
  )
}
