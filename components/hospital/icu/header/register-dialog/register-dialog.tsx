'use client'

import RegisterDialogHeader from '@/components/hospital/icu/header/register-dialog/register-dialog-header'
import RegisterIcuForm from '@/components/hospital/icu/header/register-dialog/register-icu/register-icu-form'
import PatientForm from '@/components/hospital/patients/patient-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  usePatientRegisterDialog,
  usePatientRegisterStep,
} from '@/lib/store/icu/icu-register'
import { cn } from '@/lib/utils'
import type { IcuUserList } from '@/types/icu'
import type { PatientData } from '@/types/patients'
import { useEffect, useState } from 'react'
import PatientSearchTable from './patient-search/patient-search-table'

export default function RegisterDialog({
  hosId,
  patientsData,
  groupList,
  vetsData,
}: {
  hosId: string
  patientsData: PatientData[]
  groupList: string[]
  vetsData: IcuUserList[]
}) {
  const { isRegisterDialogOpen, setIsRegisterDialogOpen } =
    usePatientRegisterDialog()
  const { step, setStep } = usePatientRegisterStep()
  const [tab, setTab] = useState('search')

  useEffect(() => {
    setTimeout(() => {
      if (!isRegisterDialogOpen) {
        setTab('search')
        setStep('patientSearch')
      }
    }, 1000)
  }, [isRegisterDialogOpen, setStep])

  const handleTabValueChange = (value: string) => {
    if (value === 'search') {
      setTab('search')
      setStep('patientSearch')
      return
    }

    if (value === 'register') {
      setTab('register')
      setStep('patientRegister')
      return
    }
  }

  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">환자입원</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1200px]">
        <RegisterDialogHeader step={step} />

        <Tabs
          defaultValue="search"
          onValueChange={handleTabValueChange}
          value={tab}
        >
          <TabsList
            className={cn('w-full', step === 'icuRegister' && 'hidden')}
          >
            <TabsTrigger value="search" className="w-full">
              환자 조회
            </TabsTrigger>
            <TabsTrigger value="register" className="w-full">
              신규 환자 등록
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            {step === 'patientSearch' && (
              <PatientSearchTable patientData={patientsData} />
            )}
            {step === 'icuRegister' && (
              <RegisterIcuForm
                hosId={hosId}
                groupList={groupList}
                vetsData={vetsData}
                tab={tab}
              />
            )}
          </TabsContent>

          <TabsContent value="register">
            {step === 'patientRegister' && (
              <PatientForm
                setStep={setStep}
                hosId={hosId}
                icu
                setIsIcuDialogOpen={setIsRegisterDialogOpen}
              />
            )}
            {step === 'icuRegister' && (
              <RegisterIcuForm
                hosId={hosId}
                groupList={groupList}
                vetsData={vetsData}
                tab={tab}
              />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
