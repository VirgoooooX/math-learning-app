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
      <div class="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        <!-- 页面标题 -->
        <div class="text-center mb-8 sm:mb-12">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-pulse mb-3 sm:mb-4 leading-tight px-2">
            🎯 魔法练习场
          </h1>
          <p class="text-lg sm:text-xl md:text-2xl text-yellow-200 font-bold px-4">
            ✨ 在实战中磨练你的数学魔法技能！ ✨
          </p>
        </div>

        <!-- 统计信息 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
            <div class="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">{{ gameStore.gameState.score }}</div>
            <div class="text-xs sm:text-sm text-yellow-200 font-medium">🏆 总分</div>
          </div>
          <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
            <div class="text-2xl sm:text-3xl font-bold text-green-400 mb-1 sm:mb-2">{{ gameStore.accuracy }}%</div>
            <div class="text-xs sm:text-sm text-yellow-200 font-medium">🎯 正确率</div>
          </div>
          <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
            <div class="text-2xl sm:text-3xl font-bold text-orange-400 mb-1 sm:mb-2">{{ gameStore.gameState.currentStreak }}</div>
            <div class="text-xs sm:text-sm text-yellow-200 font-medium">🔥 连击</div>
          </div>
          <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
            <div class="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{{ gameStore.gameState.totalQuestions }}</div>
            <div class="text-xs sm:text-sm text-yellow-200 font-medium">📝 题目数</div>
          </div>
        </div>

        <!-- 方法选择 -->
        <div v-if="!gameStore.selectedMethod" class="space-y-4 sm:space-y-6">
          <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20">
            <h2 class="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">🎭 选择你的魔法技能</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <button
                v-for="(method, index) in gameStore.availableMethods"
                :key="method.name"
                @click="selectMethod(method)"
                class="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-center min-h-[140px] sm:min-h-[160px] flex flex-col justify-center"
              >
                <div class="text-3xl sm:text-4xl mb-2 sm:mb-3">{{ ['🧮', '💥', '⚡'][index] }}</div>
                <div class="font-bold text-white text-base sm:text-lg mb-1 sm:mb-2">{{ method.name }}</div>
                <div class="text-yellow-200 text-xs sm:text-sm leading-relaxed">{{ method.description }}</div>
              </button>
            </div>
          </div>
        </div>

        <!-- 练习界面 -->
        <div v-if="gameStore.selectedMethod && gameStore.currentQuestion" class="space-y-8">
          <!-- 方法信息和控制 -->
          <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span class="text-2xl font-bold text-black">{{ gameStore.selectedMethod.name[0] }}</span>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-white mb-1">{{ gameStore.selectedMethod.name }} 练习</h2>
                  <p class="text-yellow-200">{{ gameStore.selectedMethod.description }}</p>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button @click="showHint" class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg transform hover:scale-105" :disabled="gameStore.showVisualization">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                  <span>{{ gameStore.showVisualization ? '💡 提示中...' : '💡 魔法提示' }}</span>
                </button>
                <button @click="resetSelection" class="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  <span>🔄 重新选择</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 题目显示 -->
          <div class="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-3xl border border-yellow-400/30 p-6 sm:p-8 shadow-lg">
            <div class="text-center">
              <div class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                {{ gameStore.currentQuestion.num1 }} 
                <span class="text-yellow-400 mx-2 sm:mx-3 md:mx-4">{{ getOperator() }}</span> 
                {{ gameStore.currentQuestion.num2 }} = 
                <span v-if="gameStore.isAnswered" class="text-green-400">{{ gameStore.currentQuestion.answer }}</span>
                <span v-else class="text-orange-400">?</span>
              </div>
              
              <!-- 答案输入 -->
              <div v-if="!gameStore.isAnswered" class="max-w-md mx-auto mb-6 sm:mb-8 px-4">
                <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center">
                  <input
                    v-model.number="inputAnswer"
                    @keyup.enter="submitAnswer"
                    type="number"
                    class="w-full sm:flex-1 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-center text-xl sm:text-2xl font-bold text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 min-h-[48px]"
                    placeholder="输入答案"
                    :disabled="gameStore.isAnswered"
                  />
                  <button 
                    @click="submitAnswer" 
                    class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg min-h-[48px] flex items-center justify-center"
                    :disabled="inputAnswer === null || inputAnswer === undefined"
                  >
                    🚀 提交
                  </button>
                </div>
              </div>

              <!-- 答案反馈 -->
              <div v-if="gameStore.isAnswered" class="mb-6 sm:mb-8 px-4">
                <div v-if="lastAnswerCorrect" class="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl bg-green-500/20 text-green-100 border border-green-400/30 mb-4 sm:mb-6 max-w-full">
                  <CheckCircleIcon class="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 flex-shrink-0" />
                  <span class="font-bold text-lg sm:text-xl">🎉 回答正确！+{{ getScoreGain() }}分</span>
                </div>
                <div v-else class="inline-flex items-start px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl bg-red-500/20 text-red-100 border border-red-400/30 mb-4 sm:mb-6 max-w-full">
                  <XCircleIcon class="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <span class="font-bold text-base sm:text-lg md:text-xl leading-relaxed">💔 答案错误，正确答案是 {{ gameStore.currentQuestion.answer }}</span>
                </div>
                
                <div>
                  <button @click="nextQuestion" class="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg min-h-[48px] flex items-center justify-center">
                    ➡️ 下一题魔法
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 提示演示 -->
          <div v-if="gameStore.showVisualization && gameStore.currentSteps.length > 0" class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-white flex items-center">
                  <svg class="w-8 h-8 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                  💡 魔法解题提示
                </h3>
                <button @click="hideHint" class="text-yellow-200 hover:text-white transition-colors duration-200 font-medium">
                  ❌ 隐藏提示
                </button>
              </div>
              
              <div class="bg-yellow-400/20 border border-yellow-400/30 rounded-2xl p-6">
                <div class="flex items-start">
                  <ExclamationTriangleIcon class="h-6 w-6 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                  <div class="text-yellow-100 font-medium">
                    ⚠️ 查看提示会影响得分。建议先尝试独立解答魔法题目。
                  </div>
                </div>
              </div>
              
              <div class="space-y-4">
                <VisualStep 
                  v-for="(step, index) in gameStore.currentSteps" 
                  :key="step.id"
                  :step="step" 
                  :is-active="index === gameStore.currentStepIndex"
                  class="bg-white/5 rounded-2xl p-4 border border-white/10"
                />
              </div>
            </div>
          </div>

          <!-- 练习统计 -->
          <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
            <h3 class="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
              <svg class="w-8 h-8 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              📊 本次练习统计
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div class="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div class="text-3xl font-bold text-green-400 mb-2">{{ gameStore.gameState.correctAnswers }}</div>
                <div class="text-yellow-200 font-medium">✅ 答对题数</div>
              </div>
              <div class="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div class="text-3xl font-bold text-red-400 mb-2">{{ gameStore.gameState.totalQuestions - gameStore.gameState.correctAnswers }}</div>
                <div class="text-yellow-200 font-medium">❌ 答错题数</div>
              </div>
              <div class="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div class="text-3xl font-bold text-orange-400 mb-2">{{ gameStore.gameState.bestStreak }}</div>
                <div class="text-yellow-200 font-medium">🏆 最佳连击</div>
              </div>
              <div class="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div class="text-3xl font-bold text-blue-400 mb-2">{{ formatTime(gameStore.gameState.timeSpent) }}</div>
                <div class="text-yellow-200 font-medium">⏱️ 用时</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 重置按钮 -->
        <div v-if="gameStore.gameState.totalQuestions > 0" class="text-center mt-8">
          <button @click="resetGame" class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            🔄 重置练习记录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { useNotificationsStore } from '@/stores/notifications'
import VisualStep from '@/components/VisualStep.vue'
import { playSound } from '@/utils/audioManager'
import type { MathMethod } from '@/types'

const gameStore = useGameStore()
const notificationsStore = useNotificationsStore()

const inputAnswer = ref<number | null>(null)
const lastAnswerCorrect = ref(false)

const selectMethod = (method: MathMethod) => {
  playSound('click')
  gameStore.selectMethod(method)
  inputAnswer.value = null
  playSound('start')
}

const submitAnswer = () => {
  if (inputAnswer.value === null || inputAnswer.value === undefined) return
  
  lastAnswerCorrect.value = gameStore.submitAnswer(inputAnswer.value)
  
  if (lastAnswerCorrect.value) {
    playSound('success')
    notificationsStore.success('答对了！', `获得 ${getScoreGain()} 分`)
    
    // 连击成就音效
    if (gameStore.gameState.currentStreak > 0 && gameStore.gameState.currentStreak % 5 === 0) {
      setTimeout(() => playSound('achievement'), 500)
    }
  } else {
    playSound('error')
    notificationsStore.error('答错了', `正确答案是 ${gameStore.currentQuestion?.answer}`)
  }
}

const nextQuestion = () => {
  playSound('click')
  gameStore.generateNewQuestion()
  inputAnswer.value = null
  hideHint()
}

const showHint = () => {
  playSound('click')
  gameStore.showVisualizationDemo()
}

const hideHint = () => {
  gameStore.showVisualization = false
}

const resetSelection = () => {
  playSound('click')
  gameStore.selectedMethod = null
  gameStore.showVisualization = false
  inputAnswer.value = null
}

const resetGame = () => {
  if (confirm('确定要重置所有练习记录吗？')) {
    playSound('click')
    gameStore.resetGame()
    inputAnswer.value = null
  }
}

const getOperator = () => {
  if (!gameStore.selectedMethod) return ''
  return gameStore.selectedMethod.name === '凑十法' ? '+' : '-'
}

const getScoreGain = () => {
  return 10 + Math.min(gameStore.gameState.currentStreak, 10)
}

const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 图标组件
const CheckCircleIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`
}

const XCircleIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" /></svg>`
}

const ExclamationTriangleIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.19-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>`
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

/* 响应式调整 */
@media (max-width: 768px) {
  .stars, .twinkling {
    background-size: 50px 50px;
  }
}
</style>