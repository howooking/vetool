'use client'

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
import { createNotice, updateNotice } from '@/lib/services/hospital-home/notice'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import DeleteNoticeButton from './delete-notice-button'
import { NOTICE_COLORS, NoticeColorType, noticeSchema } from './notice-schema'

export default function CreateOrUpdateNoticeDialog({
  authuserId,
  hosId,
  isEdit,
  oldNoticeText,
  oldNoticeColor,
  oldNoticeId,
}: {
  authuserId?: string
  hosId: string
  isEdit?: boolean
  oldNoticeId?: string
  oldNoticeText?: string
  oldNoticeColor?: NoticeColorType
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof noticeSchema>>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      notice: oldNoticeText ?? '',
      color: oldNoticeColor ?? '#ffffff',
    },
  })

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({
        notice: oldNoticeText ?? '',
        color: oldNoticeColor ?? '#ffffff',
      })
    }
  }, [isDialogOpen, form, isEdit])

  const handleCreateOrUpdateNotice = async (
    values: z.infer<typeof noticeSchema>,
  ) => {
    const { color, notice } = values
    setIsSubmitting(true)

    if (isEdit) {
      await updateNotice(oldNoticeId!, notice, color)
    } else {
      await createNotice(notice, color, hosId, authuserId!)
    }

    toast({
      title: isEdit ? '공지사항을 수정하였습니다' : '공지사항을 추가하였습니다',
    })
    setIsDialogOpen(false)
    setIsSubmitting(false)
    window.location.reload()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <div className="absolute inset-0 cursor-pointer" />
        ) : (
          <Button
            variant={'default'}
            size="icon"
            className="absolute -top-11 right-0 h-6 w-6 rounded-full"
          >
            <Plus size={14} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? '공지사항 수정' : '공지사항 추가'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? '공지사항을 수정해주세요'
              : '새로운 공지사항을 추가해주세요'}{' '}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateOrUpdateNotice)}
            className="grid grid-cols-5 gap-2"
          >
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="cols-span-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? '#ffffff'}
                    name="color"
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'h-8 text-sm',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {NOTICE_COLORS.map((color) => (
                        <SelectItem
                          value={color}
                          key={color}
                          className="w-full"
                        >
                          <div
                            style={{ backgroundColor: color }}
                            className="h-4 w-4 rounded-full border"
                          />
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
              name="notice"
              render={({ field }) => (
                <FormItem className="col-span-4">
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

            <div className="col-span-5 mt-2 flex justify-between">
              <div>
                {isEdit ? (
                  <DeleteNoticeButton
                    noticeId={oldNoticeId!}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                ) : (
                  <></>
                )}
              </div>

              <div>
                <Button
                  type="button"
                  variant="outline"
                  tabIndex={-1}
                  onClick={() => setIsDialogOpen(false)}
                >
                  취소
                </Button>
                <Button type="submit" className="ml-2" disabled={isSubmitting}>
                  {isEdit ? '수정' : '등록'}
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
