import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePatientRegisterStep } from '@/lib/store/icu/icu-register'
import { useState } from 'react'

type TabValue = 'search' | 'create' | 'bookmark'

export default function IcuSelectChartTypeTab() {
  const [tab, setTab] = useState<TabValue>('bookmark')

  const handleTabValueChange = (value: string) => {
    if (value === 'search') {
      setTab('search')
      return
    }

    if (value === 'bookmark') {
      setTab('bookmark')
      return
    }

    if (value === 'create') {
      setTab('create')
      return
    }
  }
  return (
    <Tabs
      defaultValue="search"
      onValueChange={handleTabValueChange}
      value={tab}
    >
      <TabsList className="w-full">
        <TabsTrigger value="search" className="w-full">
          환자 조회
        </TabsTrigger>
        <TabsTrigger value="bookmark" className="w-full">
          신규 환자 등록
        </TabsTrigger>
        <TabsTrigger value="create" className="w-full">
          신규 환자 등록
        </TabsTrigger>
      </TabsList>

      {/* SEARCH */}
      <TabsContent value="search">
        <h1>search</h1>
      </TabsContent>

      {/* BOOKMARK */}
      <TabsContent value="bookmark">
        <h1>bookmark</h1>
      </TabsContent>

      {/* CREATE */}
      <TabsContent value="create">
        <h1>create</h1>
      </TabsContent>
    </Tabs>
  )
}
