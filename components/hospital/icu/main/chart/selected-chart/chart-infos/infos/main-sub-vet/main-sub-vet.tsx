'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { IcuVetList, MainAndSubVet } from '@/types/icu'
import Image from 'next/image'
import { useState } from 'react'
import MainSubVetUpdateForm from './main-sub-vet-update-form'

export function MainSubVet({
  mainVet,
  subVet,
  vetsData,
  icuChartId,
}: {
  mainVet: MainAndSubVet
  subVet: MainAndSubVet | null
  vetsData: IcuVetList[]
  icuChartId: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex w-48 items-center gap-2">
          <div className="flex items-center gap-1">
            <Image
              unoptimized
              src={mainVet.avatar_url}
              alt={mainVet.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            {`${mainVet.name}`}
          </div>
          <span>/</span>
          {subVet ? (
            <div className="flex items-center gap-1">
              <Image
                unoptimized
                src={subVet.avatar_url}
                alt={subVet.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              {`${subVet.name}`}
            </div>
          ) : (
            '미선택'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>주치의 / 부주치의 변경</DialogTitle>
        </DialogHeader>
        <MainSubVetUpdateForm
          setIsDialogOpen={setIsDialogOpen}
          mainVet={mainVet}
          subVet={subVet}
          vetsData={vetsData}
          icuChartId={icuChartId}
        />
      </DialogContent>
    </Dialog>
  )
}
