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

  if (years === 0) {
    return `${ageInDays}일`
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

export const updateTags = (tags: string, value: string, part: 'dx' | 'cc') => {
  // '#'로 문자열을 분할
  const parts = tags.split('#')

  // 각 부분을 추출
  const [, breed, species, name, bod, dx, cc] = parts

  // 변경할 위치에 따라 새 값을 적용
  let newDx = dx
  let newCc = cc

  if (part === 'dx') {
    newDx = value
  }
  if (part === 'cc') {
    newCc = value
  }

  // 새로운 문자열 구성
  const updatedIcuTags = `#${breed}#${species}#${name}#${bod}#${newDx}#${newCc}`
  const updatedSearchTags = `#${newDx}#${newCc}`

  return { updatedIcuTags, updatedSearchTags }
}

// YYYY-MM-DD string을 받아 현재와 입력받은 날짜 간의 차이를 반환
export const getDaysDifference = (dateString: string) => {
  // 날짜 문자열을 Date 객체로 변환
  const targetDate = new Date(dateString)
  const today = new Date()

  // 두 날짜의 차이를 밀리초 단위로 계산
  const diffTime = today.getTime() - targetDate.getTime()

  // 밀리초를 일 단위로 변환
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}
