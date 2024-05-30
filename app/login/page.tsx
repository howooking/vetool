import GoogleLoginButton from './google-login-button'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex justify-center items-center mt-20">
      <form className="bg-white text-black p-10 rounded-md shadow-lg">
        <GoogleLoginButton />
      </form>
    </div>
  )
}
