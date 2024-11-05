import { SuperPageTabs } from '@/components/hospital/super/super-page-tabs'
import { getHosList } from '@/lib/services/hospital-home/get-hos-name'

export default async function SuperPage() {
  const hosList = await getHosList()

  return (
    <div className="p-4">
      <SuperPageTabs hosList={hosList} />
    </div>
  )
}
