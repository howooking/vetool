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

  if (VETOOL_COMPANY_ROUTES.includes(request.nextUrl.pathname)) {
    if (authUser) {
      const { data: userData, error: userDataError } = await supabase
        .from('users')
        .select('hos_id')
        .match({ user_id: authUser?.id })

      if (userDataError) {
        return NextResponse.redirect(
          new URL(`error?message=${userDataError.message}`, request.url),
        )
      }

      // If the user does not exist, insert into users table and redirect to onboarding page
      if (userData.length === 0) {
        const { error: insertUserError } = await supabase.from('users').insert({
          user_id: authUser.id,
          name: authUser.user_metadata.full_name,
          email: authUser.email,
          avatar_url: authUser.user_metadata.avatar_url,
        })

        if (insertUserError) {
          return NextResponse.redirect(
            new URL(`/error?message=${insertUserError.message}`, request.url),
          )
        }

        return NextResponse.redirect(new URL('/on-boarding', request.url))
      }

      // If the user exists and has a registered hospital
      if (userData.at(0)?.hos_id) {
        return NextResponse.redirect(
          new URL(`/hospital/${userData.at(0)?.hos_id}`, request.url),
        )
      }

      // If the user exists but has no registered hospital
      const { data: userApprovalData, error: userApprovalDataError } =
        await supabase
          .from('user_approvals')
          .select()
          .match({ user_id: authUser?.id })

      if (userApprovalDataError) {
        console.log(userApprovalDataError)
        return NextResponse.redirect(
          new URL(
            `/error?message=${userApprovalDataError.message}`,
            request.url,
          ),
        )
      }

      // If the user has not applied for approval yet
      if (userApprovalData.length === 0) {
        return NextResponse.redirect(new URL('/on-boarding', request.url))
      }

      // If the user has applied for approval but not yet approved
      return NextResponse.redirect(
        new URL('/on-boarding/approval-waiting', request.url),
      )
    }
  }

  if (
    request.nextUrl.pathname.startsWith('/hospital') &&
    request.nextUrl.pathname.endsWith('/api/notification')
  ) {
    return response
  }

  // Redirect to login page if the user is not logged in and tries to access hospital routes
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
