export interface Question {
  id: string
  num1: number
  num2: number
  answer: number
  method: string
}

export interface CalculationStep {
  id: string
  title: string
  equation: string
  explanation: string
  highlight?: string[]
  isResult?: boolean
}

export interface MathMethod {
  name: string
  description: string
  steps: string[]
  isApplicable(num1: number, num2: number): boolean
  generateQuestion(): Question
  calculateSteps(num1: number, num2: number): CalculationStep[]
}

export interface GameState {
  score: number
  totalQuestions: number
  correctAnswers: number
  currentStreak: number
  bestStreak: number
  timeSpent: number
  startTime: number | null
}

export interface UserSettings {
  preferredMethod: string | null
  soundEnabled: boolean
  volume: number
}

export interface AppState {
  currentView: 'home' | 'learning' | 'practice' | 'settings'
  selectedMethod: MathMethod | null
  currentQuestion: Question | null
  showVisualization: boolean
  isLoading: boolean
  error: string | null
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
  actions?: Array<{
    label: string
    action: () => void
  }>
}