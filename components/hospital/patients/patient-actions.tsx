import UpdatePatientDialog from '@/components/hospital/patients/update-patient-dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import { deletePatient } from '@/lib/services/patient/patient'
import { cn } from '@/lib/utils'
import { PatientDataTable } from '@/types/patients'
import { LoaderCircle, MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import DeletePatientAlert from './delete-patient-alert'

export default function PatientActions({
  patient,
}: {
  patient: PatientDataTable
}) {
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { refresh } = useRouter()

  const handleDeleteClick = async (patientId: string) => {
    setIsLoading(true)

    await deletePatient(patientId)

    toast({
      title: '환자 정보 삭제',
      description: '환자 정보가 삭제되었습니다',
    })

    setIsLoading(false)
    setIsDropDownMenuOpen(false)
    refresh()
  }

  return (
    <DropdownMenu
      open={isDropDownMenuOpen}
      onOpenChange={setIsDropDownMenuOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('flex h-8 w-8 items-center justify-center')}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" loop>
        {/* 수정 */}
        <UpdatePatientDialog hosId={patient.hos_id} patient={patient} />

        {/* 삭제 */}
        <DeletePatientAlert
          patientId={patient.patient_id}
          onDelete={handleDeleteClick}
          isLoading={isLoading}
        />

        {/* ID 복사 */}
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(patient.patient_id)}
        >
          환자 ID 복사
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
