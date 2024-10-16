import AddTemplateTable from '@/components/hospital/icu/main/template/add/add-template-table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit } from 'lucide-react'

export default function EditTemplateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Edit size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>템플릿 생성</DialogTitle>
          <DialogDescription>
            병원의 고유한 템플릿을 생성할 수 있습니다
          </DialogDescription>
        </DialogHeader>
        <AddTemplateTable />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
