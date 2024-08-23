import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { IcuChartOrder } from '@/types'
import { IcuNotificationRouteJoined } from '@/types/icu'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  const targetDate = formatDate(new Date())
  const targetHour = String(new Date().getHours())

  const { data, error } = await supabase
    .from('icu_chart_order')
    .select(
      `
       *,
       icu_chart_id!inner(icu_chart_id, patient_id, target_date)
      `,
    )
    .match({ 'icu_chart_id.target_date': targetDate })
    .returns<IcuNotificationRouteJoined[]>()

  if (error) {
    console.log(error)
    redirect(`/error?message=${error.message}`)
  }

  const notificationData = data.filter(
    (chartOrder) =>
      chartOrder.icu_chart_order_time[Number(targetHour) - 1] !== '0' &&
      chartOrder[`icu_chart_order_tx_${targetHour}` as keyof IcuChartOrder] ===
        null,
  )

  if (notificationData && notificationData.length) {
    notificationData.forEach(async (chartOrder) => {
      const { error: notificationError } = await supabase
        .from('icu_notification')
        .upsert({
          hos_id: chartOrder.hos_id,
          patient_id: chartOrder.icu_chart_id.patient_id,
          icu_chart_id: chartOrder.icu_chart_id.icu_chart_id,
          notification_title: chartOrder.icu_chart_order_name ?? 'title',
          notification_content: chartOrder.icu_chart_order_comment,
          target_date: targetDate,
        })

      if (notificationError) {
        console.log(notificationError)
        redirect(`/error?message=${notificationError.message}`)
      }
    })
  }

  return NextResponse.json(notificationData)
}
