import * as z from 'zod'

export const registerIcuPatientFormSchema = z.object({
  dx: z.string({ required_error: '환자 이름을 입력해주세요' }),
  cc: z.string({ required_error: '환자 번호를 입력해주세요' }),
  in_date: z.date({ required_error: '품종을 선택해주세요' }),
  out_due_date: z.date({ required_error: '종을 선택해주세요' }),
  main_vet: z.string({ required_error: '주치의를 선택해주세요' }),
  sub_vet: z.string().optional(),
  group_list: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: '적어도 하나의 그룹을 선택해주세요',
    }),
})
