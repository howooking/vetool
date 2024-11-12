'use client'

import RegisterDialogHeader from '@/components/hospital/icu/header/register-dialog/register-dialog-header'
import RegisterIcuForm from '@/components/hospital/icu/header/register-dialog/register-icu/register-icu-form'
import PatientForm from '@/components/hospital/patients/patient-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useIcuRegisterStore } from '@/lib/store/icu/icu-register'
import { cn } from '@/lib/utils/utils'
import type { Vet } from '@/types/icu/chart'
import type { PatientData } from '@/types/patients'
import { useEffect, useMemo, useState } from 'react'
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
  vetsData: Vet[]
}) {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const { step, setStep } = useIcuRegisterStore()
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

  const hosPatientIds = useMemo(
    () => patientsData.map((patient) => patient.hos_patient_id),
    [patientsData],
  )

  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
      <DialogTrigger asChild className="hidden md:block">
        <Button size="sm">환자입원</Button>
      </DialogTrigger>

      <DialogContent
        className="flex min-h-[720px] flex-col sm:max-w-[1200px]"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <RegisterDialogHeader step={step} />

        <Tabs
          defaultValue="search"
          onValueChange={handleTabValueChange}
          value={tab}
        >
          <TabsList
            className={cn('mb-2 w-full', step === 'icuRegister' && 'hidden')}
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
                setIsRegisterDialogOpen={setIsRegisterDialogOpen}
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
                mode="registerFromIcuRoute"
                setStep={setStep}
                hosId={hosId}
                setIsPatientRegisterDialogOpen={setIsRegisterDialogOpen}
                hosPatientIds={hosPatientIds}
              />
            )}
            {step === 'icuRegister' && (
              <RegisterIcuForm
                setIsRegisterDialogOpen={setIsRegisterDialogOpen}
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
