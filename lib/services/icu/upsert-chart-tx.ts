'use server'

import { createClient } from '@/lib/supabase/server'
import type { TxState } from '@/types/icu'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const upsertIcuChartTx = async (
  txId: string,
  ioId: string,
  orderId: string,
  txState: TxState,
) => {
  const { data: icuChartTxData, error: icuChartTxError } = await supabase
    .from('icu_chart_tx')
    .upsert({
      icu_chart_tx_id: txId,
      icu_io_id: ioId,
      icu_chart_order_id: orderId,
      ...txState,
    })
    .select('icu_chart_tx_id')
    .single()

  if (icuChartTxError) {
    console.log(icuChartTxError)
    redirect(`/error?message=${icuChartTxError.message}`)
  }

  return icuChartTxData
}

export const updateIcuChartOrder = async (
  chartOrderId: string,
  fieldName: string,
  txId: string,
) => {
  const { error: icuChartOrderError } = await supabase
    .from('icu_chart_order')
    .update({ [fieldName]: txId })
    .match({ icu_chart_order_id: chartOrderId })

  if (icuChartOrderError) {
    console.log(icuChartOrderError)
    redirect(`/error?message=${icuChartOrderError.message}`)
  }
}
