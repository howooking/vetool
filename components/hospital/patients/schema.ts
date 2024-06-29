import * as z from 'zod'

export const registerPatientFormSchema = z.object({
  name: z.string({ required_error: '환자 이름을 입력해주세요.' }),
  hos_patient_id: z.string({ required_error: '환자 번호를 입력해주세요.' }),
  breed: z.string({ required_error: '품종을 선택해주세요.' }),
  species: z.string({ required_error: '종을 선택해주세요.' }),
  weight: z.string({ required_error: '몸무게를 입력해주세요.' }),
  gender: z.string({ required_error: '성별을 선택해주세요.' }),
  birth: z.date({ required_error: '생년월일을 선택해주세요.' }),
  microchip_no: z.string({ required_error: '마이크로칩 넘버를 입력해주세요.' }),
  memo: z.string({ required_error: '종을 선택해주세요.' }),
})

export const ownerFormSchema = z.object({
  owner_name: z
    .string({ required_error: '보호자 이름을 입력해주세요.' })
    .trim()
    .min(1, { message: '보호자 이름을 입력해주세요.' }),
  owner_address: z.string().default(''),
  owner_phone_number: z.string().default(''),
  owner_memo: z.string().default(''),
  hos_owner_id: z
    .string({
      required_error: '보호자 번호를 입력해주세요.',
    })
    .trim()
    .min(1, { message: '보호자 번호를 입력해주세요.' }),
})
