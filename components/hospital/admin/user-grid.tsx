'use client'

import type { Database } from '@/lib/supabase/database.types'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'

type UserGridProps = Database['public']['Tables']['users']['Insert']

export default function UserGrid({
  name,
  position,
  group,
  rank,
  user_approved: userApproved,
  is_admin: isAdmin,
  user_id: userId,
}: UserGridProps) {
  const [isApproved, setIsApproved] = useState(userApproved)
  const supabase = createClient()

  // 유저 승인 핸들러 함수
  const handleUserApprovedChange = async () => {
    if (isAdmin) {
      setIsApproved(!isApproved)
      return await supabase
        .from('users')
        .update({ user_approved: userApproved })
        .eq('user_id', userId)
    }

    toast({
      variant: 'destructive',
      title: '관리자만 승인할 수 있습니다.',
    })
  }

  return (
    <div className="grid grid-cols-6 items-center gap-4 border p-2 text-center text-zinc-50">
      {/* 이름 */}
      <div>{name}</div>

      {/* 직책 */}
      <div>{position ? position : '미분류'}</div>

      {/* 그룹 */}
      <div>{group ?? '없음'}</div>

      {/* 랭크 */}
      <div>{rank ?? '99'}</div>

      {/* 승인 여부 */}
      <Select onValueChange={handleUserApprovedChange} disabled={isAdmin}>
        <SelectTrigger className="border-none">
          <SelectValue placeholder={`${isApproved ? '승인' : '미승인'}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="approved">승인</SelectItem>
            <SelectItem value="unApproved">미승인</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* 관리자 여부 */}
      <div>{isAdmin ? 'O' : 'X'}</div>
    </div>
  )
}
