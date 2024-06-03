'use client'

import { Button } from '@/components/ui/button'
import { googleLogin } from '@/lib/actions/auth'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'

export default function GoogleLoginButton() {
  const { push } = useRouter()

  const { pending } = useFormStatus()

  return (
    <>
      <input
        type="text"
        name="path"
        defaultValue={location.origin}
        className="hidden"
      />
      <Button
        className="w-full"
        type="submit"
        disabled={pending}
        formAction={googleLogin}
      >
        Google Login
        <LoaderCircle
          className={cn(pending ? 'animate-spin ml-2' : 'hidden')}
        />
      </Button>
    </>
  )
}
