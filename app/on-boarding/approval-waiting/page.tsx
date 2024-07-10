import DotLottie from '@/components/common/dot-lottie'
import { Button } from '@/components/ui/button'
import { cancelApproval, getUser, logout } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/server'
import logoWhite from '@/public/logo-white.svg'
import { UserApprovalHosJoined } from '@/types/on-boarding'
import Image from 'next/image'

export default async function ApprovalWaiting() {
  const supabase = createClient()

  const { authUser } = await getUser()

  const { data: userApprovalData, error: userApprovalDataError } =
    await supabase
      .from('user_approvals')
      .select(
        `
          user_approval_id,
          hos_id (
            name
          )
        `,
      )
      .match({
        user_id: authUser?.id,
      })
      .returns<UserApprovalHosJoined[]>()

  if (userApprovalDataError) {
    console.log(userApprovalDataError)
    throw new Error(userApprovalDataError.message)
  }

  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen w-3/5 items-center justify-center bg-primary">
        <Image alt="vetool logo" src={logoWhite} unoptimized width={320} />
      </div>

      <div className="relative flex h-screen w-2/5 flex-col items-center justify-center gap-10 p-8">
        <DotLottie className="w-full pt-20" path="/dot-lottie/waiting.lottie" />
        <div className="absolute top-[100px]">
          <p>
            <span className="text-2xl font-bold">
              {userApprovalData.at(0)?.hos_id.name}{' '}
            </span>
            에서 승인 대기중입니다
          </p>
          <div className="mt-4 flex gap-4">
            <form action={cancelApproval}>
              <input
                type="text"
                value={userApprovalData.at(0)?.user_approval_id}
                className="hidden"
                name="user_approval_id"
              />
              <Button className="w-full" variant="outline">
                승인요청 취소
              </Button>
            </form>
            <form action={logout} className="w-full">
              <Button type="submit" className="w-full">
                홈으로 이동
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
