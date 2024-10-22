'use client'

import { templateFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/weght-template-schema'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
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
import { toast } from '@/components/ui/use-toast'
import {
  deleteTemplateChart,
  upsertTemplateChart,
} from '@/lib/services/icu/template/template'
import { cn } from '@/lib/utils'
import type { IcuTemplate } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Star } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function TemplateDialog({
  icuChartId,
  templateData,
}: {
  icuChartId: string
  templateData: Pick<
    IcuTemplate,
    'template_id' | 'template_name' | 'template_comment'
  > | null
}) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      template_name: templateData?.template_name ?? undefined,
      template_comment: templateData?.template_comment ?? undefined,
    },
  })

  const handleSubmit = async (values: z.infer<typeof templateFormSchema>) => {
    setIsSubmitting(true)

    await upsertTemplateChart(
      values.template_name,
      values.template_comment ?? '',
      icuChartId,
      hos_id as string,
    )

    toast({
      title: '템플릿이 추가되었습니다',
    })

    refresh()
    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    await deleteTemplateChart(templateData?.template_id!)

    toast({
      title: '템플릿이 삭제되었습니다',
    })

    refresh()
    setIsDeleting(false)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({
        template_name: templateData?.template_name || undefined,
        template_comment: templateData?.template_comment || undefined,
      })
    }
  }, [
    templateData?.template_comment,
    templateData?.template_name,
    form,
    isDialogOpen,
  ])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Star
          className={cn(
            'text-amber-300',
            templateData?.template_id!! && 'fill-amber-300',
          )}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>차트 템플릿 생성</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="template_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>템플릿 이름*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      placeholder="템플릿 이름을 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="template_comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      placeholder="설명을 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex">
              {templateData?.template_id!! && (
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isDeleting}
                  className="mr-auto"
                  onClick={handleDelete}
                >
                  삭제
                  <LoaderCircle
                    className={cn(isDeleting ? 'ml-2 animate-spin' : 'hidden')}
                  />
                </Button>
              )}

              <div className="ml-auto">
                <DialogClose asChild>
                  <Button type="button" variant="outline" tabIndex={-1}>
                    닫기
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting} className="ml-2">
                  저장
                  <LoaderCircle
                    className={cn(
                      isSubmitting ? 'ml-2 animate-spin' : 'hidden',
                    )}
                  />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
