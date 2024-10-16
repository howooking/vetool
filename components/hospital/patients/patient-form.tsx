'use client'

import HelperTooltip from '@/components/common/helper-tooltip'
import BirthDatePicker from '@/components/hospital/patients/birth-date-picker'
import { registerPatientFormSchema } from '@/components/hospital/patients/patient-schema'
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import {
  CANINE_BREEDS,
  FELINE_BREEDS,
  SEX,
} from '@/constants/hospital/register/breed'
import { insertPatient, updatePatient } from '@/lib/services/patient/patient'
import { useIcuRegisterStore } from '@/lib/store/icu/icu-register'
import { cn, getDaysSince } from '@/lib/utils'
import type { PatientDataTable } from '@/types/patients'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type PatientFormRegisterProps = {
  hosId: string
  edit?: false
  icu?: false
  setStep?: null
  editingPatient?: null
  isRegister?: boolean
  setIsPatientRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsPatientUpdateDialogOpen?: null
  setIsIcuDialogOpen?: null
  hosPatientIds: string[]
}
type PatientFormIcuRegisterProps = {
  hosId: string
  edit?: false
  icu?: true
  setStep?: (step: 'patientRegister' | 'icuRegister' | 'patientSearch') => void
  editingPatient?: null
  setIsPatientRegisterDialogOpen?: null
  setIsPatientUpdateDialogOpen?: null
  setIsIcuDialogOpen: (isRegisterDialogOpen: boolean) => void
  isRegister?: null
  hosPatientIds: string[]
}
type PatientFormEditProps = {
  hosId: string
  edit: true
  icu?: false
  setStep?: null
  editingPatient: PatientDataTable
  setIsPatientRegisterDialogOpen?: null
  setIsPatientUpdateDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsIcuDialogOpen?: null
  isRegister?: null
  hosPatientIds: string[]
}

type PatientFormProps =
  | PatientFormEditProps
  | PatientFormRegisterProps
  | PatientFormIcuRegisterProps

export default function PatientForm({
  hosId,
  setStep,
  edit,
  icu,
  editingPatient,
  setIsPatientRegisterDialogOpen,
  setIsPatientUpdateDialogOpen,
  setIsIcuDialogOpen,
  hosPatientIds,
}: PatientFormProps) {
  const [breedOpen, setBreedOpen] = useState(false)
  const [selectedSpecies, setSelectedSpecies] = useState<string>(
    edit ? editingPatient?.species! : '',
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setRegisteringPatient } = useIcuRegisterStore()
  const [isDuplicateId, setIsDuplicateId] = useState(false)
  const { refresh } = useRouter()

  const BREEDS = selectedSpecies === 'canine' ? CANINE_BREEDS : FELINE_BREEDS

  const form = useForm<z.infer<typeof registerPatientFormSchema>>({
    resolver: zodResolver(
      registerPatientFormSchema.refine(
        (data) => {
          if (edit) {
            return (
              data.hos_patient_id === editingPatient?.hos_patient_id ||
              !hosPatientIds.includes(data.hos_patient_id)
            )
          }
          return !hosPatientIds.includes(data.hos_patient_id)
        },
        {
          message: '이 환자번호는 이미 존재합니다',
          path: ['hos_patient_id'],
        },
      ),
    ),
    defaultValues: edit
      ? {
          name: editingPatient?.name,
          hos_patient_id: editingPatient?.hos_patient_id,
          species: editingPatient?.species,
          breed: editingPatient?.breed,
          gender: editingPatient?.gender,
          birth: new Date(editingPatient?.birth!),
          microchip_no: editingPatient?.microchip_no ?? '',
          memo: editingPatient?.memo ?? '',
          weight: '',
          owner_name: editingPatient?.owner_name,
          owner_id: editingPatient?.hos_owner_id ?? '',
        }
      : {
          name: undefined,
          hos_patient_id: undefined,
          species: undefined,
          breed: undefined,
          gender: undefined,
          birth: undefined,
          microchip_no: '',
          memo: '',
          weight: '',
          owner_name: '',
          owner_id: '',
        },
  })

  const watchHosPatientId = form.watch('hos_patient_id')
  useEffect(() => {
    const isDuplicate = hosPatientIds.includes(watchHosPatientId)
    const hasChanged =
      edit && watchHosPatientId !== editingPatient?.hos_patient_id

    if ((!edit && isDuplicate) || (edit && hasChanged && isDuplicate)) {
      setIsDuplicateId(true)
      form.setError('hos_patient_id', {
        type: 'manual',
        message: '이 환자 번호는 이미 존재합니다',
      })
    } else {
      setIsDuplicateId(false)
      form.clearErrors('hos_patient_id')
    }
  }, [watchHosPatientId, hosPatientIds, form, edit, editingPatient])

  const handleSpeciesChange = (selected: string) => {
    form.setValue('species', selected)
    setSelectedSpecies(selected)
  }

  const handleRegister = async (
    values: z.infer<typeof registerPatientFormSchema>,
  ) => {
    if (isDuplicateId) {
      return
    }
    setIsSubmitting(true)

    const patientId = await insertPatient(values, hosId)
    const formattedBirth = format(values.birth, 'yyyy-MM-dd')

    toast({
      title: '환자가 등록되었습니다',
      description: icu ? '입원을 이어서 진행합니다' : '',
    })

    icu ? setStep!('icuRegister') : setIsPatientRegisterDialogOpen!(false)

    icu &&
      setRegisteringPatient({
        patientId,
        birth: formattedBirth,
        patientName: values.name,
        ageInDays: getDaysSince(formattedBirth),
      })

    setIsSubmitting(false)

    refresh()
  }

  const handleUpdate = async (
    values: z.infer<typeof registerPatientFormSchema>,
  ) => {
    if (isDuplicateId) {
      return
    }
    setIsSubmitting(true)

    await updatePatient(values, hosId, editingPatient?.patient_id!)

    toast({
      title: '환자 정보가 수정되었습니다',
    })

    setIsSubmitting(false)
    setIsPatientUpdateDialogOpen!(false)
    refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(edit ? handleUpdate : handleRegister)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">환자 이름*</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-8 text-sm"
                  autoComplete="off"
                  id="name"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hos_patient_id"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <div className="flex items-center gap-2">
                <FormLabel>환자 번호*</FormLabel>
                <HelperTooltip>메인차트에 등록되어있는 환자번호</HelperTooltip>
              </div>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>종*</FormLabel>
              <Select
                onValueChange={handleSpeciesChange}
                defaultValue={field.value}
                name="species"
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="종을 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="canine" className="text-xs">
                    Canine
                  </SelectItem>
                  <SelectItem value="feline" className="text-xs">
                    Feline
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <FormLabel>품종*</FormLabel>
              <Popover
                open={breedOpen}
                onOpenChange={setBreedOpen}
                modal={true}
              >
                <PopoverTrigger asChild disabled={!selectedSpecies}>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'relative h-8 justify-start overflow-hidden border border-input bg-inherit px-3 text-sm font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? BREEDS.find((breed) => breed === field.value)
                        : selectedSpecies
                          ? '품종을 선택해주세요'
                          : '종을 먼저 선택해주세요'}
                      <CaretSortIcon className="absolute right-3 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="p-0 sm:w-[568px]">
                  <Command>
                    <CommandInput
                      placeholder="품종 검색"
                      className="h-8 text-xs"
                      name="breed"
                    />
                    <CommandList>
                      <ScrollArea className="h-64">
                        <CommandEmpty>해당 품종 검색 결과 없음.</CommandEmpty>
                        <CommandGroup>
                          {BREEDS.map((breed) => (
                            <CommandItem
                              value={breed}
                              key={breed}
                              onSelect={() => {
                                form.setValue('breed', breed)
                                setBreedOpen(false)
                              }}
                              className="text-xs"
                            >
                              {breed}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  breed === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>성별*</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                name="sex"
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="성별을 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SEX.map((sex) => (
                    <SelectItem
                      id={sex.value}
                      key={sex.value}
                      value={sex.value}
                      className="text-xs"
                    >
                      {sex.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <BirthDatePicker
          form={form}
          birth={edit ? new Date(editingPatient?.birth!) : undefined}
        />

        <FormField
          control={form.control}
          name="microchip_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>마이크로칩 번호</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {!edit && (
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>몸무게</FormLabel>
                <div className="relative flex">
                  <FormControl>
                    <Input {...field} className="h-8 text-sm" />
                  </FormControl>
                  <span className="absolute right-2 top-2 text-xs">kg</span>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="owner_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>보호자 이름</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>보호자 번호</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="memo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>메모</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-2 ml-auto flex gap-2">
          <Button
            type="button"
            disabled={isSubmitting}
            variant="outline"
            onClick={() => {
              if (icu && setStep) {
                setStep('patientRegister')
                setIsIcuDialogOpen(false)
              } else if (edit) {
                setIsPatientUpdateDialogOpen(false)
              } else {
                setIsPatientRegisterDialogOpen!(false)
              }
            }}
          >
            {edit ? '취소' : '닫기'}
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {icu ? '다음' : edit ? '수정' : '등록'}
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}
