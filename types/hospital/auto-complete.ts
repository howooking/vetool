import { Dispatch, SetStateAction } from 'react'

export type SearchKeywordResult = {
  keyword: string
  mainKeyWord: string
}

export type AutoCompleteStates = {
  inputValue: string
  suggestions: SearchKeywordResult[]
  selectedKeywords: SearchKeywordResult[]
}

export type SetAutoCompleteStates = Dispatch<SetStateAction<AutoCompleteStates>>
