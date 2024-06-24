import { SignupForm } from '@/components/on-boarding/signup-form'
import logoWhite from '@/public/logo-white.svg'
import Image from 'next/image'

export default function SelectHospitalPage() {
  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen w-3/5 items-center justify-center bg-primary">
        <Image alt="vetool logo" src={logoWhite} unoptimized width={320} />
      </div>

      <div className="flex h-screen w-2/5 flex-col items-center justify-center gap-10 p-8">
        <h2 className="text-3xl font-bold tracking-wider">회원가입</h2>
        <SignupForm />
      </div>
    </div>
  )
}
