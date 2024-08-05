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
  // Auto Complete Select Handler
  const handleSelect = (selectedSuggestion: SearchKeywordResult) => {
    // 선택한 값 update
    setAutoCompleteState((prev) => ({
      inputValue: '',
      suggestions: [],
      selectedKeywords: [...prev.selectedKeywords, selectedSuggestion],
    }))

    inputRef.current?.focus()
  }

  return (
    <>
      {suggestions.length > 0 && (
        <CommandList className="absolute z-20 mt-9 max-h-[300px] w-full rounded-lg border bg-white shadow-lg">
          <CommandGroup>
            {suggestions.map((suggestion, index) => (
              <CommandItem
                key={suggestion.keyword + index}
                value={suggestion.keyword + suggestion.mainKeyWord}
                onSelect={() => handleSelect(suggestion)}
              >
                {`${suggestion.keyword} (${suggestion.mainKeyWord})`}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </>
  )
}
