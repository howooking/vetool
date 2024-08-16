import { Dispatch, SetStateAction } from 'react'

export type SearchKeywordResult = {
  keyword: string
}

export type SuggestionListProps = {
  keyword: string
  mainKeyWord: string
}

export type AutoCompleteStates = {
  inputValue: string
  suggestions: SuggestionListProps[]
  selectedKeywords: SearchKeywordResult[]
}

export type SetAutoCompleteStates = Dispatch<SetStateAction<AutoCompleteStates>>
