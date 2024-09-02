import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { COLORS } from '@/constants/common/colors'
import { CalendarSearch } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

export default function SearchIoSheet({
  searchOptions,
  setSearchOptions,
}: {
  searchOptions: {
    timeRange: string
    order: string
  }
  setSearchOptions: Dispatch<
    SetStateAction<{
      timeRange: string
      order: string
    }>
  >
}) {
  const { timeRange, order } = searchOptions

  const [tempTimeRange, setTempTimeRange] = useState(timeRange)
  const [tempOrder, setTempOrder] = useState(order)

  const handleOkButtonClick = () => {
    setSearchOptions({ timeRange: tempTimeRange, order: tempOrder })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <CalendarSearch
          className="absolute right-9 top-2 cursor-pointer"
          size={18}
          color={COLORS.primary}
        />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>검색 필터 설정</SheetTitle>
          <SheetDescription>
            기본 값은 최근 1개월 및 최신순 정렬입니다
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              조회기간
            </Label>
            <Select defaultValue={timeRange} onValueChange={setTempTimeRange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">1개월</SelectItem>
                  <SelectItem value="2">2개월</SelectItem>
                  <SelectItem value="3">3개월</SelectItem>
                  <SelectItem value="6">6개월</SelectItem>
                  <SelectItem value="12">1년</SelectItem>
                  <SelectItem value="all">전체</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-left">
              정렬
            </Label>

            <Select defaultValue={order} onValueChange={setTempOrder}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="desc">최신순</SelectItem>
                  <SelectItem value="asc">과거순</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" onClick={handleOkButtonClick}>
              확인
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
