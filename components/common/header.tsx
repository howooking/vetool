import Link from 'next/link'
import { Button } from '../ui/button'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/lib/actions/auth'

export default async function Header() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="bg-zinc-600 fixed flex">
      <Button asChild variant="default">
        <Link href="/">Home</Link>
      </Button>

      <Button asChild variant="outline">
        <Link href="/private">private</Link>
      </Button>

      {user ? (
        <>
          <Button asChild variant="outline">
            <Link href="/hospital/new">병원생성</Link>
          </Button>
          <form action={logout}>
            <Button variant="destructive">Logout</Button>
          </form>
        </>
      ) : (
        <Button asChild variant="secondary">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </header>
  )
}
