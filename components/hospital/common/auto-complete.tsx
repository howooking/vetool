import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { useSearchKeyWordsStore } from '@/lib/store/hospital/search-keywords'
import { Dispatch, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function AutoComplete({
  inputValue,
  setInputValue,
  isUpdating,
  handleUpdateDiagnosis,
  diagnosis,
}: {
  inputValue: string
  setInputValue: Dispatch<React.SetStateAction<string>>
  isUpdating: boolean
  handleUpdateDiagnosis: () => void
  diagnosis: string
}) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const { search } = useSearchKeyWordsStore()
  const [open, setOpen] = useState(false)
  const [tempInput, setTempInput] = useState('')
  const commandListRef = useRef<HTMLDivElement>(null)

  const debouncedSearch = useDebouncedCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const results = search(inputValue)
      setSuggestions(results)
      if (e.key === 'Enter') {
        handleUpdateDiagnosis()
        setOpen(false)
      }
    },
    500,
  )

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  return (
    <div className="absolute left-0 right-0 top-full">
      <Command className="relative" shouldFilter={false}>
        <Input
          disabled={isUpdating}
          id="diagnosis"
          value={inputValue}
          placeholder="진단명"
          onChange={onInputChange}
          onBlur={handleUpdateDiagnosis}
          onKeyDown={debouncedSearch}
          className="w-full pl-8"
          title={diagnosis}
        />
        {open && (
          <CommandList
            className="z-10 max-h-[300px] rounded-lg border bg-white shadow-lg"
            ref={commandListRef}
          >
            <CommandGroup>
              {suggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion}
                  value={suggestion}
                  onSelect={(currentValue) => {
                    setInputValue(currentValue)
                    setOpen(false)
                    handleUpdateDiagnosis()
                  }}
                >
                  {suggestion}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  )
}
