

export default function Page() {
'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useToast } from '@/hooks/useToast'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { contactSchema, type ContactFormData } from '@/lib/validation'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  
  const { t } = useLanguage()
  const { success, error } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData)
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      success(t('messageSent'))
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      if (err instanceof Error) {
        error(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const subjectOptions = [
    { value: 'general', label: t('generalInquiry') },
    { value: 'product', label: t('productQuestion') },
    { value: 'order', label: t('orderSupport') },
    { value: 'wholesale', label: t('wholesaleInquiry') },
    { value: 'other', label: t('other') }
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t('fullName')}
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
          placeholder={t('enterYourName')}
        />

        <Input
          label={t('email')}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={errors.email}
          placeholder={t('enterYourEmail')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t('phone')}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder={t('enterYourPhone')}
        />

        <Select
          label={t('subject')}
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          error={errors.subject}
          options={subjectOptions}
        />
      </div>

      <Textarea
        label={t('message')}
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        error={errors.message}
        placeholder={t('enterYourMessage')}
        rows={6}
      />

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        {t('sendMessage')}
      </Button>
    </form>
  )
}
}
