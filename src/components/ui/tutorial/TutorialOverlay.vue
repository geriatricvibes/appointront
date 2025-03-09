<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useTutorial } from '@/composables/useTutorial'
import { Button } from '@/components/ui/button'
import { ChevronRight, ChevronLeft, X, HelpCircle } from 'lucide-vue-next'

const {
  isTutorialActive,
  currentStep,
  hasNextStep,
  hasPreviousStep,
  startTutorial,
  nextStep,
  previousStep,
  skipTutorial,
  hasSeenTutorial
} = useTutorial()

// Positioning state
const tooltipPosition = ref({ top: 0, left: 0 })
const arrowPosition = ref({ top: 0, left: 0 })
const tooltipClass = ref('')

// Add new state for spotlight effect
const spotlightPosition = ref({ top: 0, left: 0, width: 0, height: 0 })
const isTransitioning = ref(false)

// Calculate position of the tooltip based on the target element
const calculatePosition = async () => {
  if (!currentStep.value) return
  
  await nextTick()
  
  const targetElement = document.querySelector(currentStep.value.targetSelector)
  if (!targetElement) {
    console.error(`Target element not found: ${currentStep.value.targetSelector}`)
    return
  }
  
  const targetRect = targetElement.getBoundingClientRect()
  const tooltipElement = document.querySelector('.tutorial-tooltip') as HTMLElement
  if (!tooltipElement) {
    console.error('Tooltip element not found')
    return
  }
  
  const tooltipRect = tooltipElement.getBoundingClientRect()
  
  // Set spotlight position to highlight the target element
  // Add more padding around the element for better visibility
  const padding = 24
  spotlightPosition.value = {
    top: targetRect.top - padding,
    left: targetRect.left - padding,
    width: targetRect.width + (padding * 2),
    height: targetRect.height + (padding * 2)
  }
  
  // Get viewport dimensions
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  // Calculate position based on the specified position
  let tooltipTop = 0
  let tooltipLeft = 0
  
  switch (currentStep.value.position) {
    case 'top':
      tooltipTop = targetRect.top - tooltipRect.height - 20
      tooltipLeft = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2)
      
      // Adjust if tooltip would go above the viewport
      if (tooltipTop < 10) {
        // Switch to bottom position
        tooltipTop = targetRect.bottom + 20
        arrowPosition.value = {
          top: -8,
          left: tooltipRect.width / 2 - 8
        }
        tooltipClass.value = 'tooltip-bottom'
      } else {
        arrowPosition.value = {
          top: tooltipRect.height,
          left: tooltipRect.width / 2 - 8
        }
        tooltipClass.value = 'tooltip-top'
      }
      break
      
    case 'bottom':
      tooltipTop = targetRect.bottom + 20
      tooltipLeft = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2)
      
      // Adjust if tooltip would go below the viewport
      if (tooltipTop + tooltipRect.height > viewportHeight - 10) {
        // Switch to top position
        tooltipTop = targetRect.top - tooltipRect.height - 20
        arrowPosition.value = {
          top: tooltipRect.height,
          left: tooltipRect.width / 2 - 8
        }
        tooltipClass.value = 'tooltip-top'
      } else {
        arrowPosition.value = {
          top: -8,
          left: tooltipRect.width / 2 - 8
        }
        tooltipClass.value = 'tooltip-bottom'
      }
      break
      
    case 'left':
      tooltipTop = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2)
      tooltipLeft = targetRect.left - tooltipRect.width - 20
      
      // Adjust if tooltip would go beyond left edge
      if (tooltipLeft < 10) {
        // Switch to right position
        tooltipLeft = targetRect.right + 20
        arrowPosition.value = {
          top: tooltipRect.height / 2 - 8,
          left: -8
        }
        tooltipClass.value = 'tooltip-right'
      } else {
        arrowPosition.value = {
          top: tooltipRect.height / 2 - 8,
          left: tooltipRect.width
        }
        tooltipClass.value = 'tooltip-left'
      }
      break
      
    case 'right':
      tooltipTop = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2)
      tooltipLeft = targetRect.right + 20
      
      // Adjust if tooltip would go beyond right edge
      if (tooltipLeft + tooltipRect.width > viewportWidth - 10) {
        // Switch to left position
        tooltipLeft = targetRect.left - tooltipRect.width - 20
        arrowPosition.value = {
          top: tooltipRect.height / 2 - 8,
          left: tooltipRect.width
        }
        tooltipClass.value = 'tooltip-left'
      } else {
        arrowPosition.value = {
          top: tooltipRect.height / 2 - 8,
          left: -8
        }
        tooltipClass.value = 'tooltip-right'
      }
      break
  }
  
  // Ensure tooltip stays within horizontal bounds
  if (tooltipLeft < 10) {
    tooltipLeft = 10
  } else if (tooltipLeft + tooltipRect.width > viewportWidth - 10) {
    tooltipLeft = viewportWidth - tooltipRect.width - 10
  }
  
  // Ensure tooltip stays within vertical bounds
  if (tooltipTop < 10) {
    tooltipTop = 10
  } else if (tooltipTop + tooltipRect.height > viewportHeight - 10) {
    tooltipTop = viewportHeight - tooltipRect.height - 10
  }
  
  // Set final tooltip position
  tooltipPosition.value = {
    top: tooltipTop,
    left: tooltipLeft
  }
  
  // Add highlight to the target element
  targetElement.classList.add('tutorial-highlight')
}

// Remove highlight from all elements
const removeHighlights = () => {
  document.querySelectorAll('.tutorial-highlight').forEach(el => {
    el.classList.remove('tutorial-highlight')
  })
}

// Watch for changes in the current step and recalculate position
watch(currentStep, async (newValue) => {
  console.log('Current step changed:', newValue)
  // Set transitioning flag to true for animation
  isTransitioning.value = true
  
  removeHighlights()
  await nextTick()
  
  // Longer delay to allow for smoother transition
  setTimeout(async () => {
    await calculatePosition()
    
    // Short delay before showing the new tooltip
    setTimeout(() => {
      isTransitioning.value = false
    }, 100)
  }, 400)
})

// Watch for tutorial active state
watch(isTutorialActive, async (newValue) => {
  console.log('Tutorial active state changed:', newValue)
  if (!newValue) {
    isTransitioning.value = true
    setTimeout(() => {
      removeHighlights()
    }, 300)
  } else {
    isTransitioning.value = true
    await nextTick()
    calculatePosition()
    
    // Short delay before showing the tooltip
    setTimeout(() => {
      isTransitioning.value = false
    }, 200)
  }
})

// Show tutorial button if user hasn't seen it yet
const showTutorialButton = computed(() => !isTutorialActive.value && !hasSeenTutorial.value)

// Handle window resize
const handleResize = () => {
  if (isTutorialActive.value) {
    calculatePosition()
  }
}

onMounted(() => {
  console.log('TutorialOverlay mounted, isTutorialActive:', isTutorialActive.value)
  window.addEventListener('resize', handleResize)
  
  // If user hasn't seen tutorial, show it automatically after a short delay
  if (!hasSeenTutorial.value) {
    setTimeout(() => {
      startTutorial()
    }, 1000)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div>
    <!-- Tutorial Button -->
    <Button
      v-if="showTutorialButton"
      @click="startTutorial"
      class="fixed bottom-4 right-4 z-50 shadow-lg"
      size="sm"
    >
      <HelpCircle class="h-4 w-4 mr-2" />
      Take the Tour
    </Button>
    
    <!-- Tutorial Overlay -->
    <Teleport to="body">
      <div v-if="isTutorialActive && currentStep" class="tutorial-overlay">
        <!-- Spotlight highlight (no darkening) -->
        <div class="tutorial-backdrop">
          <!-- Spotlight highlight -->
          <div 
            class="spotlight-cutout"
            :class="{ 'is-transitioning': isTransitioning }"
            :style="{
              top: `${spotlightPosition.top}px`,
              left: `${spotlightPosition.left}px`,
              width: `${spotlightPosition.width}px`,
              height: `${spotlightPosition.height}px`
            }"
          ></div>
        </div>
        
        <!-- Tooltip -->
        <div
          class="tutorial-tooltip"
          :class="[tooltipClass, { 'is-transitioning': isTransitioning }]"
          :style="{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            opacity: isTransitioning ? 0 : 1
          }"
        >
          <!-- Arrow -->
          <div
            class="tooltip-arrow"
            :style="{
              top: `${arrowPosition.top}px`,
              left: `${arrowPosition.left}px`
            }"
          ></div>
          
          <!-- Content -->
          <div class="tooltip-content">
            <div class="tooltip-header">
              <h3 class="tooltip-title">{{ currentStep.title }}</h3>
              <button @click="skipTutorial" class="tooltip-close">
                <X class="h-4 w-4" />
              </button>
            </div>
            
            <div class="tooltip-body">
              <p>{{ currentStep.description }}</p>
            </div>
            
            <div class="tooltip-footer">
              <div class="tooltip-progress">
                <span>Step {{ currentStep.order }} of 3</span>
              </div>
              
              <div class="tooltip-actions">
                <Button
                  v-if="hasPreviousStep"
                  @click="previousStep"
                  variant="outline"
                  size="sm"
                  class="tooltip-btn"
                >
                  <ChevronLeft class="h-4 w-4 mr-1" />
                  Back
                </Button>
                
                <Button
                  @click="nextStep"
                  size="sm"
                  class="tooltip-btn"
                >
                  {{ hasNextStep ? 'Next' : 'Finish' }}
                  <ChevronRight v-if="hasNextStep" class="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.tutorial-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
}

.tutorial-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Remove darkening and blur */
  background-color: transparent;
  z-index: 1000;
  pointer-events: auto;
  transition: opacity 0.4s ease;
}

.spotlight-cutout {
  position: absolute;
  background-color: transparent;
  border-radius: 8px;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  /* Remove the shadow that created the darkening effect */
  /* Add a more visible highlight instead */
  outline: 3px solid hsl(var(--primary) / 0.5);
  box-shadow: 0 0 15px 5px hsl(var(--primary) / 0.2);
  z-index: 1;
}

.spotlight-cutout.is-transitioning {
  opacity: 0;
  transform: scale(0.95);
}

.tutorial-tooltip {
  position: fixed;
  width: 320px;
  background-color: white;
  border-radius: 8px;
  /* Enhanced shadow for better visibility */
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px hsl(var(--border));
  z-index: 1001;
  pointer-events: auto;
  border: 1px solid hsl(var(--border));
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.tutorial-tooltip.is-transitioning {
  transform: translateY(10px);
  opacity: 0;
}

.tooltip-arrow {
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: white;
  transform: rotate(45deg);
  /* Enhanced shadow for better visibility */
  box-shadow: -1px -1px 0 0 hsl(var(--border));
  z-index: -1;
  transition: all 0.4s ease;
}

.tooltip-top .tooltip-arrow {
  border-right: none;
  border-top: none;
}

.tooltip-bottom .tooltip-arrow {
  border-left: none;
  border-bottom: none;
}

.tooltip-left .tooltip-arrow {
  border-left: none;
  border-bottom: none;
}

.tooltip-right .tooltip-arrow {
  border-right: none;
  border-top: none;
}

.tooltip-content {
  padding: 16px;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.tooltip-title {
  font-weight: 600;
  font-size: 16px;
  color: hsl(var(--foreground));
}

.tooltip-close {
  color: hsl(var(--muted-foreground));
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.tooltip-close:hover {
  background-color: hsl(var(--muted) / 0.5);
}

.tooltip-body {
  margin-bottom: 16px;
  color: hsl(var(--muted-foreground));
  font-size: 14px;
  line-height: 1.5;
}

.tooltip-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tooltip-progress {
  font-size: 12px;
  color: hsl(var(--muted-foreground));
}

.tooltip-actions {
  display: flex;
  gap: 8px;
}

.tooltip-btn {
  display: flex;
  align-items: center;
}

/* Highlight for target elements */
:global(.tutorial-highlight) {
  position: relative;
  z-index: 1000;
  /* Make the highlight more visible */
  box-shadow: 0 0 0 4px hsl(var(--primary) / 0.5), 0 0 15px 5px hsl(var(--primary) / 0.2);
  border-radius: 4px;
  transition: box-shadow 0.4s ease;
}
</style> 