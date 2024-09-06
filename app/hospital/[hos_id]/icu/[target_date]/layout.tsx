import IcuHeader from '@/components/hospital/icu/header/icu-header'
import React from 'react'

export default function IcuPageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { target_date: string; hos_id: string }
}) {
  return (
    <>
      <IcuHeader hosId={params.hos_id} />
      <div>{children}</div>
    </>
  )
}
