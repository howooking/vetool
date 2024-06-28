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
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'
type IcuPatientInfoProps = {
  name: string
  breed: string
  gender: string
  patientId: string
  selectedDate: string
  ageInDays: number | null
  weight: string | null
}

export default function PatientDetailItem({
  name,
  breed,
  gender,
  ageInDays,
  weight,
  patientId,
  selectedDate,
}: IcuPatientInfoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { refresh } = useRouter()
  const supabase = createClient()

  const handleDeleteChart = async () => {
    setIsDeleting(true)

    const { error } = await supabase.from('icu_chart').delete().match({
      patient_id: patientId,
      target_date: selectedDate,
    })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: '차트가 삭제되었습니다.',
    })

    setIsDeleting(false)
    setIsOpen(false)
    refresh()
  }

  return (
    <div className="flex justify-between space-y-1">
      <div>
        <span className="text-md pr-1 font-bold leading-none">{name}</span>
        <span className="text-xs font-medium leading-none">{breed}</span>
        <p className="text-sm text-muted-foreground">
          {`${ageInDays ?? 0} days old  · ${gender} · ${weight ?? 0}kg`}
        </p>
      </div>

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
    </div>
  )
}
