

export default function Page() {
'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useToast } from '@/hooks/useToast'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { productSchema, type ProductFormData } from '@/lib/validation'
import { CATEGORIES } from '@/utils/constants'

interface ProductFormProps {
  product?: any
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    name_ar: product?.name_ar || '',
    description: product?.description || '',
    description_ar: product?.description_ar || '',
    price: product?.price || '',
    original_price: product?.original_price || '',
    image_url: product?.image_url || '',
    category: product?.category || 'hair',
    in_stock: product?.in_stock ?? true,
    sku: product?.sku || '',
    tags: product?.tags?.join(', ') || ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<ProductFormData>>({})
  
  const { t } = useLanguage()
  const { success, error } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }))
    
    if (errors[name as keyof ProductFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const validatedData = productSchema.parse({
        ...formData,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : undefined,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      })

      await onSubmit(validatedData)
      success(product ? t('productUpdated') : t('productCreated'))
    } catch (err) {
      if (err instanceof Error) {
        error(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const categoryOptions = Object.values(CATEGORIES).map(cat => ({
    value: cat.id,
    label: t(cat.id)
  }))

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={`${t('name')} (${t('english')})`}
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
          placeholder={t('enterProductName')}
        />

        <Input
          label={`${t('name')} (${t('arabic')})`}
          name="name_ar"
          value={formData.name_ar}
          onChange={handleChange}
          required
          error={errors.name_ar}
          placeholder={t('enterProductNameAr')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Textarea
          label={`${t('description')} (${t('english')})`}
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          placeholder={t('enterProductDescription')}
          rows={3}
        />

        <Textarea
          label={`${t('description')} (${t('arabic')})`}
          name="description_ar"
          value={formData.description_ar}
          onChange={handleChange}
          error={errors.description_ar}
          placeholder={t('enterProductDescriptionAr')}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label={t('price')}
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
          error={errors.price}
          placeholder="0.00"
        />

        <Input
          label={t('originalPrice')}
          name="original_price"
          type="number"
          step="0.01"
          value={formData.original_price}
          onChange={handleChange}
          error={errors.original_price}
          placeholder={t('optional')}
        />

        <Input
          label={t('sku')}
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          required
          error={errors.sku}
          placeholder="NB1001"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t('imageUrl')}
          name="image_url"
          type="url"
          value={formData.image_url}
          onChange={handleChange}
          required
          error={errors.image_url}
          placeholder="https://example.com/image.jpg"
        />

        <Select
          label={t('category')}
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          error={errors.category}
          options={categoryOptions}
        />
      </div>

      <Input
        label={t('tags')}
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        error={errors.tags}
        placeholder="tag1, tag2, tag3"
        helperText={t('tagsHelper')}
      />

      <Checkbox
        label={t('inStock')}
        name="in_stock"
        checked={formData.in_stock}
        onChange={handleChange}
      />

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          {t('cancel')}
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          {product ? t('updateProduct') : t('createProduct')}
        </Button>
      </div>
    </form>
  )
}
}
