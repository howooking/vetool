import HomepageHeader from '@/components/homepage/homepage-header'
import React from 'react'

export default function HompageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <HomepageHeader />
      <main>{children}</main>
    </div>
  )
}
