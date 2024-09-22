import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

export default function IcuChartTxImageInput({
  txId,
  images,
  onImagesChange,
}: {
  txId: string | undefined
  images: File[]
  onImagesChange: (newImages: File[]) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && txId) {
      const newImages = [...images]

      Array.from(files).forEach(async (file) => {
        const reader = new FileReader()

        newImages.push(file)
        if (newImages.length > 5) newImages.shift()

        onImagesChange(newImages)

        reader.readAsDataURL(file)
      })
    }
  }

  const handleDeleteImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)

    onImagesChange(newImages)
  }

  return (
    <>
      {/* 이미지 INPUT */}
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="image">{`이미지 (${images.length}/5)`}</Label>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          파일 선택
        </Button>
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
          multiple
        />
      </div>

      {/* 업로드된 이미지 목록 DIV */}
      <div className="mt-4 flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative h-24 w-24">
            <Image
              src={URL.createObjectURL(image)}
              fill
              alt={`이미지 ${index + 1}`}
              className="rounded-md object-cover"
              unoptimized
            />

            {/* 이미지 삭제 BUTTON */}
            <Button
              onClick={() => handleDeleteImage(index)}
              variant="outline"
              className="absolute right-1 top-1 h-5 w-5 rounded-full border-none bg-black bg-opacity-50 p-0 transition-colors duration-200 hover:bg-black"
            >
              <X size={12} strokeWidth={3} className="text-white" />
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}
