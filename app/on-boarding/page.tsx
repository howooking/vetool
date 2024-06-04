import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function SelectHospitalPage() {
  return (
    <div className="flex">
      <Button>
        <Link href="/on-boarding/select-hospital">등록된 병원에 가입하기</Link>
      </Button>
      <Button>
        <Link href="/on-boarding/create-hospital">새로운 병원을 등록하기</Link>
      </Button>
    </div>
  )
}
