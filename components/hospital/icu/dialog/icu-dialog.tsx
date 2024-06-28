'use client'

import IcuAddPatient from '@/components/hospital/icu/dialog/icu-add-patient'
import IcuSelectPatient from '@/components/hospital/icu/dialog/icu-select-patient'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAddPatientTriggerStore } from '@/lib/store/hospital/icu/add-patient'
import type { IcuDialogProps } from '@/types/hospital/icu'
import { DialogTrigger } from '@radix-ui/react-dialog'

export default function IcuDialog({
  hosId,
  icuIoId,
  patients,
  groupList,
  vets,
}: IcuDialogProps) {
  const { isOpen, setIsOpen } = useAddPatientTriggerStore()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="absolute left-[200px] top-1.5">
        <div className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          <span>입원 환자 등록</span>
        </div>
      </DialogTrigger>
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
              icuIoId={icuIoId}
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
