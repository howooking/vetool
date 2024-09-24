import MaxWidthContainer from '@/components/common/max-width-container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import VetoolLogo from '../common/vetool-logo'
import MobileNavMenu from './mobile-nav-menu'
import NavMenu from './navmenu'

const HOMEPAGE_NAVBAR_ITEMS = [
  { label: '벳툴소개', href: '/company' },
  { label: '제품안내', href: '/products' },
  // { label: '가격안내', href: '/pricing' },
] as const
export type NavbarItems = typeof HOMEPAGE_NAVBAR_ITEMS

export default async function HomepageHeader() {
  return (
    <header className="sticky top-0 border-b">
      <MaxWidthContainer>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/">
              <VetoolLogo />
            </Link>

            <NavMenu navbarItems={HOMEPAGE_NAVBAR_ITEMS} />
          </div>

          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/login" className="font-bold">
                로그인
              </Link>
            </Button>

            <MobileNavMenu navbarItems={HOMEPAGE_NAVBAR_ITEMS} />
          </div>
        </div>
      </MaxWidthContainer>
    </header>
  )
}
