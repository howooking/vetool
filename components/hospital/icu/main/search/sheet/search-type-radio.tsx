import { Label } from '@/components/ui/label'
import { Dispatch, SetStateAction } from 'react'
import type { SearchOptions } from '@/components/hospital/icu/main/search/icu-search-chart'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function SearchTypeRadio({
  setOptions,
}: {
  setOptions: Dispatch<SetStateAction<SearchOptions>>
}) {
  const handleValueChange = (value: 'keyword' | 'simple') => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      searchType: value,
    }))
  }

  return (
    <RadioGroup
      defaultValue="simple"
      className="flex"
      onValueChange={handleValueChange}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="keyword" id="r1" />
        <Label className="text-xs" htmlFor="r1">
          키워드 검색
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="simple" id="r2" />
        <Label className="text-xs" htmlFor="r2">
          단순 검색
        </Label>
      </div>
    </RadioGroup>
  )
}
