'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Tag,
  Percent,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useNotification } from '@/context/NotificationContext'
import { translate } from '@/utils/translations'

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { language } = useLanguage()
  const { addNotification } = useNotification()

  const menuItems = [
    {
      name: 'dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      label: translate('dashboard', language)
    },
    {
      name: 'products',
      href: '/admin/products',
      icon: Package,
      label: translate('products', language)
    },
    {
      name: 'categories',
      href: '/admin/categories',
      icon: Tag,
      label: translate('categories', language)
    },
    {
      name: 'offers',
      href: '/admin/offers',
      icon: Percent,
      label: translate('offers', language)
    },
    {
      name: 'orders',
      href: '/admin/orders',
      icon: ShoppingCart,
      label: translate('orders', language)
    },
    {
      name: 'customers',
      href: '/admin/customers',
      icon: Users,
      label: translate('customers', language)
    },
    {
      name: 'settings',
      href: '/admin/settings',
      icon: Settings,
      label: translate('settings', language)
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    addNotification(translate('logoutSuccess', language), 'success')
    router.push('/admin/login')
  }

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-lg shadow-lg"
      >
        {isCollapsed ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        admin-sidebar z-40
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
              NB
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg text-dark">Nona Beauty</h1>
                <p className="text-xs text-muted">{translate('adminPanel', language)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive(item.href)
                    ? 'bg-primary text-white'
                    : 'text-muted hover:bg-gray-100 hover:text-dark'
                  }
                `}
              >
                <Icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-red-500 hover:bg-red-50 hover:text-red-700
              transition-colors
            "
          >
            <LogOut size={20} />
            {!isCollapsed && <span>{translate('logout', language)}</span>}
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  )
}