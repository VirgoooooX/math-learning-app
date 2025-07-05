/**
 * 音效管理器 - 使用 Web Audio API 生成合成音效
 * 不依赖本地音频文件，通过代码生成各种音效
 * 专为小朋友设计的可爱音效
 */

export type SoundType = 'success' | 'error' | 'click' | 'start' | 'achievement' | 'notification'

export interface AudioConfig {
  enabled: boolean
  volume: number // 0-1
}

class AudioManager {
  private audioContext: AudioContext | null = null
  private config: AudioConfig = {
    enabled: true,
    volume: 0.5
  }

  constructor() {
    this.initAudioContext()
  }

  private initAudioContext() {
    try {
      // 创建音频上下文
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }

  /**
   * 确保音频上下文已启动（处理浏览器自动播放限制）
   */
  private async ensureAudioContext() {
    if (!this.audioContext) {
      this.initAudioContext()
    }

    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume()
      } catch (error) {
        console.warn('Failed to resume audio context:', error)
      }
    }
  }

  /**
   * 生成正确答案音效 - 可爱的小铃铛声
   */
  private createSuccessSound() {
    if (!this.audioContext) return

    const oscillator1 = this.audioContext.createOscillator()
    const oscillator2 = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator1.type = 'sine'
    oscillator2.type = 'triangle'

    // 更高音调的快乐音效 - 像小铃铛
    oscillator1.frequency.setValueAtTime(880, this.audioContext.currentTime) // A5
    oscillator1.frequency.exponentialRampToValueAtTime(1174.66, this.audioContext.currentTime + 0.08) // D6
    oscillator1.frequency.exponentialRampToValueAtTime(1396.91, this.audioContext.currentTime + 0.16) // F6

    oscillator2.frequency.setValueAtTime(1760, this.audioContext.currentTime) // A6
    oscillator2.frequency.exponentialRampToValueAtTime(2093, this.audioContext.currentTime + 0.16) // C7

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.25, this.audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.25)

    oscillator1.start(this.audioContext.currentTime)
    oscillator2.start(this.audioContext.currentTime)
    oscillator1.stop(this.audioContext.currentTime + 0.25)
    oscillator2.stop(this.audioContext.currentTime + 0.25)
  }

  /**
   * 生成错误答案音效 - 温和的小动物叹气声
   */
  private createErrorSound() {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = 'triangle'

    // 温和下降的音调，不会吓到小朋友
    oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime) // A4
    oscillator.frequency.exponentialRampToValueAtTime(349.23, this.audioContext.currentTime + 0.15) // F4
    oscillator.frequency.exponentialRampToValueAtTime(293.66, this.audioContext.currentTime + 0.25) // D4

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.15, this.audioContext.currentTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.3)
  }

  /**
   * 生成按钮点击音效 - 可爱的泡泡破裂声
   */
  private createClickSound() {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.05)

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.12, this.audioContext.currentTime + 0.005)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.08)
  }

  /**
   * 生成游戏开始音效 - 欢快的小鸟唱歌
   */
  private createStartSound() {
    if (!this.audioContext) return

    const oscillator1 = this.audioContext.createOscillator()
    const oscillator2 = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator1.type = 'sine'
    oscillator2.type = 'triangle'

    // 快乐的上升音阶 - 像小鸟唱歌
    oscillator1.frequency.setValueAtTime(523.25, this.audioContext.currentTime) // C5
    oscillator1.frequency.exponentialRampToValueAtTime(659.25, this.audioContext.currentTime + 0.1) // E5
    oscillator1.frequency.exponentialRampToValueAtTime(783.99, this.audioContext.currentTime + 0.2) // G5
    oscillator1.frequency.exponentialRampToValueAtTime(1046.5, this.audioContext.currentTime + 0.3) // C6

    oscillator2.frequency.setValueAtTime(1046.5, this.audioContext.currentTime) // C6
    oscillator2.frequency.exponentialRampToValueAtTime(1318.51, this.audioContext.currentTime + 0.3) // E6

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.2, this.audioContext.currentTime + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4)

    oscillator1.start(this.audioContext.currentTime)
    oscillator2.start(this.audioContext.currentTime)
    oscillator1.stop(this.audioContext.currentTime + 0.4)
    oscillator2.stop(this.audioContext.currentTime + 0.4)
  }

  /**
   * 生成成就解锁音效 - 超级可爱的魔法闪烁声
   */
  private createAchievementSound() {
    if (!this.audioContext) return

    const oscillator1 = this.audioContext.createOscillator()
    const oscillator2 = this.audioContext.createOscillator()
    const oscillator3 = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    oscillator3.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator1.type = 'sine'
    oscillator2.type = 'triangle'
    oscillator3.type = 'sine'

    // 闪烁的魔法音效
    oscillator1.frequency.setValueAtTime(1046.5, this.audioContext.currentTime) // C6
    oscillator1.frequency.exponentialRampToValueAtTime(1318.51, this.audioContext.currentTime + 0.15) // E6
    oscillator1.frequency.exponentialRampToValueAtTime(1567.98, this.audioContext.currentTime + 0.3) // G6
    oscillator1.frequency.exponentialRampToValueAtTime(2093, this.audioContext.currentTime + 0.45) // C7

    oscillator2.frequency.setValueAtTime(1318.51, this.audioContext.currentTime) // E6
    oscillator2.frequency.exponentialRampToValueAtTime(1567.98, this.audioContext.currentTime + 0.45) // G6

    oscillator3.frequency.setValueAtTime(2093, this.audioContext.currentTime) // C7
    oscillator3.frequency.exponentialRampToValueAtTime(2637.02, this.audioContext.currentTime + 0.45) // E7

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.25, this.audioContext.currentTime + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.6)

    oscillator1.start(this.audioContext.currentTime)
    oscillator2.start(this.audioContext.currentTime)
    oscillator3.start(this.audioContext.currentTime)
    oscillator1.stop(this.audioContext.currentTime + 0.6)
    oscillator2.stop(this.audioContext.currentTime + 0.6)
    oscillator3.stop(this.audioContext.currentTime + 0.6)
  }

  /**
   * 生成通知音效 - 温柔的风铃声
   */
  private createNotificationSound() {
    if (!this.audioContext) return

    const oscillator1 = this.audioContext.createOscillator()
    const oscillator2 = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator1.type = 'sine'
    oscillator2.type = 'triangle'

    // 轻柔的双音提示 - 像风铃
    oscillator1.frequency.setValueAtTime(880, this.audioContext.currentTime) // A5
    oscillator1.frequency.exponentialRampToValueAtTime(1108.73, this.audioContext.currentTime + 0.2) // C#6

    oscillator2.frequency.setValueAtTime(1760, this.audioContext.currentTime) // A6
    oscillator2.frequency.exponentialRampToValueAtTime(1567.98, this.audioContext.currentTime + 0.2) // G6

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.12, this.audioContext.currentTime + 0.03)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.25)

    oscillator1.start(this.audioContext.currentTime)
    oscillator2.start(this.audioContext.currentTime)
    oscillator1.stop(this.audioContext.currentTime + 0.25)
    oscillator2.stop(this.audioContext.currentTime + 0.25)
  }

  /**
   * 播放指定类型的音效
   */
  async playSound(type: SoundType) {
    if (!this.config.enabled || !this.audioContext) {
      return
    }

    try {
      await this.ensureAudioContext()

      switch (type) {
        case 'success':
          this.createSuccessSound()
          break
        case 'error':
          this.createErrorSound()
          break
        case 'click':
          this.createClickSound()
          break
        case 'start':
          this.createStartSound()
          break
        case 'achievement':
          this.createAchievementSound()
          break
        case 'notification':
          this.createNotificationSound()
          break
        default:
          console.warn('Unknown sound type:', type)
      }
    } catch (error) {
      console.warn('Failed to play sound:', error)
    }
  }

  /**
   * 更新音效配置
   */
  updateConfig(config: Partial<AudioConfig>) {
    this.config = { ...this.config, ...config }
  }

  /**
   * 获取当前配置
   */
  getConfig(): AudioConfig {
    return { ...this.config }
  }

  /**
   * 启用音效
   */
  enable() {
    this.config.enabled = true
  }

  /**
   * 禁用音效
   */
  disable() {
    this.config.enabled = false
  }

  /**
   * 设置音量 (0-1)
   */
  setVolume(volume: number) {
    this.config.volume = Math.max(0, Math.min(1, volume))
  }

  /**
   * 检查是否支持 Web Audio API
   */
  isSupported(): boolean {
    return !!(window.AudioContext || (window as any).webkitAudioContext)
  }
}

// 创建全局音效管理器实例
export const audioManager = new AudioManager()

// 导出便捷方法
export const playSound = (type: SoundType) => audioManager.playSound(type)
export const enableAudio = () => audioManager.enable()
export const disableAudio = () => audioManager.disable()
export const setAudioVolume = (volume: number) => audioManager.setVolume(volume)