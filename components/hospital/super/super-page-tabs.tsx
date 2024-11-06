import HospitalTable from '@/components/hospital/super/hospitals/hospitals-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getErrorFeedback } from '@/lib/services/error-feedback/error-feedback'
import type { HosListData } from '@/types/hospital'
import ErrorLogDashboard from './errors/error-logs'

export async function SuperPageTabs({ hosList }: { hosList: HosListData[] }) {
  const errorLogs = await getErrorFeedback()

  return (
    <Tabs defaultValue="hosList" className="w-full p-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="hosList">병원 목록</TabsTrigger>
        <TabsTrigger value="errors">에러 로그</TabsTrigger>
      </TabsList>

      <TabsContent value="hosList">
        <HospitalTable hosList={hosList} />
      </TabsContent>

      <TabsContent value="errors">
        <ErrorLogDashboard errorLogs={errorLogs} />
      </TabsContent>
    </Tabs>
  )
}
