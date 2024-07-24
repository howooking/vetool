import { Button } from '@/components/ui/button'
import { logout } from '@/lib/services/auth/authentication'
import {
  cancelApproval,
  getUserAppoval,
} from '@/lib/services/on-boarding/on-boarding'

export default async function ApprovalWaitingContents() {
  const userApprovalData = await getUserAppoval()

  return (
    <div>
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
            defaultValue={userApprovalData.at(0)?.user_approval_id}
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
  )
}
