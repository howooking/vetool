'use client'

import ChangeMemoName from '@/components/hospital/admin/icu/change-memo-name'
import SettingOrder from '@/components/hospital/admin/icu/setting-order'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SettingTabs({ memoNames }: { memoNames: string[] }) {
  return (
    <Tabs defaultValue="order">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="order">차트 오더 설정</TabsTrigger>
        <TabsTrigger value="memo">메모 이름 설정</TabsTrigger>
      </TabsList>

      <TabsContent value="order">
        <SettingOrder />
      </TabsContent>

      <TabsContent value="memo">
        <ChangeMemoName memoNames={memoNames} />
      </TabsContent>
    </Tabs>
  )
}
