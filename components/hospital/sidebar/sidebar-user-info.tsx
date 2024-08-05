import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/lib/services/auth/authentication'
import { getUserData } from '@/lib/services/auth/authorization'
import Link from 'next/link'

export default async function SidebarUserInfo({ hosId }: { hosId: string }) {
  const userData = await getUserData(hosId)

  return (
    <div className="absolute bottom-12 left-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center">
            <Avatar>
              <AvatarImage
                src={userData.avatar_url ?? ''}
                alt={userData.name}
              />
              <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="text-center">
              {userData.name} - {userData.position}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {userData.is_admin && (
              <DropdownMenuItem asChild>
                <Link href={`/hospital/${hosId}/admin/staff`}>관리자</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>프로필 수정</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
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
          </DropdownMenuGroup>
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
