import Indate from './in-date'
import OutDate from './out-date'
import OutDueDate from './out-due-date'

export default function InAndOutDate({
  icuIoId,
  inDate,
  outDueDate,
  isPatientOut,
  outDate,
}: {
  icuIoId: string
  inDate: string
  outDueDate: string
  isPatientOut: boolean
  outDate: string | null
}) {
  return (
    <div className="flex gap-2">
      <Indate inDate={inDate} />

      {isPatientOut ? (
        <OutDate outDate={outDate} />
      ) : (
        <OutDueDate outDueDate={outDueDate} icuIoId={icuIoId} inDate={inDate} />
      )}
    </div>
  )
}
