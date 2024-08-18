'use client'

import { Textarea } from '@/components/ui/textarea'
import { useKeywordTrieStore } from '@/lib/store/hospital/keyword-trie'
import { cn } from '@/lib/utils'
import { Keyword } from '@/types/hospital/keywords'
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function AutocompleteTextarea({
  className,
}: {
  className?: string
}) {
  const { trie } = useKeywordTrieStore()
  const [input, setInput] = useState<string>('')
  const [suggestions, setSuggestions] = useState<Keyword[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const debouncedSearch = useDebouncedCallback((inputValue: string) => {
    if (trie && inputValue) {
      const results = trie
        .search(inputValue)
        .sort((a, b) => a.keyword.length - b.keyword.length)
        .slice(0, 10)
      setSuggestions(results)
    } else {
      setSuggestions([])
    }
  }, 100)

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = event.target.value
      setInput(inputValue)
      const lastWord = inputValue.split(' ').pop() || ''
      debouncedSearch(lastWord)
      setSelectedIndex(0)
    },
    [debouncedSearch],
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown' || e.key === 'Tab') {
        e.preventDefault()
        setSelectedIndex((prevIndex) =>
          prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1,
        )
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prevIndex) =>
          prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1,
        )
        return
      }

      if (e.key === 'Enter') {
        e.preventDefault()
        const words = input.split(' ')
        words[words.length - 1] = suggestions[selectedIndex].keyword
        setInput(words.join(' '))
        setSuggestions([])
      }
    }
  }

  const handleSuggestionClick = useCallback(
    (suggestion: Keyword) => {
      const words = input.split(' ')
      words[words.length - 1] = suggestion.keyword
      setInput(words.join(' '))
      setSuggestions([])
    },
    [input],
  )

  return (
    <div className={cn('relative', className)}>
      <Textarea
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        rows={10}
      />

      {suggestions.length > 0 && (
        <ul
          className={cn(
            'absolute z-10 overflow-y-auto border bg-white shadow-md',
          )}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`cursor-pointer p-2 text-xs hover:bg-gray-200 ${
                index === selectedIndex ? 'bg-gray-100' : ''
              }`}
            >
              {suggestion.keyword} ({suggestion.mainKeyword})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// 한글
// 위치 이동
