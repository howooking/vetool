import { Squirrel } from 'lucide-react'

export default function NoResultSquirrel({ text }: { text: string }) {
  return (
    <div className="group flex h-52 items-center justify-center gap-2 text-sm text-muted-foreground">
      <Squirrel className="group-hover:scale-x-[-1]" />
      <span>{text}</span>
    </div>
  )
}
