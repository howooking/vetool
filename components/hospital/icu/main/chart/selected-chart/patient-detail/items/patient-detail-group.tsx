import PatientDetailGroupBadge from './patient-detail-group-badge'
import PatientDetailGroupDialog from './patient-detail-group-dialog'

export type PatientDetailGroupProps = {
  label: string
  groupList: string[] | null
  group: string[] | null
  name: string
  patientId: string
}

export default function PatientDetailGroup({
  label,
  groupList,
  group,
  name,
  patientId,
}: PatientDetailGroupProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center justify-between">
        <PatientDetailGroupBadge group={group} />
        <PatientDetailGroupDialog
          groupList={groupList}
          group={group}
          name={name}
          patientId={patientId}
        />
      </div>
    </div>
  )
}
