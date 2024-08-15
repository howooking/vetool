import GroupBadge from '@/components/hospital/icu/sidebar/filters/group-badge'
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function GroupFilter({
  hosGroupList,
  selectedGroup,
  setSelectedGroup,
}: {
  hosGroupList: string[]
  selectedGroup: string[]
  setSelectedGroup: (group: string[]) => void
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tempSelectedGroup, setTempSelectedGroup] = useState<string[]>([])

  const { push } = useRouter()

  const handleCheckboxChange = (group: string) => {
    setTempSelectedGroup((prevGroups) =>
      prevGroups.includes(group)
        ? prevGroups.filter((value) => value !== group)
        : [...prevGroups, group],
    )
  }

  const handleResetClick = () => {
    setTempSelectedGroup([])

    currentParams.delete('group')
    const newUrl = `${pathname}${currentParams.toString() ? '?' : ''}${currentParams.toString()}`

    push(newUrl)
  }

  const handleOkButtonClick = () => {
    setSelectedGroup(tempSelectedGroup)
    setIsDialogOpen(false)
    currentParams.set('group', tempSelectedGroup.join(','))
    const newUrl = `${pathname}${currentParams.toString() ? '?' : ''}${currentParams.toString()}`

    push(newUrl)
  }

  useEffect(() => {
    setTempSelectedGroup(selectedGroup)
  }, [selectedGroup])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex h-auto w-full px-1 py-1">
          {selectedGroup.length ? (
            <GroupBadge currentGroups={selectedGroup} />
          ) : (
            '그룹선택'
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>그룹 선택</DialogTitle>
          <DialogDescription>
            "또는(or)" 조건으로 필터링됩니다
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          {hosGroupList.map((group) => (
            <div key={group} className="flex items-center gap-2">
              <Checkbox
                id={group}
                onCheckedChange={() => handleCheckboxChange(group)}
                checked={tempSelectedGroup.includes(group)}
              />
              <label htmlFor={group} className="cursor-pointer text-sm">
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
