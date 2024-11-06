import { SuperPageTabs } from '@/components/hospital/super/super-page-tabs'
import { isSuperAccount } from '@/lib/services/auth/authorization'
import { getHosList } from '@/lib/services/hospital-home/get-hos-name'
import { redirect } from 'next/navigation'

export default async function SuperPage() {
  const isSuper = await isSuperAccount()

  if (!isSuper) {
    redirect('/')
  }

  const hosList = await getHosList()

  return <SuperPageTabs hosList={hosList} />
}
