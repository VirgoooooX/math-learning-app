<template>
  <div class="math-equation flex items-center space-x-2">
    <template v-for="(token, index) in tokens" :key="index">
      <span
        v-if="isNumber(token)"
        class="math-number transition-all duration-300"
        :class="getNumberClass(token)"
      >
        {{ token }}
      </span>
      <span
        v-else-if="isOperator(token)"
        class="math-operator"
      >
        {{ token }}
      </span>
      <span
        v-else
        class="text-gray-600"
      >
        {{ token }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  equation: string
  highlights?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  highlights: () => []
})

// 将等式分解为标记
const tokens = computed(() => {
  // 使用正则表达式分割等式，保留运算符和数字
  return props.equation.split(/([+\-×÷=()\s]+)/).filter(token => token.trim() !== '')
})

// 判断是否为数字
const isNumber = (token: string): boolean => {
  return /^\d+$/.test(token.trim())
}

// 判断是否为运算符
const isOperator = (token: string): boolean => {
  return /^[+\-×÷=]$/.test(token.trim())
}

// 获取数字的样式类
const getNumberClass = (token: string): string => {
  const number = token.trim()
  
  if (props.highlights?.includes(number)) {
    // 根据数字的特殊含义应用不同的高亮样式
    if (number === '10') {
      return 'math-number-success animate-pulse-highlight'
    } else if (number === '0') {
      return 'math-number-warning'
    } else {
      return 'math-number-highlight animate-bounce-in'
    }
  }
  
  return 'math-number-default'
}
</script>

<style scoped>
@keyframes pulseHighlight {
  0%, 100% {
    background-color: rgb(34 197 94 / 0.1);
    transform: scale(1);
  }
  50% {
    background-color: rgb(34 197 94 / 0.3);
    transform: scale(1.05);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-pulse-highlight {
  animation: pulseHighlight 2s ease-in-out infinite;
}

.animate-bounce-in {
  animation: bounceIn 0.6s ease-out;
}

.math-equation {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}
</style>