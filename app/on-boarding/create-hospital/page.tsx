import CreateHospitalForm from '@/components/on-boarding/create-hospital/create-hospital-form'
import PrevButton from '@/components/on-boarding/prev-button'
import logoWhite from '@/public/logo-white.svg'
import Image from 'next/image'
import { Suspense } from 'react'

export default function CreateHospitalPage() {
  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen w-3/5 items-center justify-center bg-primary">
        <Image alt="vetool logo" src={logoWhite} unoptimized width={320} />
      </div>

      <div className="relative flex h-screen w-2/5 flex-col items-center justify-center gap-10 p-8">
        <PrevButton />
        <h2 className="text-2xl font-bold tracking-wider">병원 생성</h2>

        {/* 서스펜스 사용 이유 */}
        {/* We recommend wrapping the Client Component that uses useSearchParams in a <Suspense/> boundary. This will allow any Client Components above it to be statically rendered and sent as part of initial HTML. Example.
         */}
        {/* reference : https://nextjs.org/docs/app/api-reference/functions/use-search-params */}
        <Suspense fallback={<></>}>
          <CreateHospitalForm />
        </Suspense>
      </div>
    </div>
  )
}
