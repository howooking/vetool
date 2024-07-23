import { Squirrel } from 'lucide-react'

export default function NoPatients() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-10">
      <Squirrel size={40} className="hover:scale-x-[-1]" />
      <span className="text-xs font-bold">입원환자 없음</span>
    </div>
  )
}
