'use server'

import type { TxLocalState } from '@/lib/store/icu/tx-mutation'
import { createClient } from '@/lib/supabase/server'
import type { TxLog } from '@/types/icu'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const upsertIcuChartTxAndUpdateIcuChartOrder = async (
  hosId: string,
  patientId: string,
  chartId: string,
  targetDate: string,
  txLocalState?: TxLocalState,
  updatedLogs?: TxLog[],
) => {
  const { data: returningData, error: upsertIcuChartTxError } = await supabase
    .from('icu_chart_tx')
    .upsert({
      hos_id: hosId,
      icu_chart_tx_id: txLocalState?.txId,
      icu_io_id: txLocalState?.icuIoId,
      icu_chart_order_id: txLocalState?.icuChartOrderId,
      icu_chart_tx_comment: txLocalState?.txComment,
      icu_chart_tx_result: txLocalState?.txResult,
      icu_chart_tx_images: undefined,
      icu_chart_tx_log: updatedLogs,
    })
    .select('icu_chart_tx_id')
    .single()

  if (upsertIcuChartTxError) {
    console.log(upsertIcuChartTxError)
    redirect(`/error?message=${upsertIcuChartTxError.message}`)
  }

  if (txLocalState?.isNotificationChecked) {
    const { error: notificationError } = await supabase
      .from('icu_notification')
      .insert({
        hos_id: hosId!,
        patient_id: patientId,
        icu_chart_id: chartId,
        notification_title: txLocalState?.txResult!,
        notification_content: txLocalState?.txComment,
        target_date: targetDate,
      })

    if (notificationError) {
      console.log(notificationError)
      redirect(`/error?message=${notificationError.message}`)
    }
  }

  if (txLocalState?.txId) return

  // insert인 경우
  const filedName = `icu_chart_order_tx_${txLocalState?.time}`
  const { error: icuChartOrderError } = await supabase
    .from('icu_chart_order')
    .update({ [filedName]: returningData.icu_chart_tx_id })
    .match({ icu_chart_order_id: txLocalState?.icuChartOrderId })

  if (icuChartOrderError) {
    console.log(icuChartOrderError)
    redirect(`/error?message=${icuChartOrderError.message}`)
  }
}

export const deleteIcuChartTx = async (
  icuChartTxId: string,
  icuChartOrderId: string,
  time: number,
) => {
  const filedName = `icu_chart_order_tx_${time}`

  const { error: updateIcuChartOrderError } = await supabase
    .from('icu_chart_order')
    .update({ [filedName]: null })
    .match({ icu_chart_order_id: icuChartOrderId })

  if (updateIcuChartOrderError) {
    console.log(updateIcuChartOrderError)
    redirect(`/error?message=${updateIcuChartOrderError.message}`)
  }

  const { error: deleteIcuChartTxError } = await supabase
    .from('icu_chart_tx')
    .delete()
    .match({ icu_chart_tx_id: icuChartTxId })

  if (deleteIcuChartTxError) {
    console.log(deleteIcuChartTxError)
    redirect(`/error?message=${deleteIcuChartTxError.message}`)
  }
}
