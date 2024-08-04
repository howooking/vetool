import { KEYWORDS } from '@/constants/hospital/keywords'
import type { SearchKeywordResult } from '@/types/hospital/auto-complete'
import type { Keyword } from '@/types/hospital/keywords'
import TrieSearch from 'trie-search'
import { create } from 'zustand'

type SearchKeyWordsState = {
  trie: TrieSearch<Keyword>
  search: (keyword: string) => SearchKeywordResult[]

  initialize: () => void
}

export const useSearchKeyWordsStore = create<SearchKeyWordsState>(
  (set, get) => ({
    // 배열 내 요소(key) 검색
    trie: new TrieSearch<Keyword>(['keyword', 'mainkeyword']),

    search: (target: string) => {
      if (!target) return []

      const { trie } = get()
      const results = trie
        .search(target)
        .reduce((acc: SearchKeywordResult[], result) => {
          const item = {
            keyword: result.keyword,
            mainKeyWord: result.mainkeyword,
          }

          acc.push(item)

          return acc
        }, [])

      // keyword의 길이를 기준으로 유사도 정렬
      return results.sort((a, b) => a.keyword.length - b.keyword.length)
    },
    initialize: () => {
      const { trie } = get()

      KEYWORDS.forEach((category) => trie.add(category))
    },
  }),
)

useSearchKeyWordsStore.getState().initialize()
