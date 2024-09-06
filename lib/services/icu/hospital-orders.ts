'use server'

import { createClient } from '@/lib/supabase/server'
import { IcuOrderColors } from '@/types/adimin'
import { IcuDefaultChartJoined } from '@/types/icu'
import { redirect } from 'next/navigation'

export const getDefaultChartOrders = async (hosId: string) => {
  const supabase = createClient()

  const { data: hospitalOrders, error: hospitalOrdersError } = await supabase
    .from('icu_default_chart')
    .select(
      `
        default_chart_id,
        default_chart_order_name,
        default_chart_order_comment,
        default_chart_order_type,
        hos_id(order_color)
      `,
    )
    .match({ hos_id: hosId })
    .returns<IcuDefaultChartJoined[]>()

  if (hospitalOrdersError) {
    console.log(hospitalOrdersError)
    redirect(`/error?message=${hospitalOrdersError.message}`)
  }

  return hospitalOrders
}

export const deleteDefaultChartOrder = async (defaultChartId: string) => {
  const supabase = createClient()

  const { error: deleteDefaultChartOrderError } = await supabase
    .from('icu_default_chart')
    .delete()
    .match({ default_chart_id: defaultChartId })

  if (deleteDefaultChartOrderError) {
    console.log(deleteDefaultChartOrderError)
    redirect(`/error?message=${deleteDefaultChartOrderError.message}`)
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

  const { error: upsertOrderError } = await supabase
    .from('icu_default_chart')
    .upsert({
      hos_id: hosId,
      default_chart_id: defaultChartId,
      default_chart_order_name,
      default_chart_order_comment,
      default_chart_order_type,
    })

  if (upsertOrderError) {
    console.log(upsertOrderError)
    redirect(`/error?message=${upsertOrderError.message}`)
  }
}

export const updateOrderColor = async (
  hosId: string,
  orderTypeColorsInput: IcuOrderColors,
) => {
  const supabase = createClient()

  const { error: updateOrderColorError } = await supabase
    .from('hospitals')
    .update({ order_color: orderTypeColorsInput })
    .match({ hos_id: hosId })

  if (updateOrderColorError) {
    console.log(updateOrderColorError)
    redirect(`/error?message=${updateOrderColorError.message}`)
  }
}
