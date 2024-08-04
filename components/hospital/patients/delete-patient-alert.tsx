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
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

export default function DeletePatientAlert({
  patientId,
  isLoading,
  onDelete,
}: {
  patientId: string
  isLoading: boolean
  onDelete: (patientId: string) => void
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault()
          }}
        >
          삭제
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>등록된 환자정보 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            등록된 환자정보 삭제를 삭제하시겠습니까? 이 동작은 되돌릴 수
            없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete(patientId)}
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
