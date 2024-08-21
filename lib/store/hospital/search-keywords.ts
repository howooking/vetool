import { KEYWORDS } from '@/constants/hospital/keywords'
import type { Suggestion } from '@/types/hospital/auto-complete'
import type { Keyword } from '@/types/hospital/keywords'
import TrieSearch from 'trie-search'
import { create } from 'zustand'

type SearchKeyWordsState = {
  koreanTrie: TrieSearch<Keyword>
  nonKoreanTrie: TrieSearch<Keyword>
  search: (keyword: string) => Suggestion[]
  initialize: () => void
}

const isKorean = (str: string) => /[가-힣]/.test(str)

export const useSearchKeyWordsStore = create<SearchKeyWordsState>(
  (set, get) => ({
    // 배열 내 요소(key) 검색
    koreanTrie: new TrieSearch<Keyword>(['keyword', 'mainkeyword'], { min: 1 }),
    nonKoreanTrie: new TrieSearch<Keyword>(['keyword', 'mainkeyword'], {
      min: 2,
    }),

    search: (target: string) => {
      if (!target) return []

      const { koreanTrie, nonKoreanTrie } = get()
      const trie = isKorean(target) ? koreanTrie : nonKoreanTrie

      const results = trie
        .search(target)
        .reduce((acc: Suggestion[], result) => {
          const item = {
            keyword: result.keyword,
            mainKeyWord: result.mainKeyword,
          }

          acc.push(item)

          return acc
        }, [])

      // keyword의 길이를 기준으로 유사도 정렬
      return results.sort((a, b) => a.keyword.length - b.keyword.length)
    },
    initialize: () => {
      const { koreanTrie, nonKoreanTrie } = get()

      KEYWORDS.forEach((category) => {
        if (isKorean(category.keyword)) {
          koreanTrie.add(category)
        } else {
          nonKoreanTrie.add(category)
        }
      })
    },
  }),
)

useSearchKeyWordsStore.getState().initialize()
