<template>
  <div class="visual-step" :class="{ active: isActive }">
    <!-- 步骤标题 -->
    <div class="text-center mb-6">
      <h4 class="text-xl font-semibold text-gray-900 mb-2">{{ step.title }}</h4>
    </div>

    <!-- 数学等式展示 -->
    <div class="flex items-center justify-center mb-6">
      <div class="math-equation text-3xl font-mono font-bold flex items-center space-x-3">
        <MathEquation :equation="step.equation" :highlights="step.highlight" />
      </div>
    </div>

    <!-- 数点动画演示 -->
    <div v-if="showDotAnimation" class="mb-6">
      <DotAnimation 
        :operation="animationType"
        :num1="dotAnimationProps.num1"
        :num2="dotAnimationProps.num2"
        :result="dotAnimationProps.result"
        :big-num="dotAnimationProps.bigNum"
        :small-num="dotAnimationProps.smallNum"
        :borrow-amount="dotAnimationProps.borrowAmount"
        :remaining="dotAnimationProps.remaining"
        :tens-digit="dotAnimationProps.tensDigit"
        :ones-digit="dotAnimationProps.onesDigit"
        :subtrahend="dotAnimationProps.subtrahend"
        :temp-result="dotAnimationProps.tempResult"
        :final-result="dotAnimationProps.finalResult"
        :intermediate-result="dotAnimationProps.intermediateResult"
        :current-step="step.id"
      />
    </div>

    <!-- 步骤解释 -->
    <div class="step-explanation">
      <div class="flex items-start space-x-2">
        <div class="flex-shrink-0 mt-1">
          <LightBulbIcon class="h-4 w-4 text-yellow-500" />
        </div>
        <p class="text-sm text-gray-700">{{ step.explanation }}</p>
      </div>
    </div>

    <!-- 结果高亮 -->
    <div v-if="step.isResult" class="mt-6 text-center">
      <div class="inline-flex items-center px-4 py-2 rounded-full bg-success-100 text-success-800">
        <CheckCircleIcon class="h-5 w-5 mr-2" />
        <span class="font-medium">计算完成！</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CalculationStep } from '@/types'
import MathEquation from './MathEquation.vue'
import DotAnimation from './DotAnimation.vue'

interface Props {
  step: CalculationStep
  isActive?: boolean
  method?: string
  originalNum1?: number
  originalNum2?: number
}

const props = defineProps<Props>()

// 判断是否显示数点动画
const showDotAnimation = computed(() => {
  return props.isActive && props.originalNum1 !== undefined && props.originalNum2 !== undefined
})

// 确定动画类型
const animationType = computed(() => {
  if (props.method === '凑十法') {
    return 'make10'
  } else if (props.method === '破十法') {
    return 'break10'
  } else if (props.method === '平十法') {
    return 'flatten10'
  } else if (props.step.equation.includes('-')) {
    return 'subtract'
  } else if (props.step.equation.includes('+')) {
    return 'add'
  }
  return 'add'
})

// 数点动画属性
const dotAnimationProps = computed(() => {
  const num1 = props.originalNum1 || 0
  const num2 = props.originalNum2 || 0
  const result = num1 + num2
  
  if (props.method === '凑十法') {
    const bigNum = Math.max(num1, num2)
    const smallNum = Math.min(num1, num2)
    const borrowAmount = 10 - bigNum
    const remaining = smallNum - borrowAmount
    
    return {
      num1,
      num2,
      result,
      bigNum,
      smallNum,
      borrowAmount,
      remaining
    }
  } else if (props.method === '破十法') {
    const tensDigit = Math.floor(num1 / 10) * 10  // 十位数
    const onesDigit = num1 % 10                   // 个位数
    const subtrahend = num2                       // 减数
    const finalResult = num1 - num2              // 最终结果
    
    return {
      num1,
      num2,
      result: finalResult,
      tensDigit,
      onesDigit,
      subtrahend,
      tempResult: tensDigit - subtrahend,         // 10减去减数的结果
      finalResult
    }
  } else if (props.method === '平十法') {
    const onesDigit = num1 % 10                   // 被减数的个位数
    const tensDigit = Math.floor(num1 / 10) * 10  // 被减数的十位数
    const subtrahend = num2                       // 减数
    const firstPart = onesDigit                   // 减数的第一部分（等于被减数个位数）
    const secondPart = subtrahend - firstPart     // 减数的第二部分
    const intermediateResult = tensDigit          // 减去第一部分后得到的整十数
    const finalResult = num1 - num2              // 最终结果
    
    return {
      num1,
      num2,
      result: finalResult,
      onesDigit,
      tensDigit,
      subtrahend,
      remaining: secondPart,                      // 剩余需要减的数（减数的第二部分）
      intermediateResult,
      finalResult
    }
  } else if (animationType.value === 'subtract') {
    return {
      num1,
      num2,
      result: num1 - num2
    }
  } else {
    return {
      num1,
      num2,
      result
    }
  }
})

// 图标组件
const LightBulbIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" /></svg>`
}

const CheckCircleIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`
}
</script>