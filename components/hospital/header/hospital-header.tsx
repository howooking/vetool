import IcuHeader from '@/components/hospital/icu/header/icu-header'
import { Button } from '@/components/ui/button'
import { Bell, Dog, Search } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import UserInfo from './user-info'
import { UserInfoSkeleton } from './user-info-skeleton'
import PatientsHeader from '../patients/patients-header'

export default async function HospitalHeader({ hosId }: { hosId: string }) {
  return (
    <header className="flex h-12 items-center justify-between gap-4 border-b px-2">
      {/* 굳이 있어야 하나 고민중 */}
      {/* <HeaderTitle /> */}
      <div>
        <IcuHeader />
        <PatientsHeader hosId={hosId} />
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
            <Button size="icon" variant="secondary" asChild>
              <Link href={`/hospital/${hosId}/patients`}>
                <Dog size={16} />
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  )
}
