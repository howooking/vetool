import NoResult from '@/components/common/no-result'
import TxTable from '@/components/hospital/icu/main/tx-table/tx-table'
import { getIcuTxTableData } from '@/lib/services/icu/tx-table/get-icu-tx-table-data'

export default async function TxTablePage({
  params,
}: {
  params: {
    hos_id: string
    target_date: string
    patient_id: string
  }
}) {
  const txTableData = await getIcuTxTableData(params.hos_id, params.target_date)

  if (!txTableData) {
    return (
      <NoResult
        title="실행할 처치가 존재하지 않습니다"
        className="h-icu-chart"
      />
    )
  }

  return <TxTable txTableData={txTableData} />
}
