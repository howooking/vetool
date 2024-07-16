import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { TxLog } from '@/types/icu'

export default function TxLog({ logs }: { logs: TxLog[] }) {
  return (
    <div>
      <Label>처치 기록</Label>
      <Accordion type="single" collapsible className="mt-2">
        <AccordionItem value="logs">
          <Table>
            <AccordionTrigger className="py-0">
              <TableHeader className="w-full">
                <TableRow className="flex w-full items-center py-2">
                  <TableHead className="h-auto w-2/5 text-center">
                    결과
                  </TableHead>
                  <TableHead className="h-auto w-1/5 pl-6 text-center">
                    담당자
                  </TableHead>
                  <TableHead className="h-auto w-2/5 pr-8 text-right">
                    시간
                  </TableHead>
                </TableRow>
              </TableHeader>
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <TableBody className="flex flex-col">
                {logs.map((log, index) => (
                  <TableRow
                    className="flex w-full items-center justify-between"
                    key={index}
                  >
                    <TableCell
                      className="w-2/5 truncate"
                      title={log.result ?? ''}
                    >
                      {log.result}
                    </TableCell>
                    <TableCell className="w-1/5 text-center">
                      {log.name}
                    </TableCell>
                    <TableCell className="w-2/5 text-right tracking-tighter">
                      {log.createdAt}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </AccordionContent>
          </Table>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
