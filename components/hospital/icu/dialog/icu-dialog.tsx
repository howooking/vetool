'use client'

import NoResult from '@/components/common/no-result'
import DataTable from '@/components/ui/data-table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePatientRegisterStep } from '@/lib/store/hospital/patients/selected-patient'
import type { IcuDialogProps } from '@/types/hospital/icu'
import { PatientDataTable } from '@/types/hospital/patients'
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import OwnerForm from '../../patients/owner-form'
import OwnerSearch from '../../patients/owner-search'
import { patientsColumns } from '../../patients/patient-columns'
import PatientForm from '../../patients/patient-form'
import IcuRegisterPatientForm from '../register/icu-register-patient-form'

export default function IcuDialog({
  hosId,
  icuIoId,
  patients,
  groupList,
  vets,
  ownerData,
}: Omit<IcuDialogProps, 'setIsDialogOpen'>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { step, setStep } = usePatientRegisterStep()

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
  }))

  const handleTabValueChange = (value: string) => {
    console.log(value)
    if (value === 'search') {
      if (step !== 'patientSearch') {
        return setStep('patientSearch')
      }
    }

    if (value === 'register') {
      if (step !== 'ownerSearch') {
        return setStep('ownerSearch')
      }
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="absolute left-[200px] top-1.5">
        <div className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          <span>입원 환자 등록</span>
        </div>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col sm:max-w-[1000px]"
        style={{ minHeight: step === 'ownerSearch' ? '736px' : 'auto' }}
      >
        <Tabs defaultValue="search" onValueChange={handleTabValueChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="search">환자 조회</TabsTrigger>
            <TabsTrigger value="register">신규 환자 등록</TabsTrigger>
          </TabsList>

          {/* 등록된 환자 조회 */}
          <TabsContent value="search">
            {step === 'patientSearch' && (
              <>
                {patients.length === 0 ? (
                  <NoResult title="환자가 없습니다." />
                ) : (
                  <DataTable
                    columns={patientsColumns}
                    data={data}
                    searchPlaceHolder="환자번호, 환자이름, 보호자이름을 검색하세요."
                    rowLength={8}
                  />
                )}
              </>
            )}

            {step === 'icuRegister' && (
              <IcuRegisterPatientForm
                hosId={hosId}
                icuIoId={icuIoId}
                groupList={groupList}
                vets={vets}
                setIsDialogOpen={setIsDialogOpen}
              />
            )}
          </TabsContent>

          {/* 신규 환자 등록 */}
          <TabsContent value="register">
            <DialogHeader>
              <DialogTitle>
                {step === 'ownerSearch' && '보호자 검색'}
                {step === 'ownerRegister' && '보호자 등록'}
                {step === 'patientRegister' && '환자 등록'}
              </DialogTitle>
              <DialogDescription>
                {step === 'ownerSearch' && '환자등록 전 보호자를 선택해주세요'}
                {step === 'ownerRegister' &&
                  '환자등록 전 보호자를 등록해주세요.'}
              </DialogDescription>
            </DialogHeader>

            {step === 'ownerSearch' && (
              <OwnerSearch ownerData={ownerData} setStep={setStep} />
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
                icuIoId={icuIoId}
                groupList={groupList}
                vets={vets}
                setIsDialogOpen={setIsDialogOpen}
              />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
