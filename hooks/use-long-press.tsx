import { useCallback, useEffect, useRef, useState } from 'react'

type LongPressOptions = {
  onLongPress: () => void
  onClick?: () => void
  delay?: number
}

type LongPressHandlers = {
  onMouseDown: (e: React.MouseEvent) => void
  onTouchStart: (e: React.TouchEvent) => void
  onMouseUp: (e: React.MouseEvent) => void
  onMouseLeave: (e: React.MouseEvent) => void
  onTouchEnd: (e: React.TouchEvent) => void
}

export const useLongPress = ({
  onLongPress,
  onClick,
  delay = 500,
}: LongPressOptions): LongPressHandlers => {
  const [longPressTriggered, setLongPressTriggered] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const targetRef = useRef<HTMLElement | null>(null)

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (e.target instanceof HTMLElement) {
        targetRef.current = e.target
      }
      timeoutRef.current = window.setTimeout(() => {
        onLongPress()
        setLongPressTriggered(true)
      }, delay)
    },
    [onLongPress, delay],
  )

  const clear = useCallback(
    (shouldTriggerClick: boolean = true) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (shouldTriggerClick && !longPressTriggered && onClick) {
        onClick()
      }
      setLongPressTriggered(false)
      targetRef.current = null
    },
    [longPressTriggered, onClick],
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => start(e), [start])
  const onTouchStart = useCallback((e: React.TouchEvent) => start(e), [start])
  const onMouseUp = useCallback((e: React.MouseEvent) => clear(), [clear])
  const onMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === targetRef.current) {
        clear(false)
      }
    },
    [clear],
  )
  const onTouchEnd = useCallback((e: React.TouchEvent) => clear(), [clear])

  return {
    onMouseDown,
    onTouchStart,
    onMouseUp,
    onMouseLeave,
    onTouchEnd,
  }
}
