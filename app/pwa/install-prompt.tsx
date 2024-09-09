'use client'

import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    )

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone) {
    return null
  }

  return (
    <div>
      <h3>앱 설치</h3>
      <button>홈화면에 추가</button>
      {isIOS && (
        <p>
          디바이스에 설치하기 위해 공유버튼을 눌러주세요
          <span role="img" aria-label="share icon">
            {' '}
            ⎋{' '}
          </span>
          그리고 홈화면에 추가해주세요
          <span role="img" aria-label="plus icon">
            {' '}
            ➕{' '}
          </span>
          .
        </p>
      )}
    </div>
  )
}
