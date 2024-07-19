import { Button } from '@/components/ui/button'
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
import { addDefaultChart } from '@/lib/services/icu/add-icu-chart'
import { cn } from '@/lib/utils'
import { File, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function AddDefaultChartDialog({
  targetDate,
  selectedPatient,
}: {
  targetDate: string
  selectedPatient: {
    patientName: string
    patientId: string
  }
}) {
  const { hos_id } = useParams()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddDefaultChart = async () => {
    setIsSubmitting(true)

    const { error } = await addDefaultChart(
      hos_id as string,
      targetDate,
      selectedPatient.patientId,
    )

    if (error) {
      toast({
        title: '기본차트 생성할 수 없습니다',
        description: '전날 차트가 있는지 확인해주세요',
        variant: 'destructive',
      })
      setIsSubmitting(false)
      setIsDialogOpen(false)
      return
    }

    toast({
      title: '기본차트를 생성했습니다',
    })

    setIsDialogOpen(false)
    setIsSubmitting(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-1/3 w-1/4 items-center justify-center gap-2"
        >
          <File />
          <span>새로운 차트생성</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>새로운 차트 생성</DialogTitle>
          <DialogDescription>
            초기화된 형식의 차트가 생성됩니다
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleAddDefaultChart} disabled={isSubmitting}>
            생성
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
