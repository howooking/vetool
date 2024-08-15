'use client'

import NoResult from '@/components/common/no-result'
import { reorderNotices } from '@/lib/services/hospital-home/notice'
import type { NoticeUserJoined } from '@/types/hospital/notice'
import { useState } from 'react'
import { ReactSortable, Sortable } from 'react-sortablejs'
import SingleNotice from './single-notice'

export default function DragAndDropNoticeList({
  noticesData,
  hosId,
}: {
  noticesData: NoticeUserJoined[]
  hosId: string
}) {
  const [sortableNotice, setSortableNotice] = useState(noticesData)

  const handleReorder = (event: Sortable.SortableEvent) => {
    const noticeIds = noticesData.map((notice) => notice.id)
    const item = noticeIds.splice(event.oldIndex as number, 1)[0]
    noticeIds.splice(event.newIndex as number, 0, item)
    reorderNotices(noticeIds)
  }

  return (
    <div className="relative">
      {noticesData.length === 0 ? (
        <NoResult title="공지사항이 없습니다" className="h-[calc(35vh)]" />
      ) : (
        <ReactSortable
          list={sortableNotice}
          setList={setSortableNotice}
          className="flex flex-col gap-2"
          animation={250}
          handle=".handle"
          onEnd={handleReorder}
        >
          {sortableNotice.map((notice) => (
            <SingleNotice hosId={hosId} notice={notice} key={notice.id} />
          ))}
        </ReactSortable>
      )}
    </div>
  )
}
