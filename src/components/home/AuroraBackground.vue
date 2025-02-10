<template>
  <div
    v-bind="props"
    :class="
      cn(
        'relative flex flex-col items-center justify-center bg-background transition-bg',
        props.class,
      )
    "
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        :class="
          cn(
            'filter blur-[30px] pointer-events-none absolute -inset-[10px] opacity-40',
            '[--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--amber-200)_25%,var(--blue-400)_30%)]',
            '[background-image:var(--aurora)] [background-size:200%] [background-position:50%_50%]',
            'aurora-background-gradient-after',
            'aurora-gradient-animation',
            props.radialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_20%,var(--transparent)_70%)]`,
          )
        "
      ></div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  radialGradient?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<AuroraBackgroundProps>(), {
  radialGradient: true,
});
</script>

<style scoped>
.aurora-background-gradient-after {
  @apply after:content-[""] 
          after:absolute 
          after:inset-0 
          after:[background-image:var(--aurora)]
          after:[background-size:200%]
          after:[background-attachment:fixed] 
          after:opacity-40;
}

.aurora-gradient-animation,
.aurora-gradient-animation::after {
  animation: animate-aurora 30s linear infinite;
}

@keyframes animate-aurora {
  0% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 350% 50%;
  }
}
</style>