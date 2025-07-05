import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Notification, NotificationType } from '@/types'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  
  const addNotification = (
    type: NotificationType,
    title: string,
    message: string,
    duration = 5000,
    actions?: Array<{ label: string; action: () => void }>
  ) => {
    const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const notification: Notification = {
      id,
      type,
      title,
      message,
      duration,
      actions
    }
    
    notifications.value.push(notification)
    
    // 自动移除通知
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
    
    return id
  }
  
  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }
  
  const clearAll = () => {
    notifications.value = []
  }
  
  // 便捷方法
  const success = (title: string, message: string, duration?: number) => {
    return addNotification('success', title, message, duration)
  }
  
  const error = (title: string, message: string, duration?: number) => {
    return addNotification('error', title, message, duration || 8000)
  }
  
  const warning = (title: string, message: string, duration?: number) => {
    return addNotification('warning', title, message, duration)
  }
  
  const info = (title: string, message: string, duration?: number) => {
    return addNotification('info', title, message, duration)
  }
  
  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  }
})