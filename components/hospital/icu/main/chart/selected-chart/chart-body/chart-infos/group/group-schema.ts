import { z } from 'zod'

export const groupCheckFormSchema = z.object({
  groupList: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: '적어도 하나의 그룹을 선택해주세요',
  }),
})
