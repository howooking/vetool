import { useState } from 'react'
import { read, utils } from 'xlsx'

type FileData = string[][]

export default function usePatientFileUpload(
  hos_id: string,
  onComplete: () => void,
) {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // csv 파일을 파싱
  const parseCSV = (content: string): string[][] => {
    const rows = content.split('\n')

    // csv 파일에서 쉼표가 따옴표로 묶인 값 사이에 있는지 확인하는 정규식 ("a", "b", "c" ... )
    return rows.map((row) =>
      row.split(/(?:,)(?=(?:[^"]*"[^"]*")*[^"]*$)/g).map((cell) => cell.trim()),
    )
  }

  // xlsx 파일을 파싱
  const parseExcel = (content: ArrayBuffer): string[][] => {
    const workbook = read(content, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    return utils.sheet_to_json(sheet, { header: 1 })
  }

  // FileReader를 통해 input으로 받은 파일을 string[][]으로 변환
  const readFileContent = (file: File): Promise<FileData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = async (event) => {
        try {
          const content = event.target?.result as ArrayBuffer | string
          if (file.name.endsWith('.csv')) {
            resolve(parseCSV(content as string))
          }
          if (file.name.endsWith('.xlsx')) {
            resolve(parseExcel(content as ArrayBuffer))
          }
        } catch (error) {
          setUploadStatus('🚨 파일 읽기 중 오류가 발생했습니다.')
          reject(error)
        }
      }
      reader.onerror = () => {
        setUploadStatus('🚨 파일 읽기 중 오류가 발생했습니다.')
        reject(new Error())
      }

      if (file.name.endsWith('.csv')) {
        reader.readAsText(file)
      } else if (file.name.endsWith('.xlsx')) {
        reader.readAsArrayBuffer(file)
      }
    })
  }

  const handleFileSelection = (file: File | null) => {
    setSelectedFile(file)
    setUploadStatus(null)
  }

  // 업로드 핸들러 함수
  const handleUpload = async () => {
    if (!selectedFile) return

    setIsLoading(true)

    const csvData = await readFileContent(selectedFile)
    const response = await fetch(`/api/patient/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: csvData, hos_id }),
    })
    const result = await response.json()

    if (response.status !== 200 || result.error) {
      // toast({
      //   title: '업로드 실패',
      //   description: `${result.error}, 관리자에게 문의해주세요`,
      //   variant: 'destructive',
      // })
    }

    setIsLoading(false)
    setSelectedFile(null)
    onComplete()
  }

  return {
    selectedFile,
    uploadStatus,
    isLoading,
    handleFileSelection,
    handleUpload,
  }
}
