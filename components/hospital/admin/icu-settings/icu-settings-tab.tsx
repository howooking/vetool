import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Suspense } from 'react'
import MemoTabContent from './memo-name/memo-name-tab'
import DefaultOrdersTab from './default-orders/default-orders-tab'
import LargeLoaderCircle from '@/components/common/large-loader-circle'
import OrderColorTab from './order-color/order-color-tab'

export default function IcuSettingsTab({ hosId }: { hosId: string }) {
  return (
    <Tabs defaultValue="defaultOrder">
      <TabsList className="grid w-[360px] grid-cols-3">
        <TabsTrigger value="defaultOrder">기본차트</TabsTrigger>
        <TabsTrigger value="orderColor">오더색상</TabsTrigger>
        <TabsTrigger value="memo">메모이름</TabsTrigger>
      </TabsList>

      <TabsContent value="defaultOrder">
        <Suspense fallback={<LargeLoaderCircle className="h-96" />}>
          <DefaultOrdersTab hosId={hosId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="orderColor">
        <Suspense fallback={<LargeLoaderCircle className="h-96" />}>
          <OrderColorTab hosId={hosId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="memo">
        <Suspense fallback={<LargeLoaderCircle className="h-96" />}>
          <MemoTabContent hosId={hosId} />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}
