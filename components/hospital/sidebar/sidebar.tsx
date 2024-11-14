import { SIDE_BAR_ITEMS } from '@/constants/hospital/sidebar-items'
import { isSuperAccount } from '@/lib/services/auth/authorization'
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
  const isSuper = await isSuperAccount()
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-14 border-r bg-white md:block">
      <ul>
        {SIDE_BAR_ITEMS.map((item) => (
          <SidebarItem
            name={item.name}
            path={item.path}
            iconName={item.iconName}
            key={item.name}
            isReady={item.isReady}
            isSuper={isSuper}
          />
        ))}
      </ul>

      <SidebarUserInfo hosId={hosId} userData={userData} />
    </aside>
  )
}
