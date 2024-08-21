export const SIDEBAR_STYLE = {
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
      type: 'spring',
      stiffness: 250,
      damping: 30,
    },
  },
}

export const UL_STYLE = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

export const LI_STYLE = {
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
