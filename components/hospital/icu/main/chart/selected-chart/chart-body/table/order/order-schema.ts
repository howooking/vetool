import { z } from 'zod'

export const orderSchema = z.object({
  icu_chart_order_type: z.string({
    message: '오더 타입을 선택해주세요',
  }),
  icu_chart_order_name: z
    .string({
      required_error: '오더명을 입력해주세요',
    })
    .transform((val) => val.split('#')[0])
    .pipe(z.string().trim().min(1, { message: '오더명을 입력해주세요' })),
  icu_chart_order_comment: z.string().optional(),
})
