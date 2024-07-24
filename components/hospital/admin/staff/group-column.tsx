import { GroupColumnDialog } from '@/components/hospital/admin/staff/group-column-dialog'

export default function GroupColumn({
  userId,
  group,
  groupList,
  name,
}: {
  userId: string
  group: string[] | null
  groupList: string[]
  name: string
}) {
  return (
    <GroupColumnDialog
      groupList={groupList}
      userId={userId}
      group={group}
      name={name}
    />
  )
}
