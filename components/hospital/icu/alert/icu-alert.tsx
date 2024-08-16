import MenuToggle from '@/components/hospital/icu/alert/menu-toggle'
import Navigation from '@/components/hospital/icu/alert/navigation'
import { motion, useCycle } from 'framer-motion'
import { useEffect, useRef } from 'react'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 32px) calc(100% - 32px))`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
      damping: 10,
    },
  }),
  closed: {
    clipPath: 'circle(24px at calc(100% - 32px) calc(100% - 32px))',
    transition: {
      delay: 0.1,
      type: 'spring',
      stiffness: 200,
      damping: 40,
    },
  },
}

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 })

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth
    dimensions.current.height = ref.current.offsetHeight
  }, [ref])

  return dimensions.current
}

export default function IcuAlert() {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      className="absolute bottom-1 right-1 top-1/2 ml-auto w-[300px]"
    >
      <motion.div
        className="absolute bottom-0 right-0 top-0 w-[300px] rounded-lg bg-primary"
        variants={sidebar}
      />
      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  )
}
