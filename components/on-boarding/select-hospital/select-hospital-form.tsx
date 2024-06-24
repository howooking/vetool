'use client'

import {
  SelectHospitalColumns,
  type SelectHosptialColumnsType,
} from '@/components/on-boarding/select-hospital/columns'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { toast } from '@/components/ui/use-toast'
import { useSelectHospitalStore } from '@/lib/store/on-boarding/select-hospital'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import type { User } from '@/types/hospital'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SelectHospitalForm({
  hospitalData,
  authUser,
}: {
  hospitalData: SelectHosptialColumnsType[]
  authUser: User
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { hosId } = useSelectHospitalStore()
  const { refresh, replace, back } = useRouter()

  const handleSubmit = async () => {
    const supabase = createClient()

    setIsSubmitting(true)

    const { error } = await supabase.rpc(
      'update_user_hos_id_when_select_hospital',
      {
        hos_id_input: hosId,
      },
    )

    // TODO: error handling
    if (error) {
      toast({
        variant: 'destructive',
        title: error.message,
        description: '관리자에게 문의하세요',
      })
    }

    toast({
      title: '병원에서 승인 후 병원이 추가됩니다.',
      description: '잠시 후 페이지가 이동합니다.',
    })

    replace(`/hospital/${hosId}`)
    refresh()

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <DataTable columns={SelectHospitalColumns} data={hospitalData} />
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={back}>
          이전
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          다음
          <LoaderCircle
            className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </div>
    </form>
  )
}
