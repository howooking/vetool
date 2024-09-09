'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import logo from '@/public/logo.svg'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'
import { NavMenus } from './homepage-header'

export default function MobileNavMenu({ navMenus }: { navMenus: NavMenus }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-10">
          <SheetTitle>
            <Image
              src={logo}
              alt="vetool logo"
              unoptimized
              className="h-8 w-auto"
            />
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <ul className="flex flex-col gap-4">
          {navMenus.map((navMenu) => (
            <li key={navMenu.label}>
              <Link href={navMenu.href} onClick={() => setIsSheetOpen(false)}>
                {navMenu.label}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
