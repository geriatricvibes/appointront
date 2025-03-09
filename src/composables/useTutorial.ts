import { ref, computed } from 'vue'

// Define the tutorial steps
export interface TutorialStep {
  id: string
  title: string
  description: string
  targetSelector: string
  position: 'top' | 'right' | 'bottom' | 'left'
  order: number
}

// Define the dashboard tutorial steps
const dashboardSteps: TutorialStep[] = [
  {
    id: 'calendly-connection',
    title: 'Connect with Calendly',
    description: 'First, connect your Calendly account to sync your availability and appointments.',
    targetSelector: '[data-tutorial="calendly-connection"]',
    position: 'bottom',
    order: 1
  },
  {
    id: 'widget-integration',
    title: 'Add the Chat Widget to Your Website',
    description: 'Copy this code snippet and add it to your website to display the chat widget.',
    targetSelector: '[data-tutorial="widget-integration"]',
    position: 'top',
    order: 2
  },
  {
    id: 'knowledge-sources',
    title: 'Add Business Knowledge',
    description: 'Enhance your AI assistant with your business-specific knowledge by adding sources from websites or custom content.',
    targetSelector: '[data-tutorial="knowledge-sources"]',
    position: 'bottom',
    order: 3
  }
]

export function useTutorial() {
  const isTutorialActive = ref(false)
  const currentStepIndex = ref(0)
  const hasSeenTutorial = ref(localStorage.getItem('hasSeenTutorial') === 'true')

  // Get the current step
  const currentStep = computed(() => 
    isTutorialActive.value ? dashboardSteps[currentStepIndex.value] : null
  )

  // Check if there's a next step
  const hasNextStep = computed(() => 
    currentStepIndex.value < dashboardSteps.length - 1
  )

  // Check if there's a previous step
  const hasPreviousStep = computed(() => 
    currentStepIndex.value > 0
  )

  // Start the tutorial
  const startTutorial = () => {
    isTutorialActive.value = true
    currentStepIndex.value = 0
  }

  // Go to the next step
  const nextStep = () => {
    if (hasNextStep.value) {
      currentStepIndex.value++
    } else {
      completeTutorial()
    }
  }

  // Go to the previous step
  const previousStep = () => {
    if (hasPreviousStep.value) {
      currentStepIndex.value--
    }
  }

  // Complete the tutorial
  const completeTutorial = () => {
    isTutorialActive.value = false
    localStorage.setItem('hasSeenTutorial', 'true')
    hasSeenTutorial.value = true
  }

  // Skip the tutorial
  const skipTutorial = () => {
    isTutorialActive.value = false
    localStorage.setItem('hasSeenTutorial', 'true')
    hasSeenTutorial.value = true
  }

  return {
    isTutorialActive,
    currentStep,
    hasNextStep,
    hasPreviousStep,
    hasSeenTutorial,
    startTutorial,
    nextStep,
    previousStep,
    completeTutorial,
    skipTutorial
  }
} 