import Link from 'next/link'
import { NavbarItems } from './homepage-header'

export default function NavMenu({ navbarItems }: { navbarItems: NavbarItems }) {
  return (
    <ul className="hidden items-center gap-6 md:flex">
      {navbarItems.map((menu) => (
        <li key={menu.href}>
          <Link href={menu.href}>{menu.label}</Link>
        </li>
      ))}
    </ul>
  )
}
