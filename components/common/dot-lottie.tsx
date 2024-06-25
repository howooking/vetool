'use client'

import { DotLottiePlayer } from '@dotlottie/react-player'

export default function DotLottie({
  path,
  className,
}: {
  path: string
  className: string
}) {
  return (
    <div className={className}>
      <DotLottiePlayer src={path} loop autoplay />
    </div>
  )
}
