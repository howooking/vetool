import DrugComboBox from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-form/drug-order/drug-combo-box'
import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order-form/order-schema'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { SearchedDrugProducts } from '@/types/icu'
import { useEffect, useMemo, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function DrugFormField({
  form,
  weight,
  searchedDrugs,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
  weight?: string
  searchedDrugs?: SearchedDrugProducts[]
}) {
  const drugOrders = form.getValues('icu_chart_order_name')
  const isMicro = form.getValues('icu_chart_order_comment')?.includes('ul')

  const [name, dosage, route, time] = drugOrders.split('#')
  const [drugName, setDrugName] = useState(name ?? '')
  const [drugDosage, setDrugDosage] = useState(dosage ?? '')
  const [drugRoute, setDrugRoute] = useState(route ?? 'IV')
  const [drugTime, setDrugTime] = useState(time ?? 'BID')
  const [drugTotalAmount, setDrugTotalAmount] = useState('')
  const [drugTotalUnit, setDrugTotalUnit] = useState(isMicro ? 'ul' : 'ml')
  const [drugMassVolume, setDrugMassVolume] = useState<number | null>(null)

  useEffect(() => {
    form.setValue(
      'icu_chart_order_name',
      `${drugName}#${drugDosage}#${drugRoute}#${drugTime}`,
    )
    form.setValue('icu_chart_order_comment', drugTotalAmount + drugTotalUnit)
  }, [
    drugName,
    drugDosage,
    drugRoute,
    drugTime,
    drugTotalAmount,
    form,
    drugTotalUnit,
  ])

  useMemo(() => {
    const drug = searchedDrugs?.find((drug) => drug.name === drugName)
    setDrugMassVolume(drug?.mass_vol ?? null)
  }, [drugName, searchedDrugs])

  useEffect(() => {
    if (!drugMassVolume || !weight) return

    let totalAmount = (Number(drugDosage) * Number(weight)) / drugMassVolume
    setDrugTotalAmount(totalAmount.toFixed(2))

    if (drugTotalUnit === 'ul') {
      setDrugTotalAmount((totalAmount * 1000).toFixed(2))
    }
  }, [drugDosage, drugMassVolume, drugTotalAmount, drugTotalUnit, weight])

  return (
    <>
      <DrugComboBox
        drugName={drugName}
        searchedDrugs={searchedDrugs}
        setDrugName={setDrugName}
        setDrugMassVolume={setDrugMassVolume}
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="relative">
          <Label>약물 용량</Label>
          <Input
            id="drugDosage"
            value={drugDosage || ''}
            onChange={(e) => setDrugDosage(e.target.value)}
          />

          <span className="absolute right-2 top-8 text-sm text-muted-foreground">
            mg/kg
          </span>
        </div>
        <div>
          <Select value={drugRoute} onValueChange={setDrugRoute}>
            <Label>투여 경로</Label>
            <SelectTrigger>
              <SelectValue defaultValue="IV" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="IV">IV</SelectItem>
                <SelectItem value="SC">SC</SelectItem>
                <SelectItem value="IM">IM</SelectItem>
                <SelectItem value="ID">ID</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={drugTime} onValueChange={setDrugTime}>
            <Label>투여 횟수</Label>
            <SelectTrigger>
              <SelectValue defaultValue="BID" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="SID">SID</SelectItem>
                <SelectItem value="BID">BID</SelectItem>
                <SelectItem value="QID">QID</SelectItem>
                <SelectItem value="PRN">PRN</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Label>약물 총량</Label>
          <Input
            value={drugTotalAmount}
            onChange={(e) => setDrugTotalAmount(e.target.value)}
          />
          <span className="absolute right-2 top-8 text-sm text-muted-foreground">
            {drugTotalUnit}
          </span>
        </div>
        <RadioGroup
          defaultValue={isMicro ? 'ul' : 'ml'}
          onValueChange={setDrugTotalUnit}
          className="mt-6 flex shrink-0"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ml" id="r1" />
            <Label className="text-xs" htmlFor="r1">
              ml
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ul" id="r2" />
            <Label className="text-xs" htmlFor="r2">
              ul
            </Label>
          </div>
        </RadioGroup>
      </div>
    </>
  )
}
