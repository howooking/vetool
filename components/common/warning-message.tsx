import { AlertCircle } from 'lucide-react'

export default function WarningMessage({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-1 text-destructive">
      <AlertCircle size={18} /> {text}
    </p>
  )
}
