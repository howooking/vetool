import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import DeleteMultipleOrderDialog from './delete-multiple-order-dialog'
import { Button } from '@/components/ui/button'

export default function MultipleOrderStep() {
  return (
    <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
      <DeleteMultipleOrderDialog />

      <DialogClose asChild>
        <Button type="button" variant="outline" tabIndex={-1}>
          닫기
        </Button>
      </DialogClose>

      {/* <Button type="submit" disabled={isUpdating}>
        {isUpdating ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <>{isEditMode ? '변경' : '추가'}</>
        )}
      </Button> */}
    </DialogFooter>
  )
}
