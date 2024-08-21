import { z } from 'zod'

export const memoNameFormSchema = z.object({
  memoA: z
    .string({
      required_error: '메모이름을 입력해주세요',
    })
    .min(1, {
      message: '메모이름을 입력해주세요',
    })
    .max(20, {
      message: '메모이름은 최대 20자까지 설정 가능합니다.',
    }),

  memoB: z
    .string({
      required_error: '메모이름을 입력해주세요',
    })
    .min(1, {
      message: '메모이름을 입력해주세요',
    })
    .max(20, {
      message: '메모이름은 최대 20자까지 설정 가능합니다.',
    }),

  memoC: z
    .string({
      required_error: '메모이름을 입력해주세요',
    })
    .min(1, {
      message: '메모이름을 입력해주세요',
    })
    .max(20, {
      message: '메모이름은 최대 20자까지 설정 가능합니다.',
    }),
})
