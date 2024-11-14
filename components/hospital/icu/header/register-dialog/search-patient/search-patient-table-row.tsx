import DeletePatientAlert from '@/components/hospital/patients/delete-patient-alert'
import PatientUpdateDialog from '@/components/hospital/patients/patient-update-dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { calculateAge, cn, convertPascalCased } from '@/lib/utils/utils'
import type { SearchedPatientsData } from '@/types/patients'
import { Cat, Dog } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export default function SearchPatientTableRow({
  patientData,
  setIsEdited,
}: {
  patientData: SearchedPatientsData
  setIsEdited: Dispatch<SetStateAction<boolean>>
}) {
  const {
    patient_id,
    hos_id,
    species,
    hos_patient_id,
    name,
    breed,
    gender,
    birth,
    owner_name,
    created_at,
    is_alive,
  } = patientData

  return (
    <TableRow>
      {/* 종 */}
      <TableCell className="w-16 text-center">
        {species === 'canine' ? (
          <Dog className="mx-auto" />
        ) : (
          <Cat className="mx-auto" />
        )}
      </TableCell>

      {/* 환자 번호 */}
      <TableCell className="w-24 text-center">{hos_patient_id}</TableCell>

      {/* 환자 이름 */}
      <TableCell
        className={cn('w-24 text-center', !is_alive && 'text-destructive')}
      >
        {name} {!is_alive && '(사망)'}
      </TableCell>

      {/* 품종 */}
      <TableCell className="max-w-32 text-center">
        <div className="truncate" title={convertPascalCased(breed) ?? ''}>
          {convertPascalCased(breed) ?? ''}
        </div>
      </TableCell>

      {/* 성별 */}
      <TableCell className="w-16 text-center">{gender.toUpperCase()}</TableCell>

      {/* 나이 (생일) */}
      <TableCell className="max-w-32 whitespace-nowrap text-center">
        {calculateAge(birth)} ({birth})
      </TableCell>

      {/* 보호자 이름 */}
      <TableCell className="w-24 text-center">{owner_name}</TableCell>

      {/* 등록일 */}
      <TableCell className="w-24 text-center">
        {created_at.slice(0, 10)}
      </TableCell>

      {/* 수정 */}
      <TableCell className="w-24 text-center">
        <PatientUpdateDialog
          hosId={hos_id}
          editingPatient={patientData}
          setIsEdited={setIsEdited}
        />
      </TableCell>

      {/* 삭제 */}
      <TableCell className="w-24 text-center">
        <DeletePatientAlert patientName={name} patientId={patient_id} />
      </TableCell>
    </TableRow>
  )
}
