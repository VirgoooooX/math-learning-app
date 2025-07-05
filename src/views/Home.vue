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
    <div class="relative z-10">

      <!-- 英雄区域 -->
      <div class="text-center py-12 sm:py-16 lg:py-20 px-4">
        <div class="max-w-4xl mx-auto">
          <!-- 主标题 -->
          <div class="mb-6 sm:mb-8">
            <div class="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-pulse mb-3 sm:mb-4 leading-tight">
              数学魔法学院
            </div>
            <div class="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-200 font-bold mb-4 sm:mb-6 px-2">
              🌟 让每个孩子都成为数学小魔法师！ 🌟
            </div>
          </div>

          <!-- 特色亮点 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 min-h-[120px] flex flex-col justify-center">
              <div class="text-3xl sm:text-4xl mb-2 sm:mb-3">🎬</div>
              <div class="text-white font-bold text-base sm:text-lg">魔法动画</div>
              <div class="text-yellow-200 text-sm sm:text-base mt-1 sm:mt-2">看数字跳舞，让计算变魔术</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 min-h-[120px] flex flex-col justify-center">
              <div class="text-3xl sm:text-4xl mb-2 sm:mb-3">🎮</div>
              <div class="text-white font-bold text-base sm:text-lg">游戏闯关</div>
              <div class="text-yellow-200 text-sm sm:text-base mt-1 sm:mt-2">边玩边学，轻松掌握技巧</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 min-h-[120px] flex flex-col justify-center sm:col-span-2 lg:col-span-1">
              <div class="text-3xl sm:text-4xl mb-2 sm:mb-3">🏆</div>
              <div class="text-white font-bold text-base sm:text-lg">成就系统</div>
              <div class="text-yellow-200 text-sm sm:text-base mt-1 sm:mt-2">收集徽章，见证每次进步</div>
            </div>
          </div>

          <!-- 主要行动按钮 -->
          <div class="flex flex-col gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <router-link
              to="/learning"
              class="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg sm:text-xl rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-h-[56px] flex items-center justify-center"
            >
              <span class="relative z-10">🚀 开始魔法之旅</span>
              <div class="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </router-link>
            <router-link
              to="/practice"
              class="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-transparent border-2 border-white text-white font-bold text-lg sm:text-xl rounded-full hover:bg-white hover:text-purple-900 transition-all duration-300 transform hover:scale-105 min-h-[56px] flex items-center justify-center"
            >
              🎯 挑战练习场
            </router-link>
          </div>

          <!-- 数学公式展示 -->
          <div class="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10">
            <div class="text-yellow-300 text-base sm:text-lg font-bold mb-3 sm:mb-4">✨ 今日魔法公式 ✨</div>
            <div class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight">15 - 8 = ?</div>
            <div class="text-lg sm:text-xl md:text-2xl text-yellow-200 leading-relaxed">用破十法：15 - 5 - 3 = 7 🎉</div>
          </div>
        </div>
      </div>

      <!-- 学习方法展示区域 -->
      <div class="py-20 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
              🎯 三大魔法技能 🎯
            </h2>
            <p class="text-xl text-yellow-200 max-w-3xl mx-auto">
              掌握这三种神奇的计算方法，你就是数学世界的超级英雄！
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="(method, index) in mathMethods" :key="method.name" class="group">
              <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden">
                <!-- 背景光效 -->
                <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <!-- 内容 -->
                <div class="relative z-10">
                  <div class="text-center mb-6">
                    <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {{ ['🧮', '💥', '⚡'][index] }}
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-2">{{ method.name }}</h3>
                    <div class="w-16 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto rounded-full"></div>
                  </div>
                  
                  <p class="text-yellow-200 text-center mb-6 leading-relaxed">
                    {{ method.description }}
                  </p>
                  
                  <!-- 技能特点 -->
                  <div class="space-y-2 mb-8">
                    <div v-for="(step, stepIndex) in method.steps.slice(0, 3)" :key="stepIndex" class="flex items-center text-sm text-white/80">
                      <div class="w-6 h-6 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center text-black font-bold text-xs mr-3">
                        {{ stepIndex + 1 }}
                      </div>
                      {{ step }}
                    </div>
                  </div>
                  
                  <button
                    @click="selectMethodAndNavigate(method)"
                    class="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                  >
                    🚀 学习这个技能
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 成就与统计展示 -->
      <div class="py-20 px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
              🏆 加入魔法学院大家庭 🏆
            </h2>
            <p class="text-xl text-yellow-200">
              和全世界的小魔法师们一起成长，见证你的每一次进步！
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div v-for="(stat, index) in stats" :key="stat.label" class="text-center">
              <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105">
                <div class="text-6xl mb-4">{{ ['🎯', '🎮', '🏆'][index] }}</div>
                <div class="text-4xl font-bold text-yellow-400 mb-2">{{ stat.value }}</div>
                <div class="text-xl text-white font-medium">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- 特色功能展示 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="feature in features" :key="feature.name" class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105">
              <div class="flex items-start space-x-4">
                <div class="text-4xl">{{ feature.emoji }}</div>
                <div>
                  <h3 class="text-xl font-bold text-white mb-2">{{ feature.name }}</h3>
                  <p class="text-yellow-200 leading-relaxed">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 最终行动号召区域 -->
      <div class="py-20 px-4">
        <div class="max-w-4xl mx-auto text-center">
          <div class="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-12 border border-yellow-400/30">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
              🚀 准备好成为数学魔法师了吗？
            </h2>
            <p class="text-xl text-yellow-200 mb-8 leading-relaxed">
              加入我们的魔法学院，开启一段充满惊喜和成就感的数学学习之旅！
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <router-link
                to="/learning"
                @click="playSound('click')"
                class="group relative px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <span class="relative z-10">🎓 开始学习魔法</span>
                <div class="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </router-link>
              <router-link
                to="/practice"
                @click="playSound('click')"
                class="group relative px-10 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold text-xl rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-110"
              >
                🎯 挑战魔法试炼
              </router-link>
            </div>
            
            <div class="text-yellow-300 text-lg">
              ✨ 每一次练习都是一次魔法的释放 ✨
            </div>
          </div>
        </div>
      </div>

      <!-- 页脚 -->
      <footer class="py-12 px-4 border-t border-white/10">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div class="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <div class="text-2xl">🎓</div>
                <span class="text-xl font-bold text-white">数学魔法学院</span>
              </div>
              <p class="text-yellow-200 leading-relaxed">
                让每个孩子都能在快乐中学习数学，在游戏中掌握技能。
              </p>
            </div>
            
            <div>
              <h3 class="text-lg font-bold text-white mb-4">🎯 学习内容</h3>
              <ul class="space-y-2 text-yellow-200">
                <li>🧮 凑十法魔法</li>
                <li>💥 破十法技能</li>
                <li>⚡ 平十法秘籍</li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-bold text-white mb-4">🎮 功能特色</h3>
              <ul class="space-y-2 text-yellow-200">
                <li>🎬 动画演示</li>
                <li>🎯 互动练习</li>
                <li>🏆 成就系统</li>
              </ul>
            </div>
          </div>
          
          <div class="mt-12 pt-8 border-t border-white/10 text-center">
            <p class="text-yellow-200">
              © 2024 数学魔法学院 - 让学习变成最好玩的冒险 🌟
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { playSound } from '@/utils/audioManager'
import type { MathMethod } from '@/types'

const router = useRouter()
const gameStore = useGameStore()

const features = [
  {
    name: '🎬 超酷动画演示',
    description: '🌟 通过精彩的动画和彩色图形，让数学计算过程变得生动有趣，就像看动画片一样！',
    emoji: '🎬'
  },
  {
    name: '🎮 趣味互动练习',
    description: '🎯 丰富多彩的练习题目，每答对一题都有惊喜反馈，让学习变成好玩的游戏！',
    emoji: '🎮'
  },
  {
    name: '📊 成长记录追踪',
    description: '🏆 记录每一次进步和成就，看着自己一天天变成数学小能手！',
    emoji: '📊'
  },
  {
    name: '🎨 专属学习体验',
    description: '✨ 根据你的学习情况智能调整，每个小朋友都有专属的学习冒险！',
    emoji: '🎨'
  }
]

const mathMethods = gameStore.availableMethods

const stats = [
  { label: '🎯 学习魔法', value: '3种' },
  { label: '🎮 练习关卡', value: '∞' },
  { label: '🏆 游戏模式', value: '2个' }
]

const selectMethodAndNavigate = (method: MathMethod) => {
  playSound('click')
  gameStore.selectMethod(method)
  router.push('/learning')
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

/* 渐变文字效果 */
.gradient-text {
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* 玻璃态效果增强 */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* 悬停效果 */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

/* 按钮发光效果 */
.btn-glow {
  position: relative;
  overflow: hidden;
}

.btn-glow::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.btn-glow:hover::before {
  left: 100%;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .stars, .twinkling {
    background-size: 50px 50px;
  }
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

.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}
</style>