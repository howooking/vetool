import WarningMessage from '@/components/common/warning-message'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import { deletePatient } from '@/lib/services/patient/patient'
import { cn } from '@/lib/utils'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeletePatientAlert({
  patientName,
  patientId,
  setIsDropDownMenuOpen,
}: {
  patientName: string
  patientId: string
  setIsDropDownMenuOpen: (isOpen: boolean) => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { refresh } = useRouter()

  const handleDeletePatient = async (patientId: string) => {
    setIsLoading(true)

    await deletePatient(patientId)

    toast({
      title: `${patientName}이(가)) 삭제되었습니다.`,
    })

    setIsLoading(false)
    setIsDropDownMenuOpen(false)
    refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="flex w-full items-center gap-2"
          onSelect={(event) => {
            event.preventDefault()
          }}
        >
          <Trash2 size={16} />
          삭제
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{patientName} 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            등록된 환자를 삭제합니다
            <WarningMessage
              text="이 동작은 되돌릴 수
            없습니다"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsDropDownMenuOpen(false)}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeletePatient(patientId)}
            className="bg-destructive hover:bg-destructive/90"
          >
            삭제
            <LoaderCircle
              className={cn(isLoading ? 'ml-2 animate-spin' : 'hidden')}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
