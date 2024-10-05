'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuDefaultChartJoined } from '@/types/adimin'
import { redirect } from 'next/navigation'

export const getDefaultChartOrders = async (hosId: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('icu_default_chart')
    .select(
      `
        default_chart_id,
        default_chart_order_name,
        default_chart_order_comment,
        default_chart_order_type
      `,
    )
    .match({ hos_id: hosId })
    .returns<IcuDefaultChartJoined[]>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export const deleteDefaultChartOrder = async (defaultChartId: string) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_default_chart')
    .delete()
    .match({ default_chart_id: defaultChartId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const upsertDefaultChartOrder = async (
  hosId: string,
  defaultChartId: string | undefined,
  orderData: {
    default_chart_order_name: string
    default_chart_order_comment: string
    default_chart_order_type: string
  },
) => {
  const supabase = createClient()
  const {
    default_chart_order_name,
    default_chart_order_comment,
    default_chart_order_type,
  } = orderData

  const { error } = await supabase.from('icu_default_chart').upsert({
    hos_id: hosId,
    default_chart_id: defaultChartId,
    default_chart_order_name,
    default_chart_order_comment,
    default_chart_order_type,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
