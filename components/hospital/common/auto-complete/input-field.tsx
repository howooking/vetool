import { Badge } from '@/components/ui/badge'
import { CommandInput } from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { useSearchKeyWordsStore } from '@/lib/store/hospital/search-keywords'
import type {
  AutoCompleteStates,
  SearchKeywordResult,
  SetAutoCompleteStates,
} from '@/types/hospital/auto-complete'
import { X } from 'lucide-react'
import React, { useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function InputField({
  inputRef,
  autoCompleteState,
  setAutoCompleteState,
  handleChange,
  label,
  isUpdating,
}: {
  inputRef: React.RefObject<HTMLInputElement>
  autoCompleteState: AutoCompleteStates
  setAutoCompleteState: SetAutoCompleteStates
  handleChange: (value: string) => void
  label?: string
  isUpdating?: boolean
}) {
  const { search } = useSearchKeyWordsStore()
  const { inputValue, selectedKeywords } = autoCompleteState

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const searchedValues = search(value)

    setAutoCompleteState((prevState) => ({
      ...prevState,
      suggestions: searchedValues,
    }))
  }, 200)

  const formatKeywords = (keywords: SearchKeywordResult[]) => {
    const formattedKeywords = keywords
      .map((value) => value.keyword)
      .filter(Boolean)
      .join(',')

    handleChange(formattedKeywords)
  }

  const handleInputChange = useCallback(
    (value: string) => {
      setAutoCompleteState((prevState) => ({
        ...prevState,
        inputValue: value,
      }))

      debouncedSearch(value)
    },
    [debouncedSearch, setAutoCompleteState],
  )

  const handleKeyUp = useDebouncedCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // 불필요 입력으로 인한 오류 방지
      if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !inputValue) {
        e.preventDefault()
      }

      // 엔터 혹은 콤마 입력 시 수동 입력으로 판별, keyword state 업데이트 진행
      if (
        e.key === ',' ||
        (e.key === 'Enter' && !autoCompleteState.suggestions.length)
      ) {
        let trimmedValue = inputValue.replace(/,$/, '').trim()

        if (trimmedValue === '') return

        setAutoCompleteState((prevState) => ({
          inputValue: '',
          suggestions: [],
          selectedKeywords: [
            ...prevState.selectedKeywords,
            { keyword: trimmedValue, mainKeyWord: '' },
          ],
        }))
      }
    },
    50,
  )

  const handleKeyDown = useDebouncedCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !inputValue) {
        e.preventDefault()
      }

      // 백스페이스 입력 시 해당 keyword state 제거
      if (
        e.key === 'Backspace' &&
        inputValue === '' &&
        selectedKeywords.length > 0
      ) {
        setAutoCompleteState((prevState) => ({
          ...prevState,
          selectedKeywords: prevState.selectedKeywords.slice(0, -1),
        }))
      }
    },
    50,
  )

  const handleRemoveItem = (item: SearchKeywordResult) => {
    setAutoCompleteState((prevState) => ({
      ...prevState,
      selectedKeywords: prevState.selectedKeywords.filter(
        (value) =>
          value.keyword !== item.keyword ||
          value.mainKeyWord !== item.mainKeyWord,
      ),
    }))
    inputRef.current?.focus()
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto rounded-md border py-1 focus-within:border-black">
      <Label
        className="top-[10px] z-10 ml-2 min-w-fit text-xs text-muted-foreground"
        htmlFor="diagnosis"
      >
        {label}
      </Label>

      {selectedKeywords.map(
        (item, index) =>
          item.keyword && (
            <Badge
              key={item.keyword + index}
              className="ml-1 flex items-center whitespace-nowrap pl-2 pr-1 text-xs"
              variant="outline"
              onClick={() => handleRemoveItem(item)}
            >
              <span>{`${item.keyword}${item.mainKeyWord ? ` (${item.mainKeyWord})` : ''}`}</span>
              <X size={12} className="ml-1 flex-shrink-0 cursor-pointer" />
            </Badge>
          ),
      )}
      <div className="[&_[cmdk-input-wrapper]]:border-b-0 [&_[cmdk-input-wrapper]]:px-0">
        <CommandInput
          ref={inputRef}
          id="diagnosis"
          className="h-6 flex-grow overflow-hidden bg-transparent text-sm outline-none"
          value={inputValue}
          onValueChange={handleInputChange}
          onBlur={() => formatKeywords(selectedKeywords)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          disabled={isUpdating}
          autoComplete="off"
        />
      </div>
    </div>
  )
}
