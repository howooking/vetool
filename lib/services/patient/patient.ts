'use server'

import { createClient } from '@/lib/supabase/server'
import type { PatientData, PatientDataTable } from '@/types/patients'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'

export const insertPatient = async (
  newPatient: {
    species: string
    name: string
    weight: string
    owner_name: string
    birth: Date
    breed: string
    gender: string
    hos_patient_id: string
    memo: string
    microchip_no: string
  },
  hosId: string,
) => {
  const supabase = createClient()

  const { data: patientId, error: rpcError } = await supabase.rpc(
    'insert_patient_when_register',
    {
      birth_input: format(newPatient.birth, 'yyyy-MM-dd'),
      body_weight_input: newPatient.weight,
      breed_input: newPatient.breed,
      gender_input: newPatient.gender,
      hos_id_input: hosId,
      hos_patient_id_input: newPatient.hos_patient_id,
      memo_input: newPatient.memo,
      microchip_no_input: newPatient.microchip_no,
      name_input: newPatient.name,
      species_input: newPatient.species,
      owner_name_input: newPatient.owner_name,
    },
  )

  if (rpcError) {
    console.log(rpcError)
    redirect(`/error?message=${rpcError.message}`)
  }

  return patientId
}

export const getPatients = async (hosId: string) => {
  const supabase = createClient()

  const { data: patientsData, error: patientsDataError } = await supabase
    .from('patients')
    .select('*')
    .match({ hos_id: hosId })
    .order('is_alive', { ascending: false })
    .order('created_at', { ascending: false })
    .returns<PatientData[]>()

  if (patientsDataError) {
    console.log(patientsDataError.message)
    redirect(`/error/?message=${patientsDataError.message}`)
  }

  return patientsData.map((patient) => ({
    birth: patient.birth,
    name: patient.name,
    gender: patient.gender,
    breed: patient.breed,
    species: patient.species,
    owner_id: patient.owner_id,
    created_at: patient.created_at,
    hos_id: patient.hos_id,
    patient_id: patient.patient_id,
    microchip_no: patient.microchip_no,
    hos_patient_id: patient.hos_patient_id,
    memo: patient.memo,
    is_alive: patient.is_alive,
    owner_name: patient.owner_name,
    isIcu: false,
  })) as PatientDataTable[]
}

export const deletePatient = async (patientId: string) => {
  const supabase = createClient()

  const { error: deletePatientError } = await supabase
    .from('patients')
    .delete()
    .match({ patient_id: patientId })

  if (deletePatientError) {
    console.log(deletePatientError.message)
    redirect(`/error/?message=${deletePatientError.message}`)
  }
}

export const updatePatient = async ({
  data,
  hosId,
  patientId,
}: {
  data: {
    species: string
    name: string
    weight: string
    owner_name: string
    birth: Date
    breed: string
    gender: string
    hos_patient_id: string
    memo: string
    microchip_no: string
  }
  hosId: string
  patientId: string
}) => {
  const supabase = createClient()

  const { error: updatePatientError } = await supabase
    .from('patients')
    .update({
      birth: format(data.birth, 'yyyy-MM-dd'),
      breed: data.breed,
      gender: data.gender as 'cm' | 'sf' | 'im' | 'if' | 'un',
      hos_id: hosId,
      hos_patient_id: data.hos_patient_id,
      memo: data.memo,
      microchip_no: data.microchip_no,
      name: data.name,
      patient_id: patientId,
      species: data.species as 'canine' | 'feline',
      owner_name: data.owner_name,
    })
    .match({ patient_id: patientId })

  if (updatePatientError) {
    console.log(updatePatientError)
    redirect(`/error?message=${updatePatientError.message}`)
  }
}
