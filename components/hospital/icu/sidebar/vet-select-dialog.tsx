import { Command } from '@/components/ui/command'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { IcuUserList } from '@/types/icu'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

export default function VetSelectDialog({
  vetsListData,
  selectedVet,
  setSelectedVet,
}: {
  vetsListData: IcuUserList[]
  selectedVet: string
  setSelectedVet: Dispatch<SetStateAction<string>>
}) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const handleValueChange = (value: string) => {
    if (value === 'reset') {
      return setSelectedVet('')
    }

    setSelectedVet(value)
  }

  return (
    <Select
      open={isSelectorOpen}
      onOpenChange={setIsSelectorOpen}
      onValueChange={handleValueChange}
      value={selectedVet}
    >
      <SelectTrigger className="mb-2 w-full justify-center" noIcon>
        <SelectValue placeholder="수의사 선택" />
      </SelectTrigger>
      <SelectContent className="w-32 p-0">
        <Command>
          <SelectGroup>
            {vetsListData.map((vet) => (
              <SelectItem key={vet.user_id} value={vet.user_id}>
                <div className="flex items-center gap-4">
                  <Image
                    unoptimized
                    src={vet.avatar_url ?? ''}
                    alt={vet.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {vet.name}
                </div>
              </SelectItem>
            ))}
            <SelectItem value="reset">
              <div className="text-center text-gray-500">선택 초기화</div>
            </SelectItem>
          </SelectGroup>
        </Command>
      </SelectContent>
    </Select>
  )
}
