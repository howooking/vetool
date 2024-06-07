'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type UserGridProps = {
  name: string | null
  position: string | null
  group: string[] | null
  rank: number | null
  user_approved: boolean | null
  is_admin: boolean
  user_id: string
  positionList?: string[] | null
}

export default function UserGrid({
  positionList,
  name,
  position,
  group,
  rank,
  user_approved: userApproved,
  is_admin: isAdmin,
  user_id: userId,
}: UserGridProps) {
  const [currentRank, setCurrentRank] = useState(rank?.toString() ?? '99')
  const [newPosition, setNewPosition] = useState(position ?? '미분류')
  const [isApproved, setIsApproved] = useState(userApproved)
  const [hasPermission, setHasPermission] = useState(isAdmin)
  const supabase = createClient()

  // 새로운 포지션 입력 핸들러
  const handleNewPositionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewPosition(event.target.value)
  }

  // 새로운 포지션 추가 핸들러
  const handleAddPosition = async () => {
    if (newPosition.trim() === '') return

    const { error } = await supabase
      .from('hospitals')
      .update({ position_list: [...(positionList ?? []), newPosition] })
      .eq('master_user_id', userId)

    if (!error) {
      if (positionList) {
        positionList.push(newPosition)
      } else {
        positionList = [newPosition]
      }

      setNewPosition('')
      return
    }

    if (error) {
      toast({
        variant: 'destructive',
        title: error.message,
      })
    }
  }

  // 포지션 변경 핸들러 함수
  const handlePositionChange = async (value: string) => {
    setNewPosition(value)

    const { error } = await supabase
      .from('users')
      .update({ position: value })
      .eq('user_id', userId)

    if (!error) {
      toast({
        title: '포지션이 변경되었습니다.',
      })

      return
    }

    if (error) {
      toast({
        variant: 'destructive',
        title: error.message,
      })
    }
  }

  // 유저 Rank 핸들러
  const handleRankChange = async (
    event: React.FocusEvent<HTMLInputElement>,
  ) => {
    let newRank = event.target.value.trim()

    // 공백일 경우 기본 값으로 설정
    if (newRank === '') {
      newRank = '99'
      setCurrentRank(newRank)
    }

    const { error } = await supabase
      .from('users')
      .update({ rank: parseInt(newRank) })
      .eq('user_id', userId)

    if (!error) {
      toast({
        title: '랭크가 변경되었습니다.',
      })

      return
    }

    if (error) {
      toast({
        variant: 'destructive',
        title: error.message,
      })
    }
  }

  // 랭크 입력 값 변경 핸들러
  const handleRankInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const rankInputValue = event.target.value

    // 숫자 이외 값 입력 방지
    if (/^\d*$/.test(rankInputValue)) {
      setCurrentRank(rankInputValue)
    }
  }

  // 병원 가입 승인 핸들러 함수
  const handleApprovedChange = async (value: string) => {
    const newApprovalStatus = value === 'approved'
    setIsApproved(newApprovalStatus)

    const { error } = await supabase
      .from('users')
      .update({ user_approved: newApprovalStatus })
      .eq('user_id', userId)

    if (!error) {
      toast({
        title: '승인되었습니다.',
      })

      return
    }

    if (error) {
      toast({
        variant: 'destructive',
        title: error.message,
      })
    }
  }

  // 유저 관리 권한 핸들러 함수
  const handlePermissionChange = async (value: string) => {
    const newPermissionStatus = value === 'O'
    setHasPermission(newPermissionStatus)

    const { error } = await supabase
      .from('users')
      .update({ is_admin: newPermissionStatus })
      .eq('user_id', userId)

    if (!error) {
      toast({
        title: '관리 권한이 변경되었습니다.',
      })

      return
    }

    if (error) {
      toast({
        variant: 'destructive',
        title: error.message,
      })
    }
  }

  return (
    <div className="hospital-admin-user-grid">
      {/* 이름 */}
      <div>{name}</div>

      {/* 직책 */}
      <Select value={newPosition} onValueChange={handlePositionChange}>
        <SelectTrigger className="justify-center gap-2 border-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {positionList?.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator className="SelectSeparator" />
          <SelectGroup className="flex">
            <Input
              type="text"
              placeholder="직책명"
              onBlur={handleNewPositionChange}
            />
            <Button onClick={handleAddPosition}>추가</Button>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* 그룹 */}
      <div>{group ? group.map((group) => group) : '없음'}</div>

      {/* 랭크 */}
      <Input
        type="number"
        value={currentRank}
        onChange={handleRankInputChange}
        onBlur={handleRankChange}
        min={1}
        max={999}
        className="no-spin border border-b text-center"
      />

      {/* 승인 여부 */}
      <Select
        value={isApproved ? 'approved' : 'unApproved'}
        onValueChange={handleApprovedChange}
      >
        <SelectTrigger className="justify-center gap-2 border-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="approved">승인</SelectItem>
            <SelectItem value="unApproved">미승인</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* 관리자 여부 */}
      <Select
        value={hasPermission ? 'O' : 'X'}
        onValueChange={handlePermissionChange}
      >
        <SelectTrigger className="justify-center gap-2 border-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="O">O</SelectItem>
            <SelectItem value="X">X</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
