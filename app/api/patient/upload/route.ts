// app/api/patient/upload/route.ts

import { createClient } from '@/lib/supabase/server'
import { transformCsvData } from '@/lib/utils/insert-patient'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { data, hos_id } = await req.json()
    const header = data[1] // 실제 헤더 행

    const patientData = data.slice(2).map((row: string[]) => {
      const transformedRow = transformCsvData(row, header)

      return { ...transformedRow, hos_id }
    })

    const supabase = await createClient()
    const { error } = await supabase.from('patients').upsert(patientData, {
      onConflict: 'hos_patient_id, owner_name, name',
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('업로드 처리 중 오류:', error)

    const message = error instanceof Error ? error.message : '업로드 처리 실패'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
