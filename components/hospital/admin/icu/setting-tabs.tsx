'use client'

import ChangeMemoName from '@/components/hospital/admin/icu/memo/change-memo-name'
import ChangeDefaultOrders from '@/components/hospital/admin/icu/order/change-default-orders'
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
    <Tabs defaultValue="defaultOrder">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="defaultOrder">기본차트 설정</TabsTrigger>
        <TabsTrigger value="memo">메모이름 설정</TabsTrigger>
      </TabsList>

      <TabsContent value="defaultOrder">
        <ChangeDefaultOrders hospitalOrder={hospitalOrder} />
      </TabsContent>

      <TabsContent value="memo">
        <ChangeMemoName memoNames={memoNames} />
      </TabsContent>
    </Tabs>
  )
}
