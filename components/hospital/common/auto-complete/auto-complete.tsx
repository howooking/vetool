'use client'

import HelperTooltip from '@/components/common/helper-tooltip'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { useKeywordTrieStore } from '@/lib/store/hospital/keyword-trie'
import { cn } from '@/lib/utils'
import { Keyword } from '@/types/hospital/keywords'
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDebouncedCallback } from 'use-debounce'
import Suggestions from './suggestions'

const getWordAtCursor = (keywords: string, position: number) => {
  const leftPart = keywords.slice(0, position).split(/,\s*/)
  const rightPart = keywords.slice(position).split(/,\s*/)
  const wordAtCursor = (leftPart[leftPart.length - 1] + rightPart[0]).trim()
  return wordAtCursor
}

export default function Autocomplete({
  className,
  label,
  handleUpdate,
  defaultValue,
  isUpdating,
}: {
  className?: string
  label?: string
  handleUpdate?: (value: string) => void
  defaultValue?: string
  isUpdating?: boolean
}) {
  const { trie } = useKeywordTrieStore()
  const [input, setInput] = useState(defaultValue ?? '')
  const [suggestions, setSuggestions] = useState<Keyword[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [cursorPosition, setCursorPosition] = useState(0)
  const autocompleteComponentRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useOutsideClick(autocompleteComponentRef, () => {
    if (suggestions.length === 0) return
    setSuggestions([])
  })

  useEffect(() => {
    setInput(defaultValue ?? '')
  }, [defaultValue])

  const debouncedSearch = useDebouncedCallback(
    (inputValue: string, cursorPos: number) => {
      if (trie && inputValue) {
        const wordAtCursor = getWordAtCursor(inputValue, cursorPos)
        const results = trie
          .search(wordAtCursor)
          .sort((a, b) => a.keyword.length - b.keyword.length)
          .slice(0, 15)
        setSuggestions(results)
      } else {
        setSuggestions([])
      }
    },
    200,
  )

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value
      const cursorPos = event.target.selectionStart || 0
      setInput(inputValue)
      setCursorPosition(cursorPos)
      debouncedSearch(inputValue, cursorPos)
      setSelectedIndex(0)
    },
    [debouncedSearch],
  )

  const insertSuggestion = useCallback(
    (suggestion: string) => {
      const beforeCursor = input.slice(0, cursorPosition).split(/,\s*/)
      const afterCursor = input.slice(cursorPosition).split(/,\s*/)
      beforeCursor[beforeCursor.length - 1] = suggestion
      const newInput = [...beforeCursor, ...afterCursor.slice(1)].join(', ')
      setInput(newInput)
      setSuggestions([])

      // 중간 키워드 수정 후 커서 위치 유지
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          const newCursorPosition = beforeCursor.join(', ').length
          inputRef.current.setSelectionRange(
            newCursorPosition,
            newCursorPosition,
          )
        }
      }, 0)
    },
    [input, cursorPosition],
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(
          (prevIndex) =>
            (prevIndex - 1 + suggestions.length) % suggestions.length,
        )
        break
      case 'Escape':
        e.preventDefault()
        setSuggestions([])
        break
      case 'Tab':
        setSuggestions([])
        break
      case 'Enter':
        e.preventDefault()
        insertSuggestion(suggestions[selectedIndex].keyword)
        break
    }
  }

  return (
    <div
      className={cn('relative w-full', className)}
      ref={autocompleteComponentRef}
    >
      {label && (
        <Label
          className="absolute left-2 top-2.5 text-xs text-muted-foreground"
          htmlFor={label}
        >
          {label}
        </Label>
      )}

      <Input
        id={label}
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={cn(label ? 'pl-8' : '')}
        onBlur={() => handleUpdate!(input)}
        disabled={isUpdating}
      />

      {suggestions.length > 0 && (
        <Suggestions
          suggestions={suggestions}
          insertSuggestion={insertSuggestion}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )}

      <HelperTooltip className="absolute right-2 top-2">
        키워드는 콤마 또는 스페이스로 구분됩니다
      </HelperTooltip>
    </div>
  )
}
