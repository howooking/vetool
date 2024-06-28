import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import PatientRegisterForm from './patient-register-form'

export function PatientRegisterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>환자등록</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>환자등록</DialogTitle>
          <DialogDescription>보호자명을 먼저 검색해주세요.</DialogDescription>
        </DialogHeader>
        <PatientRegisterForm hosId="" />
      </DialogContent>
    </Dialog>
  )
}
