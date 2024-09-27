'use server'

import { TxLocalState } from '@/lib/store/icu/tx-mutation'
import { createClient } from '@/lib/supabase/server'
import type { TxLog } from '@/types/icu'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const upsertIcuTx = async (
  txLocalState: TxLocalState,
  updatedLogs?: TxLog[],
) => {
  const { error } = await supabase.from('icu_txs').upsert({
    icu_chart_tx_id: txLocalState?.txId,
    icu_chart_order_id: txLocalState?.icuChartOrderId,
    icu_chart_tx_comment: txLocalState?.txComment,
    icu_chart_tx_result: txLocalState?.txResult,
    icu_chart_tx_log: updatedLogs,
    time: txLocalState?.time!,
  })

  if (error) {
    console.log(error)
    redirect(`/error?message=${error.message}`)
  }

  // if (txLocalState?.isNotificationChecked) {
  //   const { error: notificationError } = await supabase
  //     .from('icu_notification')
  //     .insert({
  //       hos_id: hosId,
  //       patient_id: patientId,
  //       icu_chart_id: chartId,
  //       notification_title: txLocalState.orderName!,
  //       notification_content: `${txLocalState?.txResult!} / ${txLocalState?.txComment}`,
  //       notification_time: txLocalState.time!,
  //       target_date: targetDate,
  //     })

  //   if (notificationError) {
  //     console.log(notificationError)
  //     redirect(`/error?message=${notificationError.message}`)
  //   }
  // }
}

export const deleteIcuChartTx = async (icuChartTxId: string) => {
  const { error } = await supabase
    .from('icu_txs')
    .delete()
    .match({ icu_chart_tx_id: icuChartTxId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const uploadTxImage = async (icuChartTxId: string, image: File) => {
  const { error: deleteIcuChartTxError } = await supabase.storage
    .from('tx_images')
    .upload(`${icuChartTxId}/${image.name}`, image)
  if (deleteIcuChartTxError) {
    console.log(deleteIcuChartTxError)
    redirect(`/error?message=${deleteIcuChartTxError.message}`)
  }
}
