export default function UnReadCount({ unReadCount }: { unReadCount: number }) {
  return (
    // !!bg-red-500 보단 일관성있게 destructive 사용.
    <div className="absolute -top-0.5 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[9px] text-white">
      {unReadCount >= 10 ? '10+' : unReadCount}
    </div>
  )
}
