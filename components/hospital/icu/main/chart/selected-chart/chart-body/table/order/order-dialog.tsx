'use client'

import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import OrderForm from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-form'
import OrdererSelectStep from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/orderer/orderer-select-step'
import ConfirmCopyTemplateOrderDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/template/confirm-copy-template-order-dialog'
import { templateOrderColumns } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/template/template-order-columns'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getTemplateCharts } from '@/lib/services/icu/template/template'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { useTemplateStore } from '@/lib/store/icu/template'
import type { Patient, SelectedIcuOrder } from '@/types/icu/chart'
import { TemplateChart } from '@/types/icu/template'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

export default function OrderDialog({
  icuChartId,
  orders,
  showOrderer,
  patient,
  weight,
  ageInDays,
  orderStep,
  isEditOrderMode,
  setOrderStep,
  reset,
  isExport,
  setSortedOrders,
  mainVetName,
}: {
  icuChartId: string
  orders: SelectedIcuOrder[]
  showOrderer: boolean
  patient: Patient
  weight: string
  ageInDays: number
  orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit'
  isEditOrderMode?: boolean
  setOrderStep: (
    orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit',
  ) => void
  reset: () => void
  isExport?: boolean
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  mainVetName: string
}) {
  const { isPreviewDialogOpen } = usePreviewDialogStore()
  const { isTemplateDialogOpen } = useTemplateStore()
  const { hos_id } = useParams()

  const [templateCharts, setTemplateCharts] = useState<TemplateChart[]>([])
  const [tab, setTab] = useState('default')

  const handleTabValueChange = (value: string) => {
    if (value === 'default') {
      setTab('default')
      return
    }

    if (value === 'template') {
      setTab('template')
      return
    }
  }

  const handleOpenChange = useCallback(() => {
    if (orderStep === 'closed') {
      setOrderStep('upsert')
    } else {
      setOrderStep('closed')
    }
    reset()
  }, [orderStep, setOrderStep, reset])

  useEffect(() => {
    setTab('default')
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'o') {
        event.preventDefault()
        handleOpenChange()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleOpenChange])

  useEffect(() => {
    if (tab === 'template' && templateCharts.length === 0) {
      const fetchTemplateData = async () => {
        const templateChartData = await getTemplateCharts(hos_id as string)

        setTemplateCharts(templateChartData)
      }

      fetchTemplateData()
    }
  }, [tab, templateCharts.length, hos_id])

  return (
    <Dialog open={orderStep !== 'closed'} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpenChange}
          className="shrink-0"
        >
          <Plus size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          {orderStep === 'upsert' && (
            <DialogTitle>오더 {isEditOrderMode ? '수정' : '추가'}</DialogTitle>
          )}
          {orderStep === 'multipleEdit' && (
            <DialogTitle>오더 복사 / 오더 삭제</DialogTitle>
          )}
          {orderStep === 'selectOrderer' && (
            <DialogTitle>수의사 선택</DialogTitle>
          )}
          <DialogDescription />
        </DialogHeader>

        {orderStep === 'upsert' && (
          <Tabs
            defaultValue="default"
            value={tab}
            onValueChange={handleTabValueChange}
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="default">직접 입력</TabsTrigger>
              <TabsTrigger value="template">템플릿 오더 추가</TabsTrigger>
            </TabsList>

            {/* 오더 직접 추가 (기본값) */}
            <TabsContent value="default">
              {!isExport && (
                <OrderForm
                  showOrderer={showOrderer}
                  icuChartId={icuChartId}
                  species={patient.species}
                  weight={weight}
                  ageInDays={ageInDays}
                  setSortedOrders={setSortedOrders}
                />
              )}
            </TabsContent>

            {/* 템플릿 오더 추가 */}
            <TabsContent value="template">
              <DataTable
                columns={templateOrderColumns}
                data={templateCharts || []}
                searchPlaceHolder="템플릿 이름, 설명, 환자명으로 검색"
              />

              {isTemplateDialogOpen && (
                <ConfirmCopyTemplateOrderDialog icuChartId={icuChartId} />
              )}
              {isPreviewDialogOpen && <PreviewDialog />}
            </TabsContent>
          </Tabs>
        )}
        {orderStep === 'selectOrderer' && (
          <OrdererSelectStep
            icuChartId={icuChartId}
            orders={orders}
            mainVetName={mainVetName}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
