import InputField from '@/components/hospital/common/auto-complete/(unused)input-field'
import SuggestionList from '@/components/hospital/common/auto-complete/(unused)suggestion-list'
import { Command } from '@/components/ui/command'
import type { AutoCompleteStates } from '@/types/hospital/auto-complete'
import { useEffect, useRef, useState } from 'react'

export default function AutoComplete({
  defaultValue,
  handleChange,
  label,
  isUpdating,
}: {
  defaultValue: string
  handleChange: (value: string) => void
  label?: string
  isUpdating?: boolean
}) {
  // 복잡한 경우 스테이트를 분리하는게 좋음
  const [autoCompleteState, setAutoCompleteState] =
    useState<AutoCompleteStates>({
      inputValue: '',
      suggestions: [],
      selectedKeywords: [],
    })

  const autoCompleteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setAutoCompleteState((prevState) => ({
      ...prevState,
      selectedKeywords: defaultValue
        .split(',')
        .map((keyword) => ({
          keyword: keyword.trim(),
        }))
        .filter((item) => item.keyword !== ''),
    }))
  }, [defaultValue])

  // 외부 클릭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autoCompleteRef.current &&
        !autoCompleteRef.current.contains(event.target as Node)
      ) {
        setAutoCompleteState((prevState) => ({
          ...prevState,
          suggestions: [],
          inputValue: '',
        }))
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="w-full" ref={autoCompleteRef}>
      <Command loop>
        <InputField
          autoCompleteState={autoCompleteState}
          setAutoCompleteState={setAutoCompleteState}
          handleChange={handleChange}
          label={label}
          isUpdating={isUpdating}
        />
        <SuggestionList
          suggestions={autoCompleteState.suggestions}
          setAutoCompleteState={setAutoCompleteState}
        />
      </Command>
    </div>
  )
}
