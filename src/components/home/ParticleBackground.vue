<template>
    <div class="content--canvas"></div>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount } from 'vue'
  import { createNoise3D } from 'simplex-noise'
  import { TAU, rand, randRange, fadeInOut, lerp, cos, sin } from '../../components/utils/mathUtils'
  
  // Constants
  const CONSTANTS = {
    particleCount: window.innerWidth < 768 ? 700 : 1400,
    particlePropCount: 9,
    particlePropsLength: 1400 * 9,
    rangeY: window.innerWidth < 768 ? 150 : 100,
    baseTTL: 50,
    rangeTTL: 150,
    baseSpeed: window.innerWidth < 768 ? 0.2 : 0.1,
    rangeSpeed: window.innerWidth < 768 ? 2.5 : 2,
    baseRadius: window.innerWidth < 768 ? 1.5 : 1,
    rangeRadius: window.innerWidth < 768 ? 3.5 : 4,
    baseHue: 220,      // Blue-ish base color
    rangeHue: 100,     // Color variation range
    lightModeHue: 220, // Blue for light mode
    darkModeHue: 220,  // Blue for dark mode
    noiseSteps: 8,
    xOff: 0.00125,
    yOff: 0.00125,
    zOff: 0.0005,
    backgroundColor: 'rgb(255 255 255)', // Light mode: white
    darkBackgroundColor: 'rgb(0 0 0)', // Dark mode: black
  }
  
  // State variables
  let container
  let canvas
  let ctx
  let center
  let gradient
  let tick
  let simplex
  let particleProps
  let animationFrameId = null
  
  // Core functions
  function createCanvas() {
    container = document.querySelector('.content--canvas')
    canvas = {
      a: document.createElement('canvas'),
      b: document.createElement('canvas')
    }
    canvas.b.style = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `
    container.appendChild(canvas.b)
    ctx = {
      a: canvas.a.getContext('2d'),
      b: canvas.b.getContext('2d')
    }
    center = []
  }
  
  function resize() {
    const { innerWidth, innerHeight } = window
    
    // Only update canvas dimensions
    canvas.a.width = innerWidth
    canvas.a.height = innerHeight
    canvas.b.width = innerWidth
    canvas.b.height = innerHeight
    
    // Update center position
    center[0] = 0.5 * canvas.a.width
    center[1] = 0.5 * canvas.a.height
    
    // Preserve existing particles instead of reinitializing
    // Remove this line: initParticles()
  }
  
  function initParticles() {
    tick = 0
    simplex = { noise3D: createNoise3D() }
    particleProps = new Float32Array(CONSTANTS.particlePropsLength)

    let i
    
    for (i = 0; i < CONSTANTS.particlePropsLength; i += CONSTANTS.particlePropCount) {
      initParticle(i)
    }
  }
  
  function initParticle(i) {
    let x, y, vx, vy, life, ttl, speed, radius, hue

    x = rand(canvas.a.width)
    y = center[1] + randRange(CONSTANTS.rangeY)
    vx = 0
    vy = 0
    life = 0
    ttl = CONSTANTS.baseTTL + rand(CONSTANTS.rangeTTL)
    speed = CONSTANTS.baseSpeed + rand(CONSTANTS.rangeSpeed)
    radius = CONSTANTS.baseRadius + rand(CONSTANTS.rangeRadius)
    hue = CONSTANTS.baseHue + rand(CONSTANTS.rangeHue)

    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i)
  }
  
  function drawParticles() {
    let i

    for (i = 0; i < CONSTANTS.particlePropsLength; i += CONSTANTS.particlePropCount) {
      updateParticle(i)
    }
  }
  
  function updateParticle(i) {
    let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i, i9=8+i
    let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue

    x = particleProps[i]
    y = particleProps[i2]
    n = simplex.noise3D(x * CONSTANTS.xOff, y * CONSTANTS.yOff, tick * CONSTANTS.zOff) * CONSTANTS.noiseSteps * TAU
    vx = lerp(particleProps[i3], cos(n), 0.5)
    vy = lerp(particleProps[i4], sin(n), 0.5)
    life = particleProps[i5]
    ttl = particleProps[i6]
    speed = particleProps[i7]
    x2 = x + vx * speed
    y2 = y + vy * speed
    radius = particleProps[i8]
    hue = particleProps[i9]

    drawParticle(x, y, x2, y2, life, ttl, radius, hue)

    life++

    particleProps[i] = x2
    particleProps[i2] = y2
    particleProps[i3] = vx
    particleProps[i4] = vy
    particleProps[i5] = life

    checkBounds(x, y) || life > ttl && initParticle(i)
  }
  
  function drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
    ctx.a.save()
    ctx.a.lineCap = 'round'
    ctx.a.lineWidth = radius
    
    const isDark = document.documentElement.classList.contains('dark')
    // Use HSL for dark mode, silver RGB for light mode
    const strokeColor = isDark 
      ? `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`
      : `rgba(192,192,192,${fadeInOut(life, ttl)})` // Silver color (rgb(192,192,192))
    
    ctx.a.strokeStyle = strokeColor
    ctx.a.beginPath()
    ctx.a.moveTo(x, y)
    ctx.a.lineTo(x2, y2)
    ctx.a.stroke()
    ctx.a.closePath()
    ctx.a.restore()
  }
  
  function checkBounds(x, y) {
    return (
      x > canvas.a.width ||
      x < 0 ||
      y > canvas.a.height ||
      y < 0
    )
  }
  
  function renderGlow() {
    const isDark = document.documentElement.classList.contains('dark')
    const brightness = isDark ? '400%' : '180%' // Slightly increased brightness for silver
    
    ctx.b.save()
    ctx.b.globalCompositeOperation = 'source-over'
    ctx.b.filter = `blur(${window.innerWidth < 768 ? '6px' : '8px'}) brightness(${brightness})`
    ctx.b.drawImage(canvas.a, 0, 0)
    ctx.b.restore()

    ctx.b.save()
    ctx.b.globalCompositeOperation = 'source-over'
    ctx.b.filter = `blur(${window.innerWidth < 768 ? '3px' : '4px'}) brightness(${brightness})`
    ctx.b.drawImage(canvas.a, 0, 0)
    ctx.b.restore()
  }
  
  function renderToScreen() {
    ctx.b.save()
    ctx.b.globalCompositeOperation = 'lighter'
    ctx.b.drawImage(canvas.a, 0, 0)
    ctx.b.restore()
  }
  
  function getCurrentBackgroundColor() {
    return document.documentElement.classList.contains('dark') 
      ? CONSTANTS.darkBackgroundColor 
      : CONSTANTS.backgroundColor
  }
  
  function draw() {
    tick++

    // Clear both canvases
    ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height)
    ctx.b.clearRect(0, 0, canvas.a.width, canvas.a.height)

    // Draw background first
    ctx.b.fillStyle = getCurrentBackgroundColor()
    ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height)

    // Draw particles on canvas A
    drawParticles()

    // Render with glow effect
    renderGlow()

    // Final composite to screen
    ctx.b.save()
    ctx.b.globalCompositeOperation = 'source-over'
    ctx.b.drawImage(canvas.a, 0, 0)
    ctx.b.restore()

    animationFrameId = window.requestAnimationFrame(draw)
  }
  
  function setup() {
    createCanvas()
    resize()
    initParticles()
    draw()
  }
  
  // Simplify touch handling since we're using pointer-events: none
  function handleTouch(e) {
    // Remove preventDefault since we're using passive listeners
    // and pointer-events: none in CSS
  }
  
  // Add debounced resize handler
  let resizeTimeout
  function debouncedResize() {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }
    resizeTimeout = setTimeout(() => {
      resize()
    }, 250)
  }
  
  // Lifecycle hooks
  onMounted(() => {
    setup()
    window.addEventListener('resize', debouncedResize)
    
    // Touch listeners are already passive and we don't need to prevent default
    document.addEventListener('touchmove', handleTouch, { passive: true })
    document.addEventListener('touchstart', handleTouch, { passive: true })
    document.addEventListener('scroll', () => {}, { passive: true })
  })
  
  onBeforeUnmount(() => {
    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId)
    }
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
    }
    window.removeEventListener('resize', debouncedResize)
    document.removeEventListener('touchmove', handleTouch)
    document.removeEventListener('touchstart', handleTouch)
  })
  </script>
  
  <style scoped>
  .content--canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    touch-action: none;
    pointer-events: none;
  }
  </style>