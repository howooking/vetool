import { SIDE_BAR_ITEMS } from '@/constants/hospital/sidebar-items'
import type { UserProfile } from '@/types'
import SidebarItem from './sidebar-item'
import SidebarUserInfo from './sidebar-user-info'

export default async function Sidebar({
  hosId,
  userData,
}: {
  hosId: string
  userData: UserProfile
}) {
  return (
    <aside className="hidden h-screen w-14 flex-col border-r md:flex">
      <ul className="z-50">
        {SIDE_BAR_ITEMS.map((item) => (
          <SidebarItem
            name={item.name}
            path={item.path}
            iconName={item.iconName}
            key={item.name}
            isReady={item.isReady}
          />
        ))}
      </ul>

      <SidebarUserInfo hosId={hosId} userData={userData} />
    </aside>
  )
}
