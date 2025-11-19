import { ToastContainer } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { toasts, removeToast } = useToast()

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}