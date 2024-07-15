'use server'

import type { TxLocalState } from '@/lib/store/icu/upsert-tx'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const upsertIcuChartTxAndUpdateIcuChartOrder = async (
  icuChartTxId?: string,
  icuIoId?: string,
  icuChartOrderId?: string,
  txLocalState?: TxLocalState,
  time?: number,
) => {
  const { data: returningData, error: upsertIcuChartTxError } = await supabase
    .from('icu_chart_tx')
    .upsert({
      icu_chart_tx_id: icuChartTxId,
      icu_io_id: icuIoId,
      icu_chart_order_id: icuChartOrderId,
      icu_chart_tx_comment: txLocalState?.txComment,
      icu_chart_tx_result: txLocalState?.txResult,
      icu_chart_tx_images: txLocalState?.txImages,
      icu_chart_tx_log: txLocalState?.txLog,
      user_id: txLocalState?.txUserId,
    })
    .select('icu_chart_tx_id')
    .single()

  if (upsertIcuChartTxError) {
    console.log(upsertIcuChartTxError)
    redirect(`/error?message=${upsertIcuChartTxError.message}`)
  }

  if (icuChartTxId) return

  // insert인 경우
  const filedName = `icu_chart_order_tx_${time}`
  const { error: icuChartOrderError } = await supabase
    .from('icu_chart_order')
    .update({ [filedName]: returningData.icu_chart_tx_id })
    .match({ icu_chart_order_id: icuChartOrderId })

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
