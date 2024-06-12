import Link from 'next/link'
import { Button } from '../ui/button'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/lib/actions/auth'
import { Cat } from 'lucide-react'

export default async function Header() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 flex items-center justify-between border-b bg-white">
      {/* 벳툴 로고 */}
      <div className="flex items-center justify-center px-2 py-2">
        <Cat size={32} color="#fff" fill="#14B8A6" />
      </div>

      <div className="flex">
        <Button asChild variant="default">
          <Link href="/">Home</Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/private">private</Link>
        </Button>

        {user ? (
          <form action={logout}>
            <Button variant="destructive">Logout</Button>
          </form>
        ) : (
          <Button asChild variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
