import { SearchX } from 'lucide-react'

export default function NoResult({ title }: { title: string }) {
  return (
    <div className="hospital-page-height flex w-full flex-col items-center justify-center gap-4 pb-20">
      <SearchX className="text-primary" size={96} />
      <span className="text-3xl font-bold">{title}</span>
    </div>
  )
}
