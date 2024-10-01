import GroupByStatistics from '@/components/hospital/icu/main/analysis/group-by-statistics'
import IoDurationStatistics from '@/components/hospital/icu/main/analysis/io-duration-statistics'
import IoPatientsStatistics from '@/components/hospital/icu/main/analysis/io-patients-statistics'
import VetAssignmentStatistics from '@/components/hospital/icu/main/analysis/vet-assignment-statistics'
import type { IcuAnalysisData } from '@/types/icu/analysis'

export default function Analysis({
  analysisData,
}: {
  analysisData: IcuAnalysisData[]
}) {
  return (
    <div>
      <IoPatientsStatistics analysisData={analysisData} />

      <div className="grid grid-cols-2">
        <VetAssignmentStatistics analysisData={analysisData} />
        <GroupByStatistics analysisData={analysisData} />
      </div>

      <IoDurationStatistics analysisData={analysisData} />
    </div>
  )
}
