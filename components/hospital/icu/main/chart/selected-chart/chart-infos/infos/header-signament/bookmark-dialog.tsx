'use client'

import { bookmarkFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/header-signament/schema'
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
import { COLORS } from '@/constants/common/colors'
import {
  deleteBookmarkChart,
  upsertBookmarkChart,
} from '@/lib/services/icu/bookmark'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { cn } from '@/lib/utils'
import { IcuChartBookmark } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bookmark, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  const { refresh } = useRouter()
  const { bookmark_name, bookmark_comment, bookmark_id } = bookmarkData ?? {}
  const [isBookmarked, setIsBookmarked] = useState(!!bookmark_id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { selectedPatient } = useIcuSelectedPatientStore()

  const form = useForm<z.infer<typeof bookmarkFormSchema>>({
    resolver: zodResolver(bookmarkFormSchema),
    defaultValues: {
      bookmark_name: bookmark_name || undefined,
      bookmark_comment: bookmark_comment || undefined,
    },
  })

  const handleSubmit = async (values: z.infer<typeof bookmarkFormSchema>) => {
    setIsSubmitting(true)

    await upsertBookmarkChart(
      values.bookmark_name,
      values.bookmark_comment ?? '',
      icuChartId,
    )

    toast({
      title: '해당 차트가 저장되었습니다',
    })

    setIsBookmarked(true)
    setIsSubmitting(false)
    setIsDialogOpen(false)
    refresh()
  }

  const handleDeleteButtonClick = async () => {
    setIsDeleting(true)

    if (bookmark_id) await deleteBookmarkChart(bookmark_id)

    setIsBookmarked(false)
    setIsDeleting(false)
    setIsDialogOpen(false)
    refresh()
  }

  useEffect(() => {
    setIsBookmarked(!!bookmark_id)

    form.reset({
      bookmark_name: bookmark_name || undefined,
      bookmark_comment: bookmark_comment || undefined,
    })
  }, [selectedPatient, bookmark_id, bookmark_name, bookmark_comment, form])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Bookmark
          color={isBookmarked ? COLORS.primary : undefined}
          fill={isBookmarked ? COLORS.primary : 'white'}
          className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-125"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>차트 즐겨찾기</DialogTitle>
          <DialogDescription>해당 차트를 저장합니다</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
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
                    <FormLabel>즐겨찾기 제목*</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ''}
                        placeholder="식별할 제목을 입력해주세요"
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
                    <FormLabel>즐겨찾기 설명</FormLabel>
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
                {isBookmarked && (
                  <Button
                    type="button"
                    className="mr-auto"
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={handleDeleteButtonClick}
                  >
                    즐겨찾기 해제
                  </Button>
                )}
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    닫기
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  저장
                  <LoaderCircle
                    className={cn(
                      isSubmitting ? 'ml-2 animate-spin' : 'hidden',
                    )}
                  />
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
