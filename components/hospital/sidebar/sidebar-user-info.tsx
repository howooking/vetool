'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/lib/services/auth/authentication'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function SidebarUserInfo({
  hosId,
  userData,
  mobile,
  setIsSheetOpen,
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
  mobile?: boolean
  setIsSheetOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div className={cn('absolute bottom-0', mobile ? 'right-2' : 'left-2')}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center">
            <Avatar>
              <AvatarImage
                loading="lazy"
                src={userData.avatar_url ?? ''}
                alt={userData.name}
              />
              <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" side="top">
          <DropdownMenuLabel>
            <div className="text-center">
              {userData.name} - {userData.position}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {userData.is_admin && (
              <DropdownMenuItem asChild onClick={() => setIsSheetOpen!(false)}>
                <Link href={`/hospital/${hosId}/admin/staff`}>관리자</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild onClick={() => setIsSheetOpen!(false)}>
              <Link href={`/hospital/${hosId}/my-page`}>프로필 수정</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {/* <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>업무</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>진료기록</DropdownMenuItem>
                  <DropdownMenuItem>근로기록</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="p-0">
            <form action={logout}>
              <Button type="submit" variant="destructive" className="w-full">
                로그아웃
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
