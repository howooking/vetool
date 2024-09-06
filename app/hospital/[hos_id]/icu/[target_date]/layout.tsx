import IcuHeader from '@/components/hospital/icu/header/icu-header'
import TanstackQueryProvider from '@/providers/tanstack-query-provider'
import React from 'react'

export default function IcuPageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { target_date: string; hos_id: string }
}) {
  return (
    <TanstackQueryProvider>
      <IcuHeader hosId={params.hos_id} />
      <div>{children}</div>
    </TanstackQueryProvider>
  )
}
