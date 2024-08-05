'use client'

import { registerPatientFormSchema } from '@/components/hospital/patients/schema'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { useIcuRegisteringPatient } from '@/lib/store/icu/icu-register'
import { cn, getDaysSince } from '@/lib/utils'
import type { PatientDataTable } from '@/types/patients'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type PatientFormRegisterProps = {
  hosId: string
  edit?: false
  icu?: false
  setStep?: null
  editingPatient?: null
  setIsPatientRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsPatientUpdateDialogOpen?: null
}
type PatientFormIcuRegisterProps = {
  hosId: string
  edit?: false
  icu?: true
  setStep?: (step: 'patientRegister' | 'icuRegister' | 'patientSearch') => void
  editingPatient?: null
  setIsPatientRegisterDialogOpen?: null
  setIsPatientUpdateDialogOpen?: null
}
type PatientFormEditProps = {
  hosId: string
  edit: true
  icu?: false
  setStep?: null
  editingPatient: PatientDataTable
  setIsPatientRegisterDialogOpen?: null
  setIsPatientUpdateDialogOpen: Dispatch<SetStateAction<boolean>>
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
}: PatientFormProps) {
  const [breedOpen, setBreedOpen] = useState(false)
  const [selectedSpecies, setSelectedSpecies] = useState<string>(
    edit ? editingPatient?.species! : '',
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setRegisteringPatient } = useIcuRegisteringPatient()
  const { refresh } = useRouter()

  const BREEDS = selectedSpecies === 'canine' ? CANINE_BREEDS : FELINE_BREEDS

  const form = useForm<z.infer<typeof registerPatientFormSchema>>({
    resolver: zodResolver(registerPatientFormSchema),
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
        },
  })

  const handleSpeciesChange = (selected: string) => {
    form.setValue('species', selected)
    setSelectedSpecies(selected)
  }

  const handleRegister = async (
    values: z.infer<typeof registerPatientFormSchema>,
  ) => {
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
                  autoCapitalize="none"
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
            <FormItem>
              <FormLabel>환자 번호*</FormLabel>
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

                <PopoverContent className="p-0 sm:w-[488px]">
                  <Command>
                    <CommandInput
                      placeholder="품종 검색, 잡종시 'Mongrel' 선택"
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-end">
              <FormLabel>출생일*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'h-8 overflow-hidden border border-input bg-inherit pl-3 text-left text-sm font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        <>{format(field.value, 'yyyy-MM-dd')}</>
                      ) : (
                        <span className="overflow-hidden whitespace-nowrap">
                          출생일을 선택해주세요
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    styles={{
                      caption_label: { display: 'none' },
                      dropdown_month: { fontSize: 14 },
                      dropdown_year: { fontSize: 14 },
                      button: { fontSize: 14 },
                    }}
                    captionLayout="dropdown-buttons"
                    fromYear={1990}
                    toYear={new Date().getFullYear()}
                    showOutsideDays
                    fixedWeeks
                    locale={ko}
                    mode="single"
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1990-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
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
                <FormControl>
                  <Input {...field} className="h-8 text-sm" />
                </FormControl>

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
              icu
                ? setStep!('patientRegister')
                : edit
                  ? setIsPatientUpdateDialogOpen(false)
                  : setIsPatientRegisterDialogOpen!(false)
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
