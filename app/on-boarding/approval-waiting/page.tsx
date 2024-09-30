import DotLottie from '@/components/common/dot-lottie'
import ApprovalWaitingContents from '@/components/on-boarding/approval-waiting-contents'
import { getUserAppoval } from '@/lib/services/on-boarding/on-boarding'
import { UserApprovalHosJoined } from '@/types/on-boarding'

export default async function ApprovalWaiting() {
  const userApprovalData = await getUserAppoval()

  return (
    <>
      <ApprovalWaitingContents
        userApprovalData={userApprovalData as UserApprovalHosJoined}
      />
      <DotLottie className="mt-4 w-full" path="/dot-lottie/waiting.lottie" />
    </>
  )
}
