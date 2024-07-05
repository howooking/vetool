'use client'

import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePatientRegisterStep } from '@/lib/store/hospital/patients/selected-patient'
import { cn } from '@/lib/utils'
import type { Owner, Vet } from '@/types/hospital'
import type { PatientData, PatientDataTable } from '@/types/hospital/patients'
import { useEffect, useState } from 'react'
import OwnerForm from '../../../patients/owner-form'
import OwnerSearch from '../../../patients/owner-search'
import { patientsColumns } from '../../../patients/patient-columns'
import PatientForm from '../../../patients/patient-form'
import RegisterDialogHeader from '../../../patients/register-dialog-header'
import IcuRegisterPatientForm from './icu-register-patient-form'

export default function IcuRegisterDialog({
  hosId,
  patients,
  groupList,
  vets,
  ownersData,
}: {
  hosId: string
  patients: PatientData[]
  groupList: string[]
  vets: Vet[]
  ownersData: Owner[]
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { step, setStep } = usePatientRegisterStep()
  const [tab, setTab] = useState('search')

  useEffect(() => {
    setTimeout(() => {
      setStep('patientSearch')
    }, 500)
  }, [setStep, isDialogOpen])

  const data: PatientDataTable[] = patients.map((patient) => ({
    birth: patient.birth,
    name: patient.name,
    gender: patient.gender,
    breed: patient.breed,
    species: patient.species,
    owner_id: patient.owner_id.owner_id,
    created_at: patient.created_at,
    hos_id: patient.hos_id,
    patient_id: patient.patient_id,
    microchip_no: patient.microchip_no,
    hos_owner_id: patient.owner_id.hos_owner_id,
    hos_patient_id: patient.hos_patient_id,
    memo: patient.memo,
    is_alive: patient.is_alive,
    owner_address: patient.owner_id.owner_address,
    owner_level: patient.owner_id.owner_level,
    owner_memo: patient.owner_id.owner_memo,
    owner_name: patient.owner_id.owner_name,
    owner_phone_number: patient.owner_id.owner_phone_number,
    isIcu: true,
  }))

  const handleTabValueChange = (value: string) => {
    if (value === 'search') {
      setTab('search')
      setStep('patientSearch')
      return
    }

    if (value === 'register') {
      setTab('register')
      setStep('ownerSearch')
      return
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (!isDialogOpen) {
        setTab('search')
        setStep('patientSearch')
      }
    }, 1000)
  }, [setStep, isDialogOpen])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <DataTable
                columns={patientsColumns}
                data={data}
                searchPlaceHolder="환자번호, 환자이름, 보호자이름을 검색하세요"
                rowLength={8}
              />
            )}

            {step === 'icuRegister' && (
              <IcuRegisterPatientForm
                hosId={hosId}
                groupList={groupList}
                vets={vets}
                setIsDialogOpen={setIsDialogOpen}
                tab={tab}
                setTab={setTab}
              />
            )}
          </TabsContent>

          <TabsContent value="register">
            {step === 'ownerSearch' && (
              <OwnerSearch ownersData={ownersData} setStep={setStep} />
            )}
            {step === 'ownerRegister' && <OwnerForm setStep={setStep} icu />}
            {step === 'patientRegister' && (
              <PatientForm
                setStep={setStep}
                hosId={hosId}
                setIsDialogOpen={setIsDialogOpen}
                icu
              />
            )}
            {step === 'icuRegister' && (
              <IcuRegisterPatientForm
                hosId={hosId}
                groupList={groupList}
                vets={vets}
                setIsDialogOpen={setIsDialogOpen}
                tab={tab}
                setTab={setTab}
              />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
