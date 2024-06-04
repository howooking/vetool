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
        .select('hos_id, user_id')
        .match({ user_id: authUser?.id })

      if (userError) {
        return NextResponse.redirect(
          `${origin}/error?message=${userError.message}`,
        )
      }

      // 등록된 병원이 존재할 때
      if (user[0] && user[0].hos_id) {
        return NextResponse.redirect(`${origin}/private`)
      }

      // 등록된 병원이 존재하지 않으면서 동시에 유저 아이디도 없는 경우 (첫 로그인)
      if (!user.length) {
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

        return NextResponse.redirect(`${origin}/on-boarding`)
      }

      // 등록된 병원이 존재하지 않으면서 유저 아이디가 존재하는 경우 (온보딩 과정 중 비정상적 이탈)
      return NextResponse.redirect(`${origin}/on-boarding`)
    }
  }
  return NextResponse.redirect(`${origin}/error?message=login-error`)
}
