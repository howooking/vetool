'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMemo, useState } from 'react'
import { IcuAnalysisData } from '@/types/icu/analysis'

interface ChartData {
  date: string
  all: number
  canine: number
  feline: number
}

const transformData = (originalData: IcuAnalysisData[]) => {
  const dataMap = new Map<string, ChartData>()

  originalData.forEach((item) => {
    const date = item.target_date
    if (!dataMap.has(date)) {
      dataMap.set(date, { date, all: 0, canine: 0, feline: 0 })
    }

    const data = dataMap.get(date)!
    data.all += 1

    if (item.patient.species === 'canine') data.canine += 1
    if (item.patient.species === 'feline') data.feline += 1
  })

  return Array.from(dataMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  )
}

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  all: {
    label: '전체',
    color: 'hsl(var(--chart-1))',
  },
  canine: {
    label: 'Canine',
    color: 'hsl(var(--chart-2))',
  },
  feline: {
    label: 'Feline',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

export default function IoStatistics({
  analysisData,
}: {
  analysisData: IcuAnalysisData[]
}) {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>('all')
  const [timeRange, setTimeRange] = useState('7d')
  const chartData = transformData(analysisData)

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 7

    if (timeRange === '30d') daysToSubtract = 30

    now.setDate(now.getDate() - daysToSubtract)

    return date >= now
  })

  const total = useMemo(
    () => ({
      all: chartData.reduce((acc, curr) => acc + curr.all, 0),
      canine: chartData.reduce((acc, curr) => acc + curr.canine, 0),
      feline: chartData.reduce((acc, curr) => acc + curr.feline, 0),
    }),
    [chartData],
  )

  return (
    <Card className="m-2">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>입원 환자 통계</CardTitle>
          <CardDescription>지난 한 달간의 입원 환자 수</CardDescription>
        </div>

        <div className="flex flex-col gap-1 px-6 py-5 sm:py-6">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="30d" className="rounded-lg">
                지난 1개월
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                지난 일주일
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex">
          {['all', 'canine', 'feline'].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="mt-4 aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={6}
              minTickGap={timeRange === '7d' ? 1 : 32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('ko-KR', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
