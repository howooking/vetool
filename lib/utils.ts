import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { SelectedIcuOrder } from '@/types/icu/chart'
import { type ClassValue, clsx } from 'clsx'
import { differenceInDays, isValid, parseISO } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { OrderTimePendingQueue } from './store/icu/icu-order'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// '2020-02-02' 와 같은 Date 형식 string 문자열을 받아, age-in-days를 반환하는 유틸 함수
export function getDaysSince(dateString: string | null) {
  if (!dateString) return 0

  const givenDate = new Date(dateString)
  const currentDate = new Date()

  // 두 날짜의 차이를 밀리초 단위로 계산
  const timeDifference = currentDate.getTime() - givenDate.getTime()
  // 차이를 일수로 변환
  const dayDifference = timeDifference / (1000 * 3600 * 24)

  return Math.floor(dayDifference)
}
export function getAgeFromAgeInDays(ageInDays: number) {
  const years = Math.floor(ageInDays / 365)
  const remainingDays = ageInDays % 365
  const months = Math.floor(remainingDays / 30)
  const days = remainingDays % 30

  if (years === 0) {
    if (months === 0) {
      return `${days}일`
    } else {
      return `${months}개월 ${days}일`
    }
  } else if (years > 0 && months === 0) {
    return `${years}살`
  } else {
    return `${years}살 ${months}개월`
  }
}

export function formatTimestamp(utcTimestamp: string) {
  const date = new Date(utcTimestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export function calculateAge(dateString: string) {
  // Parse the input date string
  const birthDate = new Date(dateString)

  // Get the current date
  const today = new Date()

  // Calculate the difference in years
  let ageYears = today.getFullYear() - birthDate.getFullYear()

  // Calculate the difference in months
  let ageMonths = today.getMonth() - birthDate.getMonth()

  // Adjust if the birth month hasn't occurred yet this year
  if (ageMonths < 0) {
    ageYears--
    ageMonths += 12
  }

  // Check if the birth day hasn't occurred yet this month
  if (today.getDate() < birthDate.getDate()) {
    ageMonths--
    if (ageMonths < 0) {
      ageYears--
      ageMonths += 12
    }
  }
  if (ageYears === 0 && ageMonths === 0) {
    return '1개월'
  } else if (ageYears === 0) {
    return `${ageMonths}개월`
  } else if (ageMonths === 0) {
    return `${ageYears}년`
  } else {
    return `${ageYears}년 ${ageMonths}개월`
  }
}

// YYYY-MM-DD string을 받아 현재와 입력받은 날짜 간의 차이를 반환
export const getDaysDifference = (dateString: string) => {
  // 날짜 문자열을 Date 객체로 변환
  const targetDate = new Date(dateString)
  const today = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  )

  // 두 날짜의 차이를 밀리초 단위로 계산
  const diff = today.getTime() - targetDate.getTime()

  // 밀리초를 일 단위로 변환
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24))

  return diffDays
}

export const getYesterdayTodayTomorrow = () => {
  const now = new Date()
  const koreaTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  )

  const today = new Date(koreaTime)
  const yesterday = new Date(koreaTime)
  yesterday.setDate(today.getDate() - 1)
  const tomorrow = new Date(koreaTime)
  tomorrow.setDate(today.getDate() + 1)

  return {
    yesterday: formatDate(yesterday),
    today: formatDate(today),
    tomorrow: formatDate(tomorrow),
  }
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// stringifiedHashtagKeywords('사과, 바나나') => '#사과#바나나'
export const hashtagKeyword = (stringKeywords: string) => {
  return stringKeywords
    .split(',')
    .map((keyword) => `#${keyword.trim()}`)
    .join('')
}

export const getTimeSince = (inputTime: string) => {
  const now = new Date()
  const input = new Date(inputTime)
  const diff = now.getTime() - input.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years}년 전`
  } else if (months > 0) {
    return `${months}개월 전`
  } else if (weeks > 0) {
    return `${weeks}주 전`
  } else if (days > 0) {
    return `${days}일 전`
  } else if (hours > 0) {
    return `${hours}시간 전`
  } else if (minutes > 0) {
    return `${minutes}분 전`
  } else if (seconds > 0) {
    return `${seconds}초 전`
  } else {
    return '방금 전'
  }
}

// created_at 형식의 날짜를 현재와 비교해서 difference 차이가 크다면 true
export const isDaysBehind = (dateString: string, difference: number) => {
  const isoDate = parseISO(dateString)

  // Check if the parsed date is valid
  if (!isValid(isoDate)) {
    throw new Error('Invalid date string provided')
  }

  const currentDate = new Date()
  const differenceDays = differenceInDays(currentDate, isoDate)

  return differenceDays >= difference
}

export const getDateMonthsAgo = (months: string) => {
  const now = new Date()

  return formatTimestamp(
    new Date(
      now.getFullYear(),
      now.getMonth() - Number(months),
      now.getDate(),
    ).toString(),
  )
}

export const changeTargetDateInUrl = (
  path: string,
  newDateString: string,
  params?: URLSearchParams,
) => {
  const DATE_REGEX = /\/(\d{4}-\d{2}-\d{2})\//

  if (params?.has('order-id') || params?.has('time')) {
    params.delete('order-id')
    params.delete('time')
  }

  const newPath = params
    ? `${path.replace(DATE_REGEX, `/${newDateString}/`)}?${params?.toString()}`
    : `${path.replace(DATE_REGEX, `/${newDateString}/`)}`
  return newPath
}

// 우클릭 오더 시간 변경시 큐에 저장된 오더 id와 시간 데이터를 formatting
type FormattedOrder = {
  orderId: string
  orderTimes: number[]
}
export function formatOrders(
  originalArray: OrderTimePendingQueue[],
): FormattedOrder[] {
  const result: { [key: string]: FormattedOrder } = {}
  for (const order of originalArray) {
    if (result[order.orderId]) {
      result[order.orderId].orderTimes.push(order.orderTime)
    } else {
      result[order.orderId] = {
        orderId: order.orderId,
        orderTimes: [order.orderTime],
      }
    }
  }
  return Object.values(result)
}

export const sortOrders = (orders: SelectedIcuOrder[]): SelectedIcuOrder[] => {
  return [...orders]
    .sort((prev, next) => prev.order_name.localeCompare(next.order_name))
    .sort(
      (prev, next) =>
        DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
          (order) => order === prev.order_type,
        ) -
        DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
          (order) => order === next.order_type,
        ),
    )
}
