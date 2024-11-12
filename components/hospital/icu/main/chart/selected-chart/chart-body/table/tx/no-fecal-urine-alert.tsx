import React from 'react'

export default function NoFecalOrUrineAlert({
  orderName,
}: {
  orderName: string
}) {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center">
      <span className="ml-[320px] font-bold tracking-[16px] text-red-500">
        {orderName} 없음
      </span>
    </div>
  )
}
