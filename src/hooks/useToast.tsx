

export default function Page() {
'use client'

import React, { createContext, useContext, useState } from 'react'
import { Toast } from '@/components/ui/Toast'

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type: Toast['type'], duration?: number) => string
  removeToast: (id: string) => void
  success: (message: string, duration?: number) => string
  error: (message: string, duration?: number) => string
  warning: (message: string, duration?: number) => string
  info: (message: string, duration?: number) => string
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: Toast['type'] = 'info', duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast: Toast = { id, message, type, duration }
    
    setToasts(prev => [...prev, toast])
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
    
    return id
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const success = (message: string, duration?: number) => 
    addToast(message, 'success', duration)
  
  const error = (message: string, duration?: number) => 
    addToast(message, 'error', duration)
  
  const warning = (message: string, duration?: number) => 
    addToast(message, 'warning', duration)
  
  const info = (message: string, duration?: number) => 
    addToast(message, 'info', duration)

  const value = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
}
