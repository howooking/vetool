'use client'

import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePatientRegisterStep } from '@/lib/store/icu/icu-register'
import { cn } from '@/lib/utils'
import type { IcuUserList } from '@/types/icu'
import type { PatientData, PatientDataTable } from '@/types/patients'
import { useEffect, useState } from 'react'
import { patientsColumns } from '../../../patients/patient-columns'
import PatientForm from '../../../patients/patient-form'
import RegisterDialogHeader from '../../../patients/register-dialog-header'
import IcuRegisterPatientForm from './icu-register-patient-form'
import IcuChartTypeSelector from './icu-chart-type-selector'

export default function IcuRegisterDialog({
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { step, setStep } = usePatientRegisterStep()
  const [tab, setTab] = useState('search')

  useEffect(() => {
    setTimeout(() => {
      if (!isDialogOpen) {
        setTab('search')
        setStep('patientSearch')
      }
    }, 1000)
  }, [setStep, isDialogOpen])

  const icuRegisterPatientsData: PatientDataTable[] = patientsData.map(
    (patient) => ({
      birth: patient.birth,
      name: patient.name,
      gender: patient.gender,
      breed: patient.breed,
      species: patient.species,
      created_at: patient.created_at,
      hos_id: patient.hos_id,
      patient_id: patient.patient_id,
      microchip_no: patient.microchip_no,
      hos_patient_id: patient.hos_patient_id,
      memo: patient.memo,
      is_alive: patient.is_alive,
      owner_name: patient.owner_name,
      isIcu: true,
    }),
  )

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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">환자입원</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col sm:max-w-[1040px]">
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
              <DataTable
                columns={patientsColumns}
                data={icuRegisterPatientsData}
                searchPlaceHolder="환자번호, 환자이름, 보호자이름을 검색하세요"
                rowLength={8}
              />
            )}
            {step === 'icuRegister' && (
              <IcuRegisterPatientForm
                hosId={hosId}
                groupList={groupList}
                vetsData={vetsData}
                setIsDialogOpen={setIsDialogOpen}
                tab={tab}
              />
            )}
            {step === 'selectChartType' && <IcuChartTypeSelector />}
          </TabsContent>

          <TabsContent value="register">
            {step === 'patientRegister' && (
              <PatientForm
                setStep={setStep}
                hosId={hosId}
                icu
                setIsDialogOpen={setIsDialogOpen}
              />
            )}
            {step === 'icuRegister' && (
              <IcuRegisterPatientForm
                hosId={hosId}
                groupList={groupList}
                vetsData={vetsData}
                setIsDialogOpen={setIsDialogOpen}
                tab={tab}
              />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
