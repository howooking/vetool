import MaxWidthContainer from '@/components/common/max-width-container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import VetoolLogo from '../common/vetool-logo'
import MobileNavMenu from './mobile-nav-menu'

const NAV_MENUS = [
  { label: '벳툴소개', href: '/company' },
  { label: '제품안내', href: '/products' },
  { label: '가격안내', href: '/pricing' },
] as const
export type NavMenus = typeof NAV_MENUS

export default async function HomepageHeader() {
  return (
    <header className="sticky top-0 border-b">
      <MaxWidthContainer>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/">
              <VetoolLogo />
            </Link>

            <ul className="hidden items-center gap-6 sm:flex">
              {NAV_MENUS.map((menu) => (
                <li key={menu.href}>
                  <Link href={menu.href}>{menu.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="default">
              <Link href="/login" className="font-bold">
                로그인
              </Link>
            </Button>

            <MobileNavMenu navMenus={NAV_MENUS} />
          </div>
        </div>
      </MaxWidthContainer>
    </header>
  )
}
