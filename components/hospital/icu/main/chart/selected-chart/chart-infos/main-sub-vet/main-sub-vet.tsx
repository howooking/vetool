'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import type { Vet, MainAndSubVet } from '@/types/icu'
import Image from 'next/image'
import { useState } from 'react'
import MainSubVetUpdateForm from './main-sub-vet-update-form'
import { Stethoscope, Users } from 'lucide-react'

export function MainSubVet({
  mainVet,
  subVet,
  icuChartId,
  vetsList,
}: {
  mainVet: MainAndSubVet
  subVet: MainAndSubVet | null
  icuChartId: string
  vetsList: Vet[]
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full items-center justify-start gap-2 px-2"
        >
          <Stethoscope size={16} className="text-muted-foreground" />

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Image
                unoptimized
                src={mainVet.avatar_url ?? ''}
                alt={mainVet.name}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span>{mainVet.name}</span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            {subVet ? (
              <div className="flex items-center gap-1">
                <Image
                  unoptimized
                  src={subVet.avatar_url ?? ''}
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
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>주치의 / 부주치의 변경</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <MainSubVetUpdateForm
          setIsDialogOpen={setIsDialogOpen}
          mainVet={mainVet}
          subVet={subVet}
          vetsList={vetsList}
          icuChartId={icuChartId}
        />
      </DialogContent>
    </Dialog>
  )
}
