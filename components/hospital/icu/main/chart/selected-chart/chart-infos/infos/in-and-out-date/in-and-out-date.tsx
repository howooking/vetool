import Indate from './in-date'
import OutDueDate from './out-due-date'

export default function InAndOutDate({
  icuIoId,
  inDate,
  outDueDate,
}: {
  icuIoId: string
  inDate: string
  outDueDate: string
}) {
  return (
    <div className="flex gap-2">
      <Indate inDate={inDate} />
      <OutDueDate inDate={inDate} outDueDate={outDueDate} icuIoId={icuIoId} />
    </div>
  )
}
