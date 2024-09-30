'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuNotificationJoined } from '@/types/icu'
import { redirect } from 'next/navigation'

export const getIcuNotification = async (hosId: string, page: number = 1) => {
  const supabase = createClient()

  const itemsPerPage = 10
  const startRange = (page - 1) * itemsPerPage
  const endRange = startRange + itemsPerPage - 1

  const { data: notificationData, error: notificationDataError } =
    await supabase
      .from('icu_notification')
      .select(
        `
          *,
          patient_id(name, breed, patient_id, gender)
        `,
      )
      .match({ hos_id: hosId })
      .order('created_at', { ascending: false })
      .range(startRange, endRange)
      .returns<IcuNotificationJoined[]>()

  if (notificationDataError) {
    console.log(notificationDataError)
    redirect(`/error?message=${notificationDataError.message}`)
  }

  return notificationData
}
