import HospitalHeader from '@/components/hospital/header/hospital-header'
import Sidebar from '@/components/hospital/sidebar/sidebar'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data } = await supabase
    .from('hospitals')
    .select('name')
    .match({ hos_id: params.id })
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
  params: { id: string }
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <HospitalHeader hosId={params.id} />
        <main className="p-2">{children}</main>
      </div>
    </div>
  )
}
