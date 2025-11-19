'use client'

import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react'
import { cn } from '@/utils/helpers'

interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  children: React.ReactNode
  className?: string
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  className
}) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  }

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  const Icon = icons[variant]

  return (
    <div className={cn(
      'border rounded-lg p-4',
      styles[variant],
      className
    )}>
      <div className="flex items-start">
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">
              {title}
            </h3>
          )}
          <div className="text-sm mt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}