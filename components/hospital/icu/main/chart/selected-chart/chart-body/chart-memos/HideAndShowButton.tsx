import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export default function HideAndShowButton({
  isShow,
  setIsShow,
}: {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Button
      className="absolute -top-1 right-1 h-6 w-6 text-muted-foreground"
      size="icon"
      variant="ghost"
      onClick={() => setIsShow((prev) => !prev)}
    >
      {isShow ? <Eye size={14} /> : <EyeOff size={14} />}
    </Button>
  )
}
