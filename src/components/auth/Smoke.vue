<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

let camera, scene, renderer, light, clock
let smokeParticles = []
let delta

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', onWindowResize, false)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  if (renderer) {
    renderer.dispose()
  }
})

function isDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function init() {
  clock = new THREE.Clock()

  renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: window.innerWidth > 768,
    powerPreference: 'high-performance'
  })
  renderer.setClearColor(0x000000, 0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.0008)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.z = 1000
  scene.add(camera)

  light = new THREE.DirectionalLight(0xffffff, 1.2)
  light.position.set(-1, 1, 1)
  scene.add(light)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const smokeTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png')
  smokeTexture.minFilter = THREE.LinearFilter
  const smokeMaterial = new THREE.MeshLambertMaterial({
    color: new THREE.Color(`hsl(220, 70%, ${isDarkMode() ? '30%' : '80%'})`),
    map: smokeTexture,
    transparent: true,
    opacity: isDarkMode() ? 0.4 : 0.2,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  const particleCount = window.innerWidth < 768 ? 40 : 75
  const particleSize = window.innerWidth < 768 ? 200 : 300
  const smokeGeo = new THREE.PlaneGeometry(particleSize, particleSize)

  for (let p = 0; p < particleCount; p++) {
    const particle = new THREE.Mesh(smokeGeo, smokeMaterial.clone())
    const isDark = isDarkMode()
    
    const hue = isDark 
      ? 220 + Math.random() * 100  // Dark mode: blue to purple
      : 200 + Math.random() * 40   // Light mode: light blue range
    const saturation = isDark 
      ? 0.8 + Math.random() * 0.2  // Dark mode: highly saturated
      : 0.4 + Math.random() * 0.3  // Light mode: softer saturation
    const lightness = isDark 
      ? 0.2 + Math.random() * 0.2  // Dark mode: darker
      : 0.85 + Math.random() * 0.1 // Light mode: very light

    particle.material.color.setHSL(hue/360, saturation, lightness)
    
    const radius = Math.random() * (window.innerWidth < 768 ? 600 : 800)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    particle.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    )
    particle.rotation.z = Math.random() * Math.PI * 2
    scene.add(particle)
    smokeParticles.push(particle)
  }

  document.getElementById('smoke-container').appendChild(renderer.domElement)
}

let frameCount = 0
let lastTime = performance.now()

function checkPerformance() {
  frameCount++
  const currentTime = performance.now()
  
  if (currentTime - lastTime >= 1000) {
    const fps = frameCount
    frameCount = 0
    lastTime = currentTime
    
    if (fps < 30 && smokeParticles.length > 20) {
      const particlesToRemove = Math.min(10, smokeParticles.length - 20)
      for (let i = 0; i < particlesToRemove; i++) {
        const particle = smokeParticles.pop()
        scene.remove(particle)
        particle.geometry.dispose()
        particle.material.dispose()
      }
    }
  }
}

function animate() {
  delta = clock.getDelta()
  requestAnimationFrame(animate)
  evolveSmoke()
  renderer.render(scene, camera)
  checkPerformance()
}

function evolveSmoke() {
  let sp = smokeParticles.length
  while (sp--) {
    const particle = smokeParticles[sp]
    const speedFactor = window.innerWidth < 768 ? 0.15 : 0.2
    particle.rotation.z += (delta * speedFactor)
    
    const movementSpeed = window.innerWidth < 768 ? 6 : 10
    particle.position.y += delta * movementSpeed * (Math.cos(particle.position.x / 100))
    particle.position.x += delta * movementSpeed * (Math.sin(particle.position.y / 100))
    
    const boundary = window.innerWidth < 768 ? 400 : 600
    if (particle.position.y > boundary) particle.position.y = -boundary
    if (particle.position.x > boundary) particle.position.x = -boundary
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>

<template>
  <div id="smoke-container" class="fixed inset-0 w-full h-full opacity-90 dark:opacity-70" />
</template>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>