import { SignupForm } from '@/components/on-boarding/signup-form'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/services/auth/authentication'
import logoWhite from '@/public/logo-white.svg'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'

export default function SelectHospitalPage() {
  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen w-3/5 items-center justify-center bg-primary">
        <Image alt="vetool logo" src={logoWhite} unoptimized width={320} />
      </div>

      <div className="relative flex h-screen w-2/5 flex-col items-center justify-center gap-10 p-8">
        <form action={logout} className="absolute left-4 top-4">
          <Button variant="outline" type="submit" className="absolute pl-2">
            <ChevronLeft size={20} />
            뒤로가기
          </Button>
        </form>
        <h2 className="text-2xl font-bold tracking-wider">회원가입</h2>
        <SignupForm />
      </div>
    </div>
  )
}
