import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dispatch } from 'react'

export default function OutDueToggleButton({
  isDischarged,
  value,
}: {
  isDischarged: boolean
  value: string
}) {
  return (
    <Input
      disabled={isDischarged}
      value={value}
      onChange={() => null}
      className="mx-auto w-8 text-center md:w-10"
    />
  )
}
