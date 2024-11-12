import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { calculateRer } from '@/lib/calculators/rer'
import { updateDerCalcFactor } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Equal, LoaderCircle, X, Zap } from 'lucide-react'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import RerDerDisplay from './rer-der-display'
import RerDerToolTip from './rer-der-tool-tip'

export default function RerDer({
  weight,
  icuChartId,
  species,
  derCalcFactor,
}: {
  weight: string
  icuChartId: string
  species: string
  derCalcFactor: number | null
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [factor, setFactor] = useState(
    derCalcFactor ? derCalcFactor.toString() : '',
  )
  const [isFactorNan, setIsFactorNan] = useState(false)
  const factorRef = useRef<HTMLInputElement>(null)
  const hasNoWeight = weight === ''

  useEffect(() => {
    factorRef.current?.focus()
  }, [])

  const {
    basicHosData: { rerCalcMethod },
  } = useBasicHosDataContext()

  const calculatedRer = useMemo(
    () =>
      calculateRer(
        weight,
        species as 'canine' | 'feline',
        rerCalcMethod as 'a' | 'b',
      ),
    [rerCalcMethod, species, weight],
  )

  const calculatedDer = useMemo(
    () => (Number(calculatedRer) * Number(factor)).toFixed(0),
    [calculatedRer, factor],
  )

  useEffect(() => {
    if (Number.isNaN(Number(factor))) {
      setIsFactorNan(true)
    } else {
      setIsFactorNan(false)
    }
  }, [factor])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isFactorNan) {
      factorRef.current?.focus()
      return
    }
    if (hasNoWeight) {
      return
    }

    if (derCalcFactor === Number(factor)) {
      setIsDialogOpen(false)
      return
    }

    setIsSubmitting(true)
    await updateDerCalcFactor(icuChartId, Number(factor))

    toast({
      title: 'DER이 수정되었습니다',
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full items-center justify-start gap-2 p-2"
        >
          <Label className="text-xs text-muted-foreground" htmlFor="ownerName">
            <Zap size={16} className="text-muted-foreground" />
          </Label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-muted-foreground md:block">
                RER
              </span>
              <span>{hasNoWeight ? '체중 입력' : calculatedRer}</span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-muted-foreground md:block">
                DER
              </span>
              <span>
                {hasNoWeight ? '체중 입력' : factor ? calculatedDer : '미정'}
              </span>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>RER & DER</span>
            <RerDerToolTip rerCalcMethod={rerCalcMethod as 'a' | 'b'} />
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form
          className="mt-2 grid grid-cols-9 items-center justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <RerDerDisplay
            calcuatedVal={hasNoWeight ? '체중 입력' : calculatedRer}
            prefix="RER"
          />

          <X className="col-span-1 w-full" />

          <Input
            ref={factorRef}
            className={cn(
              isFactorNan &&
                'focus:ring-error focus-visible:ring-2 focus-visible:ring-rose-300',
              'col-span-1',
            )}
            placeholder="배수"
            value={factor}
            onChange={(e) => setFactor(e.target.value)}
          />

          <Equal className="col-span-1 w-full" />

          <RerDerDisplay
            calcuatedVal={
              hasNoWeight
                ? '체중 입력'
                : isFactorNan
                  ? '숫자입력'
                  : calculatedDer
            }
            prefix="DER"
          />

          <div className="col-span-9 ml-auto flex w-full justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              취소
            </Button>

            <Button type="submit" className="ml-2" disabled={isSubmitting}>
              확인
              <LoaderCircle
                className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
              />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
