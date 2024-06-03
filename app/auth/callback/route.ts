import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const supabase = createClient()

  const code = searchParams.get('code')

  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const { error: codeExchangeError } =
      await supabase.auth.exchangeCodeForSession(code)

    if (!codeExchangeError) {
      const {
        data: { user: authUser },
        error: authUserError,
      } = await supabase.auth.getUser()

      if (authUserError) {
        return NextResponse.redirect(
          `${origin}/error?message=${authUserError.message}`,
        )
      }

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('user_id')
        .match({ user_id: authUser?.id })

      if (userError) {
        return NextResponse.redirect(
          `${origin}/error?message=${userError.message}`,
        )
      }

      if (user.length) {
        return NextResponse.redirect(`${origin}/private`)
      }

      const { error: insertUserError } = await supabase.from('users').insert({
        user_id: authUser?.id,
        email: authUser?.email,
        avatar_url: authUser?.user_metadata?.avatar_url,
        name: authUser?.user_metadata?.full_name,
      })

      if (insertUserError) {
        return NextResponse.redirect(
          `${origin}/error?message=${insertUserError.message}`,
        )
      }

      return NextResponse.redirect(`${origin}/private`)
    }
  }
  return NextResponse.redirect(`${origin}/error?message=login-error`)
}
