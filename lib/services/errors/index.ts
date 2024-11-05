import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getErrorLogs = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('vetool_errors')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data ?? []
}
