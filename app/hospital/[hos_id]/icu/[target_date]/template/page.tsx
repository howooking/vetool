import Template from '@/components/hospital/icu/main/template/template'
import { getTemplateCharts } from '@/lib/services/icu/template/template'

export default async function TemplatePage({
  params,
}: {
  params: {
    hos_id: string
    target_date: string
  }
}) {
  const templateCharts = await getTemplateCharts(params.hos_id as string)

  return <Template templateCharts={templateCharts} />
}
