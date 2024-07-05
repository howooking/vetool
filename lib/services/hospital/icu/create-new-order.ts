import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export const deleteOrder = async (chartOrderId: string) => {
  const { error: deleteOrderError } = await supabase
    .from('icu_chart_order')
    .delete()
    .match({ icu_chart_order_id: chartOrderId })

  if (deleteOrderError) {
    console.log(deleteOrderError)
    throw new Error(deleteOrderError.message)
  }
}

export const upsertOrder = async (
  chartId: string,
  ioId: string,
  chartOrderId: string,
  orderTime: string[],
  order: Record<string, string | string[] | null | boolean>,
) => {
  const { error: upsertOrderrError } = await supabase
    .from('icu_chart_order')
    .upsert({
      icu_chart_order_id: chartOrderId,
      icu_chart_id: chartId,
      icu_io_id: ioId,
      icu_chart_order_time: orderTime,
      ...order,
    })

  if (upsertOrderrError) {
    console.log(upsertOrderrError)
    throw new Error(upsertOrderrError.message)
  }
}
