import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameState, Question, MathMethod, CalculationStep } from '@/types'
import { mathMethods, getMethodByName } from '@/utils/mathMethods'

export const useGameStore = defineStore('game', () => {
  // 状态
  const gameState = ref<GameState>({
    score: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    currentStreak: 0,
    bestStreak: 0,
    timeSpent: 0,
    startTime: null
  })
  
  const selectedMethod = ref<MathMethod | null>(null)
  const currentQuestion = ref<Question | null>(null)
  const currentSteps = ref<CalculationStep[]>([])
  const showVisualization = ref(false)
  const currentStepIndex = ref(0)
  const userAnswer = ref<number | null>(null)
  const isAnswered = ref(false)
  
  // 计算属性
  const accuracy = computed(() => {
    if (gameState.value.totalQuestions === 0) return 0
    return Math.round((gameState.value.correctAnswers / gameState.value.totalQuestions) * 100)
  })
  
  const availableMethods = computed(() => mathMethods)
  
  const canShowNextStep = computed(() => {
    return currentStepIndex.value < currentSteps.value.length - 1
  })
  
  const canShowPrevStep = computed(() => {
    return currentStepIndex.value > 0
  })
  
  // 方法
  const selectMethod = (method: MathMethod) => {
    selectedMethod.value = method
    generateNewQuestion()
  }
  
  const generateNewQuestion = () => {
    if (!selectedMethod.value) return
    
    currentQuestion.value = selectedMethod.value.generateQuestion()
    currentSteps.value = selectedMethod.value.calculateSteps(
      currentQuestion.value.num1,
      currentQuestion.value.num2
    )
    currentStepIndex.value = 0
    userAnswer.value = null
    isAnswered.value = false
    showVisualization.value = false
    
    // 开始计时
    if (!gameState.value.startTime) {
      gameState.value.startTime = Date.now()
    }
  }
  
  const submitAnswer = (answer: number): boolean => {
    if (!currentQuestion.value || isAnswered.value) return false
    
    userAnswer.value = answer
    isAnswered.value = true
    gameState.value.totalQuestions++
    
    const isCorrect = answer === currentQuestion.value.answer
    
    if (isCorrect) {
      gameState.value.correctAnswers++
      gameState.value.currentStreak++
      gameState.value.score += 10 + Math.min(gameState.value.currentStreak, 10) // 连击奖励
      
      if (gameState.value.currentStreak > gameState.value.bestStreak) {
        gameState.value.bestStreak = gameState.value.currentStreak
      }
    } else {
      gameState.value.currentStreak = 0
    }
    
    // 更新用时
    if (gameState.value.startTime) {
      gameState.value.timeSpent = Date.now() - gameState.value.startTime
    }
    
    return isCorrect
  }
  
  const showVisualizationDemo = () => {
    showVisualization.value = true
    currentStepIndex.value = 0
  }
  
  const nextStep = () => {
    if (canShowNextStep.value) {
      currentStepIndex.value++
    }
  }
  
  const prevStep = () => {
    if (canShowPrevStep.value) {
      currentStepIndex.value--
    }
  }
  
  const goToStep = (index: number) => {
    if (index >= 0 && index < currentSteps.value.length) {
      currentStepIndex.value = index
    }
  }
  
  const resetGame = () => {
    gameState.value = {
      score: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      currentStreak: 0,
      bestStreak: 0,
      timeSpent: 0,
      startTime: null
    }
    currentQuestion.value = null
    currentSteps.value = []
    showVisualization.value = false
    currentStepIndex.value = 0
    userAnswer.value = null
    isAnswered.value = false
  }
  
  const selectMethodByName = (name: string) => {
    const method = getMethodByName(name)
    if (method) {
      selectMethod(method)
    }
  }
  
  return {
    // 状态
    gameState,
    selectedMethod,
    currentQuestion,
    currentSteps,
    showVisualization,
    currentStepIndex,
    userAnswer,
    isAnswered,
    
    // 计算属性
    accuracy,
    availableMethods,
    canShowNextStep,
    canShowPrevStep,
    
    // 方法
    selectMethod,
    selectMethodByName,
    generateNewQuestion,
    submitAnswer,
    showVisualizationDemo,
    nextStep,
    prevStep,
    goToStep,
    resetGame
  }
})