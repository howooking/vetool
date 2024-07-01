import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { Owner } from '@/types/hospital'
import { ownerColumns } from './owner-columns'

export default function OwnerSearch({
  ownerData,
  setStep,
}: {
  ownerData: Owner[]
  setStep: (step: 'ownerSearch' | 'ownerRegister' | 'patientRegister') => void
}) {
  return (
    <>
      <DataTable
        columns={ownerColumns}
        data={ownerData}
        searchPlaceHolder="보호자번호, 이름, 연락처을 검색하세요"
        rowLength={8}
      />

      <Button
        onClick={() => setStep('ownerRegister')}
        className="absolute bottom-6 right-6"
      >
        새로운 보호자 등록
      </Button>
    </>
  )
}
