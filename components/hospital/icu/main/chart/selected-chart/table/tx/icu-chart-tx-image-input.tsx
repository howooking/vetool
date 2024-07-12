import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

export function IcuChartTxImageInput({
  images,
  onImagesChange,
}: {
  images: string[]
  onImagesChange: (newImages: string[]) => void
}) {
  // input(type="file")의 ref
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 이미지 input의 change 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files) {
      const newImages = [...images]

      Array.from(files).forEach((file) => {
        const reader = new FileReader()

        reader.onloadend = () => {
          newImages.push(reader.result as string)
          if (newImages.length > 5) newImages.shift()

          onImagesChange(newImages)
        }

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
        <Label htmlFor="image">이미지</Label>
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
        />
      </div>

      {/* 업로드된 이미지 목록 DIV */}
      <div className="mt-4 flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={image} className="relative h-24 w-24">
            <Image
              src={image}
              fill
              alt={`이미지 ${index + 1}`}
              className="rounded-md object-cover"
              unoptimized
            />

            {/* 이미지 삭제 BUTTON */}
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute right-1 top-1 rounded-full bg-white bg-opacity-70 transition-colors duration-200 hover:bg-opacity-100"
            >
              <X size={12} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
