'use client'

import ChangeMemoName from '@/components/hospital/admin/icu/memo/change-memo-name'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { IcuChartBookmarkJoined } from '@/types/icu'
import BookmarkSetting from './bookmark/bookmark-setting'

export default function SettingTabs({
  memoNames,
  bookmarkCharts,
  // hospitalOrder,
}: {
  memoNames: string[]
  bookmarkCharts: IcuChartBookmarkJoined[]
  // hospitalOrder: HospitalIcuOrder
}) {
  return (
    <Tabs defaultValue="bookmark">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="bookmark">즐겨찾기</TabsTrigger>
        <TabsTrigger value="defaultOrder">기본차트</TabsTrigger>
        <TabsTrigger value="memo">메모이름</TabsTrigger>
      </TabsList>

      <TabsContent value="bookmark">
        <BookmarkSetting bookmarkCharts={bookmarkCharts} />
      </TabsContent>
      <TabsContent value="defaultOrder">
        {/* <ChangeDefaultOrders hospitalOrder={hospitalOrder} /> */}
      </TabsContent>
      <TabsContent value="memo">
        <ChangeMemoName memoNames={memoNames} />
      </TabsContent>
    </Tabs>
  )
}
