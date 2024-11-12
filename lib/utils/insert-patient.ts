import { CSV_HEADER_MAPPING } from '@/constants/hospital/icu/patient/patient'
import {
  CANINE_BREEDS,
  FELINE_BREEDS,
} from '@/constants/hospital/register/breed'

// Date를 다뤄야하는 경우가 있으므로 클라이언트 상에서 처리해야하므로 서버 컴포넌트가 아닌 유틸 함수화
export const transformCsvData = (row: string[], header: string[]) => {
  const transformedData: Record<string, any> = {}

  // Key: CSV COLUMN KOREAN 헤더!! ,Value: DB COLUMN NAME!!
  const columnIndexes = CSV_HEADER_MAPPING.map((mapping) => ({
    ...mapping,
    index: header.indexOf(mapping.csvColumn),
  })).filter((mapping) => mapping.dbColumn && mapping.index !== -1)

  columnIndexes.forEach(({ index, dbColumn }) => {
    // CSV <-> DB 컬럼명에 대응되는 값
    const value = row[index]

    switch (dbColumn) {
      case 'birth':
        transformedData[dbColumn] = transformBirthDate(value)

        break

      case 'gender':
        transformedData[dbColumn] = transformGender(value)
        break

      case 'species':
        transformedData[dbColumn] = transformSpecies(value)

        break

      case 'breed':
        transformedData[dbColumn] = transformBreed(value)

        break

      case 'is_alive':
        transformedData[dbColumn] = value === '정상'
        break

      default:
        transformedData[dbColumn] = value
    }
  })

  // 필수 필드에 대한 기본값 설정
  transformedData.is_alive = transformedData.is_alive ?? true

  return transformedData
}

const transformGender = (value: string): string => {
  if (!value) return 'unknown'

  const genderMap: Record<string, string> = {
    Female: 'if',
    Male: 'im',
    'Castrated Male': 'cm',
    'Spayed Female': 'sf',
  }
  return genderMap[value] ?? 'Unknown'
}

const transformBirthDate = (value: string): string => {
  const date = new Date(value)
  const today = new Date().toISOString().split('T')[0]

  if (isNaN(date.getTime())) {
    return today
  }

  return value ?? today
}

const transformSpecies = (value: string) => {
  // "'Feline"과 같이 데이터가 손상된 경우가 있음
  if (value === 'Canine' || value === 'Feline') {
    return value.toLocaleLowerCase()
  }

  return 'un'
}

const transformBreed = (value: string): string => {
  if (!value) {
    return 'OTHER BREED'
  }

  const engBreedName = value.split('(')[0].trim().toLowerCase()

  // 추출된 영문명이 빈 문자열인 경우 원본값 반환
  if (!engBreedName) {
    return value
  }

  // 한글만 포함된 경우 원본값 반환
  if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(engBreedName)) {
    return value
  }

  // Korean Shorthaired -> Domestic Shorthaired 변환
  if (engBreedName.includes('korean')) {
    return 'DOMESTIC SHORTHAIRED'
  }

  // breed 목록에서 매칭되는 eng value 찾기
  const matchedBreed = [...CANINE_BREEDS, ...FELINE_BREEDS]
    .find((breed) => breed.eng.toLowerCase() === engBreedName)
    ?.eng.toUpperCase()

  return matchedBreed ?? value
}
