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
        <Button variant="outline" className="flex w-full items-center gap-2">
          <div className="flex items-center gap-1">
            <Image
              unoptimized
              src={mainVet.avatar_url ?? ''}
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
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>주치의 / 부주치의 변경</DialogTitle>
          <DialogDescription></DialogDescription>
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
