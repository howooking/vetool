import { useState } from 'react'
import { CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import {
  SearchKeywordResult,
  SetAutoCompleteStates,
} from '@/types/hospital/auto-complete'

export default function SuggestionList({
  inputRef,
  setAutoCompleteState,
  suggestions,
}: {
  inputRef: React.RefObject<HTMLInputElement>
  setAutoCompleteState: SetAutoCompleteStates
  suggestions: SearchKeywordResult[]
}) {
  const handleSelect = (selectedSuggestion: SearchKeywordResult) => {
    // 선택한 값 update
    setAutoCompleteState((prev) => ({
      inputValue: '',
      suggestions: [],
      selectedKeywords: [...prev.selectedKeywords, selectedSuggestion],
    }))
  }

  return (
    <CommandList className="absolute z-20 mt-9 max-h-[300px] w-full rounded-lg bg-white shadow-lg">
      {suggestions.length > 0 && (
        <CommandGroup>
          {suggestions.map((suggestion, index) => (
            <CommandItem
              key={index}
              value={suggestion.keyword + suggestion.mainKeyWord}
              onSelect={() => handleSelect(suggestion)}
            >
              {`${suggestion.keyword} (${suggestion.mainKeyWord})`}
            </CommandItem>
          ))}
        </CommandGroup>
      )}
    </CommandList>
  )
}
