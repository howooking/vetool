import DialogFooterButtons from '@/components/common/dialog-footer-buttons'
import { weightFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/weght-template-schema'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { updateWeight } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Weight as WeightIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function Weight({
  weight,
  weightMeasuredDate,
  icuChartId,
}: {
  weight: string
  weightMeasuredDate: string | null
  icuChartId: string
}) {
  const { patient_id } = useParams()
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

    await updateWeight(
      patient_id as string,
      icuChartId,
      values.weight,
      format(new Date(), 'yyyy-MM-dd'),
    )

    toast({
      title: '체중을 입력하였습니다',
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full items-center justify-start gap-2 p-2"
        >
          <Label className="text-xs text-muted-foreground" htmlFor="ownerName">
            <WeightIcon size={16} className="text-muted-foreground" />
          </Label>
          {weightMeasuredDate ? (
            <div className="flex items-center gap-2">
              <span>{weight}kg</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{weightMeasuredDate}</span>
            </div>
          ) : (
            <span>체중 미측정</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>체중 입력</DialogTitle>
          <DialogDescription />
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
