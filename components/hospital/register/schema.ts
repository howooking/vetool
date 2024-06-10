import * as z from 'zod'

export const registerPatientFormSchema = z.object({
  name: z.string({ required_error: '환자 이름을 입력해주세요.' }),
  hos_patient_id: z.string({ required_error: '환자 번호를 입력해주세요.' }),
  breed: z.string({ required_error: '품종을 선택해주세요.' }),
  species: z.string({ required_error: '종을 선택해주세요.' }),
  weight: z.string({ required_error: '종을 선택해주세요.' }),
  gender: z.string({ required_error: '종을 선택해주세요.' }),
  birth: z.date({ required_error: '종을 선택해주세요.' }),
  memo: z.string({ required_error: '종을 선택해주세요.' }),
  microchip_no: z.string({ required_error: '종을 선택해주세요.' }),
})
