import { Button } from '@/components/ui/button'
import { usePatientRegisterStep } from '@/lib/store/icu/icu-register'
import { Bookmark, File, Search } from 'lucide-react'
import { useState } from 'react'

const CHART_TYPES = [
  { type: 'search', icon: Search, label: '기존 차트 검색' },
  { type: 'create', icon: File, label: '새로운 차트 만들기' },
  { type: 'bookmark', icon: Bookmark, label: '북마크 차트 불러오기' },
] as const

export default function RegisterTypeSelector() {
  const { setStep } = usePatientRegisterStep()
  const [chartType, setChartType] = useState('')

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value
    setChartType(value)

    if (value === 'create') {
      setStep('icuRegister')

      return
    }

    if (value === 'search') {
      setStep('chartSearch')

      return
    }
  }

  const handlePreviousButtonClick = () => {
    setStep('patientSearch')
    return
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 pt-4">
        {CHART_TYPES.map(({ type, icon: Icon, label }) => (
          <Button
            key={type}
            type="button"
            value={type}
            variant="outline"
            className="flex h-48 w-full gap-2"
            onClick={handleButtonClick}
          >
            <Icon />
            {label}
          </Button>
        ))}
      </div>

      {chartType === 'bookmark' && <h1>bookmark</h1>}

      <Button
        type="button"
        variant="outline"
        className="ml-auto"
        onClick={handlePreviousButtonClick}
      >
        이전
      </Button>
    </div>
  )
}
