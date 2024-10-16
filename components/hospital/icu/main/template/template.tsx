'use client'

import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import AddTemplateOrdersSetting from '@/components/hospital/icu/main/template/add/add-template-orders-setting'
import { templateColumns } from '@/components/hospital/icu/main/template/table/template-columns'
import DataTable from '@/components/ui/data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import type { TemplateChart } from '@/types/icu/template'

export default function Template({
  templateCharts,
}: {
  templateCharts: TemplateChart[]
}) {
  const { isPreviewDialogOpen } = usePreviewDialogStore()

  return (
    <Tabs defaultValue="search" className="p-2">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="search">템플릿 검색</TabsTrigger>
        <TabsTrigger value="add">템플릿 추가</TabsTrigger>
      </TabsList>

      <TabsContent value="search">
        <DataTable
          columns={templateColumns}
          data={templateCharts || []}
          searchPlaceHolder="템플릿 이름, 설명, 환자명으로 검색"
        />
      </TabsContent>

      <TabsContent value="add">
        <AddTemplateOrdersSetting />
      </TabsContent>

      <div className="p-2">{isPreviewDialogOpen && <PreviewDialog />}</div>
    </Tabs>
  )
}
