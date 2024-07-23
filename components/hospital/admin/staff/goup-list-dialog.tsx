import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { Edit, LoaderCircle, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function GroupListDialog({ groupList }: { groupList: string[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tempGroupList, setTempGroupList] = useState(groupList)
  const [groupInput, setGroupInput] = useState('')
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  useEffect(() => {
    if (!isOpen && isSubmitting) {
      setTempGroupList(groupList)
    }
  }, [groupList, isOpen, isSubmitting])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const supabase = createClient()

    const { error: groupListUpdateError } = await supabase
      .from('hospitals')
      .update({ group_list: tempGroupList })
      .match({ hos_id: hosId })

    if (groupListUpdateError) {
      console.log(groupListUpdateError)
      toast({
        variant: 'destructive',
        title: groupListUpdateError.message,
      })
      setIsSubmitting(false)
      return
    }

    toast({
      title: '병원 그룹목록을 변경하였습니다',
    })
    setIsOpen(false)
    setIsSubmitting(false)
    refresh()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Edit size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>그룹 설정</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-wrap items-center gap-1">
          {tempGroupList.map((item) => (
            <li key={item}>
              <Badge
                className="flex cursor-pointer gap-1"
                onClick={() =>
                  setTempGroupList(
                    tempGroupList.filter((group) => group !== item),
                  )
                }
              >
                {item}
                <X size={14} />
              </Badge>
            </li>
          ))}
        </ul>

        <Input
          type="text"
          placeholder="Enter를 누르면 추가됩니다"
          onChange={(e) => setGroupInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setTempGroupList([...tempGroupList, groupInput])
              setGroupInput('')
            }
          }}
          value={groupInput}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="ml-auto"
          onClick={handleSubmit}
        >
          수정
          <LoaderCircle
            className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </DialogContent>
    </Dialog>
  )
}
