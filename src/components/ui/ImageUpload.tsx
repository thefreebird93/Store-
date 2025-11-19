

export default function Page() {
'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { Button } from './Button'

interface ImageUploadProps {
  onImageUpload: (url: string) => void
  currentImage?: string
  className?: string
}

export function ImageUpload({ onImageUpload, currentImage, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage || '')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { success, error } = useToast()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      error('Please select an image file')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      error('Image must be smaller than 5MB')
      return
    }

    setUploading(true)

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // In a real app, you would upload to your server or cloud storage
      // For now, we'll simulate an upload and use the preview as the URL
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const imageUrl = previewUrl // In real app, this would be the uploaded image URL
      onImageUpload(imageUrl)
      success('Image uploaded successfully')
    } catch (err) {
      error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreview('')
    onImageUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
              <p className="mt-2 text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-900">Click to upload</p>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
            </div>
          )}
        </div>
      )}
      
      {!preview && !uploading && (
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          className="w-full mt-2"
        >
          <Upload className="h-4 w-4 mr-2" />
          Choose Image
        </Button>
      )}
    </div>
  )
}
}
