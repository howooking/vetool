import { createClient } from '@/lib/supabase/server'

export const getHosName = async (hosId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('hospitals')
    .select('name')
    .match({ hos_id: hosId })
    .single()

  return data?.name ?? '벳툴'
}
