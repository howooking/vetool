import { getIcuIoData } from '@/lib/services/icu/get-icu-io-data'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { createClient } from '@/lib/supabase/client'
import { IcuIoPatientJoined } from '@/types/icu'
import { useEffect, useState } from 'react'

export default function useRealTimeIcuIoData(
  hosId: string,
  targetDate: string,
) {
  const supabase = createClient()

  const [realTimeIcuIoData, setRealTimeIcuIoData] = useState<
    IcuIoPatientJoined[]
  >([])
  const [isFetching, setIsFetching] = useState(true)
  const { setSelectedPatient } = useIcuSelectedPatientStore()

  useEffect(() => {
    const queryFunction = async () => {
      setIsFetching(true)
      const data = await getIcuIoData(hosId, targetDate)
      setRealTimeIcuIoData(data)
      setIsFetching(false)
    }
    queryFunction()

    const subscription = supabase
      .channel('icu-io-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_io',
          filter: `hos_id=eq.${hosId}`,
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            setSelectedPatient(null)
          }
          queryFunction()
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [hosId, setSelectedPatient, supabase, targetDate])

  return { realTimeIcuIoData, isFetching }
}
