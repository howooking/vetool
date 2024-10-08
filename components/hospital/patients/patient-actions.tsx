import type { PatientDataTable } from '@/types/patients'
import DeletePatientAlert from './delete-patient-alert'
import PatientUpdateDialog from './patient-update-dialog'

export default function PatientActions({
  patient,
  hosPatientIds,
}: {
  patient: PatientDataTable
  hosPatientIds: string[]
}) {
  return (
    <div className="flex gap-1">
      <PatientUpdateDialog
        hosId={patient.hos_id}
        editingPatient={patient}
        hosPatientIds={hosPatientIds}
      />

      <DeletePatientAlert
        patientName={patient.name}
        patientId={patient.patient_id}
      />
    </div>
  )
}
