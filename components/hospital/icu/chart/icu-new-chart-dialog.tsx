import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_NAME } from '@/constants/hospital/icu/chart'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import type { IcuChartJoined } from '@/types/hospital'
import { format, parseISO, subDays } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function IcuNewChartDialog({
  selectedPatientChartData,
}: {
  selectedPatientChartData?: IcuChartJoined
}) {
  const supabase = createClient()
  const { refresh } = useRouter()
  const { selectedDate } = useIcuSelectedDateStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isNewChartDialogOpen, setIsNewChartDialogOpen] = useState(false)
  const [isLoadPrevChartDialogOpen, setIsLoadPrevChartDialogOpen] =
    useState(false)

  // 새로운 차트 생성 Dialog OK Handler
  const handleNewChartDialogClick = async () => {
    setIsSubmitting(true)

    const { data: icuChartData, error: icuChartError } = await supabase
      .from('icu_chart')
      .insert({
        icu_io_id: selectedPatientChartData?.icu_io_id.icu_io_id,
        hos_id: selectedPatientChartData?.hos_id.hos_id,
        main_vet: selectedPatientChartData?.main_vet.user_id,
        sub_vet: selectedPatientChartData?.sub_vet.user_id,
        weight: selectedPatientChartData?.weight,
        weight_measured_date: selectedPatientChartData?.weight_measured_date,
        target_date: selectedDate,
        patient_id: selectedPatientChartData?.patient_id.patient_id,
      })
      .select('icu_chart_id')
      .single()

    if (icuChartError) {
      console.log(icuChartError)
      throw new Error(icuChartError.message)
    }

    // icu_chart_order default values INSERT
    DEFAULT_ICU_ORDER_NAME.forEach(async (element) => {
      const { error: icuChartTxError } = await supabase
        .from('icu_chart_order')
        .insert({
          icu_chart_order_type: element.dataType,
          icu_chart_id: icuChartData?.icu_chart_id,
          icu_io_id: selectedPatientChartData?.icu_io_id.icu_io_id,
          icu_chart_order_name: element.orderName,
          icu_chart_order_comment: element.orderComment,
          target_date: selectedDate,
        })

      if (icuChartTxError) {
        toast({
          variant: 'destructive',
          title: icuChartTxError.message,
        })
        return
      }
    })

    setIsNewChartDialogOpen(false)
    setIsSubmitting(false)
    refresh()
  }

  // 전일 차트 불러오기 Dialog OK Handler
  const handleLoadPrevChartDialogClick = async () => {
    const prevDate = format(subDays(parseISO(selectedDate), 1), 'yyyy-MM-dd')
    setIsSubmitting(true)

    const { data: icuPrevChartData, error: icuSelectChartError } =
      await supabase.from('icu_chart').select('*').match({
        target_date: prevDate,
        patient_id: selectedPatientChartData?.patient_id.patient_id,
      })

    if (icuSelectChartError) {
      console.log(icuSelectChartError)
      throw new Error(icuSelectChartError.message)
    }

    // 전일 차트가 존재한다면, 전일 차트를 덮어씀
    if (icuPrevChartData.length) {
      const { data: coveredPrevChartData, error: coverdPrevChartError } =
        await supabase
          .from('icu_chart')
          .insert({
            icu_io_id: icuPrevChartData[0]?.icu_io_id,
            hos_id: icuPrevChartData[0]?.hos_id,
            main_vet: icuPrevChartData[0]?.main_vet,
            sub_vet: icuPrevChartData[0]?.sub_vet,
            weight: icuPrevChartData[0]?.weight,
            weight_measured_date: icuPrevChartData[0]?.weight_measured_date,
            target_date: selectedDate,
            patient_id: icuPrevChartData[0]?.patient_id,
            caution: icuPrevChartData[0]?.caution,
          })
          .select('icu_chart_id')
          .single()

      if (coverdPrevChartError) {
        console.log(coverdPrevChartError)
        throw new Error(coverdPrevChartError.message)
      }

      const { data: coveredPrevOrderData, error: coveredPrevOrderError } =
        await supabase.from('icu_chart_order').select('*').match({
          target_data: prevDate,
          icu_chart_id: coveredPrevChartData?.icu_chart_id,
        })

      if (coveredPrevOrderError) {
        console.log(coveredPrevOrderError)
        throw new Error(coveredPrevOrderError.message)
      }

      // icu_chart_order prev date values INSERT
      coveredPrevOrderData?.forEach(async (element) => {
        const { error: icuChartTxError } = await supabase
          .from('icu_chart_order')
          .insert({
            icu_chart_order_type: element.icu_chart_order_type,
            icu_chart_id: coveredPrevChartData?.icu_chart_id,
            icu_io_id: selectedPatientChartData?.icu_io_id.icu_io_id,
            icu_chart_order_name: element.icu_chart_order_name,
            icu_chart_order_comment: element.icu_chart_order_comment,
            target_date: selectedDate,
          })

        if (icuChartTxError) {
          toast({
            variant: 'destructive',
            title: icuChartTxError.message,
          })
          return
        }
      })
    }
    // 전일 차트가 존재하지 않는다면, 새로운 차트를 추가
    else {
      toast({
        title: '전일 차트가 존재하지 않아 새로운 차트를 추가합니다',
      })

      const { data: icuChartData, error: icuChartError } = await supabase
        .from('icu_chart')
        .insert({
          icu_io_id: selectedPatientChartData?.icu_io_id.icu_io_id,
          hos_id: selectedPatientChartData?.hos_id.hos_id,
          main_vet: selectedPatientChartData?.main_vet.user_id,
          sub_vet: selectedPatientChartData?.sub_vet.user_id,
          weight: selectedPatientChartData?.weight,
          weight_measured_date: selectedPatientChartData?.weight_measured_date,
          target_date: selectedDate,
          patient_id: selectedPatientChartData?.patient_id.patient_id,
        })
        .select('icu_chart_id')
        .single()

      if (icuChartError) {
        console.log(icuChartError)
        throw new Error(icuChartError.message)
      }

      // icu_chart_order default date values INSERT
      DEFAULT_ICU_ORDER_NAME.forEach(async (element) => {
        const { error: icuChartTxError } = await supabase
          .from('icu_chart_order')
          .insert({
            icu_chart_order_type: element.dataType,
            icu_chart_id: icuChartData?.icu_chart_id,
            icu_io_id: selectedPatientChartData?.icu_io_id.icu_io_id,
            icu_chart_order_name: element.orderName,
            icu_chart_order_comment: element.orderComment,
            target_date: selectedDate,
          })

        if (icuChartTxError) {
          toast({
            variant: 'destructive',
            title: icuChartTxError.message,
          })
          return
        }
      })
    }

    setIsLoadPrevChartDialogOpen(false)
    setIsSubmitting(false)
    refresh()
  }

  return (
    <>
      {/* 새로운 차트 생성 Dialog */}
      <Dialog
        open={isNewChartDialogOpen}
        onOpenChange={setIsNewChartDialogOpen}
      >
        <DialogTrigger asChild>
          <Button variant="outline">새로운 차트 생성하기</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>새로운 차트 생성</DialogTitle>
            <DialogDescription>
              {selectedDate} 날짜로 차트가 생성됩니다
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                취소
              </Button>
            </DialogClose>
            <Button onClick={handleNewChartDialogClick} disabled={isSubmitting}>
              생성
              <LoaderCircle
                className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
              />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 전일 차트 불러오기 Dialog */}
      <Dialog
        open={isLoadPrevChartDialogOpen}
        onOpenChange={setIsLoadPrevChartDialogOpen}
      >
        <DialogTrigger asChild>
          <Button variant="outline">전일 차트 불러오기</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>전일 차트 불러오기</DialogTitle>
            <DialogDescription>
              {selectedDate} 날짜로 차트가 생성됩니다
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                취소
              </Button>
            </DialogClose>
            <Button
              onClick={handleLoadPrevChartDialogClick}
              disabled={isSubmitting}
            >
              불러오기
              <LoaderCircle
                className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
              />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
