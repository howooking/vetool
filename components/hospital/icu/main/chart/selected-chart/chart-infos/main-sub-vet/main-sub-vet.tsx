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
import { getVetList } from '@/lib/services/icu/get-staffs'
import type { IcuUserList, MainAndSubVet } from '@/types/icu'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import MainSubVetUpdateForm from './main-sub-vet-update-form'

export function MainSubVet({
  mainVet,
  subVet,
  icuChartId,
}: {
  mainVet: MainAndSubVet
  subVet: MainAndSubVet | null
  icuChartId: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { hos_id } = useParams()
  const [vetsList, setVetsList] = useState<IcuUserList[]>([])

  useEffect(() => {
    getVetList(hos_id as string).then((res) => {
      setVetsList(res)
    })
  }, [hos_id])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full items-center justify-start gap-4 px-2"
        >
          <div className="flex h-4 items-center gap-1 text-xs text-muted-foreground">
            <span>주치의</span>
            <Separator orientation="vertical" />
            <span>부주치의 </span>
          </div>

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
