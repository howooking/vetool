import logo from '@/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import MaxWidthContainer from './max-width-container'

const NAV_MENUS = [
  { label: '벳툴소개', href: '/company' },
  { label: '제품안내', href: '/products' },
  { label: '가격안내', href: '/pricing' },
]
export default async function HomepageHeader() {
  return (
    <header className="sticky top-0 border-b">
      <MaxWidthContainer>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/">
              <Image
                src={logo}
                alt="vetool logo"
                unoptimized
                className="h-8 w-auto"
              />
            </Link>

            <ul className="flex items-center gap-6">
              {NAV_MENUS.map((menu) => (
                <li key={menu.href}>
                  <Link href={menu.href}>{menu.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <>
              <Button asChild variant="secondary">
                <Link href="/login" className="font-bold">
                  로그인
                </Link>
              </Button>
              <Button asChild variant="default">
                <Link href="/login" className="font-bold">
                  무료로 시작하기
                </Link>
              </Button>
            </>
          </div>
        </div>
      </MaxWidthContainer>
    </header>
  )
}
