import * as z from 'zod'

export const txDetailRegisterFormSchema = z.object({
  result: z
    .string({ required_error: '처치 결과값을 입력해주세요' })
    .trim()
    .min(1, { message: '처치 결과값을 입력해주세요' }),
  comment: z.string().optional(),
})
