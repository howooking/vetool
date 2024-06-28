import { z } from 'zod'

export const GroupCheckFormSchema = z.object({
  icu_chart_order_type: z.string({
    message: '적어도 하나의 처치 타입을 선택해주세요.',
  }),
  icu_chart_order_name: z.string({
    required_error: '값을 입력해주세요.',
  }),
  icu_chart_order_comment: z.string({
    required_error: '값을 입력해주세요.',
  }),
  icu_chart_order_tx_1: z.boolean().default(false),
  icu_chart_order_tx_2: z.boolean().default(false),
  icu_chart_order_tx_3: z.boolean().default(false),
  icu_chart_order_tx_4: z.boolean().default(false),
  icu_chart_order_tx_5: z.boolean().default(false),
  icu_chart_order_tx_6: z.boolean().default(false),
  icu_chart_order_tx_7: z.boolean().default(false),
  icu_chart_order_tx_8: z.boolean().default(false),
  icu_chart_order_tx_9: z.boolean().default(false),
  icu_chart_order_tx_10: z.boolean().default(false),
  icu_chart_order_tx_11: z.boolean().default(false),
  icu_chart_order_tx_12: z.boolean().default(false),
  icu_chart_order_tx_13: z.boolean().default(false),
  icu_chart_order_tx_14: z.boolean().default(false),
  icu_chart_order_tx_15: z.boolean().default(false),
  icu_chart_order_tx_16: z.boolean().default(false),
  icu_chart_order_tx_17: z.boolean().default(false),
  icu_chart_order_tx_18: z.boolean().default(false),
  icu_chart_order_tx_19: z.boolean().default(false),
  icu_chart_order_tx_20: z.boolean().default(false),
  icu_chart_order_tx_21: z.boolean().default(false),
  icu_chart_order_tx_22: z.boolean().default(false),
  icu_chart_order_tx_23: z.boolean().default(false),
  icu_chart_order_tx_24: z.boolean().default(false),
})
