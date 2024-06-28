import HospitalHeader from '@/components/hospital/header/hospital-header'
import Sidebar from '@/components/hospital/sidebar/sidebar'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata({
  params,
}: {
  params: { hos_id: string }
}) {
  const supabase = createClient()
  const { data } = await supabase
    .from('hospitals')
    .select('name')
    .match({ hos_id: params.hos_id })
    .single()
  return {
    title: data?.name ?? '벳툴',
  }
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { hos_id: string }
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <HospitalHeader hosId={params.hos_id} />
        <main className="px-4 pt-4">{children}</main>
      </div>
    </div>
  )
}
