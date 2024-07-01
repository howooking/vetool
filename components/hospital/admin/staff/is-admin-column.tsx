import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function IsAdminColumn({
  isAdmin,
  userId,
  masterUserId,
}: {
  isAdmin: boolean
  userId: string
  masterUserId: string
}) {
  const [isAdminInput, setIsAdminInput] = useState(isAdmin ? 'true' : 'false')
  useEffect(() => {
    setIsAdminInput(isAdmin ? 'true' : 'false')
  }, [isAdmin])

  const handleUpdateIsAdmin = async (value: string) => {
    const supabase = createClient()
    const parsedIsAdmin = value === 'true'

    const { error: isAdminUpdateError } = await supabase
      .from('users')
      .update({ is_admin: parsedIsAdmin })
      .match({ user_id: userId })

    if (isAdminUpdateError) {
      toast({
        variant: 'destructive',
        title: isAdminUpdateError.message,
        description: '관리자에게 문의하세요',
      })
      return
    }

    toast({
      title: '관리자여부를 변경하였습니다',
    })
  }

  return (
    <Select
      defaultValue={isAdmin ? 'true' : 'false'}
      value={isAdminInput}
      onValueChange={(value) => {
        setIsAdminInput(value)
        handleUpdateIsAdmin(value)
      }}
      disabled={userId === masterUserId}
    >
      <SelectTrigger className="mx-auto w-[128px]">
        <SelectValue placeholder="관리자" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="true">O</SelectItem>
          <SelectItem value="false">X</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
