'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const getIcuNotification = async (hosId: string, page: number = 1) => {
  const itemsPerPage = 10
  const startRange = (page - 1) * itemsPerPage
  const endRange = startRange + itemsPerPage - 1

  const { data: notificationData, error: notificationDataError } =
    await supabase
      .from('icu_notification')
      .select('*')
      .match({ hos_id: hosId })
      .order('created_at', { ascending: false })
      .range(startRange, endRange)

  if (notificationDataError) {
    console.log(notificationDataError)
    redirect(`/error?message=${notificationDataError.message}`)
  }

  return notificationData
}
