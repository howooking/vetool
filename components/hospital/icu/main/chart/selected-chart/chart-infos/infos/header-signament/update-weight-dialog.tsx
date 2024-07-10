import DialogFooterButtons from '@/components/common/dialog-footer-buttons'
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
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateWeight } from '@/lib/services/icu/update-icu-chart-infos'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, Gauge } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { weightFormSchema } from './schema'

export default function UpdateWeightDialog({
  weight,
  patientId,
  icuChartId,
}: {
  patientId: string
  icuChartId: string
  weight: string
}) {
  const { refresh } = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof weightFormSchema>>({
    resolver: zodResolver(weightFormSchema),
    defaultValues: {
      weight,
    },
  })

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({ weight })
    }
  }, [isDialogOpen, form, weight])

  const handleUpdateWeight = async (
    values: z.infer<typeof weightFormSchema>,
  ) => {
    setIsSubmitting(true)

    await updateWeight(patientId, icuChartId, values.weight)

    toast({
      title: '체중을 입력하였습니다',
    })

    refresh()
    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Gauge className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>체중 입력</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateWeight)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute right-3 top-4 text-sm text-muted-foreground">
                    KG
                  </FormLabel>
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
