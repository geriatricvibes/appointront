<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from "@/lib/utils"
</script>

<template>
  <section class="relative py-4 md:py-6">
    <Card class="container relative mx-auto max-w-4xl border-none bg-card/60 backdrop-blur-sm shadow-none">
      <CardContent class="text-center space-y-4 border-none py-4">
        <!-- Discord Logo -->
        <img 
          src="/discord-mark-white.svg" 
          alt="Discord Logo" 
          class="mx-auto h-8 w-8 dark:brightness-100 brightness-0"
        />

        <!-- Title and Description -->
        <div class="space-y-2">
          <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-foreground">
            Discord™
          </h2>
          <p class="mx-auto max-w-[600px] text-muted-foreground text-sm md:text-base">
            Connect, create, and chat with other users and us.
          </p>
        </div>

        <!-- Enhanced Discord Button -->
        <a 
          href="https://discord.gg/V5DK6HCukC"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block"
        >
          <button
            ref="buttonRef"
            class="group relative w-56 cursor-pointer overflow-hidden rounded-full border border-foreground/20 bg-transparent p-3 text-center font-semibold"
          >
            <span
              class="inline-flex items-center gap-2 translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-foreground"
            >
              <img 
                src="/discord-mark-white.svg" 
                alt="Discord" 
                class="h-4 w-4 dark:brightness-100 brightness-0"
              />
              Join Discord
            </span>

            <div
              class="absolute top-0 z-10 flex size-full translate-x-12 items-center justify-center gap-2 text-background opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100"
            >
              <span>Join Discord</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-arrow-right"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <div
              class="absolute left-[18%] top-[40%] size-2 scale-100 rounded-lg bg-foreground transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:size-full group-hover:scale-[1.8]"
            ></div>
          </button>
        </a>
      </CardContent>
    </Card>
  </section>

</template>

<style scoped>
/* Add if needed to override any default card styles */
:deep(.card) {
  border-bottom: none;
  box-shadow: none;
}
</style>

