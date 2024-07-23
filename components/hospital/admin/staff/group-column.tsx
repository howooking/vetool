import { GroupColumnDialog } from '@/components/hospital/admin/staff/group-column-dialog'
import { Badge } from '@/components/ui/badge'

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
    <>
      {!group && <Badge variant="destructive">미분류</Badge>}
      <GroupColumnDialog
        groupList={groupList}
        userId={userId}
        group={group}
        name={name}
      />
    </>
  )
}
