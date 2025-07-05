<template>
  <div class="dot-animation-container">
    <!-- 加法演示 -->
    <div v-if="operation === 'add'" class="addition-demo">
      <!-- 第一组数点 -->
      <div class="dot-group">
        <div class="group-label">{{ num1 }}</div>
        <div class="dots-grid">
          <div 
            v-for="i in num1" 
            :key="`group1-${i}`"
            class="dot dot-blue"
            :style="{ animationDelay: `${(i-1) * 150}ms` }"
          ></div>
        </div>
      </div>

      <!-- 加号 -->
      <div class="operator">+</div>

      <!-- 第二组数点 -->
      <div class="dot-group">
        <div class="group-label">{{ num2 }}</div>
        <div class="dots-grid">
          <div 
            v-for="i in num2" 
            :key="`group2-${i}`"
            class="dot dot-green"
            :style="{ animationDelay: `${(num1 + i-1) * 150}ms` }"
          ></div>
        </div>
      </div>

      <!-- 等号 -->
      <div class="operator">=</div>

      <!-- 结果数点 -->
      <div class="dot-group result-group">
        <div class="group-label">{{ result }}</div>
        <div class="dots-grid">
          <div 
            v-for="i in result" 
            :key="`result-${i}`"
            class="dot dot-result"
            :style="{ animationDelay: `${(num1 + num2 + i-1) * 150}ms` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- 减法演示 -->
    <div v-else-if="operation === 'subtract'" class="subtraction-demo">
      <!-- 被减数数点 -->
      <div class="dot-group">
        <div class="group-label">{{ num1 }}</div>
        <div class="dots-grid">
          <div 
            v-for="i in num1" 
            :key="`minuend-${i}`"
            class="dot"
            :class="{
              'dot-blue': i <= result,
              'dot-crossed': i > result
            }"
            :style="{ animationDelay: `${(i-1) * 150}ms` }"
          ></div>
        </div>
      </div>

      <!-- 减号 -->
      <div class="operator">-</div>

      <!-- 减数数点 -->
      <div class="dot-group">
        <div class="group-label">{{ num2 }}</div>
        <div class="dots-grid">
          <div 
            v-for="i in num2" 
            :key="`subtrahend-${i}`"
            class="dot dot-red"
            :style="{ animationDelay: `${(num1 + i-1) * 150}ms` }"
          ></div>
        </div>
      </div>

      <!-- 等号 -->
      <div class="operator">=</div>

      <!-- 结果数点 -->
      <div class="dot-group result-group">
        <div class="group-label">{{ result }}</div>
        <div class="dots-grid">
          <div 
            v-for="i in result" 
            :key="`result-${i}`"
            class="dot dot-result"
            :style="{ animationDelay: `${(num1 + num2 + i-1) * 150}ms` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- 破十法特殊演示 -->
    <div v-else-if="operation === 'break10'" class="break10-demo">
      <!-- 步骤1: 拆分被减数 -->
      <div v-if="currentStep === 'step1'" class="step-animation">
        <div class="step-content">
          <div class="decomposition-container">
            <div class="group-label">{{ num1 }} 拆分为</div>
            <div class="decomposition-display">
              <!-- 十位数 -->
              <div class="dot-group tens-group">
                <div class="group-label">{{ tensDigit }}</div>
                <div class="ten-frame completed">
                  <div 
                    v-for="i in 10" 
                    :key="`tens-${i}`"
                    class="frame-slot filled"
                    :style="{ animationDelay: `${(i-1) * 100}ms` }"
                  >
                    <div class="dot dot-blue-small"></div>
                  </div>
                </div>
              </div>
              
              <div class="plus-sign">+</div>
              
              <!-- 个位数 -->
              <div class="dot-group ones-group">
                <div class="group-label">{{ onesDigit }}</div>
                <div class="dots-grid">
                  <div 
                    v-for="i in onesDigit" 
                    :key="`ones-${i}`"
                    class="dot dot-green"
                    :style="{ animationDelay: `${(10 + i-1) * 100}ms` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 步骤2: 用10减去减数 -->
      <div v-else-if="currentStep === 'step2'" class="step-animation">
        <div class="step-content">
          <!-- 10减去减数的演示 -->
          <div class="subtraction-demo">
            <div class="dot-group">
              <div class="group-label">10</div>
              <div class="ten-frame">
                <div 
                  v-for="i in 10" 
                  :key="`ten-${i}`"
                  class="frame-slot"
                  :class="{
                    'filled': i <= tempResult,
                    'crossed': i > tempResult
                  }"
                  :style="{ animationDelay: `${(i-1) * 100}ms` }"
                >
                  <div class="dot" :class="{
                    'dot-blue-small': i <= tempResult,
                    'dot-crossed-small': i > tempResult
                  }"></div>
                </div>
              </div>
            </div>
            
            <div class="operator">-</div>
            
            <div class="dot-group">
              <div class="group-label">{{ subtrahend }}</div>
              <div class="dots-grid">
                <div 
                  v-for="i in subtrahend" 
                  :key="`sub-${i}`"
                  class="dot dot-red"
                  :style="{ animationDelay: `${(10 + i-1) * 100}ms` }"
                ></div>
              </div>
            </div>
            
            <div class="operator">=</div>
            
            <div class="dot-group result-highlight">
              <div class="group-label">{{ tempResult }}</div>
              <div class="dots-grid">
                <div 
                  v-for="i in tempResult" 
                  :key="`temp-${i}`"
                  class="dot dot-temp-result"
                  :style="{ animationDelay: `${(10 + subtrahend + i-1) * 100}ms` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 步骤3: 加上个位数 -->
      <div v-else-if="currentStep === 'step3'" class="step-animation">
        <div class="step-content">
          <div class="addition-demo">
            <div class="dot-group">
              <div class="group-label">{{ tempResult }}</div>
              <div class="dots-grid">
                <div 
                  v-for="i in tempResult" 
                  :key="`temp-final-${i}`"
                  class="dot dot-temp-result"
                  :style="{ animationDelay: `${(i-1) * 100}ms` }"
                ></div>
              </div>
            </div>
            
            <div class="operator">+</div>
            
            <div class="dot-group">
              <div class="group-label">{{ onesDigit }}</div>
              <div class="dots-grid">
                <div 
                  v-for="i in onesDigit" 
                  :key="`ones-final-${i}`"
                  class="dot dot-green"
                  :style="{ animationDelay: `${(tempResult + i-1) * 100}ms` }"
                ></div>
              </div>
            </div>
            
            <div class="operator">=</div>
            
            <div class="dot-group result-group">
              <div class="group-label">{{ finalResult }}</div>
              <div class="dots-grid">
                <div 
                  v-for="i in finalResult" 
                  :key="`final-${i}`"
                  class="dot dot-result"
                  :style="{ animationDelay: `${(tempResult + onesDigit + i-1) * 100}ms` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 步骤4: 最终结果展示 -->
      <div v-else-if="currentStep === 'step4'" class="step-animation">
        <div class="step-content">
          <div class="final-result-display">
            <div class="equation-summary">
              <span class="number">{{ num1 }}</span>
              <span class="operator">-</span>
              <span class="number">{{ num2 }}</span>
              <span class="operator">=</span>
              <span class="result-number">{{ finalResult }}</span>
            </div>
            
            <div class="dot-group result-group final">
              <div class="group-label">最终答案: {{ finalResult }}</div>
              <div class="dots-grid">
                <div 
                  v-for="i in finalResult" 
                  :key="`final-answer-${i}`"
                  class="dot dot-result"
                  :style="{ animationDelay: `${(i-1) * 150}ms` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 凑十法特殊演示 -->
    <div v-else-if="operation === 'make10'" class="make10-demo">
      <!-- 步骤1: 显示较大数和虚框 -->
      <div v-if="currentStep === 'step1'" class="step-animation">
        <div class="step-content">
          <!-- 较大数数点 -->
          <div class="dot-group">
            <div class="group-label">{{ bigNum }}</div>
            <div class="dots-grid">
              <div 
                v-for="i in bigNum" 
                :key="`big-${i}`"
                class="dot dot-blue"
                :style="{ animationDelay: `${(i-1) * 150}ms` }"
              ></div>
            </div>
          </div>
          
          <!-- 加号 -->
          <div class="operator">+</div>
          
          <!-- 虚框表示10 -->
          <div class="dot-group">
            <div class="group-label">凑成 10</div>
            <div class="ten-frame">
              <div 
                v-for="i in 10" 
                :key="`frame-${i}`"
                class="frame-slot"
                :class="{
                  'filled': i <= bigNum,
                  'question': i > bigNum && i <= bigNum + borrowAmount,
                  'empty': i > bigNum + borrowAmount
                }"
                :style="{ animationDelay: `${(bigNum + i-1) * 150}ms` }"
              >
                <div v-if="i <= bigNum" class="dot dot-blue-small"></div>
                <div v-else-if="i <= bigNum + borrowAmount" class="question-mark">?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 步骤2: 显示较小数和借位 -->
      <div v-else-if="currentStep === 'step2'" class="step-animation">
        <div class="step-content">
          <!-- 小数分解显示 -->
          <div class="decomposition-container">
            <div class="group-label">{{ smallNum }} 分解为</div>
            <div class="decomposition-display">
              <!-- 保留的数点 -->
              <div class="dot-group remaining-group">
                <div class="group-label">保留 {{ remaining }}</div>
                <div class="dots-grid">
                  <div 
                    v-for="i in remaining" 
                    :key="`remain-${i}`"
                    class="dot dot-green"
                    :style="{ animationDelay: `${(i-1) * 150}ms` }"
                  ></div>
                </div>
              </div>
              
              <div class="plus-sign">+</div>
              
              <!-- 借出的数点 -->
              <div class="dot-group borrow-group">
                <div class="group-label">借出 {{ borrowAmount }}</div>
                <div class="dots-grid">
                  <div 
                    v-for="i in borrowAmount" 
                    :key="`borrow-${i}`"
                    class="dot dot-borrow"
                    :style="{ animationDelay: `${(remaining + i-1) * 150}ms` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 借位箭头和动画 -->
          <div class="borrow-animation-container">
            <div class="borrow-arrow animated-arrow">→</div>
            <div class="borrow-text">借 {{ borrowAmount }} 凑成 10</div>
          </div>
          
          <!-- 更新后的10框 -->
          <div class="dot-group">
            <div class="group-label">完整的 10</div>
            <div class="ten-frame completed">
              <div 
                v-for="i in 10" 
                :key="`complete-${i}`"
                class="frame-slot"
                :class="{
                  'filled': true,
                  'borrowed-slot': i > bigNum
                }"
                :style="{ animationDelay: `${(smallNum + i-1) * 150}ms` }"
              >
                <div class="dot" :class="{
                  'dot-blue-small': i <= bigNum,
                  'dot-borrowed': i > bigNum
                }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 步骤3: 最终结果 -->
      <div v-else-if="currentStep === 'step3'" class="step-animation">
        <div class="step-content">
          <!-- 剩余数点 -->
          <div class="dot-group">
            <div class="group-label">剩余 {{ remaining }}</div>
            <div class="dots-grid">
              <div 
                v-for="i in remaining" 
                :key="`remain-${i}`"
                class="dot dot-green"
                :style="{ animationDelay: `${(i-1) * 150}ms` }"
              ></div>
            </div>
          </div>
          
          <!-- 加号 -->
          <div class="operator">+</div>
          
          <!-- 10 -->
          <div class="dot-group">
            <div class="group-label">10</div>
            <div class="ten-frame completed">
              <div 
                v-for="i in 10" 
                :key="`final-ten-${i}`"
                class="frame-slot filled"
                :style="{ animationDelay: `${(remaining + i-1) * 150}ms` }"
              >
                <div class="dot dot-complete"></div>
              </div>
            </div>
          </div>
          
          <!-- 等号 -->
          <div class="operator">=</div>
          
          <!-- 最终结果 -->
          <div class="dot-group result-group">
            <div class="group-label">{{ result }}</div>
            <div class="dots-grid">
              <div 
                v-for="i in result" 
                :key="`final-${i}`"
                class="dot dot-result"
                :style="{ animationDelay: `${(remaining + 10 + i-1) * 150}ms` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 平十法特殊演示 -->
    <div v-else-if="operation === 'flatten10'" class="flatten10-demo">
      <!-- 步骤1: 识别被减数的个位数 -->
      <div v-if="currentStep === 'step1'" class="step-animation">
        <div class="step-content">
          <div class="identification-container">
            <div class="group-label">{{ num1 }} 的个位数是 {{ onesDigit }}</div>
            <div class="number-display">
              <!-- 被减数展示 -->
              <div class="number-group">
                <div class="group-label">{{ num1 }}</div>
                <div class="dots-grid">
                  <div 
                    v-for="i in num1" 
                    :key="`num1-${i}`"
                    class="dot"
                    :class="{
                      'dot-blue': i <= tensDigit,
                      'dot-green': i > tensDigit
                    }"
                    :style="{ animationDelay: `${(i-1) * 100}ms` }"
                  ></div>
                </div>
              </div>
              
              <!-- 个位数高亮 -->
              <div class="highlight-ones">
                <div class="group-label">个位数: {{ onesDigit }}</div>
                <div class="dots-grid">
                  <div 
                    v-for="i in onesDigit" 
                    :key="`ones-highlight-${i}`"
                    class="dot dot-green highlight-glow"
                    :style="{ animationDelay: `${(num1 + i-1) * 100}ms` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 步骤2: 拆分减数为两部分 -->
      <div v-else-if="currentStep === 'step2'" class="step-animation">
        <div class="step-content">
          <div class="decomposition-container">
            <div class="group-label">将减数 {{ subtrahend }} 拆分为两部分</div>
            <div class="decomposition-display">
              <!-- 原减数 -->
              <div class="original-group">
                <div class="group-label">{{ subtrahend }}</div>
                <div class="dots-grid">
                  <div 
                    v-for="i in subtrahend" 
                    :key="`original-sub-${i}`"
                    class="dot dot-red"
                    :style="{ animationDelay: `${(i-1) * 100}ms` }"
                  ></div>
                </div>
              </div>
              
              <div class="operator">=</div>
              
              <!-- 第一部分（等于个位数） -->
              <div class="first-part-group">
                <div class="group-label">{{ onesDigit }}</div>
                <div class="dots-grid">
                  <div 
                    v-for="i in onesDigit" 
                    :key="`first-part-${i}`"
                    class="dot dot-orange"
                    :style="{ animationDelay: `${(subtrahend + i-1) * 100}ms` }"
                  ></div>
                </div>
              </div>
              
              <div class="operator">+</div>
              
              <!-- 第二部分（剩余） -->
              <div class="second-part-group">
                <div class="group-label">{{ remaining }}</div>
                <div class="dots-grid">
                  <div 
                    v-for="i in remaining" 
                    :key="`second-part-${i}`"
                    class="dot dot-purple"
                    :style="{ animationDelay: `${(subtrahend + onesDigit + i-1) * 100}ms` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 步骤3: 先减去第一部分，得到整十数 -->
      <div v-else-if="currentStep === 'step3'" class="step-animation">
        <div class="step-content">
          <div class="subtraction-demo">
            <!-- 被减数 -->
            <div class="dot-group">
              <div class="group-label">{{ num1 }}</div>
              <div class="dots-grid">
                <div 
                  v-for="i in num1" 
                  :key="`minuend-${i}`"
                  class="dot"
                  :class="{
                    'dot-blue': i <= tensDigit,
                    'dot-crossed': i > tensDigit
                  }"
                  :style="{ animationDelay: `${(i-1) * 100}ms` }"
                ></div>
              </div>
            </div>
            
            <div class="operator">-</div>
            
            <!-- 第一部分（个位数） -->
            <div class="dot-group">
              <div class="group-label">{{ onesDigit }}</div>
              <div class="dots-grid">
                <div 
                  v-for="i in onesDigit" 
                  :key="`first-subtract-${i}`"
                  class="dot dot-orange"
                  :style="{ animationDelay: `${(num1 + i-1) * 100}ms` }"
                ></div>
              </div>
            </div>
            
            <div class="operator">=</div>
            
            <!-- 整十数结果 -->
            <div class="dot-group">
              <div class="group-label">{{ intermediateResult }}</div>
              <div class="ten-frame completed">
                <div 
                  v-for="i in intermediateResult" 
                  :key="`tens-result-${i}`"
                  class="frame-slot filled"
                  :style="{ animationDelay: `${(num1 + onesDigit + i-1) * 100}ms` }"
                >
                  <div class="dot dot-blue-small"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 步骤4: 再减去剩余部分 -->
      <div v-else-if="currentStep === 'step4'" class="step-animation">
        <div class="step-content">
          <div class="subtraction-demo">
            <!-- 整十数 -->
            <div class="dot-group">
              <div class="group-label">{{ intermediateResult }}</div>
              <div class="ten-frame">
                <div 
                  v-for="i in intermediateResult" 
                  :key="`tens-final-${i}`"
                  class="frame-slot"
                  :class="{
                    'filled': i <= finalResult,
                    'crossed': i > finalResult
                  }"
                  :style="{ animationDelay: `${(i-1) * 100}ms` }"
                >
                  <div class="dot-blue-small"></div>
                </div>
              </div>
            </div>
            
            <div class="operator">-</div>
            
            <!-- 第二部分（剩余需要减的数） -->
            <div class="dot-group">
              <div class="group-label">{{ remaining }}</div>
              <div class="dots-grid">
                <div 
                  v-for="i in remaining" 
                  :key="`second-subtract-${i}`"
                  class="dot dot-purple"
                  :style="{ animationDelay: `${(intermediateResult + i-1) * 100}ms` }"
                ></div>
              </div>
            </div>
            
            <div class="operator">=</div>
            
            <!-- 最终结果 -->
            <div class="dot-group">
              <div class="group-label">{{ finalResult }}</div>
              <div class="dots-grid">
                <div 
                  v-for="i in finalResult" 
                  :key="`final-result-${i}`"
                  class="dot dot-result final-result-glow"
                  :style="{ animationDelay: `${(intermediateResult + remaining + i-1) * 100}ms` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 步骤5: 最终结果展示 -->
      <div v-else-if="currentStep === 'step5'" class="step-animation">
        <div class="step-content">
          <div class="final-result-display">
            <div class="equation-summary">
              <span class="text-2xl font-bold">{{ num1 }} - {{ subtrahend }} = {{ finalResult }}</span>
            </div>
            <div class="result-group final">
              <div class="group-label">最终答案</div>
              <div class="dots-grid">
                <div 
                  v-for="i in finalResult" 
                  :key="`summary-result-${i}`"
                  class="dot dot-result final-result-glow"
                  :style="{ animationDelay: `${(i-1) * 150}ms` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  operation: 'add' | 'subtract' | 'make10' | 'break10' | 'flatten10'
  num1: number
  num2: number
  result: number
  // 凑十法专用属性
  bigNum?: number
  smallNum?: number
  borrowAmount?: number
  remaining?: number
  currentStep?: string
  // 破十法专用属性
  tensDigit?: number
  onesDigit?: number
  subtrahend?: number
  tempResult?: number
  finalResult?: number
  // 平十法专用属性
  intermediateResult?: number
}

defineProps<Props>()
</script>

<style scoped>
.dot-animation-container {
  @apply p-6 bg-gray-50 rounded-lg;
}

.addition-demo,
.subtraction-demo,
.calculation-demo {
  @apply flex items-center justify-center space-x-4 flex-wrap;
}

.make10-demo,
.break10-demo,
.flatten10-demo {
  @apply w-full;
}

.step-animation {
  @apply w-full;
}

.step-content {
  @apply flex items-center justify-center gap-5 flex-wrap;
}

.dot-group {
  @apply flex flex-col items-center space-y-2;
}

.group-label {
  @apply text-sm font-medium text-gray-700 mb-2;
}

.dots-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  max-width: 250px;
  margin: 10px auto;
  justify-items: start;
}

.dot {
  @apply w-5 h-5 rounded-full border-2 transition-all duration-300;
  animation: dotAppear 0.5s ease-out forwards;
  opacity: 0;
  transform: scale(0);
}

.dot-blue {
  @apply bg-blue-400 border-blue-500;
}

.dot-blue-small {
  @apply w-4 h-4 rounded-full bg-blue-400;
}

.dot-green {
  @apply bg-green-400 border-green-500;
}

.highlight-glow {
  animation: highlightGlow 2s ease-in-out infinite;
}

.dot-red {
  @apply bg-red-400 border-red-500;
}

.dot-orange {
  @apply bg-orange-400 border-orange-500;
}

.dot-purple {
  @apply bg-purple-400 border-purple-500;
}

.dot-result {
  @apply bg-purple-400 border-purple-500;
}

.dot-ten {
  @apply bg-yellow-400 border-yellow-500;
}

.dot-crossed {
  @apply bg-gray-300 border-gray-400 relative;
}

.dot-crossed::after {
  content: '';
  @apply absolute inset-0 bg-red-500;
  width: 2px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  animation: crossOut 0.3s ease-out 0.5s forwards;
}

.dot-moving {
  @apply bg-yellow-300 border-yellow-400;
  animation: moveToFrame 1.5s ease-in-out;
}

.dot-complete {
  @apply w-4 h-4 rounded-full bg-cyan-400;
}

.dot-borrow {
  @apply bg-yellow-400 border-yellow-500;
  animation: borrowFlash 2s ease-in-out infinite;
}

.dot-borrowed {
  @apply w-4 h-4 rounded-full bg-yellow-400;
  animation: borrowedAppear 1s ease-out 1.5s forwards;
  opacity: 0;
  transform: scale(0);
}

.dot-temp-result {
  @apply bg-orange-400 border-orange-500;
  animation: tempResultPulse 1.5s ease-in-out infinite;
}

.dot-crossed-small {
  @apply w-4 h-4 rounded-full bg-gray-300 border-gray-400 relative;
}

.dot-crossed-small::after {
  content: '';
  @apply absolute inset-0 bg-red-500;
  width: 2px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  animation: crossOut 0.3s ease-out 0.5s forwards;
}

.operator {
  @apply text-2xl font-bold text-gray-700 mx-2;
}

.ten-frame {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  max-width: 200px;
  margin: 10px auto;
  padding: 10px;
  @apply border-2 border-dashed border-cyan-400 rounded-lg bg-cyan-50;
}

.ten-frame.completed {
  @apply border-2 border-solid border-cyan-500 bg-cyan-100;
}

.frame-slot {
  @apply w-6 h-6 border border-gray-300 rounded flex items-center justify-center bg-white;
  animation: slotAppear 0.5s ease-in-out;
}

.frame-slot.filled {
  @apply bg-cyan-50;
}

.frame-slot.question {
  @apply bg-yellow-100 border-yellow-400;
}

.frame-slot.empty {
  @apply bg-gray-50 border-dashed;
}

.question-mark {
  @apply text-base font-bold text-yellow-500;
  animation: questionPulse 1s ease-in-out infinite;
}

.decomposition-container {
  @apply flex flex-col items-center space-y-4 mb-6;
}

.decomposition-display {
  @apply flex items-center space-x-4;
}

.remaining-group {
  @apply border-2 border-green-300 p-3 rounded-lg bg-green-50;
}

.borrow-group {
  @apply border-2 border-yellow-300 p-3 rounded-lg bg-yellow-50;
}

.plus-sign {
  @apply text-xl font-bold text-gray-600;
}

.borrow-animation-container {
  @apply flex flex-col items-center justify-center mx-4;
}

.borrow-arrow {
  @apply text-3xl text-yellow-500 font-bold;
  animation: arrowPulse 1.5s ease-in-out infinite;
}

.animated-arrow {
  animation: arrowMove 2s ease-in-out infinite;
}

.borrow-text {
  @apply text-xs text-yellow-600 font-medium mt-1;
}

.borrowed-slot {
  @apply bg-yellow-100 border-yellow-400;
  animation: slotHighlight 1s ease-in-out 1.5s forwards;
}

.tens-group {
  @apply border-2 border-blue-300 p-3 rounded-lg bg-blue-50;
}

.ones-group {
  @apply border-2 border-green-300 p-3 rounded-lg bg-green-50;
}

.result-highlight {
  @apply border-2 border-orange-300 p-3 rounded-lg bg-orange-50;
}

.final-result-display {
  @apply flex flex-col items-center space-y-6;
}

.equation-summary {
  @apply text-3xl font-bold text-gray-800 flex items-center space-x-3;
}

.equation-summary .number {
  @apply text-blue-600;
}

.equation-summary .result-number {
  @apply text-purple-600;
}

.result-group.final {
  @apply border-4 border-purple-400 p-6 rounded-xl bg-purple-100;
  animation: finalResultGlow 2s ease-in-out infinite;
}

.frame-slot.crossed {
  @apply bg-red-100 border-red-400;
}

.result-group {
  @apply border-2 border-solid border-purple-400 p-4 rounded-lg bg-purple-50;
}

.final-result-glow {
  animation: finalResultGlow 2s ease-in-out infinite;
}

/* 动画定义 */
@keyframes dotAppear {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slotAppear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes questionPulse {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes moveToFrame {
  0% {
    transform: translateX(0) translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateX(30px) translateY(-20px);
    opacity: 0.7;
  }
  100% {
    transform: translateX(60px) translateY(-40px);
    opacity: 0.3;
  }
}

@keyframes arrowPulse {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes crossOut {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes borrowMove {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px) scale(1.2);
  }
  100% {
    transform: translateX(0) scale(1);
    @apply bg-yellow-300 border-yellow-400;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes borrowFlash {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 193, 7, 0);
  }
  25% {
    opacity: 0.8;
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(255, 193, 7, 0.6);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
    box-shadow: 0 0 20px rgba(255, 193, 7, 0.8);
  }
  75% {
    opacity: 0.8;
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(255, 193, 7, 0.6);
  }
}

@keyframes borrowedAppear {
  0% {
    opacity: 0;
    transform: scale(0) translateX(-50px);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2) translateX(-25px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateX(0);
  }
}

@keyframes arrowMove {
  0%, 100% {
    transform: translateX(0) scale(1);
    opacity: 0.7;
  }
  25% {
    transform: translateX(5px) scale(1.1);
    opacity: 1;
  }
  50% {
    transform: translateX(10px) scale(1.2);
    opacity: 1;
    color: #f59e0b;
  }
  75% {
    transform: translateX(5px) scale(1.1);
    opacity: 1;
  }
}

@keyframes slotHighlight {
  0% {
    background-color: rgb(254 249 195);
    border-color: rgb(250 204 21);
  }
  50% {
    background-color: rgb(255 236 179);
    border-color: rgb(245 158 11);
    box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
  }
  100% {
    background-color: rgb(254 249 195);
    border-color: rgb(250 204 21);
  }
}

@keyframes tempResultPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0 rgba(251, 146, 60, 0);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(251, 146, 60, 0.6);
  }
}

@keyframes finalResultGlow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 25px rgba(168, 85, 247, 0.6);
    transform: scale(1.02);
  }
}

@keyframes highlightGlow {
  0%, 100% {
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
    transform: scale(1.1);
  }
}
</style>