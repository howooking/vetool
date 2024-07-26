import GroupBadge from '@/components/hospital/icu/sidebar/group-badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'

export default function GroupSelectDialog({
  hosGroupList,
  selectedGroup,
  setSelectedGroup,
}: {
  hosGroupList: string[]
  selectedGroup: string[]
  setSelectedGroup: (group: string[]) => void
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tempSelectedGroup, setTempSelectedGroup] = useState<string[]>([])

  useEffect(() => {
    setTempSelectedGroup(selectedGroup)
  }, [selectedGroup])

  const handleCheckboxChange = (group: string) => {
    setTempSelectedGroup((prevGroups) =>
      prevGroups.includes(group)
        ? prevGroups.filter((value) => value !== group)
        : [...prevGroups, group],
    )
  }

  const handleResetClick = () => {
    setTempSelectedGroup([])
  }

  const handleOkButtonClick = () => {
    setSelectedGroup(tempSelectedGroup)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-2 flex h-auto w-full px-2 py-1">
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
                checked={tempSelectedGroup.includes(group)}
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
          <Button type="button" onClick={handleOkButtonClick}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
