import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import type { IcuIoJoined } from '@/types/icu'
import { Menu } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import PatientList from './patient-list'

export function MobilePatientList({
  filteredIcuIoData,
  excludedIcuIoData,
}: {
  filteredIcuIoData: IcuIoJoined[]
  excludedIcuIoData: IcuIoJoined[]
}) {
  const { target_date } = useParams()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const handleCloseMobileDrawer = () => setIsSheetOpen(false)
  const { selectedPatientId } = useIcuSelectedPatientIdStore()

  const selectedPatient = filteredIcuIoData.find(
    (el) => el.patient_id.patient_id === selectedPatientId,
  )?.patient_id

  return (
    <div className="flex items-center border-b md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button className="rounded-none font-semibold" size="icon">
            <Menu size={18} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <SheetHeader>
            <SheetTitle>{target_date}</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <PatientList
            filteredIcuIoData={filteredIcuIoData}
            excludedIcuIoData={excludedIcuIoData}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center justify-center gap-1 pr-[36px] text-sm">
        <span className="font-semibold">{selectedPatient?.name}</span>
        <span className="text-muted-foreground">{selectedPatient?.breed}</span>
      </div>
    </div>
  )
}
