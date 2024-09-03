import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { COLORS } from '@/constants/common/colors'
import { useMemo } from 'react'

export default function OrderColorPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const parsedValue = useMemo(() => {
    return value || '#ccfbf1'
  }, [value])

  return (
    <div className="flex w-full flex-col space-y-2">
      <Label className="font-semibold">오더 색상</Label>

      <Select onValueChange={onChange} value={parsedValue}>
        <SelectTrigger className="w-24 border-none shadow-none">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            style={{
              backgroundColor: parsedValue,
            }}
          ></Button>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(COLORS).map(([key, value]) => (
              <SelectItem
                key={key}
                value={value}
                className="flex h-8 w-full justify-between"
              >
                <div
                  style={{ backgroundColor: value }}
                  className="h-4 w-20 rounded-full"
                />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
