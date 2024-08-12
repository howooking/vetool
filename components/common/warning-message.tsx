import { AlertCircle } from 'lucide-react'

export default function WarningMessage({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-1 text-destructive">
      <AlertCircle size={18} /> {text}
    </span>
  )
}
