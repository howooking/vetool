'use client'

import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import type { IcuChartJoined, Vets } from '@/types/hospital'
import { Check, ChevronsUpDown } from 'lucide-react'
import IcuHeaderDatePicker from '@/components/hospital/icu/header/icu-header-date-picker'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useState } from 'react'

export default function IcuChartPatientDetail({
  chartData,
  vetsData,
}: {
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  vetsData: Vets[]
}) {
  const supabase = createClient()
  const { name, gender, breed, patient_id: patientId } = chartData.patient_id
  const {
    dx,
    cc,
    group_list: groupList,
    age_in_days: ageInDays,
  } = chartData.icu_io_id
  const {
    weight,
    caution,
    icu_chart_id: icuChartId,
    weight_measured_date: weightMeasuredDate,
  } = chartData
  const { name: mainVetName, user_id: mainVetId } = chartData.main_vet
  const { name: subVetName, user_id: subVetId } = chartData.sub_vet

  const [isMainVetPopOpen, setIsMainVetPopOpen] = useState(false)
  const [isSubVetPopOpen, setIsSubVetPopOpen] = useState(false)
  const [dxValue, setDxValue] = useState(dx)
  const [ccValue, setCcValue] = useState(cc)
  const [cautionValue, setCautionValue] = useState(caution)
  const [mainVetValue, setMainVetValue] = useState(mainVetId)
  const [subVetValue, setSubVetValue] = useState(subVetId)
  const [weightMeasuredDateValue, setWeightMeasuredDateValue] =
    useState(weightMeasuredDate)

  // DX 변경 핸들러
  const handleDxBlur = async () => {
    const { error } = await supabase
      .from('icu_io')
      .update({ dx: dxValue })
      .match({ patient_id: patientId })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: 'DX가 변경되었습니다.',
    })
  }

  // CC 변경 핸들러
  const handleCcBlur = async () => {
    const { error } = await supabase
      .from('icu_io')
      .update({ cc: ccValue })
      .match({ patient_id: patientId })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: 'CC가 변경되었습니다.',
    })
  }

  // 주치의 변경 핸들러
  const handleMainVetChange = async (mainVetId: string) => {
    const { error } = await supabase
      .from('icu_chart')
      .update({ main_vet: mainVetId })
      .match({ patient_id: patientId })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: '주치의가 변경되었습니다.',
    })
  }

  // 부치의 변경 핸들러
  const handleSubVetChange = async (subVetId: string) => {
    const { error } = await supabase
      .from('icu_chart')
      .update({ sub_vet: subVetId })
      .match({ patient_id: patientId })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: '부치의가 변경되었습니다.',
    })
  }

  // 주의 사항 변경 핸들러
  const handleCautionBlur = async () => {
    const { error } = await supabase
      .from('icu_chart')
      .update({ caution: cautionValue })
      .match({ patient_id: patientId })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: '주의 사항이 변경되었습니다.',
    })
  }

  // 체중 측정일 변경 핸들러
  const handleMeasuredWeightDateChange = async (date: string) => {
    const { error } = await supabase
      .from('icu_chart')
      .update({ weight_measured_date: date })
      .match({ patient_id: patientId })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    toast({
      title: '체중 측정일이 변경되었습니다.',
    })
  }

  return (
    <div className="w-full rounded-md bg-white p-4">
      <div className="space-y-1">
        <span className="text-md pr-1 font-bold leading-none">{name}</span>
        <span className="text-xs font-medium leading-none">{breed}</span>
        <p className="text-sm text-muted-foreground">
          {`${ageInDays} days old  · ${gender} · ${weight}kg`}
        </p>
      </div>

      <Separator className="my-4" />

      {/* DX */}
      <div className="flex h-16 items-center space-x-4 text-sm">
        <div className="flex flex-col items-center gap-2">
          <label className="text-sm text-muted-foreground">DX</label>
          <Input
            type="text"
            value={dxValue ?? '없음'}
            onBlur={handleDxBlur}
            onChange={(e) => setDxValue(e.target.value)}
            className="max-w-32"
          />
        </div>
        <Separator orientation="vertical" />

        {/* CC */}
        <div className="flex flex-col items-center gap-2">
          <label className="text-sm text-muted-foreground">CC</label>
          <Input
            type="text"
            value={ccValue ?? '없음'}
            onBlur={handleCcBlur}
            onChange={(e) => setCcValue(e.target.value)}
            className="max-w-48"
          />
        </div>
        <Separator orientation="vertical" />

        {/* 주치의 */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground">주치의</p>
          <Popover open={isMainVetPopOpen} onOpenChange={setIsMainVetPopOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={isMainVetPopOpen}
                className="w-[120px] justify-between font-normal"
              >
                {mainVetValue
                  ? vetsData.find((vets) => vets.user_id === mainVetValue)?.name
                  : mainVetName}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>등록된 수의사가 없습니다.</CommandEmpty>
                  <CommandGroup>
                    {vetsData.map((vets) => (
                      <CommandItem
                        key={vets.user_id}
                        value={vets.user_id}
                        onSelect={(currentValue) => {
                          setMainVetValue(currentValue)
                          setIsMainVetPopOpen(false)
                          handleMainVetChange(currentValue)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            mainVetValue === vets.user_id
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        <div className="flex items-center gap-2 font-normal">
                          <span>{vets.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {vets.position}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Separator orientation="vertical" />

        {/* 부치의 */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground">부치의</p>
          <Popover open={isSubVetPopOpen} onOpenChange={setIsSubVetPopOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={isSubVetPopOpen}
                className="w-[120px] justify-between font-normal"
              >
                {subVetValue
                  ? vetsData.find((vets) => vets.user_id === subVetValue)?.name
                  : subVetName ?? '부치의 선택'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>등록된 수의사가 없습니다.</CommandEmpty>
                  <CommandGroup>
                    {vetsData.map((vets) => (
                      <CommandItem
                        key={vets.user_id}
                        value={vets.user_id}
                        onSelect={(currentValue) => {
                          setSubVetValue(currentValue)
                          setIsSubVetPopOpen(false)
                          handleSubVetChange(currentValue)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            subVetValue === vets.user_id
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        <div className="flex items-center gap-2 font-normal">
                          <span>{vets.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {vets.position}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Separator orientation="vertical" />

        {/* 주의 사항 */}
        <div className="flex flex-col items-center gap-2">
          <label className="text-sm text-muted-foreground">주의 사항</label>
          <Input
            type="text"
            value={cautionValue ?? '없음'}
            onChange={(e) => setCautionValue(e.target.value)}
            className="max-w-48"
          />
        </div>
        <Separator orientation="vertical" />

        {/* 체중 측정일 */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">체중 측정일</p>
          <div className="flex items-center gap-1">
            <span className="min-w-20 text-sm">{weightMeasuredDateValue}</span>
            <IcuHeaderDatePicker
              selectedDate={
                weightMeasuredDateValue ?? format(new Date(), 'yyyy-MM-dd')
              }
              setSelectedDate={setWeightMeasuredDateValue}
              onChange={handleMeasuredWeightDateChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
