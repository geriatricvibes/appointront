<template>
    <div
      ref="tracingBeamRef"
      :class="cn('relative w-full max-w-4xl mx-auto h-full', $props.class)"
    >
      <div class="absolute -left-4 md:-left-12 top-16 md:top-20">
        <div
          :style="{
            boxShadow: scrollYProgress > 0 ? 'none' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }"
          class="border-netural-200 ml-[27px] flex size-4 items-center justify-center rounded-full border shadow-sm"
        >
          <div
            :style="{
              backgroundColor: scrollYProgress > 0 ? 'white' : 'var(--emerald-500)',
              borderColor: scrollYProgress > 0 ? 'white' : 'var(--emerald-600)',
            }"
            class="size-2 rounded-full border border-neutral-300 bg-white"
          />
        </div>
        <svg
          :viewBox="`0 0 20 ${svgHeight}`"
          width="20"
          :height="svgHeight"
          class="ml-4 block"
          aria-hidden="true"
        >
          <path
            :d="`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`"
            fill="none"
            stroke="#9091A0"
            stroke-opacity="0.16"
          ></path>
          <path
            :d="`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`"
            fill="none"
            stroke="url(#gradient)"
            stroke-width="1.25"
            class="motion-reduce:hidden"
          ></path>
          <defs>
            <linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              :y1="springY1"
              :y2="springY2"
            >
              <stop stop-color="#18CCFC" stop-opacity="0"></stop>
              <stop stop-color="#18CCFC"></stop>
              <stop offset="0.325" stop-color="#6344F5"></stop>
              <stop
                offset="1"
                stop-color="#AE48FF"
                stop-opacity="0"
              ></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div ref="tracingBeamContentRef">
        <slot />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import {ref, onMounted, onUnmounted} from 'vue';
  import { cn } from "@/lib/utils";
  
  defineProps({
    class: String,
  });
  
  const tracingBeamRef = ref<HTMLDivElement>();
  const tracingBeamContentRef = ref<HTMLDivElement>();
  
  const scrollYProgress = ref(0);
  const svgHeight = ref(0);
  const scrollPercentage = ref(0);
  
  // Spring animation values
  const springY1 = ref(0);
  const springY2 = ref(0);
  const springVelocityY1 = ref(0);
  const springVelocityY2 = ref(0);
  
  const tension = 80;
  const friction = 26;
  const precision = 0.01;
  
  function animate() {
    const targetY1 = mapRange(scrollYProgress.value, 0, 0.8, scrollYProgress.value, svgHeight.value) *
      (1.4 - scrollPercentage.value);
    const targetY2 = mapRange(scrollYProgress.value, 0, 1, scrollYProgress.value, svgHeight.value - 500) *
      (1.4 - scrollPercentage.value);
  
    // Spring physics calculation
    const forceY1 = tension * (targetY1 - springY1.value);
    const forceY2 = tension * (targetY2 - springY2.value);
    
    springVelocityY1.value += forceY1;
    springVelocityY2.value += forceY2;
    
    springVelocityY1.value *= (1 - friction / 100);
    springVelocityY2.value *= (1 - friction / 100);
    
    springY1.value += springVelocityY1.value;
    springY2.value += springVelocityY2.value;
  
    if (Math.abs(springVelocityY1.value) > precision || Math.abs(springVelocityY2.value) > precision) {
      requestAnimationFrame(animate);
    }
  }
  
  function updateScrollYProgress() {
    if (tracingBeamRef.value) {
      const boundingRect = tracingBeamRef.value.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = boundingRect.height;
  
      scrollPercentage.value = (windowHeight - boundingRect.top) / (windowHeight + elementHeight);
      scrollYProgress.value = (boundingRect.y / windowHeight) * -1;
      
      requestAnimationFrame(animate);
    }
  }
  
  onMounted(() => {
    window.addEventListener("scroll", updateScrollYProgress);
    window.addEventListener("resize", updateScrollYProgress);
    updateScrollYProgress();
  
    const resizeObserver = new ResizeObserver(function () {
      updateSVGHeight();
    });
  
    resizeObserver.observe(tracingBeamContentRef.value!);
  
    updateSVGHeight();
  });
  
  onUnmounted(() => {
    tracingBeamRef.value?.removeEventListener("scroll", updateScrollYProgress);
    window.removeEventListener("resize", updateScrollYProgress);
  });
  
  function updateSVGHeight() {
    if (!tracingBeamContentRef.value) return;
  
    svgHeight.value = tracingBeamContentRef.value.offsetHeight;
  }
  
  function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
  </script>