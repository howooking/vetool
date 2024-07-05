import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { PatientDetailGroupProps } from './patient-detail-group'

const GroupCheckFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: '적어도 하나의 그룹을 선택해주세요',
  }),
})

export default function PatientDetailGroupDialog({
  groupList,
  group,
  name,
  patientId,
}: Omit<PatientDetailGroupProps, 'label'>) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof GroupCheckFormSchema>>({
    resolver: zodResolver(GroupCheckFormSchema),
    defaultValues: {
      items: group || [],
    },
  })

  useEffect(() => {
    if (!isOpen) {
      form.reset({ items: group || [] })
    }
  }, [isOpen, group, form])

  const handleSubmit = async (data: z.infer<typeof GroupCheckFormSchema>) => {
    setIsSubmitting(true)

    const supabase = createClient()
    const { error: groupUpdateError } = await supabase
      .from('icu_io')
      .update({ group_list: data.items })
      .match({ patient_id: patientId })

    if (groupUpdateError) {
      console.log(groupUpdateError)
      toast({
        variant: 'destructive',
        title: groupUpdateError.message,
      })
      return
    }

    toast({
      title: '그룹을 변경하였습니다',
    })
    refresh()
    setIsSubmitting(false)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Edit size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name}님 그룹 수정</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col"
          >
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  {groupList?.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item,
                                        ),
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto w-20"
            >
              수정
              <LoaderCircle
                className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
              />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
