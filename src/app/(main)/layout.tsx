import { ToastContainer } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { toasts, removeToast } = useToast()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}
