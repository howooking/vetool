import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function RegisterDialogHeader({
  step,
}: {
  step: 'patientRegister' | 'icuRegister' | 'patientSearch'
}) {
  return (
    <DialogHeader>
      <DialogTitle>
        {step === 'patientSearch' && '환자 선택'}
        {step === 'patientRegister' && '환자 등록'}
        {step === 'icuRegister' && '입원 등록'}
      </DialogTitle>
      <DialogDescription>
        {step === 'patientSearch' && '환자를 선택해주세요'}
        {step === 'patientRegister' && '신규 환자를 등록합니다'}
        {step === 'icuRegister' && '선택한 환자를 입원합니다'}
      </DialogDescription>
    </DialogHeader>
  )
}
