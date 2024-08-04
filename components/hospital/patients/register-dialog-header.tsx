import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function RegisterDialogHeader({
  step,
}: {
  step:
    | 'patientRegister'
    | 'icuRegister'
    | 'patientSearch'
    | 'selectChartType'
    | 'chartSearch'
    | 'bookmarkSearch'
    | 'updatePatient'
}) {
  return (
    <DialogHeader>
      <DialogTitle>
        {step === 'patientSearch' && '환자 선택'}
        {step === 'patientRegister' && '환자 등록'}
        {step === 'icuRegister' && '입원 등록'}
        {step === 'selectChartType' && '차트 유형 선택'}
        {step === 'chartSearch' && '차트 조회'}
        {step === 'bookmarkSearch' && '즐겨찾기 차트 조회'}
        {step === 'updatePatient' && '환자 정보 수정'}
      </DialogTitle>
      <DialogDescription>
        {step === 'patientSearch' && '환자를 선택해주세요'}
        {step === 'patientRegister' && '신규 환자를 등록합니다'}
        {step === 'icuRegister' && '선택한 환자를 입원시킵니다'}
        {step === 'selectChartType' && '생성할 차트의 유형을 선택해주세요'}
        {step === 'bookmarkSearch' && '저장된 차트를 검색하세요'}
        {step === 'updatePatient' && '등록된 환자 정보를 수정합니다'}
      </DialogDescription>
    </DialogHeader>
  )
}
