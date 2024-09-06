import DotLottie from '@/components/common/dot-lottie'
import LargeLoaderCircle from '@/components/common/large-loader-circle'
import ApprovalWaitingContents from '@/components/hospital/admin/approval/approval-waiting-contents'
import { getUserAppoval } from '@/lib/services/on-boarding/on-boarding'
import { Suspense } from 'react'

export default async function ApprovalWaiting() {
  const userApprovalData = await getUserAppoval()

  return (
    <>
      <Suspense fallback={<LargeLoaderCircle />}>
        <ApprovalWaitingContents userApprovalData={userApprovalData} />
      </Suspense>
      <DotLottie className="mt-4 w-full" path="/dot-lottie/waiting.lottie" />
    </>
  )
}
