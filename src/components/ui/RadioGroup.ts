'use client'

import React from 'react'
import { cn } from '@/utils/helpers'

interface RadioGroupProps {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  error,
  options,
  value,
  onChange,
  className
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="h-4 w-4 border-gray-300 text-pink-500 focus:ring-pink-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}