'use client'

import { ConfirmCopyDialog } from '@/components/hospital/icu/common-dialogs/confirm-copy-dialog'
import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import { pasteTemplateColumns } from '@/components/hospital/icu/main/chart/add-chart-dialogs/template/paste-template-columns'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { usePreviewDialogStore } from '@/lib/store/icu/preview-dialog'
import { useTemplateStore } from '@/lib/store/icu/template'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Star } from 'lucide-react'

export default function AddTemplateChartDialog() {
  const { isPreviewDialogOpen } = usePreviewDialogStore()
  const { isTemplateDialogOpen, setIsTemplateDialogOpen } = useTemplateStore()
  const { isConfirmCopyDialogOpen } = useCopiedChartStore()
  const {
    basicHosData: { templateData },
  } = useBasicHosDataContext()

  const handleOpenTemplateDialog = async () => {
    setIsTemplateDialogOpen(!isTemplateDialogOpen)
  }

  return (
    <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
      <Button
        variant="outline"
        className="hidden h-[200px] w-full items-center justify-center gap-2 md:flex md:h-1/3 md:w-1/4"
        onClick={handleOpenTemplateDialog}
      >
        <Star size={20} />
        <span>템플릿 차트 선택</span>
      </Button>

      <DialogContent className="md:max-w-[1040px]">
        <DialogHeader>
          <DialogTitle>템플릿 차트 붙여넣기</DialogTitle>
          <DialogDescription>복사할 차트를 선택해주세요</DialogDescription>
        </DialogHeader>

        <DataTable
          columns={pasteTemplateColumns}
          data={templateData}
          rowLength={10}
          searchPlaceHolder="템플릿 이름 · 템플릿 설명 · 환자명 검색"
        />

        {isPreviewDialogOpen && <PreviewDialog />}
        {isConfirmCopyDialogOpen && (
          <ConfirmCopyDialog setTemplateDialogOpen={setIsTemplateDialogOpen} />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
