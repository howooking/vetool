'use client'

import { DotLottiePlayer } from '@dotlottie/react-player'

export default function DotLottie({
  path,
  ...rest
}: {
  path: string
  className: string
}) {
  return (
    <div {...rest}>
      <DotLottiePlayer src={path} loop autoplay />
    </div>
  )
}
