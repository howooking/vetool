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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { getNotOutDuePatients } from '@/lib/services/icu/movement/out-due/get-not-out-due-patient'
import { updatePatientOutDueDate } from '@/lib/services/icu/movement/out-due/update-patient-out-due-date'
import type { NotOutDuePatientsData } from '@/types/icu/movement'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function AddOutDuePatientDialog() {
  const [selectedIoId, setSelectedIoId] = useState('')
  const [notOutDuePatients, setNotOutDuePatients] = useState<
    NotOutDuePatientsData[]
  >([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { hos_id, target_date } = useParams()

  useEffect(() => {
    if (isDialogOpen) {
      const getNotOutDueIoPatients = async () => {
        const patients = await getNotOutDuePatients(
          hos_id as string,
          target_date as string,
        )
        setNotOutDuePatients(patients ?? [])
      }

      getNotOutDueIoPatients()
    }
  }, [isDialogOpen, hos_id, target_date])

  const handleUpdatePatientOutDueDate = async (icuIoId: string) => {
    setIsDialogOpen(false)

    await updatePatientOutDueDate(
      icuIoId,
      hos_id as string,
      target_date as string,
    )

    toast({
      title: '퇴원 예정 환자를 추가하였습니다',
    })

    setIsDialogOpen(false)
  }

  const noPatientToAdd = useMemo(
    () => notOutDuePatients.length === 0,
    [notOutDuePatients],
  )

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="relative mx-auto flex w-[180px] items-center justify-center gap-2 text-center">
        <span>환자명</span>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost" className="absolute right-4">
            <Plus size={18} />
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>퇴원 예정 환자 추가</DialogTitle>
          <DialogDescription>
            입원 환자 중 {target_date} 날짜로의 퇴원 예정 환자를 추가합니다
          </DialogDescription>
        </DialogHeader>

        <Select onValueChange={setSelectedIoId}>
          <SelectTrigger disabled={noPatientToAdd}>
            <SelectValue
              placeholder={
                noPatientToAdd ? '추가할 환자가 없습니다' : '환자선택'
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {notOutDuePatients.map((patient) => (
                <SelectItem key={patient.patient_id} value={patient.icu_io_id}>
                  <div className="flex items-center gap-1">
                    <span>{patient.patient.name}</span>
                    <span className="pl-1 text-xs leading-[10px] text-muted-foreground">
                      {patient.patient.breed}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <DialogFooter className="gap-2 md:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              취소
            </Button>
          </DialogClose>
          <Button onClick={() => handleUpdatePatientOutDueDate(selectedIoId)}>
            추가
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
