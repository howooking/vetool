import { Button } from '@/components/ui/button'
import { Bell, Search, Settings } from 'lucide-react'
import { Suspense } from 'react'
import HeaderTitle from './header-title'
import IcuHeader from '@/components/hospital/icu/header/icu-header'
import UserInfo from './user-info'
import { UserInfoSkeleton } from './user-info-skeleton'

export default async function HospitalHeader({ hosId }: { hosId: string }) {
  return (
    <header className="flex h-12 items-center justify-between gap-4 border-b px-2">
      <div className="flex items-center gap-4">
        <HeaderTitle />
        <IcuHeader />
      </div>

      <div className="flex items-center gap-4">
        <Suspense fallback={<UserInfoSkeleton />}>
          <UserInfo hosId={hosId} />
        </Suspense>
        <ul className="flex gap-2">
          <li>
            <Button size="icon" variant="secondary">
              <Search size={16} />
            </Button>
          </li>
          <li>
            <Button size="icon" variant="secondary">
              <Bell size={16} />
            </Button>
          </li>
          <li>
            <Button size="icon" variant="secondary">
              <Settings size={16} />
            </Button>
          </li>
        </ul>
      </div>
    </header>
  )
}
