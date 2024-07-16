import { Button } from '@/components/ui/button'

export default function IcuIconButton({
  icon: Icon,
  onClick,
}: {
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >
  onClick?: () => void
}) {
  return (
    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClick}>
      <Icon className="h-3 w-3" />
    </Button>
  )
}
