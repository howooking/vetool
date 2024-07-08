import { IcuIo } from '..'

export type IcuIoPatientJoined = Omit<IcuIo, 'patient_id'> & {
  patient_id: {
    name: string
    breed: string
    patient_id: string
  }
}
