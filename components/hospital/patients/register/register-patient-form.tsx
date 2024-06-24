'use client'

import { registerPatientFormSchema } from '@/components/hospital/patients/register/schema'
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
import { useSelectedPatientStore } from '@/lib/store/hospital/patients/selected-patient'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function HospitalRegisterPatientForm({
  hosId,
  setIsNextStep,
  icu = false,
}: {
  hosId: string
  setIsNextStep?: Dispatch<SetStateAction<boolean>>
  icu?: boolean
}) {
  const [breedOpen, setBreedOpen] = useState(false)
  const [selectedSpecies, setSelectedSpecies] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setPatientId } = useSelectedPatientStore()
  const { push } = useRouter()

  const supabase = createClient()
  const BREEDS = selectedSpecies === 'canine' ? CANINE_BREEDS : FELINE_BREEDS

  const form = useForm<z.infer<typeof registerPatientFormSchema>>({
    resolver: zodResolver(registerPatientFormSchema),
    defaultValues: {
      name: undefined,
      hos_patient_id: undefined,
      species: undefined,
      breed: undefined,
      gender: undefined,
      birth: new Date(),
      microchip_no: '',
      memo: '',
      weight: '',
    },
  })

  const handleSpeciesChange = (selected: string) => {
    form.setValue('species', selected)
    setSelectedSpecies(selected)
  }

  const handleSubmit = async (
    values: z.infer<typeof registerPatientFormSchema>,
  ) => {
    const {
      name,
      hos_patient_id,
      species,
      breed,
      gender,
      birth,
      microchip_no: microchipNumber,
      memo,
      weight,
    } = values
    setIsSubmitting(true)

    const { data: patientId, error } = await supabase.rpc(
      'insert_patient_data_when_register_patient',
      {
        birth_input: format(birth, 'yyyy-MM-dd'),
        body_weight_input: weight,
        breed_input: breed,
        gender_input: gender,
        hos_id_input: hosId,
        hos_patient_id_input: hos_patient_id,
        memo_input: memo,
        microchip_no_input: microchipNumber,
        name_input: name,
        species_input: species,
      },
    )
    if (error) {
      toast({
        variant: 'destructive',
        title: error.message,
        description: '관리자에게 문의하세요',
      })

      return
    }

    toast({
      title: '신규 환자가 등록되었습니다.',
    })

    setIsSubmitting(false)

    if (icu && setIsNextStep) {
      setIsNextStep(true)
      setPatientId(patientId)
    } else {
      push(`/hospital/${hosId}/patients`)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* 이름 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                이름*
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 번호 */}
        <FormField
          control={form.control}
          name="hos_patient_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                환자 번호*
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 종 */}
        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                종*
              </FormLabel>
              <Select
                onValueChange={handleSpeciesChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="종을 선택해주세요." />
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

        {/* 품종 */}
        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-semibold">품종*</FormLabel>
              <Popover open={breedOpen} onOpenChange={setBreedOpen}>
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
                          ? '품종을 선택해주세요.'
                          : '종을 먼저 선택해주세요.'}
                      <CaretSortIcon className="absolute right-3 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-[352px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="품종 검색"
                      className="h-8 text-xs"
                    />
                    <CommandList>
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
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 성별 */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                성별*
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="성별을 선택해주세요." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SEX.map((sex) => (
                    <SelectItem
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

        {/* 출생일 */}
        <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-semibold">출생일</FormLabel>
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
                          출생일을 선택해주세요.
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

        {/* 마이크로칩 번호*/}
        <FormField
          control={form.control}
          name="microchip_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                마이크로칩 번호
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* 몸무게 */}
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                몸무게
              </FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-sm" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* 메모 */}
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="memo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                  메모
                </FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="col-span-2 ml-auto mt-4 font-semibold"
          disabled={isSubmitting}
        >
          {icu ? '다음' : '등록'}
          <LoaderCircle
            className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </form>
    </Form>
  )
}
