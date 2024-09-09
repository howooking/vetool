import { SIDE_BAR_ITEMS } from '@/constants/hospital/sidebar-items'
import SidebarItem from './sidebar-item'
import SidebarUserInfo from './sidebar-user-info'

export default async function Sidebar({
  hosId,
  userData,
}: {
  hosId: string
  userData: {
    email: string | null
    name: string
    avatar_url: string | null
    position: string
    is_admin: boolean
    user_id: string
  }
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
