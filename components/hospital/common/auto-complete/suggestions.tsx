import type { Keyword } from '@/types/hospital/keywords'
import { useCallback } from 'react'

export default function Suggestions({
  suggestions,
  insertSuggestion,
  selectedIndex,
}: {
  suggestions: Keyword[]
  insertSuggestion: (keyword: string) => void
  selectedIndex: number
}) {
  const handleSuggestionClick = useCallback(
    (suggestion: Keyword) => {
      insertSuggestion(suggestion.keyword)
    },
    [insertSuggestion],
  )

  return (
    <ul className="absolute top-10 z-10 w-full overflow-y-auto border bg-white shadow">
      {suggestions.map((suggestion, index) => (
        <li
          key={suggestion.id}
          onMouseDown={(e) => {
            e.preventDefault()
            handleSuggestionClick(suggestion)
          }}
          className={`cursor-pointer bg-white p-2 text-xs hover:bg-gray-200 ${
            index === selectedIndex ? 'bg-gray-100' : ''
          }`}
        >
          {suggestion.keyword} ({suggestion.mainKeyword})
        </li>
      ))}
    </ul>
  )
}
