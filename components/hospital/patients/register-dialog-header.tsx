import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function RegisterDialogHeader({
  step,
}: {
  step:
    | 'ownerSearch'
    | 'ownerRegister'
    | 'patientRegister'
    | 'icuRegister'
    | 'patientSearch'
}) {
  return (
    <DialogHeader>
      <DialogTitle>
        {step === 'patientSearch' && '환자 선택'}
        {step === 'ownerSearch' && '보호자 선택'}
        {step === 'ownerRegister' && '보호자 등록'}
        {step === 'patientRegister' && '환자 등록'}
        {step === 'icuRegister' && '입원 등록'}
      </DialogTitle>
      <DialogDescription>
        {step === 'patientSearch' && '환자를 선택해주세요'}
        {step === 'ownerSearch' && '환자를 등록하기 전 보호자를 선택해주세요'}
        {step === 'ownerRegister' && '환자를 등록하기 전 보호자를 등록해주세요'}
        {step === 'patientRegister' &&
          '환자를 등록하기 전 보호자를 등록해주세요'}
        {step === 'icuRegister' && '선택한 환자를 입원시킵니다'}
      </DialogDescription>
    </DialogHeader>
  )
}
