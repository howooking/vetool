'use client'

import VetsUpdateForm from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/vets/vets-update-form'
import { Button } from '@/components/ui/button'
import CustomTooltip from '@/components/ui/custom-tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-privider'
import type { MainAndSubVet } from '@/types/icu/chart'
import { Stethoscope } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import VetName from './vet-name'

export default function Vets({
  mainVet,
  subVet,
  icuChartId,
}: {
  mainVet: MainAndSubVet
  subVet: MainAndSubVet | null
  icuChartId: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const {
    basicHosData: { vetsListData },
  } = useBasicHosDataContext()

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full items-center justify-start gap-2 px-2"
        >
          <CustomTooltip
            contents={
              <div className="flex items-center gap-2">
                주치의 <Separator orientation="vertical" className="h-4" />{' '}
                부주치의
              </div>
            }
            side="left"
            variant="secondary"
          >
            <Stethoscope size={16} className="text-muted-foreground" />
          </CustomTooltip>

          <div className="flex items-center gap-2">
            <VetName
              label="주치의"
              name={mainVet.name}
              avatarUrl={mainVet.avatar_url}
            />

            <Separator orientation="vertical" className="h-4" />

            {subVet?.name ? (
              <VetName
                label="부주치의"
                name={subVet.name}
                avatarUrl={subVet.avatar_url}
              />
            ) : (
              '미선택'
            )}

            <Separator orientation="vertical" className="h-4" />

            <VetName
              label="당일"
              name={mainVet.name}
              avatarUrl={mainVet.avatar_url}
            />
            <Separator orientation="vertical" className="h-4" />

            <VetName
              label="오전"
              name={mainVet.name}
              avatarUrl={mainVet.avatar_url}
            />
            <Separator orientation="vertical" className="h-4" />

            <VetName
              label="오후"
              name={mainVet.name}
              avatarUrl={mainVet.avatar_url}
            />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>담당의 변경</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <VetsUpdateForm
          setIsDialogOpen={setIsDialogOpen}
          mainVet={mainVet}
          subVet={subVet}
          vetsList={vetsListData}
          icuChartId={icuChartId}
        />
      </DialogContent>
    </Dialog>
  )
}
