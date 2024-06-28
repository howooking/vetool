import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Vets } from '@/types/hospital'
import { useState } from 'react'

type PatientDetailVetsDialogProps = {
  mainVetName: string | null
  subVetName: string | null
  mainVetId: string
  subVetId: string
  onMainVetChange: (value: string) => Promise<void>
  onSubVetChange: (value: string) => Promise<void>
  vetsData: Vets[]
}

export default function PatientDetailVetsDialog({
  mainVetName,
  subVetName,
  mainVetId,
  subVetId,
  onMainVetChange,
  onSubVetChange,
  vetsData,
}: PatientDetailVetsDialogProps) {
  const [mainVetValue, setMainVetValue] = useState(mainVetId)
  const [subVetValue, setSubVetValue] = useState(subVetId)

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-muted-foreground">주치의 / 부주치의</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-[160px]">{`${
            mainVetValue
              ? vetsData.find((vets) => vets.user_id === mainVetValue)?.name
              : mainVetName
          }  /  ${
            subVetValue
              ? vetsData.find((vets) => vets.user_id === subVetValue)?.name
              : subVetName ?? '부치의 선택'
          }`}</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>주치의 / 부주치의 변경</DialogTitle>

            <div className="flex flex-col gap-8 py-4">
              <div className="flex flex-col justify-center gap-2">
                <span className="text-sm font-semibold">주치의* </span>
                <Select
                  defaultValue={mainVetValue}
                  onValueChange={(currentValue) => {
                    setMainVetValue(currentValue)
                    onMainVetChange(currentValue)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {vetsData.map((vets) => (
                        <SelectItem key={vets.user_id} value={vets.user_id}>
                          <div className="flex items-center gap-2 font-normal">
                            <span>{vets.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {vets.position}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col justify-center gap-2">
                <span className="text-sm font-semibold">부주치의</span>
                <Select
                  defaultValue={subVetValue}
                  onValueChange={(currentValue) => {
                    setSubVetValue(currentValue)
                    onSubVetChange(currentValue)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {vetsData.map((vets) => (
                        <SelectItem key={vets.user_id} value={vets.user_id}>
                          <div className="flex items-center gap-2 font-normal">
                            <span>{vets.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {vets.position}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                닫기
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
