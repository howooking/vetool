import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import type { IcuIoJoined } from '@/types/icu'
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleCloseMobileDrawer = () => setIsDrawerOpen(false)

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild className="block md:hidden">
        <Button className="rounded-none font-semibold">입원환자 목록</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{target_date} 입원환자</DrawerTitle>
          </DrawerHeader>

          <div className="max-h-[560px] overflow-y-auto p-4">
            <PatientList
              filteredIcuIoData={filteredIcuIoData}
              excludedIcuIoData={excludedIcuIoData}
              handleCloseMobileDrawer={handleCloseMobileDrawer}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
