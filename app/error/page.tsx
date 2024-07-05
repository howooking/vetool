import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ErrorPage({
  searchParams: { message },
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="flex h-screen items-center justify-center bg-teal-50">
      <div className="flex max-w-md flex-col items-center rounded-lg bg-white px-16 py-8 text-center shadow-lg">
        <AlertCircle className="text-primary" size={80} />
        <h1 className="my-4 text-2xl font-semibold text-primary">
          에러가 발생하였습니다
        </h1>
        <p>에러가 발생하였습니다</p>
        <p>관리자에게 문의하세요</p>
        <p className="text-destructive">{message}</p>
        <Button className="mt-6" asChild>
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  )
}
