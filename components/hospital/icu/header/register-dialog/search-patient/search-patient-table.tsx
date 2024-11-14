import LargeLoaderCircle from '@/components/common/large-loader-circle'
import NoResult from '@/components/common/no-result'
import SearchPatientTableRow from '@/components/hospital/icu/header/register-dialog/search-patient/search-patient-table-row'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { SearchedPatientsData } from '@/types/patients'
import { Dispatch, SetStateAction } from 'react'

export default function SearchPatientTable({
  isSearching,
  searchedPatients,
  setIsEdited,
}: {
  isSearching: boolean
  searchedPatients: SearchedPatientsData[]
  setIsEdited: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-16 text-center">종</TableHead>
          <TableHead className="w-24 text-center">환자 번호</TableHead>
          <TableHead className="w-24 text-center">이름</TableHead>
          <TableHead className="w-32 text-center">품종</TableHead>
          <TableHead className="w-16 text-center">성별</TableHead>
          <TableHead className="w-32 text-center">나이 (생일)</TableHead>
          <TableHead className="w-24 text-center">보호자</TableHead>
          <TableHead className="w-24 text-center">등록일</TableHead>
          <TableHead className="w-16 text-center">수정</TableHead>
          <TableHead className="w-16 text-center">삭제</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isSearching ? (
          <TableRow>
            <TableCell colSpan={10}>
              <LargeLoaderCircle className="h-[400px]" />
            </TableCell>
          </TableRow>
        ) : searchedPatients.length === 0 ? (
          <TableRow>
            <TableCell colSpan={10}>
              <NoResult title="검색 결과가 없습니다" className="h-[400px]" />
            </TableCell>
          </TableRow>
        ) : (
          searchedPatients.map((patient) => (
            <SearchPatientTableRow
              key={patient.patient_id}
              patientData={patient}
              setIsEdited={setIsEdited}
            />
          ))
        )}
      </TableBody>
    </Table>
  )
}
