'use client'

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SelectHospitalInput() {
  const supabase = createClient()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedHosId, setSelectedHosId] = useState('')

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const { error } = await supabase.rpc(
      'update_user_hos_id_when_select_hospital',
      {
        hos_id_input: selectedHosId,
      },
    )

    if (error) {
      toast({
        variant: 'destructive',
        title: error.message,
        description: '관리자에게 문의하세요',
      })
    }

    toast({
      title: '병원에서 승인 후 병원이 추가됩니다.',
      description: '잠시 후 페이지가 이동합니다.',
    })

    setIsSubmitting(false)

    // router.replace(`/hospital/${data.hos_id}`)
    // router.refresh()
  }

  const [hospitals, setHospitals] = useState<
    {
      hosId: string
      name: string
      address: string
    }[]
  >([])

  useEffect(() => {
    const getHospitals = async () => {
      const { data, error } = await supabase
        .from('hospitals')
        .select('city, district, hos_id, name')

      if (error) {
        throw new Error('error while fethcing hospitals')
      }
      const mappedHospital = data.map((hospital) => ({
        hosId: hospital.hos_id,
        name: hospital.name!,
        address: hospital.city! + hospital.district!,
      }))

      setHospitals(mappedHospital)
    }
    getHospitals()
  }, [supabase])

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedHosId
              ? hospitals.find((hospital) => hospital.hosId === selectedHosId)
                  ?.name
              : 'Select framework...'}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {hospitals.map((hospital) => (
                  <CommandItem
                    key={hospital.hosId}
                    value={hospital.hosId}
                    onSelect={(currentValue) => {
                      setSelectedHosId(
                        currentValue === selectedHosId ? '' : currentValue,
                      )
                      setOpen(false)
                    }}
                  >
                    {hospital.name + hospital.address}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        selectedHosId === hospital.hosId
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        확인
      </Button>
    </div>
  )
}
