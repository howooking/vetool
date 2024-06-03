import { getUser } from '@/lib/actions/auth'
import Image from 'next/image'

export default async function PrivatePage() {
  const { user } = await getUser()

  return (
    <>
      <Image
        priority
        unoptimized
        src={user?.user_metadata.avatar_url}
        alt="avatar"
        width={100}
        height={100}
      />
      <p>Hello {user?.email}</p>
    </>
  )
}
