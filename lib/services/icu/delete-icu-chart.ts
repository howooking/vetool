'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const deleteOrders = async (icuChartId: string) => {
  const supabase = createClient()

  const { error: deleteChartError } = await supabase
    .from('icu_orders')
    .delete()
    .match({
      icu_chart_id: icuChartId,
    })

  if (deleteChartError) {
    console.log(deleteChartError)
    redirect(`/error/?message=${deleteChartError.message}`)
  }
}

export const deleteChart = async (icuChartId: string) => {
  const supabase = createClient()

  const { error: deleteChartError } = await supabase
    .from('icu_charts')
    .delete()
    .match({
      icu_chart_id: icuChartId,
    })

  if (deleteChartError) {
    console.log(deleteChartError)
    redirect(`/error/?message=${deleteChartError.message}`)
  }
}

export const deleteAllCharts = async (icuIoId: string) => {
  const supabase = createClient()

  const { error: deleteAllChartError } = await supabase
    .from('icu_io')
    .delete()
    .match({ icu_io_id: icuIoId })

  if (deleteAllChartError) {
    console.log(deleteAllChartError)
    redirect(`/error/?message=${deleteAllChartError.message}`)
  }
}
