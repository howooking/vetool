'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { updateSearchTags } from '@/lib/services/icu/update-icu-chart-infos'
import { cn } from '@/lib/utils'
import { DialogClose } from '@radix-ui/react-dialog'
import { LoaderCircle, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export default function SearchTag({
  searchTags,
  icuIoId,
}: {
  searchTags: string
  icuIoId: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [searchTagsList, setSearchTagsList] = useState<string[]>([])

  const parseSearchTags = useCallback(
    (tags: string) => tags.split(/[#,]/).filter((tag) => tag.trim() !== ''),
    [],
  )

  useEffect(() => {
    if (!isDialogOpen) setTagInput('')

    setSearchTagsList(parseSearchTags(searchTags))
  }, [isDialogOpen, parseSearchTags, searchTags])

  const handleUpdateSearchTags = async () => {
    setIsSubmitting(true)

    const updatedSearchTags = '#' + searchTagsList.join('#')

    await updateSearchTags(icuIoId, updatedSearchTags)

    toast({ title: '검색 태그를 변경하였습니다' })

    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setSearchTagsList((prevTags) => [...prevTags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleDeleteTag = (targetIndex: number) => {
    setSearchTagsList(
      searchTagsList.filter((_, index) => index !== targetIndex),
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative w-full justify-start">
          <div className="absolute left-2 text-xs text-muted-foreground">
            검색 태그
          </div>
          <ul className="ml-11 flex gap-1 overflow-hidden">
            {parseSearchTags(searchTags).map((tag, index) => (
              <li key={tag + index}>
                <Badge className="flex cursor-pointer gap-1">{tag}</Badge>
              </li>
            ))}
          </ul>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>검색 태그 설정</DialogTitle>
          <DialogDescription>
            Enter를 눌러 목록에 추가 후 수정을 눌러주세요
          </DialogDescription>
        </DialogHeader>

        <ul className="flex flex-wrap gap-1">
          {searchTagsList.map((tag, index) => (
            <li
              key={tag + index}
              onClick={() => handleDeleteTag(index)}
              className="cursor-pointer"
            >
              <Badge className="flex gap-1">
                {tag}
                <X size={14} />
              </Badge>
            </li>
          ))}
        </ul>
        <div className="relative grid gap-4 py-4">
          <Label
            className="absolute left-2 top-[26px] text-xs text-muted-foreground"
            htmlFor="searchTags"
          >
            검색 태그
          </Label>
          <Input
            disabled={isSubmitting}
            id="searchTags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyUp={handleAddTag}
            className="w-full pl-14"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
          <Button onClick={handleUpdateSearchTags} disabled={isSubmitting}>
            수정
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
