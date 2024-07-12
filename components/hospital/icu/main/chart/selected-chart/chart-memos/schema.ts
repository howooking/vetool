import * as z from 'zod'

export const memoNameFormSchema = z.object({
  memoName: z
    .string({ required_error: '메모명을 입력해주세요' })
    .trim()
    .min(1, { message: '메모명을 입력해주세요' }),
})
