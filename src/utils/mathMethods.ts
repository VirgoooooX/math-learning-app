import type { Question, CalculationStep, MathMethod } from '@/types'

// 凑十法
export class CouShiFa implements MathMethod {
  name = '凑十法'
  description = '把其中一个加数分解，使另一个加数凑成10，再加上剩余部分'
  steps = [
    '显示较大数和虚框',
    '从小数借位',
    '计算最终结果'
  ]

  isApplicable(num1: number, num2: number): boolean {
    return num1 + num2 >= 10 && num1 + num2 <= 20 && 
           ((num1 < 10 && num2 < 10) || (num1 === 10 || num2 === 10))
  }

  generateQuestion(): Question {
    let num1: number, num2: number
    do {
      num1 = Math.floor(Math.random() * 9) + 1
      num2 = Math.floor(Math.random() * 9) + 1
    } while (!this.isApplicable(num1, num2))
    
    return {
      id: `cousifa_${Date.now()}`,
      num1,
      num2,
      answer: num1 + num2,
      method: this.name
    }
  }

  calculateSteps(num1: number, num2: number): CalculationStep[] {
    const steps: CalculationStep[] = []
    
    // 确定较大数和较小数
    let bigNum = num1
    let smallNum = num2
    if (num1 < num2) {
      bigNum = num2
      smallNum = num1
    }
    
    const needToBorrow = 10 - bigNum
    const remaining = smallNum - needToBorrow
    
    // 步骤1：显示较大数和虚框
    steps.push({
      id: 'step1',
      title: `${bigNum} + ? = 10`,
      equation: `${bigNum} + ? = 10`,
      explanation: `选择较大的数${bigNum}，用虚框表示要凑成的10，缺少的位置用问号表示`,
      highlight: [bigNum.toString(), '10']
    })
    
    // 步骤2：从小数借位
    steps.push({
      id: 'step2',
      title: `从 ${smallNum} 借 ${needToBorrow}`,
      equation: `${smallNum} - ${needToBorrow} = ${remaining}`,
      explanation: `从${smallNum}借${needToBorrow}来凑成10，剩余${remaining}`,
      highlight: [smallNum.toString(), needToBorrow.toString(), remaining.toString()]
    })
    
    // 步骤3：最终结果
    steps.push({
      id: 'step3',
      title: `${remaining} + 10 = ${remaining + 10}`,
      equation: `${remaining} + 10 = ${remaining + 10}`,
      explanation: `剩余的${remaining}加上凑成的10，得到最终结果${remaining + 10}`,
      highlight: [remaining.toString(), '10', (remaining + 10).toString()],
      isResult: true
    })
    
    return steps
  }
}

// 破十法
export class PoShiFa implements MathMethod {
  name = '破十法'
  description = '先用10减去减数，再用所得的差加上被减数的个位数'
  steps = [
    '拆分被减数为十位数和个位数',
    '用10减去减数',
    '用差加上被减数的个位数',
    '得出最终结果'
  ]

  isApplicable(num1: number, num2: number): boolean {
    const onesDigit = num1 % 10
    return num1 >= 10 && num1 <= 20 && num2 < 10 && num1 > num2 && onesDigit <= num2
  }

  generateQuestion(): Question {
    let num1: number, num2: number
    do {
      num1 = Math.floor(Math.random() * 11) + 10 // 10-20
      num2 = Math.floor(Math.random() * 9) + 1   // 1-9
    } while (!this.isApplicable(num1, num2))
    
    return {
      id: `poshifa_${Date.now()}`,
      num1,
      num2,
      answer: num1 - num2,
      method: this.name
    }
  }

  calculateSteps(num1: number, num2: number): CalculationStep[] {
    const steps: CalculationStep[] = []
    const onesDigit = num1 % 10
    const tensDigit = Math.floor(num1 / 10) * 10
    const diff = 10 - num2
    
    // 步骤1：拆分被减数为10+个位数
    steps.push({
      id: 'step1',
      title: '拆分被减数',
      equation: `${num1} = ${tensDigit} + ${onesDigit}`,
      explanation: `把${num1}拆分成${tensDigit}和${onesDigit}`,
      highlight: [num1.toString(), tensDigit.toString(), onesDigit.toString()]
    })
    
    // 步骤2：10减去减数
    steps.push({
      id: 'step2',
      title: '用10减去减数',
      equation: `10 - ${num2} = ${diff}`,
      explanation: `先算10减去${num2}等于${diff}`,
      highlight: ['10', num2.toString(), diff.toString()]
    })
    
    // 步骤3：差加上个位数
    steps.push({
      id: 'step3',
      title: '用差加上被减数的个位数',
      equation: `${diff} + ${onesDigit} = ${diff + onesDigit}`,
      explanation: `然后${diff}加上${num1}的个位数${onesDigit}`,
      highlight: [diff.toString(), onesDigit.toString(), (diff + onesDigit).toString()]
    })
    
    // 步骤4：最终结果
    steps.push({
      id: 'step4',
      title: '最终结果',
      equation: `${num1} - ${num2} = ${num1 - num2}`,
      explanation: `所以${num1} - ${num2} = ${num1 - num2}`,
      highlight: [(num1 - num2).toString()],
      isResult: true
    })
    
    return steps
  }
}

// 平十法
export class PingShiFa implements MathMethod {
  name = '平十法'
  description = '拆分减数为两部分，先减一部分使被减数变成整十数，再减去剩余部分'
  steps = [
    '识别被减数的个位数',
    '拆分减数为两部分',
    '先减去第一部分，得到整十数',
    '再减去剩余部分',
    '得出最终结果'
  ]

  isApplicable(num1: number, num2: number): boolean {
    const onesDigit = num1 % 10
    // 平十法适用条件：被减数是11-20，减数大于被减数的个位数，且减数小于10
    return num1 >= 11 && num1 <= 20 && num2 >= 1 && num2 <= 9 && num1 > num2 && num2 > onesDigit
  }

  generateQuestion(): Question {
    let num1: number, num2: number
    do {
      num1 = Math.floor(Math.random() * 10) + 11 // 11-20
      num2 = Math.floor(Math.random() * 9) + 1   // 1-9
    } while (!this.isApplicable(num1, num2))
    
    return {
      id: `pingshifa_${Date.now()}`,
      num1,
      num2,
      answer: num1 - num2,
      method: this.name
    }
  }

  calculateSteps(num1: number, num2: number): CalculationStep[] {
    const steps: CalculationStep[] = []
    const onesDigit = num1 % 10
    const tensDigit = Math.floor(num1 / 10) * 10
    const firstPart = onesDigit  // 先减去被减数的个位数，使其变成整十数
    const secondPart = num2 - firstPart  // 剩余需要减的部分
    const intermediateResult = tensDigit  // 减去个位数后得到的整十数
    
    // 步骤1：识别被减数的个位数
    steps.push({
      id: 'step1',
      title: '识别被减数的个位数',
      equation: `${num1}的个位数是${onesDigit}`,
      explanation: `${num1}的个位数是${onesDigit}`,
      highlight: [num1.toString(), onesDigit.toString()]
    })
    
    // 步骤2：拆分减数为两部分
    steps.push({
      id: 'step2',
      title: '拆分减数为两部分',
      equation: `${num2} = ${firstPart} + ${secondPart}`,
      explanation: `把减数${num2}拆分成${firstPart}和${secondPart}`,
      highlight: [num2.toString(), firstPart.toString(), secondPart.toString()]
    })
    
    // 步骤3：先减去第一部分，得到整十数
    steps.push({
      id: 'step3',
      title: '先减去第一部分，得到整十数',
      equation: `${num1} - ${firstPart} = ${intermediateResult}`,
      explanation: `先减去${firstPart}，使${num1}变成整十数${intermediateResult}`,
      highlight: [num1.toString(), firstPart.toString(), intermediateResult.toString()]
    })
    
    // 步骤4：再减去剩余部分
    steps.push({
      id: 'step4',
      title: '再减去剩余部分',
      equation: `${intermediateResult} - ${secondPart} = ${intermediateResult - secondPart}`,
      explanation: `再从${intermediateResult}中减去剩余的${secondPart}`,
      highlight: [intermediateResult.toString(), secondPart.toString(), (intermediateResult - secondPart).toString()]
    })
    
    // 步骤5：最终结果
    steps.push({
      id: 'step5',
      title: '最终结果',
      equation: `${num1} - ${num2} = ${num1 - num2}`,
      explanation: `所以${num1} - ${num2} = ${num1 - num2}`,
      highlight: [(num1 - num2).toString()],
      isResult: true
    })
    
    return steps
  }
}

export const mathMethods: MathMethod[] = [
  new CouShiFa(),
  new PoShiFa(),
  new PingShiFa()
]

export function getMethodByName(name: string): MathMethod | undefined {
  return mathMethods.find(method => method.name === name)
}

export function getApplicableMethods(num1: number, num2: number): MathMethod[] {
  return mathMethods.filter(method => method.isApplicable(num1, num2))
}