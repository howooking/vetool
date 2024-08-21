import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
    return `${years}년`
  } else {
    return `${years}년 ${months}개월`
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

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return {
    yesterday: formatDate(yesterday),
    today: formatDate(today),
    tomorrow: formatDate(tomorrow),
  }
}

// stringifiedHashtagKeywords('사과, 바나나') => '#사과#바나나'
export const hashtagKeyword = (stringKeywords: string) => {
  return stringKeywords
    .split(',')
    .map((keyword) => `#${keyword.trim()}`)
    .join('')
}
