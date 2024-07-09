import { Button } from '@/components/ui/button'
import { LoaderCircle, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
export default function DeleteChartDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { refresh } = useRouter()

  const handleDeleteChart = async () => {
    setIsDeleting(true)

    // const { error } = await supabase.from('icu_chart').delete().match({
    //   patient_id: patientId,
    //   target_date: selectedDate,
    // })

    toast({
      title: '차트가 삭제되었습니다',
    })

    setIsDeleting(false)
    setIsOpen(false)
    refresh()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border border-red-600">
          <Trash2 size="16" color="#ff0000" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>차트 삭제</DialogTitle>
          <DialogDescription>차트를 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
          <Button
            onClick={handleDeleteChart}
            disabled={isDeleting}
            variant="destructive"
          >
            삭제
            <LoaderCircle
              className={cn(isDeleting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
