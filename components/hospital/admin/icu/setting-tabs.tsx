'use client'

import ChangeMemoName from '@/components/hospital/admin/icu/memo/change-memo-name'
import ChangeHosOrder from '@/components/hospital/admin/icu/order/change-hos-order'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { HospitalIcuOrder } from '@/types/icu'

export default function SettingTabs({
  memoNames,
  hospitalOrder,
}: {
  memoNames: string[]
  hospitalOrder: HospitalIcuOrder
}) {
  return (
    <Tabs defaultValue="order">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="order">차트 오더 설정</TabsTrigger>
        <TabsTrigger value="memo">메모 이름 설정</TabsTrigger>
      </TabsList>

      <TabsContent value="order">
        <ChangeHosOrder hospitalOrder={hospitalOrder} />
      </TabsContent>

      <TabsContent value="memo">
        <ChangeMemoName memoNames={memoNames} />
      </TabsContent>
    </Tabs>
  )
}
