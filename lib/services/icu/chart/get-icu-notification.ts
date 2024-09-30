'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuNotificationJoined } from '@/types/icu'
import { redirect } from 'next/navigation'

export const getIcuNotification = async (hosId: string, page: number = 1) => {
  const supabase = createClient()

  const itemsPerPage = 10
  const startRange = (page - 1) * itemsPerPage
  const endRange = startRange + itemsPerPage - 1

  const { data, error } = await supabase
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

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}
