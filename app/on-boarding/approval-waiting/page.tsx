import DotLottie from '@/components/common/dot-lottie'
import LargeLoaderCircle from '@/components/common/large-loader-circle'
import ApprovalWaitingContents from '@/components/hospital/admin/approval/approval-waiting-contents'
import { Suspense } from 'react'

export default async function ApprovalWaiting() {
  return (
    <>
      <Suspense fallback={<LargeLoaderCircle />}>
        <ApprovalWaitingContents />
      </Suspense>
      <DotLottie className="mt-4 w-full" path="/dot-lottie/waiting.lottie" />
    </>
  )
}
