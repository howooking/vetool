import { Hospital, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function SelectHospitalPage() {
  return (
    <div className="flex h-screen flex-col">
      <Link
        href="/on-boarding/select-hospital"
        className="flex h-1/2 flex-col items-center justify-center gap-4 bg-zinc-400 text-2xl text-white hover:bg-teal-500"
      >
        <Hospital size={96} />
        등록된 병원에 가입하기
      </Link>
      <Link
        href="/on-boarding/create-hospital"
        className="flex h-1/2 flex-col items-center justify-center gap-4 bg-zinc-400 text-2xl text-white hover:bg-teal-500"
      >
        <Plus size={96} />
        새로운 병원 등록하기
      </Link>
    </div>
  )
}
