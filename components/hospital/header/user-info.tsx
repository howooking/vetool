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
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type UserInfo = {
  email: string
  name: string
  avatar_url: string
  position: string
  hos_id: { name: string }
  is_admin: boolean
}

export default async function UserInfo({ hosId }: { hosId: string }) {
  const supabase = createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.log(userError)
    redirect(`/error?message=${userError.message}`)
  }

  const { data: userInfo, error: userInfoError } = await supabase
    .from('users')
    .select('email, name, avatar_url, position, hos_id (name), is_admin')
    .match({ user_id: user?.id })
    .returns<UserInfo[]>()

  if (userInfoError) {
    console.log(userInfoError)
    redirect(`/error?message=${userInfoError.message}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span>{userInfo?.at(0)?.hos_id.name}</span>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={userInfo?.at(0)?.avatar_url}
              alt={userInfo?.at(0)?.name}
            />
            <AvatarFallback>
              {userInfo?.at(0)?.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="text-center">
              {userInfo?.at(0)?.name} - {userInfo?.at(0)?.position}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {userInfo?.at(0)?.is_admin && (
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
