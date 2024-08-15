'use server'

import { createClient } from '@/lib/supabase/server'
import { NoticeUserJoined } from '@/types/hospital/notice'
import { redirect } from 'next/navigation'

export const getNotices = async (hosId: string) => {
  const supabase = createClient()
  const { data: noticesData, error: noticesDataError } = await supabase
    .from('notices')
    .select(
      `
        *,
        user_id (
          user_id, name, avatar_url
        )
      `,
    )
    .match({ hos_id: hosId })
    .order('notice_order', { ascending: true })
    .order('created_at', { ascending: true })
    .returns<NoticeUserJoined[]>()

  if (noticesDataError) {
    console.log(noticesDataError)
    redirect(`/error?message=${noticesDataError.message}`)
  }
  return noticesData
}

export const createNotice = async (
  noticeInput: string,
  colorInput: string,
  hosId: string,
) => {
  const supabase = createClient()
  const { error: createNoticeError } = await supabase.from('notices').insert({
    hos_id: hosId,
    notice_color: colorInput,
    notice_text: noticeInput,
    notice_order: 999,
  })

  if (createNoticeError) {
    console.log(createNoticeError)
    redirect(`/error?message=${createNoticeError.message}`)
  }
}

export const updateNotice = async (
  noticeId: string,
  noticeInput: string,
  colorInput: string,
) => {
  const supabase = createClient()
  const { error: updateNoticeError } = await supabase
    .from('notices')
    .update({
      notice_color: colorInput,
      notice_text: noticeInput,
    })
    .match({ id: noticeId })

  if (updateNoticeError) {
    console.log(updateNoticeError)
    redirect(`/error?message=${updateNoticeError.message}`)
  }
}

export const deleteNotice = async (noticeId: string) => {
  const supabase = createClient()
  const { error: deleteNoticeError } = await supabase
    .from('notices')
    .delete()
    .match({ id: noticeId })

  if (deleteNoticeError) {
    console.log(deleteNoticeError)
    redirect(`/error?message=${deleteNoticeError.message}`)
  }
}

export const reorderNotices = async (noticeIds: string[]) => {
  const supabase = createClient()

  noticeIds.forEach(async (noticeId, index) => {
    const { error: reorderNoticesError } = await supabase
      .from('notices')
      .update({ notice_order: index })
      .match({ id: noticeId })

    if (reorderNoticesError) {
      console.log(reorderNoticesError)
      redirect(`/error?message=${reorderNoticesError.message}`)
    }
  })
}
