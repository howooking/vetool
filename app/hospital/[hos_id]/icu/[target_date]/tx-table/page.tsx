import TxTable from '@/components/hospital/icu/main/tx-table/tx-table'
import { getIcuTxTableData } from '@/lib/services/icu/get-icu-tx-table-data'

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

  return <TxTable txTableData={txTableData} />
}
