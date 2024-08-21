import DotLottie from '@/components/common/dot-lottie'
import LargeLoaderCircle from '@/components/common/large-loader-circle'
import ApprovalWaitingContents from '@/components/hospital/admin/approval/approval-waiting-contents'
import logoWhite from '@/public/logo-white.svg'
import Image from 'next/image'
import { Suspense } from 'react'

export default async function ApprovalWaiting() {
  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen w-3/5 items-center justify-center bg-primary">
        <Image alt="vetool logo" src={logoWhite} unoptimized width={320} />
      </div>

      <div className="flex h-screen w-2/5 flex-col items-center justify-center gap-10 p-8">
        <Suspense fallback={<LargeLoaderCircle />}>
          <ApprovalWaitingContents />
        </Suspense>
        <DotLottie className="mt-4 w-full" path="/dot-lottie/waiting.lottie" />
      </div>
    </div>
  )
}
