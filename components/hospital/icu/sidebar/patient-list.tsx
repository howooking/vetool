import PatientButton from '@/components/hospital/icu/sidebar/patient-button'
import { IcuIoPatientJoined } from '@/types/icu'

type IcuSidebarContentProps = {
  filteredIcuIoData: IcuIoPatientJoined[]
  excludedIcuIoData: IcuIoPatientJoined[]
  selectedGroup: string[]
}

export default function PatientList({
  filteredIcuIoData,
  excludedIcuIoData,
  selectedGroup,
}: IcuSidebarContentProps) {
  return (
    <div>
      {filteredIcuIoData.length > 0 ? (
        <ul className="flex flex-col gap-2">
          <span className="text-xs font-bold text-gray-500">
            입원 환자 목록
          </span>
          {filteredIcuIoData.map((data) => (
            <li key={data.icu_io_id} className="w-full">
              <PatientButton data={data} />
            </li>
          ))}
        </ul>
      ) : selectedGroup.length > 0 ? (
        <span className="text-xs font-bold text-gray-500">
          선택된 입원환자 없음
        </span>
      ) : null}

      {excludedIcuIoData.length > 0 && (
        <div>
          <div className="my-4 border-t border-gray-200" />
          <ul className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-500">기타</span>
            {excludedIcuIoData.map((data) => (
              <li key={data.icu_io_id} className="w-full">
                <PatientButton data={data} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
