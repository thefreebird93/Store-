'use client'
import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  
  const addNotification = (message, type = 'success') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    
    setTimeout(() => {
      removeNotification(id)
    }, 4000)
  }
  
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }
  
  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

function NotificationContainer() {
  const { notifications, removeNotification } = useContext(NotificationContext)
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notif => (
        <div 
          key={notif.id}
          className={`p-4 rounded-lg shadow-lg text-white min-w-80 max-w-md transition-all duration-300 ${
            notif.type === 'success' ? 'bg-green-500' : 
            notif.type === 'error' ? 'bg-red-500' : 
            notif.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{notif.message}</span>
            <button 
              onClick={() => removeNotification(notif.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}