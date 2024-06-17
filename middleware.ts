import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { Database } from './lib/supabase/database.types'

const VETOOL_COMPANY_ROUTES = ['/', '/products', '/pricing', '/company']

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    },
  )

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  // 세션이 있고 벳툴 홈페이지에 접근시 병원홈으로 이동

  if (VETOOL_COMPANY_ROUTES.includes(request.nextUrl.pathname)) {
    if (authUser) {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('hos_id, user_id')
        .match({ user_id: authUser?.id })

      if (userError) {
        return NextResponse.redirect(
          new URL(`error?message=${userError.message}`, request.url),
        )
      }

      // 등록된 병원이 있는 경우
      if (user[0] && user[0].hos_id) {
        return NextResponse.redirect(
          new URL(`hospital/${user[0].hos_id}`, request.url),
        )
      }

      // 등록된 병원이 없는 경우
      return NextResponse.redirect(new URL('/on-boarding', request.url))
    }
  }

  // 로그아웃 상태에서 병원라우트로 이동시 로그인 페이지로 이동
  if (request.nextUrl.pathname.startsWith('/hospital')) {
    if (!authUser) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
