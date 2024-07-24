import { Suspense } from 'react'
import { UserInfoSkeleton } from '../header/user-info-skeleton'
import SidebarItem from './sidebar-item'
import SidebarUserInfo from './sidebar-user-info'

const SIDE_BAR_ITEMS = [
  {
    name: '병원 홈',
    path: '',
    iconName: 'Home',
  },
  {
    name: '입원차트',
    path: 'icu',
    iconName: 'Syringe',
  },
  {
    name: '외과차트',
    path: 'surgery',
    iconName: 'Slice',
  },
  {
    name: '심초차트',
    path: 'echocardio',
    iconName: 'HeartPulse',
  },
  {
    name: '건강검진차트',
    path: 'checkup',
    iconName: 'ListChecks',
  },
] as const

export default async function Sidebar({ hosId }: { hosId: string }) {
  return (
    <>
      <ul>
        {SIDE_BAR_ITEMS.map((item) => (
          <SidebarItem
            name={item.name}
            path={item.path}
            iconName={item.iconName}
            key={item.name}
          />
        ))}
      </ul>

      <Suspense fallback={<UserInfoSkeleton />}>
        <SidebarUserInfo hosId={hosId} />
      </Suspense>
    </>
  )
}
