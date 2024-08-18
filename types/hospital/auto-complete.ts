import { Dispatch, SetStateAction } from 'react'

export type SearchKeywordResult = {
  keyword: string
}

export type Suggestion = {
  keyword: string
  mainKeyWord: string
}

export type AutoCompleteStates = {
  inputValue: string
  suggestions: Suggestion[]
  selectedKeywords: SearchKeywordResult[]
}

export type SetAutoCompleteStates = Dispatch<SetStateAction<AutoCompleteStates>>
