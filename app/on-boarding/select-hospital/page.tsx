import PrevButton from '@/components/on-boarding/prev-button'
import HospitalsTable from '@/components/on-boarding/select-hospital/hospitals-table'
import { getHospitals } from '@/lib/services/on-boarding/on-boarding'

export default async function SelectHospitalPage() {
  const hospitalsData = await getHospitals()

  return (
    <>
      <PrevButton />
      <h2 className="text-2xl font-bold tracking-wider">병원선택</h2>
      <HospitalsTable hospitalsData={hospitalsData} />
    </>
  )
}
