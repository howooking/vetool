import * as z from 'zod'

export const mainSubVetFormSchema = z.object({
  main_vet: z.string({ required_error: '주치의를 선택해주세요' }),
  sub_vet: z.string().optional(),
})
