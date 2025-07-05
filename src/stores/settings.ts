import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { UserSettings } from '@/types'

const STORAGE_KEY = 'math-learning-settings'

const defaultSettings: UserSettings = {
  preferredMethod: null,
  soundEnabled: true,
  volume: 0.5
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<UserSettings>({ ...defaultSettings })
  
  // 从本地存储加载设置
  const loadSettings = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedSettings = JSON.parse(stored)
        settings.value = { ...defaultSettings, ...parsedSettings }
      }
    } catch (error) {
      console.warn('Failed to load settings from localStorage:', error)
      settings.value = { ...defaultSettings }
    }
  }
  
  // 保存设置到本地存储
  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value))
    } catch (error) {
      console.warn('Failed to save settings to localStorage:', error)
    }
  }
  
  // 更新单个设置
  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    settings.value[key] = value
    saveSettings()
  }
  
  // 重置设置
  const resetSettings = () => {
    settings.value = { ...defaultSettings }
    saveSettings()
  }
  

  
  // 监听设置变化并自动保存
  watch(
    settings,
    () => {
      saveSettings()
    },
    { deep: true }
  )
  
  // 初始化时加载设置
  loadSettings()
  
  return {
    settings,
    updateSetting,
    resetSettings,
    loadSettings,
    saveSettings
  }
})