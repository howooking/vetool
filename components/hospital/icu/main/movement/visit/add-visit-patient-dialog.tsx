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
import { getVisitablePatients } from '@/lib/services/icu/movement/visit/get-visitable-patients'
import { insertVisitPatient } from '@/lib/services/icu/movement/visit/insert-visit-patient'
import { VisitablePatientsData } from '@/types/icu/movement'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AddVisitPatientDialog({}) {
  const [selectedPatient, setSelectedPatient] = useState<{
    icu_io_id: string
    main_vet: string
    patient_id: string
  } | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [visitablePatients, setVisitablePatients] = useState<
    VisitablePatientsData[]
  >([])
  const { hos_id, target_date } = useParams()
  const { refresh } = useRouter()

  useEffect(() => {
    const fetchVisitablePatients = async () => {
      const patients = await getVisitablePatients(
        hos_id as string,
        target_date as string,
      )

      setVisitablePatients(patients)
    }

    fetchVisitablePatients()
  }, [hos_id, target_date])

  const handleInsertVisitPatient = async () => {
    if (!selectedPatient) return

    const { icu_io_id, main_vet, patient_id } = selectedPatient

    setIsDialogOpen(false)

    await insertVisitPatient(
      icu_io_id,
      hos_id as string,
      target_date as string,
      main_vet,
      patient_id,
    )

    toast({
      title: '면회 환자를 추가하였습니다',
    })

    refresh()
    setIsDialogOpen(false)
  }

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
          <DialogTitle>면회 환자 추가</DialogTitle>
          <DialogDescription>면회할 환자를 추가합니다</DialogDescription>
        </DialogHeader>

        <Select
          onValueChange={(value) => {
            const parsedValue = JSON.parse(value)
            setSelectedPatient(parsedValue)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="환자 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {visitablePatients.map((patient) => (
                <SelectItem
                  key={patient.icu_io_id}
                  value={JSON.stringify({
                    icu_io_id: patient.icu_io_id,
                    main_vet: patient.vets.name,
                    patient_id: patient.patient.patient_id,
                  })}
                >
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
          <Button onClick={handleInsertVisitPatient}>추가</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
