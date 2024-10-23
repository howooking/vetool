import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { ReactNode } from 'react'

export default function AddTemplateDialog({
  isOpen,
  onOpenChange,
  children,
  isEditMode,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  children: ReactNode
  isEditMode?: boolean
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-0.5"
        >
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>오더 {isEditMode ? '수정' : '추가'}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {isOpen ? children : null}
      </DialogContent>
    </Dialog>
  )
}
