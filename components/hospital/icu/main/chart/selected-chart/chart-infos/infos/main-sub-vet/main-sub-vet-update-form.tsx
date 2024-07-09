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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { MainAndSubVet, Vet } from '@/types/hospital'
import { useState } from 'react'

import { toast } from '@/components/ui/use-toast'
import { updateMainSubVet } from '@/lib/services/hospital/icu/update-icu-chart-infos'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { mainSubVetFormSchema } from './schema'

export default function MainSubVetUpdateForm({
  mainVet,
  subVet,
  vetsData,
  icuChartId,
  setIsDialogOpen,
}: {
  mainVet: MainAndSubVet
  subVet: MainAndSubVet | null
  vetsData: Vet[]
  icuChartId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  const handleUpdateMainAndSubVet = async (
    values: z.infer<typeof mainSubVetFormSchema>,
  ) => {
    setIsUpdating(true)
    await updateMainSubVet(icuChartId, values.main_vet, values.sub_vet)

    toast({
      title: '주치의 / 부주치의를 변경하였습니다',
    })

    refresh()
    setIsUpdating(false)
    setIsDialogOpen(false)
  }

  const form = useForm<z.infer<typeof mainSubVetFormSchema>>({
    resolver: zodResolver(mainSubVetFormSchema),
    defaultValues: {
      main_vet: mainVet.user_id,
      sub_vet: subVet?.user_id ?? 'null',
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateMainAndSubVet)}
        className="mt-4 grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="main_vet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>주치의*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vetsData.map((vet) => (
                    <SelectItem key={vet.user_id} value={vet.user_id}>
                      <div className="flex items-center gap-2">
                        <Image
                          unoptimized
                          src={vet.avatar_url ?? ''}
                          alt={vet.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <span>{vet.name}</span>
                        <span className="text-xs">({vet.position})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sub_vet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>부주치의</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? undefined}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="부주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    ...vetsData,
                    {
                      user_id: 'null',
                      name: '미선택',
                      position: '',
                      avatar_url: '',
                    },
                  ].map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.user_id}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <Image
                            unoptimized
                            src={vet.avatar_url ?? ''}
                            alt={vet.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                        )}

                        <span>{vet.name}</span>
                        {vet.position && (
                          <span className="text-xs">({vet.position})</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="col-span-2 ml-auto font-semibold">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
          >
            취소
          </Button>

          <Button type="submit" className="ml-2" disabled={isUpdating}>
            변경
            <LoaderCircle
              className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}
