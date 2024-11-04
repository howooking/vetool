import { createClient } from '@/lib/supabase/server'

export const getHosName = async (hosId: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hospitals')
    .select('name')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.name ?? '벳툴'
}
