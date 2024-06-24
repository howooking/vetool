'use client'

import IcuAddPatient from '@/components/hospital/icu/dialog/icu-add-patient'
import IcuSelectPatient from '@/components/hospital/icu/dialog/icu-select-patient'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAddPatientTriggerStore } from '@/lib/store/hospital/icu/add-patient'
import type { IcuDialogProps } from '@/types/hospital/icu'

export default function IcuDialog({
  hosId,
  patients,
  groupList,
  vets,
}: IcuDialogProps) {
  const { isOpen, setIsOpen } = useAddPatientTriggerStore()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[1024px]">
        <Tabs defaultValue="search">
          <TabsList className="mb-4">
            <TabsTrigger value="search">환자 조회</TabsTrigger>
            <TabsTrigger value="register">신규 환자 등록</TabsTrigger>
          </TabsList>

          {/* 등록된 환자 조회 */}
          <TabsContent value="search">
            <IcuSelectPatient
              hosId={hosId}
              patients={patients}
              groupList={groupList}
              vets={vets}
            />
          </TabsContent>

          {/* 신규 환자 등록 */}
          <TabsContent value="register">
            <IcuAddPatient hosId={hosId} groupList={groupList} vets={vets} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
