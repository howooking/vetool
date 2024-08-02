'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  deleteBookmarkChart,
  upsertBookmarkChart,
} from '@/lib/services/icu/bookmark'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { cn } from '@/lib/utils'
import { IcuChartBookmark } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { bookmarkFormSchema } from './schema'

export default function BookmarkDialog({
  icuChartId,
  bookmarkData,
}: {
  icuChartId: string
  bookmarkData: Pick<
    IcuChartBookmark,
    'bookmark_id' | 'bookmark_name' | 'bookmark_comment'
  > | null
}) {
  const { hos_id } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { selectedPatient } = useIcuSelectedPatientStore()

  const form = useForm<z.infer<typeof bookmarkFormSchema>>({
    resolver: zodResolver(bookmarkFormSchema),
    defaultValues: {
      bookmark_name: bookmarkData?.bookmark_name ?? undefined,
      bookmark_comment: bookmarkData?.bookmark_comment ?? undefined,
    },
  })

  const handleSubmit = async (values: z.infer<typeof bookmarkFormSchema>) => {
    setIsSubmitting(true)

    await upsertBookmarkChart(
      values.bookmark_name,
      values.bookmark_comment ?? '',
      icuChartId,
      hos_id as string,
    )

    toast({
      title: '즐겨찾기가 추가되었습니다',
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    await deleteBookmarkChart(bookmarkData?.bookmark_id!)

    toast({
      title: '즐겨찾기가 삭제되었습니다',
    })

    setIsDeleting(false)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({
        bookmark_name: bookmarkData?.bookmark_name || undefined,
        bookmark_comment: bookmarkData?.bookmark_comment || undefined,
      })
    }
  }, [
    selectedPatient,
    form,
    bookmarkData?.bookmark_comment,
    bookmarkData?.bookmark_name,
    isDialogOpen,
  ])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Star
          className={cn(
            'text-amber-300',
            bookmarkData?.bookmark_id!! && 'fill-amber-300',
          )}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>차트 즐겨찾기</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="bookmark_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>즐겨찾기 이름*</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      placeholder="즐겨찾기 이름을 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bookmark_comment"
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

            <DialogFooter>
              {bookmarkData?.bookmark_id!! && (
                <Button
                  type="button"
                  className="mr-auto"
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={handleDelete}
                >
                  삭제
                  <LoaderCircle
                    className={cn(isDeleting ? 'ml-2 animate-spin' : 'hidden')}
                  />
                </Button>
              )}
              <DialogClose asChild>
                <Button type="button" variant="outline" tabIndex={-1}>
                  닫기
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                저장
                <LoaderCircle
                  className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
