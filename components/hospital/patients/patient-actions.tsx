import UpdatePatientDialog from '@/components/hospital/patients/update-patient-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { PatientDataTable } from '@/types/patients'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import DeletePatientAlert from './delete-patient-alert'

export default function PatientActions({
  patient,
  isIcu,
}: {
  patient: PatientDataTable
  isIcu: boolean
}) {
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false)

  return (
    <DropdownMenu
      open={isDropDownMenuOpen}
      onOpenChange={setIsDropDownMenuOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'flex h-8 w-8 items-center justify-center',
            isIcu && 'hidden',
          )}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" loop className="min-w-20">
        <UpdatePatientDialog hosId={patient.hos_id} patient={patient} />

        <DeletePatientAlert
          setIsDropDownMenuOpen={setIsDropDownMenuOpen}
          patientName={patient.name}
          patientId={patient.patient_id}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
