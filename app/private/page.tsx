import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <>
      <Image
        priority
        unoptimized
        src={data.user.user_metadata.avatar_url}
        alt="avatar"
        width={100}
        height={100}
      />
      <p>Hello {data.user.email}</p>
    </>
  )
}
