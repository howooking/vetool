'use client'

import { Button } from '@/components/ui/button'
import { FOOTER_CATEGORIES } from '@/constants/hospital/icu/chart/footer'
import { useIcuSelectedChartCategoryStore } from '@/lib/store/hospital/icu/icu-selected-category'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'

export default function IcuChartFooter() {
  const { setSelectedPatientId } = useIcuSelectedPatientStore()
  const { selectedCategory, setSelectedCategory } =
    useIcuSelectedChartCategoryStore()

  const handleButtonClick = (value: 'overall' | 'icuChart') => {
    setSelectedCategory(value)

    if (value === 'overall') {
      setSelectedPatientId(null)
    }
  }

  return (
    <footer className="fixed bottom-0 h-12 w-full border-t bg-white">
      <ul className="flex h-full items-center gap-2 pl-2">
        {FOOTER_CATEGORIES.map(({ label, value }) => (
          <li key={value}>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className={selectedCategory === value ? 'bg-muted' : ''}
              onClick={() => handleButtonClick(value)}
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>
    </footer>
  )
}
