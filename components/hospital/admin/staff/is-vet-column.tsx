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

export default function IsVetColumn({
  isVet,
  userId,
}: {
  isVet: boolean
  userId: string
}) {
  const [isVetIput, setIsVetIput] = useState(isVet ? 'true' : 'false')
  useEffect(() => {
    setIsVetIput(isVet ? 'true' : 'false')
  }, [isVet])

  const handleUpdateIsVet = async (value: string) => {
    const supabase = createClient()
    const parsedIsVet = value === 'true'

    const { error: isVetUpdateError } = await supabase
      .from('users')
      .update({ is_vet: parsedIsVet })
      .match({ user_id: userId })

    if (isVetUpdateError) {
      toast({
        variant: 'destructive',
        title: isVetUpdateError.message,
        description: '관리자에게 문의하세요',
      })
      return
    }

    toast({
      title: '수의사여부를 변경하였습니다.',
    })
  }

  return (
    <Select
      defaultValue={isVet ? 'true' : 'false'}
      value={isVetIput}
      onValueChange={(value) => {
        setIsVetIput(value)
        handleUpdateIsVet(value)
      }}
    >
      <SelectTrigger className="mx-auto w-[128px]">
        <SelectValue />
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
