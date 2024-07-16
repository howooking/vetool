'use server'

import type { TxLocalState } from '@/lib/store/icu/upsert-tx'
import { createClient } from '@/lib/supabase/server'
import type { TxLog } from '@/types/icu'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const upsertIcuChartTxAndUpdateIcuChartOrder = async (
  txLocalState?: TxLocalState,
  updatedLogs?: TxLog[],
) => {
  const { data: returningData, error: upsertIcuChartTxError } = await supabase
    .from('icu_chart_tx')
    .upsert({
      icu_chart_tx_id: txLocalState?.txId,
      icu_io_id: txLocalState?.icuIoId,
      icu_chart_order_id: txLocalState?.icuChartOrderId,
      icu_chart_tx_comment: txLocalState?.txComment,
      icu_chart_tx_result: txLocalState?.txResult,
      icu_chart_tx_images: txLocalState?.txImages,
      icu_chart_tx_log: updatedLogs,
      user_id: txLocalState?.txUserId,
    })
    .select('icu_chart_tx_id')
    .single()

  if (upsertIcuChartTxError) {
    console.log(upsertIcuChartTxError)
    redirect(`/error?message=${upsertIcuChartTxError.message}`)
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

  const { error: updateIcuChartOrder } = await supabase
    .from('icu_chart_order')
    .update({ [filedName]: null })
    .match({ icu_chart_order_id: icuChartOrderId })

  if (updateIcuChartOrder) {
    console.log(updateIcuChartOrder)
    redirect(`/error?message=${updateIcuChartOrder.message}`)
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
