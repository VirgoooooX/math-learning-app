<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
    <!-- 动态星空背景 -->
    <div class="absolute inset-0">
      <div class="stars"></div>
      <div class="twinkling"></div>
    </div>
    
    <!-- 浮动装饰元素 - 移动端优化 -->
    <div class="absolute top-16 left-4 sm:top-20 sm:left-10 text-2xl sm:text-4xl animate-float">🌟</div>
    <div class="absolute top-24 right-8 sm:top-32 sm:right-16 text-xl sm:text-3xl animate-bounce delay-300">🎈</div>
    <div class="absolute top-32 left-1/4 text-3xl sm:text-5xl animate-pulse delay-500">✨</div>
    <div class="absolute bottom-20 right-8 sm:bottom-32 sm:right-20 text-2xl sm:text-4xl animate-spin-slow">🎪</div>
    
    <!-- 主要内容区域 -->
    <div class="relative z-10 py-6 sm:py-8">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <!-- 页面标题 -->
        <div class="text-center mb-8 sm:mb-12">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-pulse mb-3 sm:mb-4 leading-tight px-2">
            🎓 魔法学习殿堂
          </h1>
          <p class="text-lg sm:text-xl md:text-2xl text-yellow-200 font-bold px-4">
            ✨ 通过神奇的可视化演示，掌握数学魔法的奥秘！ ✨
          </p>
        </div>

        <!-- 方法选择 -->
        <div v-if="!gameStore.selectedMethod" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          <div
            v-for="(method, index) in gameStore.availableMethods"
            :key="method.name"
            @click="selectMethod(method)"
            class="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden cursor-pointer min-h-[320px] sm:min-h-[380px] flex flex-col"
          >
            <!-- 背景光效 -->
            <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- 内容 -->
            <div class="relative z-10 flex flex-col h-full">
              <div class="text-center mb-4 sm:mb-6">
                <div class="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {{ ['🧮', '💥', '⚡'][index] }}
                </div>
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">{{ method.name }}</h3>
                <div class="w-12 sm:w-16 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto rounded-full"></div>
              </div>
              
              <p class="text-yellow-200 text-center mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base flex-grow">
                {{ method.description }}
              </p>
              
              <!-- 技能特点 -->
              <div class="space-y-2 mb-6 sm:mb-8">
                <div v-for="(step, stepIndex) in method.steps.slice(0, 3)" :key="stepIndex" class="flex items-center text-xs sm:text-sm text-white/80">
                  <div class="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center text-black font-bold text-xs mr-2 sm:mr-3 flex-shrink-0">
                    {{ stepIndex + 1 }}
                  </div>
                  <span class="line-clamp-2">{{ step }}</span>
                </div>
              </div>
              
              <div class="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 text-center text-sm sm:text-base min-h-[48px] flex items-center justify-center">
                🚀 开始学习这个魔法
              </div>
            </div>
          </div>
        </div>

        <!-- 已选择方法的学习界面 -->
        <div v-if="gameStore.selectedMethod" class="space-y-6 sm:space-y-8">
          <!-- 方法信息和控制 -->
          <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20">
            <div class="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
              <div class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span class="text-lg sm:text-2xl font-bold text-black">{{ gameStore.selectedMethod.name[0] }}</span>
                </div>
                <div>
                  <h2 class="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{{ gameStore.selectedMethod.name }}</h2>
                  <p class="text-yellow-200 text-base sm:text-lg">{{ gameStore.selectedMethod.description }}</p>
                </div>
              </div>
              <div class="flex flex-col w-full lg:w-auto space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button @click="generateNewQuestion" class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[48px] text-sm sm:text-base">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>🎲 新的魔法题目</span>
                </button>
                <button @click="resetSelection" class="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 min-h-[48px] text-sm sm:text-base">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  <span>🔄 重新选择魔法</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 当前题目 -->
          <div v-if="gameStore.currentQuestion" class="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-3xl border border-yellow-400/30 p-6 sm:p-8 shadow-lg">
            <div class="text-center">
              <div class="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400/20 text-yellow-100 rounded-full text-base sm:text-lg font-bold mb-6 sm:mb-8 border border-yellow-400/30">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
                ✨ 魔法挑战题目 ✨
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg mb-6 sm:mb-8 border border-white/20">
                <div class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  {{ gameStore.currentQuestion.num1 }} 
                  <span class="text-yellow-400 mx-2 sm:mx-4 md:mx-6">{{ getOperator() }}</span> 
                  {{ gameStore.currentQuestion.num2 }} 
                  <span class="text-white/60 mx-2 sm:mx-4 md:mx-6">=</span>
                  <span class="text-orange-400">?</span>
                </div>
              </div>
              <button 
                @click="showVisualizationDemo" 
                class="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center space-x-4 mx-auto shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 hover:-translate-y-1"
                :disabled="gameStore.showVisualization"
                :class="{ 'opacity-75 cursor-not-allowed': gameStore.showVisualization }"
              >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10V7a3 3 0 11-6 0V4h6zM4 20h16"></path>
                </svg>
                <span>{{ gameStore.showVisualization ? '🎬 魔法演示中...' : '🎬 开始魔法演示' }}</span>
              </button>
            </div>
          </div>

          <!-- 可视化演示 -->
          <div v-if="gameStore.showVisualization && gameStore.currentSteps.length > 0" class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8">
              <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold">🎭 魔法计算步骤演示</h3>
                </div>
                <div class="flex items-center space-x-4">
                  <button 
                    @click="prevStep" 
                    :disabled="!gameStore.canShowPrevStep"
                    class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 transform hover:scale-105"
                    :class="{ 'opacity-50 cursor-not-allowed': !gameStore.canShowPrevStep }"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    <span>⬅️ 上一步</span>
                  </button>
                  <div class="bg-white bg-opacity-20 px-6 py-3 rounded-xl border border-white/30">
                    <span class="font-bold text-lg">
                      {{ gameStore.currentStepIndex + 1 }} / {{ gameStore.currentSteps.length }}
                    </span>
                  </div>
                  <button 
                    @click="nextStep" 
                    :disabled="!gameStore.canShowNextStep"
                    class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 transform hover:scale-105"
                    :class="{ 'opacity-50 cursor-not-allowed': !gameStore.canShowNextStep }"
                  >
                    <span>下一步 ➡️</span>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="p-8">
              <!-- 步骤指示器 -->
              <div class="flex justify-center space-x-4 mb-8 flex-wrap gap-2">
                <button
                  v-for="(step, index) in gameStore.currentSteps"
                  :key="step.id"
                  @click="goToStep(index)"
                  class="relative transition-all duration-300 transform hover:scale-110"
                >
                  <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 shadow-lg"
                       :class="{
                         'bg-gradient-to-r from-yellow-400 to-orange-500 text-black scale-125 shadow-yellow-500/50': index === gameStore.currentStepIndex,
                         'bg-white/20 text-white hover:bg-white/30': index !== gameStore.currentStepIndex
                       }">
                    {{ index + 1 }}
                  </div>
                  <div v-if="index < gameStore.currentSteps.length - 1" class="absolute top-6 left-12 w-8 h-1 bg-white/30 rounded-full"></div>
                </button>
              </div>

              <!-- 当前步骤内容 -->
              <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <VisualStep 
                  v-if="currentStep" 
                  :step="currentStep" 
                  :is-active="true"
                  :method="gameStore.selectedMethod?.name"
                  :original-num1="gameStore.currentQuestion?.num1"
                  :original-num2="gameStore.currentQuestion?.num2"
                  class="animate-fade-in-up"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import VisualStep from '@/components/VisualStep.vue'
import { playSound } from '@/utils/audioManager'
import type { MathMethod } from '@/types'

const gameStore = useGameStore()

const currentStep = computed(() => {
  return gameStore.currentSteps[gameStore.currentStepIndex] || null
})

const selectMethod = (method: MathMethod) => {
  playSound('click')
  gameStore.selectMethod(method)
}

const generateNewQuestion = () => {
  playSound('click')
  gameStore.generateNewQuestion()
}

const resetSelection = () => {
  playSound('click')
  gameStore.selectedMethod = null
  gameStore.showVisualization = false
}

const showVisualizationDemo = () => {
  playSound('start')
  gameStore.showVisualizationDemo()
}

const nextStep = () => {
  playSound('click')
  gameStore.nextStep()
}

const prevStep = () => {
  playSound('click')
  gameStore.prevStep()
}

const goToStep = (index: number) => {
  playSound('click')
  gameStore.goToStep(index)
}

const getOperator = () => {
  if (!gameStore.selectedMethod) return ''
  return gameStore.selectedMethod.name === '凑十法' ? '+' : '-'
}
</script>

<style scoped>
/* 星空背景效果 */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="0.5" fill="%23ffffff" opacity="0.8"/><circle cx="80" cy="30" r="0.3" fill="%23ffffff" opacity="0.6"/><circle cx="40" cy="60" r="0.4" fill="%23ffffff" opacity="0.7"/><circle cx="70" cy="80" r="0.2" fill="%23ffffff" opacity="0.5"/><circle cx="10" cy="90" r="0.3" fill="%23ffffff" opacity="0.6"/><circle cx="90" cy="10" r="0.4" fill="%23ffffff" opacity="0.8"/><circle cx="60" cy="40" r="0.2" fill="%23ffffff" opacity="0.5"/><circle cx="30" cy="80" r="0.3" fill="%23ffffff" opacity="0.7"/></svg>') repeat;
  animation: sparkle 20s linear infinite;
}

.twinkling {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="0.3" fill="%23ffd700" opacity="0.9"/><circle cx="75" cy="35" r="0.2" fill="%23ffd700" opacity="0.7"/><circle cx="45" cy="65" r="0.4" fill="%23ffd700" opacity="0.8"/><circle cx="65" cy="85" r="0.2" fill="%23ffd700" opacity="0.6"/><circle cx="15" cy="85" r="0.3" fill="%23ffd700" opacity="0.7"/></svg>') repeat;
  animation: twinkling 15s linear infinite;
}

@keyframes sparkle {
  from { transform: translateX(0); }
  to { transform: translateX(-100px); }
}

@keyframes twinkling {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* 自定义动画 */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

/* 浮动动画 */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* 脉冲动画增强 */
@keyframes pulse-glow {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
}

.animate-pulse {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* 玻璃态效果增强 */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* 滚动动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .stars, .twinkling {
    background-size: 50px 50px;
  }
}
</style>