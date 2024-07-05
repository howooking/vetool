'use client'

import { Button } from '@/components/ui/button'
import { useIcuMainViewStore } from '@/lib/store/hospital/icu/icu-main-view'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'

export const MAIN_VIEW_MENUS = [
  {
    label: '종합 현황',
    value: 'summary',
  },
  {
    label: '입원 차트',
    value: 'chart',
  },
] as const

export default function IcuFooter() {
  const { setSelectedPatientId } = useIcuSelectedPatientStore()
  const { selectIcudMainView, setSelectedIcuMainView } = useIcuMainViewStore()

  const handleButtonClick = (value: 'summary' | 'chart') => {
    setSelectedIcuMainView(value)

    if (value === 'summary') {
      setSelectedPatientId(null)
    }
  }

  return (
    <footer className="fixed bottom-0 h-12 w-full border-t bg-white">
      <ul className="flex h-full items-center gap-2 pl-2">
        {MAIN_VIEW_MENUS.map(({ label, value }) => (
          <li key={value}>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className={selectIcudMainView === value ? 'bg-muted' : ''}
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
