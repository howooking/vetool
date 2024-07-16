import { Badge } from '@/components/ui/badge'
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
    <div className="flex items-center justify-between">
      {!group && <Badge variant="destructive">미분류</Badge>}

      <ul className="flex items-center gap-1">
        {group?.map((item) => (
          <li key={item}>
            <Badge>{item}</Badge>
          </li>
        ))}
      </ul>
      <GroupColumnDialog
        groupList={groupList}
        userId={userId}
        group={group}
        name={name}
      />
    </div>
  )
}
