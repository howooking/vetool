import InputField from '@/components/hospital/common/auto-complete/input-field'
import SuggestionList from '@/components/hospital/common/auto-complete/suggestion-list'
import { Command } from '@/components/ui/command'
import type { AutoCompleteStates } from '@/types/hospital/auto-complete'
import { useEffect, useRef, useState } from 'react'

/**
 * 저장된 Keywords를 탐색하여 키워드 자동완성를 제안하는 컴포넌트
 *
 * @param {string} props.defaultValue - Input Field의 기본값
 * @param {function} props.handleChange - Input Field Change에 따른 이벤트
 * @param {string} props.label - Input의 Label (Optional)
 * @param {boolean} props.isUpdating - Input Field Change Effect (Optional)
 */
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
  const inputRef = useRef<HTMLInputElement>(null)

  const [autoCompleteState, setAutoCompleteState] =
    useState<AutoCompleteStates>({
      inputValue: '',
      suggestions: [],
      selectedKeywords: [],
    })

  // defaultValue의 변경을 감지하고, 변경될 때마다 autoCompleteState를 업데이트
  // TODO: DB상 mainKeyWord를 저장해두지 않기 때문에, 현재는 빈값으로 초기화됨..
  useEffect(() => {
    setAutoCompleteState((prevState) => ({
      ...prevState,
      selectedKeywords: defaultValue
        .split(',')
        .map((keyword) => ({
          keyword: keyword.trim(),
          mainKeyWord: '',
        }))
        .filter((item) => item.keyword !== ''),
    }))
  }, [defaultValue])

  return (
    <div className="w-full">
      <Command>
        <InputField
          inputRef={inputRef}
          autoCompleteState={autoCompleteState}
          setAutoCompleteState={setAutoCompleteState}
          handleChange={handleChange}
          label={label}
          isUpdating={isUpdating}
        />
        <SuggestionList
          inputRef={inputRef}
          suggestions={autoCompleteState.suggestions}
          setAutoCompleteState={setAutoCompleteState}
        />
      </Command>
    </div>
  )
}
