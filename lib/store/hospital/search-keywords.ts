import { KEYWORDS } from '@/constants/hospital/keywords'
import type { Keyword } from '@/types/hospital/keywords'
import TrieSearch from 'trie-search'
import create from 'zustand'

type SearchKeyWordsState = {
  trie: TrieSearch<Keyword>
  search: (keyword: string) => string[]
  initialize: () => void
}

export const useSearchKeyWordsStore = create<SearchKeyWordsState>(
  (set, get) => ({
    trie: new TrieSearch<Keyword>('keyword'),
    search: (prefix: string) => {
      const { trie } = get()

      return trie.search(prefix).map((result) => result.keyword)
    },
    initialize: () => {
      const { trie } = get()
      KEYWORDS.forEach((category) => trie.add(category))
    },
  }),
)

useSearchKeyWordsStore.getState().initialize()
