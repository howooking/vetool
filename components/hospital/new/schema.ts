import * as z from 'zod'

export const newHospitalFormSchema = z.object({
  name: z.string({ required_error: '병원 이름을 입력해주세요.' }),
  city: z.string({ required_error: '시를 입력하세요.' }),
  district: z.string({ required_error: '구를 입력하세요.' }),
})
