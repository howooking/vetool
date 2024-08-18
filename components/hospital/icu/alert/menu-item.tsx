import { motion } from 'framer-motion'

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF']

export default function MenuItem({ i }: { i: number }) {
  const style = { border: `2px solid ${colors[i]}` }

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="mb-5 flex cursor-pointer items-center"
    >
      <div
        className="mr-5 h-10 w-10 flex-shrink-0 rounded-full"
        style={style}
      />
      <div className="rounded-xs h-5 w-[200px] flex-1" style={style} />
    </motion.li>
  )
}
