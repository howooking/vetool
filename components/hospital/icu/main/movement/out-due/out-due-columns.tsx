'use client'

import PatientInfo from '@/components/hospital/common/patient-info'
import MovementChecklistInput from '@/components/hospital/icu/main/movement/movement-checklist-input'
import type { OutDuePatientsData } from '@/types/icu/movement'
import { ColumnDef } from '@tanstack/react-table'
import AddOutDuePatientDialog from './add-out-due-patient-dialog'
import MoveChartButton from './move-chart-button'

export const outDueColumns: ColumnDef<OutDuePatientsData>[] = [
  {
    accessorKey: 'patientName',
    header: () => {
      return <AddOutDuePatientDialog />
    },

    cell: ({ row }) => {
      const name = row.original.patient.name
      const breed = row.original.patient.breed
      const species = row.original.patient.species
      const isDischarged = row.original.out_date !== null

      return (
        <div className="mx-auto">
          <PatientInfo
            name={name}
            species={species}
            breed={breed}
            isDone={isDischarged}
            className="justify-center"
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'outTime',
    header: '퇴원 시각',
    cell: ({ row }) => {
      const outTime = row.original.out_time
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <MovementChecklistInput
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          checkType="out_time"
          value={outTime}
        />
      )
    },
  },
  {
    accessorKey: 'basicCare',
    header: '기본 관리',
    cell: ({ row }) => {
      const basicCare = row.original.basic_care
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <MovementChecklistInput
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          checkType="basic_care"
          value={basicCare}
        />
      )
    },
  },
  {
    accessorKey: 'belongings',
    header: '소지품',
    cell: ({ row }) => {
      const belongings = row.original.belongings
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <MovementChecklistInput
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          checkType="belongings"
          value={belongings}
        />
      )
    },
  },
  {
    accessorKey: 'prescription',
    header: '처방식',
    cell: ({ row }) => {
      const prescription = row.original.prescription
      const isDischarged = row.original.out_date !== null

      const icuIoId = row.original.icu_io_id

      return (
        <MovementChecklistInput
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          value={prescription}
          checkType="prescription"
        />
      )
    },
  },
  {
    accessorKey: 'medication',
    header: '약 조제',
    cell: ({ row }) => {
      const medication = row.original.medication
      const isDischarged = row.original.out_date !== null

      const icuIoId = row.original.icu_io_id

      return (
        <MovementChecklistInput
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          checkType="medication"
          value={medication}
        />
      )
    },
  },
  {
    accessorKey: 'etc',
    header: '기타',
    cell: ({ row }) => {
      const etc = row.original.etc
      const isDischarged = row.original.out_date !== null
      const icuIoId = row.original.icu_io_id

      return (
        <MovementChecklistInput
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          checkType="etc"
          value={etc}
        />
      )
    },
  },
  {
    accessorKey: 'active',
    header: '차트 이동',
    cell: ({ row }) => {
      const patientId = row.original.patient.patient_id

      return <MoveChartButton patientId={patientId} />
    },
  },
]
