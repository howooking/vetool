'use client'

import { Card, CardContent } from '@/components/ui/card'
import { VetoolErrors } from '@/types'
import { useMemo, useState } from 'react'
import ErrorLogCard from './error-log-card'
import ErrorTypeFilter from './error-type-filter'

export default function ErrorLogDashboard({
  errorLogs,
}: {
  errorLogs: VetoolErrors[]
}) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredAndSortedLogs = useMemo(() => {
    let filtered = [...errorLogs]

    // 서버 에러 or 클라이언트 에러 필터
    if (filter !== 'all') {
      filtered = filtered.filter((log) =>
        filter === 'server' ? log.is_server : !log.is_server,
      )
    }

    // 검색 필터 (필요한 지는 아직 모르겠음)
    if (search) {
      // 대소문자 영어 구분해야함
      const searchLower = search.toLowerCase()

      filtered = filtered.filter((log) =>
        log.description.toLowerCase().includes(searchLower),
      )
    }

    return filtered
  }, [errorLogs, filter, search])

  return (
    <div className="flex flex-col gap-4">
      <ErrorTypeFilter
        value={filter}
        onChange={setFilter}
        search={search}
        setSearch={setSearch}
      />

      <div>
        {filteredAndSortedLogs.length === 0 ? (
          <Card>
            <CardContent className="flex h-32 items-center justify-center">
              <span className="text-muted-foreground">
                에러가 존재하지 않습니다!
              </span>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedLogs.map((log) => (
            <ErrorLogCard key={log.vetool_error_id} errorLog={log} />
          ))
        )}
      </div>
    </div>
  )
}
