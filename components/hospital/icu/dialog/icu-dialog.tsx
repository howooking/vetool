'use client'

import IcuRegisterPatient from '@/components/hospital/icu/dialog/icu-register-patient'
import IcuSelectPatient from '@/components/hospital/icu/dialog/icu-select-patient'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAddPatientTriggerStore } from '@/lib/store/hospital/icu/add-patient'
import { Patients } from '@/types/hospital'

export default function IcuDialog({
  hosId,
  patients,
}: {
  hosId: string
  patients: Patients[]
}) {
  const { isOpen, setIsOpen } = useAddPatientTriggerStore()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[1024px]">
        <Tabs defaultValue="search">
          <TabsList className="mb-4">
            <TabsTrigger value="search">환자 조회</TabsTrigger>
            <TabsTrigger value="register">신규 환자 등록</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <IcuSelectPatient patients={patients} />
          </TabsContent>
          <TabsContent value="register">
            <IcuRegisterPatient hostId={hosId} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
