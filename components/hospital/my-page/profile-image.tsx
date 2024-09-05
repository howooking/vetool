'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useUpdateUserInfoStore } from '@/lib/store/hospital/update-user-info'
import { Camera, LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

export default function ProfileImage({
  src,
  onImageUpload,
}: {
  src: string | null
  onImageUpload?: (file: File) => Promise<string>
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isUploading, setIsUploading] = useState(false)

  const { name, avatarUrl, setUserInfo } = useUpdateUserInfoStore()

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsUploading(true)

    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUserInfo(name, e.target?.result as string)
      }

      reader.readAsDataURL(file)
    }

    // TODO: 이미지 업로드 로직

    setIsUploading(false)
  }

  const handleRestoreImage = () => {
    setUserInfo(name, src)

    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="relative flex">
      <Image
        src={avatarUrl || (src ?? '')}
        alt="프로필 이미지"
        width={120}
        height={120}
        className="rounded-full"
        priority
        unoptimized
      />
      <Input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
      />

      {/* TODO: 프로필 이미지 변경 */}
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full border-2 border-primary p-0"
            disabled={isUploading}
          >
            <Camera size={20} strokeWidth={2} className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => inputRef.current?.click()}>
            프로필 이미지 변경
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleRestoreImage}>
            기본 이미지로 변경
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50">
          <LoaderCircle
            className="animate-spin rounded-full text-primary"
            size={32}
          />
        </div>
      )}
    </div>
  )
}
