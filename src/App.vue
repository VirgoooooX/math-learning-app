<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-base sm:text-lg">数</span>
              </div>
              <span class="text-lg sm:text-xl font-semibold text-gray-900 hidden xs:block">数学学习</span>
            </router-link>
          </div>
          
          <!-- 移动端导航 -->
          <div class="flex items-center">
            <!-- 桌面端导航 -->
            <div class="hidden md:flex items-center space-x-2 lg:space-x-4">
              <router-link
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 min-h-[44px] flex items-center"
                :class="{
                  'bg-primary-100 text-primary-700': $route.path === item.path,
                  'text-gray-600 hover:text-gray-900 hover:bg-gray-100': $route.path !== item.path
                }"
              >
                {{ item.name }}
              </router-link>
            </div>
            
            <!-- 移动端菜单按钮 -->
            <button 
              @click="showMobileMenu = !showMobileMenu"
              class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 移动端下拉菜单 -->
        <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 py-2">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="showMobileMenu = false"
            class="block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 min-h-[48px] flex items-center"
            :class="{
              'bg-primary-100 text-primary-700': $route.path === item.path,
              'text-gray-600 hover:text-gray-900 hover:bg-gray-100': $route.path !== item.path
            }"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 通知系统 -->
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import NotificationContainer from '@/components/NotificationContainer.vue'

const route = useRoute()
const showMobileMenu = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '学习', path: '/learning' },
  { name: '练习', path: '/practice' },
  { name: '设置', path: '/settings' }
]
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>