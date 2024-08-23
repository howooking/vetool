import logoWhite from '@/public/logo-white.svg'
import Image from 'next/image'
import React from 'react'

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen w-3/5 items-center justify-center bg-primary">
        <Image alt="vetool logo" src={logoWhite} unoptimized width={320} />
      </div>

      <div className="relative flex h-screen w-2/5 flex-col items-center justify-center gap-10 p-8">
        {children}
      </div>
    </div>
  )
}
