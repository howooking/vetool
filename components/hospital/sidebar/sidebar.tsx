import { SIDE_BAR_ITEMS } from '@/constants/hospital/sidebar-items'
import SidebarItem from './sidebar-item'
import SidebarUserInfo from './sidebar-user-info'
import type { UserProfile } from '@/types'

export default async function Sidebar({
  hosId,
  userData,
}: {
  hosId: string
  userData: UserProfile
}) {
  return (
    <>
      <ul className="z-50">
        {SIDE_BAR_ITEMS.map((item) => (
          <SidebarItem
            name={item.name}
            path={item.path}
            iconName={item.iconName}
            key={item.name}
          />
        ))}
      </ul>

      <SidebarUserInfo hosId={hosId} userData={userData} />
    </>
  )
}
