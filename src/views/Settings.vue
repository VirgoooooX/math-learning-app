<template>
  <div class="min-h-screen bg-gray-50 py-6 sm:py-8">
    <div class="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="text-center mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 px-4">
          设置
        </h1>
        <p class="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 px-4">
          个性化你的学习体验
        </p>
      </div>

      <div class="space-y-4 sm:space-y-6">
        <!-- 基础设置 -->
        <div class="card">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">基础设置</h2>
          
          <div class="space-y-4 sm:space-y-6">

            <!-- 音效开关 -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div class="flex-1">
                <h3 class="text-sm font-medium text-gray-900">启用音效</h3>
                <p class="text-sm text-gray-600 mt-1">开启后会在答题和操作时播放音效反馈</p>
              </div>
              <button
                @click="toggleSound"
                class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 self-start sm:self-center"
                :class="{
                  'bg-primary-600': settingsStore.settings.soundEnabled,
                  'bg-gray-200': !settingsStore.settings.soundEnabled
                }"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="{
                    'translate-x-5': settingsStore.settings.soundEnabled,
                    'translate-x-0': !settingsStore.settings.soundEnabled
                  }"
                ></span>
              </button>
            </div>

            <!-- 音量调节 -->
            <div v-if="settingsStore.settings.soundEnabled">
              <h3 class="text-sm font-medium text-gray-900 mb-3">音量大小</h3>
              <div class="flex items-center space-x-3 sm:space-x-4">
                <span class="text-sm text-gray-500 flex-shrink-0">🔉</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  v-model="settingsStore.settings.volume"
                  @input="updateVolume"
                  class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider min-w-0"
                />
                <span class="text-sm text-gray-500 flex-shrink-0">🔊</span>
                <span class="text-sm text-gray-700 w-10 sm:w-12 flex-shrink-0 text-right">{{ Math.round(settingsStore.settings.volume * 100) }}%</span>
              </div>
              <button
                @click="testSound"
                class="mt-3 px-3 py-2 text-sm bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200 transition-colors min-h-[36px] flex items-center justify-center"
              >
                测试音效
              </button>
            </div>

            <!-- 偏好方法 -->
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-3">偏好计算方法</h3>
              <div class="space-y-3">
                <label class="flex items-start sm:items-center cursor-pointer">
                  <input
                    type="radio"
                    :value="null"
                    v-model="settingsStore.settings.preferredMethod"
                    @change="settingsStore.updateSetting('preferredMethod', null)"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 mt-0.5 sm:mt-0 flex-shrink-0"
                  />
                  <span class="ml-3 text-sm text-gray-700 leading-relaxed">无偏好（随机选择）</span>
                </label>
                <label v-for="method in gameStore.availableMethods" :key="method.name" class="flex items-start sm:items-center cursor-pointer">
                  <input
                    type="radio"
                    :value="method.name"
                    v-model="settingsStore.settings.preferredMethod"
                    @change="settingsStore.updateSetting('preferredMethod', method.name)"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 mt-0.5 sm:mt-0 flex-shrink-0"
                  />
                  <span class="ml-3 text-sm text-gray-700 leading-relaxed">{{ method.name }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>



        <!-- 数据管理 -->
        <div class="card">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">数据管理</h2>
          
          <div class="space-y-4 sm:space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-1">
                <h3 class="text-sm font-medium text-gray-900">学习记录</h3>
                <p class="text-sm text-gray-500 mt-1 leading-relaxed">清除所有练习记录和成绩</p>
              </div>
              <button @click="clearGameData" class="btn-warning text-sm w-full sm:w-auto min-h-[44px] flex items-center justify-center">
                清除记录
              </button>
            </div>
            
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex-1">
                <h3 class="text-sm font-medium text-gray-900">设置重置</h3>
                <p class="text-sm text-gray-500 mt-1 leading-relaxed">恢复所有设置到默认值</p>
              </div>
              <button @click="resetAllSettings" class="btn-warning text-sm w-full sm:w-auto min-h-[44px] flex items-center justify-center">
                重置设置
              </button>
            </div>
          </div>
        </div>

        <!-- 关于信息 -->
        <div class="card">
          <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">关于应用</h2>
          
          <div class="space-y-4 sm:space-y-6">
            <div class="flex items-center space-x-3 sm:space-x-4">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-lg sm:text-xl">数</span>
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="text-base sm:text-lg font-medium text-gray-900 leading-tight">小学数学学习助手</h3>
                <p class="text-sm text-gray-500 mt-1">版本 2.0.0</p>
              </div>
            </div>
            
            <div class="text-sm text-gray-600 leading-relaxed">
              <p class="mb-3">
                这是一个专为小学生设计的数学学习应用，通过可视化演示和互动练习，
                帮助学生更好地理解和掌握凑十法、破十法、平十法等计算方法。
              </p>
              <p>
                采用现代化的 Vue 3 + TypeScript 技术栈开发，提供流畅的用户体验。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import { useGameStore } from '@/stores/game'
import { useNotificationsStore } from '@/stores/notifications'
import type { UserSettings } from '@/types'
import { audioManager, playSound } from '@/utils/audioManager'
import { watch } from 'vue'

const settingsStore = useSettingsStore()
const gameStore = useGameStore()
const notificationsStore = useNotificationsStore()

// 监听设置变化，同步到音效管理器
watch(
  () => settingsStore.settings,
  (settings) => {
    audioManager.updateConfig({
      enabled: settings.soundEnabled,
      volume: settings.volume
    })
  },
  { immediate: true, deep: true }
)

// 移除解构赋值以保持响应性



const clearGameData = () => {
  if (confirm('确定要清除所有学习记录吗？此操作不可恢复。')) {
    gameStore.resetGame()
    notificationsStore.success('清除成功', '所有学习记录已清除')
  }
}

const resetAllSettings = () => {
  if (confirm('确定要重置所有设置吗？')) {
    settingsStore.resetSettings()
    notificationsStore.success('重置成功', '所有设置已恢复默认值')
  }
}

const toggleSound = () => {
  settingsStore.updateSetting('soundEnabled', !settingsStore.settings.soundEnabled)
}

const updateVolume = (event: Event) => {
  const target = event.target as HTMLInputElement
  settingsStore.updateSetting('volume', parseFloat(target.value))
}

const testSound = () => {
  // 播放测试音效
  playSound('success')
  notificationsStore.success('音效测试', '当前音量: ' + Math.round(settingsStore.settings.volume * 100) + '%')
}


</script>