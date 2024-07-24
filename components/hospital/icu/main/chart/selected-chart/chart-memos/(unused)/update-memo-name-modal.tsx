import DialogFooterButtons from '@/components/common/dialog-footer-buttons'
import { memoNameFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-memos/schema'
import { Button } from '@/components/ui/button'
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
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateMemoName } from '@/lib/services/icu/update-icu-chart-infos'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function UpdateWeightDialog({
  hosIcuMemoNames,
  index,
}: {
  hosIcuMemoNames: string[]
  index: number
}) {
  const { refresh } = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { hos_id } = useParams()

  const form = useForm<z.infer<typeof memoNameFormSchema>>({
    resolver: zodResolver(memoNameFormSchema),
    defaultValues: {
      memoName: hosIcuMemoNames[index],
    },
  })

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({ memoName: hosIcuMemoNames[index] })
    }
  }, [isDialogOpen, form, hosIcuMemoNames, index])

  const handleUpdateWeight = async (
    values: z.infer<typeof memoNameFormSchema>,
  ) => {
    setIsSubmitting(true)

    const hosIcuMemoNamesInput = hosIcuMemoNames.map((memo, i) =>
      i === index ? values.memoName : memo,
    )

    await updateMemoName(hos_id as string, hosIcuMemoNamesInput)

    toast({
      title: '메모명을 입력하였습니다',
    })

    refresh()
    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6" tabIndex={-1}>
          <Edit className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>메모 이름 변경</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateWeight)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="memoName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      className="h-8 text-sm"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <DialogFooterButtons
              isLoading={isSubmitting}
              setIsDialogOpen={setIsDialogOpen}
              buttonName="입력"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
