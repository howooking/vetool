'use client'

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
import { Separator } from '@/components/ui/separator'
import { Activity } from 'lucide-react'
import { useState } from 'react'
import CpcrEtTubeUpdateForm from './cpcr-et-tube-update-form'

export default function CpcrEtTube({
  cpcrEtTube,
  icuIoId,
}: {
  cpcrEtTube: string
  icuIoId: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [cpcr, etTube] = cpcrEtTube.split(',')

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
                심폐소생 여부
                <Separator orientation="vertical" className="h-4" />
                ET Tube
              </div>
            }
            side="left"
            variant="secondary"
          >
            <Activity className="text-muted-foreground" size={16} />
          </CustomTooltip>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span>{cpcr}</span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <span>{etTube}</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>CPCR 여부 / ET Tube 변경</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <CpcrEtTubeUpdateForm
          icuIoId={icuIoId}
          cpcr={cpcr}
          etTube={etTube}
          setIsDialogOpen={setIsDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
