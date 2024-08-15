import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getNotices } from '@/lib/services/hospital-home/notice'
import CreateOrUpdateNoticeDialog from './create-or-update-notice-dialog'
import DragAndDropNoticeList from './drag-and-drop-notice-list'

export default async function Notice({ hosId }: { hosId: string }) {
  const noticesData = await getNotices(hosId)

  return (
    <Card className="flex-1 rounded-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          공지사항
          <CreateOrUpdateNoticeDialog hosId={hosId} />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <DragAndDropNoticeList noticesData={noticesData} hosId={hosId} />
      </CardContent>
    </Card>
  )
}
