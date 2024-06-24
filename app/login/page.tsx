import GoogleLoginButton from '../../components/login/google-login-button'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import logoWhite from '@/public/logo-white.svg'
import Link from 'next/link'

export default async function LoginPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex h-screen">
      <div className="flex h-screen w-2/5 flex-col items-center justify-center gap-10 p-10">
        <h2 className="text-3xl font-bold tracking-wider">
          로그인 또는 회원가입
        </h2>
        <form>
          <GoogleLoginButton />
        </form>

        <div className="text-center">
          구글로 회원가입을 진행할 경우
          <br /> (주)벳툴의 <span className="text-primary">
            이용약관
          </span> 및 <span className="text-primary">개인정보정책</span>에
          동의하게됩니다.
        </div>
        <div>
          구글 계정이 없으신가요?{' '}
          <Link
            href="https://www.google.com/"
            target="_blank"
            className="text-primary"
          >
            구글 계정 생성
          </Link>
        </div>
      </div>

      <div className="flex h-screen w-3/5 items-center justify-center bg-primary">
        <Image alt="vetool logo" src={logoWhite} unoptimized width={320} />
      </div>
    </div>
  )
}
