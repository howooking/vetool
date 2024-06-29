import { Owner, Patients } from '..'

export type PatientData = Omit<Patients, 'owner_id'> & {
  owner_id: Owner
}

export type PatientDataTable = Omit<Patients, 'owner_id'> & Owner

export type OwnerDataTable = Owner
