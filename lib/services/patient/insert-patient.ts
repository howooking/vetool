'use server'

import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const insertPatient = async ({
  data,
  hosId,
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
}) => {
  const { data: patientId, error: rpcError } = await supabase.rpc(
    'insert_patient_when_register',
    {
      birth_input: format(data.birth, 'yyyy-MM-dd'),
      body_weight_input: data.weight,
      breed_input: data.breed,
      gender_input: data.gender,
      hos_id_input: hosId,
      hos_patient_id_input: data.hos_patient_id,
      memo_input: data.memo,
      microchip_no_input: data.microchip_no,
      name_input: data.name,
      species_input: data.species,
      owner_name_input: data.owner_name,
    },
  )

  if (rpcError) {
    console.log(rpcError)
    redirect(`/error?message=${rpcError.message}`)
  }

  return patientId
}
