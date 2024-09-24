'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { SearchedDrugProducts } from '@/types/icu'
import { ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
export default function DrugComboBox({
  drugName,
  searchedDrugs,
  setDrugName,
  setDrugMassVolume,
}: {
  drugName: string
  searchedDrugs: SearchedDrugProducts[]
  setDrugName: Dispatch<SetStateAction<string>>
  setDrugMassVolume: Dispatch<SetStateAction<number | null>>
}) {
  const [isPopoverOpen, setIsPopOverOpen] = useState(false)
  const [value, setValue] = useState(drugName)

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopOverOpen}>
      <Label htmlFor="drugName">약물명*</Label>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isPopoverOpen}
          className="relative w-full justify-between"
          id="drugName"
        >
          {value
            ? searchedDrugs.find((drug) => drug.name === value)?.name
            : '약물명 검색'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 sm:w-[718px]" defaultValue={drugName}>
        <Command className="w-full">
          <CommandInput placeholder="약물명 검색" />
          <CommandList>
            <CommandEmpty>검색된 약물이 존재하지 않습니다</CommandEmpty>
            <CommandGroup>
              {searchedDrugs.map((drug) => (
                <CommandItem
                  key={drug.name}
                  value={drug.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setDrugName(currentValue)
                    setDrugMassVolume(drug.mass_vol)
                    setIsPopOverOpen(false)
                  }}
                >
                  {drug.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
