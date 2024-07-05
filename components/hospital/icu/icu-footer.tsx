'use client'

import { Button } from '@/components/ui/button'
import { FOOTER_CATEGORIES } from '@/constants/hospital/icu/chart/footer'
import { useIcuMainViewStore } from '@/lib/store/hospital/icu/icu-main-view'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'

export default function IcuFooter() {
  const { setSelectedPatientId } = useIcuSelectedPatientStore()
  const { selectdMainView, setSelectedMainView } = useIcuMainViewStore()

  const handleButtonClick = (value: 'summary' | 'chart') => {
    setSelectedMainView(value)

    if (value === 'summary') {
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
              className={selectdMainView === value ? 'bg-muted' : ''}
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
