import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import type { TxLog } from '@/types/icu'

export default function IcuChartTxLog({ logs }: { logs: TxLog[] | null }) {
  return (
    <div className="flex w-full items-center gap-4">
      <Label htmlFor="log" className="w-1/3">
        처치 기록
      </Label>

      {logs && logs.length ? (
        <Accordion type="single" collapsible className="w-2/3">
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex w-full items-center justify-between pr-2 text-sm font-bold">
                <span>결과</span>
                <span>담당자</span>
                <span>처치 시각</span>
              </div>
            </AccordionTrigger>

            {logs.map((log, index) => (
              <AccordionContent key={index}>
                <div className="grid grid-cols-3 text-sm">
                  <span>{log.result}</span>
                  <span>{log.name}</span>
                  <span className="text-xs">{log.createdAt}</span>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
      ) : (
        <span className="text-sm">없음</span>
      )}
    </div>
  )
}
