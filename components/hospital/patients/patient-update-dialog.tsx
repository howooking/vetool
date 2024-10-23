'use client'

import PatientForm from '@/components/hospital/patients/patient-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createClient } from '@/lib/supabase/client'
import type { PatientDataTable } from '@/types/patients'
import { format } from 'date-fns'
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PatientUpdateDialog({
  hosId,
  editingPatient,
  hosPatientIds,
}: {
  hosId: string
  editingPatient: PatientDataTable
  hosPatientIds: string[]
}) {
  const supabase = createClient()
  const [weightInfo, setWeightInfo] = useState({
    weight: '',
    weightMeasuredDate: '',
  })
  const { push } = useRouter()

  const [isPatientUpdateDialogOpen, setIsPatientUpdateDialogOpen] =
    useState(false)

  useEffect(() => {
    const fetchWeightInfo = async () => {
      const { data, error } = await supabase
        .from('vitals')
        .select('body_weight, created_at')
        .match({ patient_id: editingPatient.patient_id })
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error(error)
        push(`/error/?message=${error.message}`)
      }

      setWeightInfo({
        weight: data?.body_weight ?? '',
        weightMeasuredDate: data?.created_at
          ? format(data?.created_at, 'yyyy-MM-dd')
          : '',
      })
    }
    fetchWeightInfo()
  }, [editingPatient.patient_id, push, supabase])

  return (
    <Dialog
      open={isPatientUpdateDialogOpen}
      onOpenChange={setIsPatientUpdateDialogOpen}
    >
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Edit size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{editingPatient.name} 정보 수정</DialogTitle>
          <DialogDescription>환자의 정보를 수정합니다</DialogDescription>
        </DialogHeader>

        <PatientForm
          patient
          weight={weightInfo.weight}
          weightMeasuredDate={weightInfo.weightMeasuredDate}
          hosPatientIds={hosPatientIds}
          hosId={hosId}
          edit
          editingPatient={editingPatient}
          setIsPatientUpdateDialogOpen={setIsPatientUpdateDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
