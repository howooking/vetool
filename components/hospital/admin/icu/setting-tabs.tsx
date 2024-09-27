'use client'

import ChangeMemoName from '@/components/hospital/admin/icu/memo/change-memo-name'
import ChangeDefaultOrder from '@/components/hospital/admin/icu/order/change-default-order'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { DrugProductsJoined, IcuDefaultChartJoined } from '@/types/icu'

export default function SettingTabs({
  memoNames,
  defaultChartOrders,
  drugs,
}: {
  memoNames: string[]
  defaultChartOrders: IcuDefaultChartJoined[]
  drugs: DrugProductsJoined[]
}) {
  return (
    <Tabs defaultValue="defaultOrder">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="defaultOrder">기본차트</TabsTrigger>
        <TabsTrigger value="memo">메모이름</TabsTrigger>
      </TabsList>

      <TabsContent value="defaultOrder">
        <ChangeDefaultOrder
          defaultChartOrders={defaultChartOrders}
          drugs={drugs}
        />
      </TabsContent>
      <TabsContent value="memo">
        <ChangeMemoName memoNames={memoNames} />
      </TabsContent>
    </Tabs>
  )
}
