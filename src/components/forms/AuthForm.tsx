

export default function Page() {
'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { loginSchema, registerSchema, type LoginFormData, type RegisterFormData } from '@/lib/validation'

interface AuthFormProps {
  mode: 'login' | 'register'
  onSuccess?: () => void
}

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<LoginFormData & RegisterFormData>>({})
  
  const { t } = useLanguage()
  const { signIn, signUp } = useAuth()
  const { success, error } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof (LoginFormData & RegisterFormData)]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      if (mode === 'login') {
        const validatedData = loginSchema.parse(formData)
        await signIn(validatedData.email, validatedData.password)
        success(t('loginSuccess'))
      } else {
        const validatedData = registerSchema.parse(formData)
        await signUp(validatedData.email, validatedData.password, {
          full_name: validatedData.full_name,
          phone: validatedData.phone,
          address: validatedData.address
        })
        success(t('registrationSuccess'))
      }
      
      onSuccess?.()
    } catch (err) {
      if (err instanceof Error) {
        error(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <Input
          label={t('fullName')}
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
          error={errors.full_name}
          placeholder={t('enterYourName')}
        />
      )}

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

      {mode === 'register' && (
        <>
          <Input
            label={t('phone')}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder={t('enterYourPhone')}
          />

          <Textarea
            label={t('shippingAddress')}
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            placeholder={t('enterYourAddress')}
            rows={3}
          />
        </>
      )}

      <Input
        label={t('password')}
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        error={errors.password}
        placeholder={t('enterYourPassword')}
      />

      {mode === 'register' && (
        <Input
          label={t('confirmPassword')}
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          error={errors.confirmPassword}
          placeholder={t('confirmYourPassword')}
        />
      )}

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        {mode === 'login' ? t('login') : t('register')}
      </Button>
    </form>
  )
}
}
