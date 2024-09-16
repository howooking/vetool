export const POPUP_MOTION = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 28px) calc(100% - 20px))`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
      damping: 10,
    },
  }),
  closed: {
    clipPath: 'circle(0px at calc(100% - 28px) calc(100% - 20px))',
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 30,
    },
  },
}

export const LI_MOTION = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
}
