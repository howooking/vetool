'use client'

import { columns } from '@/components/on-boarding/select-hospital/columns'
import DataTable from '@/components/ui/data-table'
import useIsMobile from '@/hooks/use-is-mobile'
import type { SelectHosptialDataTable } from '@/types/on-boarding'
import { useEffect, useState } from 'react'

export default function HospitalsTable({
  hospitalsData,
}: {
  hospitalsData: SelectHosptialDataTable[]
}) {
  const isMobile = useIsMobile()
  const [customColumnVisibility, setCustomColumnVisibility] = useState({})

  useEffect(() => {
    if (isMobile) {
      setCustomColumnVisibility({
        city: false,
        district: false,
      })
    } else {
      setCustomColumnVisibility({
        city: true,
        district: true,
      })
    }
  }, [isMobile])

  return (
    <DataTable
      columns={columns}
      data={hospitalsData}
      searchPlaceHolder="병원을 검색해주세요"
      rowLength={8}
      customColumnVisibility={customColumnVisibility}
    />
  )
}
