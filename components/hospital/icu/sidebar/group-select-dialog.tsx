import GroupBadge from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/infos/group/group-badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Dispatch, SetStateAction, useState } from 'react'
export default function GroupSelectDialog({
  hosGroupList,
  selectedGroup,
  setSelectedGroup,
}: {
  hosGroupList: string[]
  selectedGroup: string[]
  setSelectedGroup: Dispatch<SetStateAction<string[]>>
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleCheckboxChange = (group: string) => {
    setSelectedGroup((prevGroups) =>
      prevGroups.includes(group)
        ? prevGroups.filter((value) => value !== group)
        : [...prevGroups, group],
    )
  }

  const handleResetClick = () => {
    setSelectedGroup([])
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-2 h-auto w-full p-2">
          {selectedGroup.length ? (
            <GroupBadge currentGroups={selectedGroup} />
          ) : (
            '그룹 선택'
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>그룹 선택</DialogTitle>
          <DialogDescription>
            필터링할 특정 그룹을 선택해주세요
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {hosGroupList.map((group) => (
            <div key={group} className="flex items-center space-x-2">
              <Checkbox
                id={group}
                onCheckedChange={() => handleCheckboxChange(group)}
                checked={selectedGroup.includes(group)}
              />
              <label
                htmlFor={group}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {group}
              </label>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleResetClick}
            className="mr-auto"
          >
            초기화
          </Button>
          <DialogClose asChild>
            <Button type="button">확인</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
