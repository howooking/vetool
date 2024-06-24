import { Hospital, Plus } from 'lucide-react'
import Link from 'next/link'

export default function SelectHospitalPage() {
  return (
    <div className="flex h-screen items-center justify-center gap-10">
      <Link
        href="/on-boarding/select-hospital"
        className="flex h-[400px] w-[400px] flex-col items-center justify-center gap-4 rounded-lg bg-zinc-400 text-2xl text-white hover:bg-primary"
      >
        <Hospital size={96} />
        등록된 병원에 가입하기
      </Link>
      <Link
        href="/on-boarding/create-hospital"
        className="flex h-[400px] w-[400px] flex-col items-center justify-center gap-4 rounded-lg bg-zinc-400 text-2xl text-white hover:bg-primary"
      >
        <Plus size={96} />
        새로운 병원 등록하기
      </Link>
    </div>
  )
}
