import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUser } from '@/lib/services/auth/authorization'
import { getNotices } from '@/lib/services/hospital-home/notice'
import DragAndDropNoticeList from './drag-and-drop-notice-list'

export default async function Notice({ hosId }: { hosId: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const noticesData = await getNotices(hosId)
  const authuser = await getUser()

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          공지사항
        </CardTitle>
      </CardHeader>

      <CardContent className="">
        <DragAndDropNoticeList
          noticesData={noticesData}
          hosId={hosId}
          authuserId={authuser!.id}
        />
      </CardContent>
    </Card>
  )
}
