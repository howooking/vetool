import HomepageHeader from '@/components/common/homepage-header'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
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
