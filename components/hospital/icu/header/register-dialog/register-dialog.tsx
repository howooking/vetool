'use client'

import BookmarkChartTable from '@/components/hospital/icu/header/register-dialog/bookmark-chart-table'
import RegisterPatientForm from '@/components/hospital/icu/header/register-dialog/register-patient-form'
import RegisterTypeSelector from '@/components/hospital/icu/header/register-dialog/register-type-selector'
import IcuSearchChart from '@/components/hospital/icu/main/search/icu-search-chart'
import { patientsColumns } from '@/components/hospital/patients/patient-columns'
import PatientForm from '@/components/hospital/patients/patient-form'
import RegisterDialogHeader from '@/components/hospital/patients/register-dialog-header'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getBookmarkChart } from '@/lib/services/icu/bookmark'
import {
  usePatientRegisterDialog,
  usePatientRegisterStep,
} from '@/lib/store/icu/icu-register'
import { cn } from '@/lib/utils'
import type { IcuChartBookmarkJoined, IcuUserList } from '@/types/icu'
import type { PatientData, PatientDataTable } from '@/types/patients'
import { useEffect, useState } from 'react'

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
  const [bookmarkCharts, setBookmarkCharts] = useState<
    IcuChartBookmarkJoined[]
  >([])
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

    const fetchBookmarkData = async () => {
      const bookmarkData = await getBookmarkChart(hosId)

      setBookmarkCharts(bookmarkData)
    }

    if (step === 'bookmarkSearch') fetchBookmarkData()
  }, [setStep, step, isRegisterDialogOpen, hosId])

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
              <DataTable
                columns={patientsColumns}
                data={icuRegisterPatientsData}
                searchPlaceHolder="환자번호, 환자이름, 보호자이름을 검색하세요"
                rowLength={8}
              />
            )}
            {step === 'icuRegister' && (
              <RegisterPatientForm
                hosId={hosId}
                groupList={groupList}
                vetsData={vetsData}
                tab={tab}
              />
            )}
            {step === 'selectChartType' && <RegisterTypeSelector />}
            {step === 'chartSearch' && <IcuSearchChart type="register" />}
            {step === 'bookmarkSearch' && (
              <BookmarkChartTable
                setStep={setStep}
                bookmarkCharts={bookmarkCharts}
                isRegisterDialogOpen={isRegisterDialogOpen}
              />
            )}
          </TabsContent>

          <TabsContent value="register">
            {step === 'patientRegister' && (
              <PatientForm setStep={setStep} hosId={hosId} icu />
            )}
            {step === 'icuRegister' && (
              <RegisterPatientForm
                hosId={hosId}
                groupList={groupList}
                vetsData={vetsData}
                tab={tab}
              />
            )}
            {step === 'selectChartType' && (
              <RegisterTypeSelector setTab={setTab} />
            )}
            {step === 'chartSearch' && <IcuSearchChart type="register" />}
            {step === 'bookmarkSearch' && (
              <BookmarkChartTable
                setStep={setStep}
                bookmarkCharts={bookmarkCharts}
                isRegisterDialogOpen={isRegisterDialogOpen}
              />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
