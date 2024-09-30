import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { updateStaffIsAdmin } from '@/lib/services/admin/staff/staff'
import { useRouter } from 'next/navigation'
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
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  useEffect(() => {
    setIsAdminInput(isAdmin ? 'true' : 'false')
  }, [isAdmin])

  const handleUpdateIsAdmin = async (value: string) => {
    const parsedIsAdmin = value === 'true'

    setIsUpdating(true)

    await updateStaffIsAdmin(userId, parsedIsAdmin)

    toast({
      title: '관리자여부를 변경하였습니다',
    })

    setIsUpdating(false)
    refresh()
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
      <SelectTrigger className="mx-auto w-[128px]" disabled={isUpdating}>
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
