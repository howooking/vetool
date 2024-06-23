import { Button } from '@/components/ui/button'
import { logout } from '@/lib/actions/auth'

export default function ApprovalWaiting() {
  return (
    <div>
      <h2>승인 대기 페이지</h2>
      <form action={logout}>
        <Button type="submit">홈으로</Button>
      </form>
    </div>
  )
}
