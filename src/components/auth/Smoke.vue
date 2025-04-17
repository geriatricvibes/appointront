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
    antialias: true,
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

  // Enhanced lighting setup
  light = new THREE.DirectionalLight(0xffffff, 1.5)
  light.position.set(-1, 1, 1)
  scene.add(light)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  // Add subtle point lights for more dimension
  const pointLight1 = new THREE.PointLight(0x3b82f6, 0.8, 1000)
  pointLight1.position.set(300, 300, 200)
  scene.add(pointLight1)

  const pointLight2 = new THREE.PointLight(0x818cf8, 0.6, 1000)
  pointLight2.position.set(-300, -200, 400)
  scene.add(pointLight2)

  const smokeTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png')
  smokeTexture.minFilter = THREE.LinearFilter
  
  // Create a more modern gradient color scheme
  const isDark = isDarkMode()
  const baseColor = isDark ? 0x2563eb : 0xdbeafe // Blue shades
  const accentColor = isDark ? 0x7c3aed : 0xc7d2fe // Purple accent shades
  
  const smokeMaterial = new THREE.MeshLambertMaterial({
    color: baseColor,
    map: smokeTexture,
    transparent: true,
    opacity: isDark ? 0.35 : 0.2,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  // Determine particle count based on performance
  const isMobile = window.innerWidth < 768
  const isLowPerfDevice = window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4
  const particleCount = isMobile || isLowPerfDevice ? 35 : 70
  const particleSize = isMobile ? 220 : 320
  const smokeGeo = new THREE.PlaneGeometry(particleSize, particleSize)

  for (let p = 0; p < particleCount; p++) {
    const particle = new THREE.Mesh(smokeGeo, smokeMaterial.clone())
    
    // Create a more subtle color variation for a modern look
    const colorMix = Math.random()
    const particleColor = new THREE.Color(baseColor)
    particleColor.lerp(new THREE.Color(accentColor), colorMix * 0.7)
    particle.material.color = particleColor
    
    // Apply subtle random opacity variation
    particle.material.opacity = (isDark ? 0.25 : 0.15) + (Math.random() * 0.2)
    
    // Position particles in a more deliberate pattern
    const radius = 200 + Math.random() * (isMobile ? 600 : 900)
    const theta = Math.random() * Math.PI * 2
    const phi = (Math.random() * 0.8 + 0.1) * Math.PI // More concentrated around horizontal plane
    
    particle.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi) - 300 // Push particles back a bit
    )
    
    particle.rotation.z = Math.random() * Math.PI * 2
    particle.scale.set(0.8 + Math.random() * 0.6, 0.8 + Math.random() * 0.6, 1)
    
    scene.add(particle)
    smokeParticles.push({
      mesh: particle,
      speed: 0.2 + Math.random() * 0.3, // Variable speeds
      direction: new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        0
      )
    })
  }

  document.getElementById('smoke-container').appendChild(renderer.domElement)
}

let frameCount = 0
let lastTime = performance.now()
let fpsThrottled = false

function checkPerformance() {
  frameCount++
  const currentTime = performance.now()
  
  if (currentTime - lastTime >= 1000) {
    const fps = frameCount
    frameCount = 0
    lastTime = currentTime
    
    // Manage performance more aggressively
    if (fps < 30 && !fpsThrottled && smokeParticles.length > 15) {
      fpsThrottled = true
      const particlesToRemove = Math.min(smokeParticles.length - 15, Math.ceil(smokeParticles.length * 0.3))
      
      for (let i = 0; i < particlesToRemove; i++) {
        const particle = smokeParticles.pop()
        scene.remove(particle.mesh)
        particle.mesh.geometry.dispose()
        particle.mesh.material.dispose()
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
  // More fluid and natural smoke movement
  for (let i = 0; i < smokeParticles.length; i++) {
    const particle = smokeParticles[i]
    const mesh = particle.mesh
    
    // Smoother rotation
    mesh.rotation.z += delta * particle.speed * 0.3
    
    // More natural movement with sine wave patterns
    const time = Date.now() * 0.001
    const waveX = Math.sin(time * 0.3 + i * 0.1) * delta * 3
    const waveY = Math.cos(time * 0.5 + i * 0.05) * delta * 3
    
    mesh.position.x += (particle.direction.x + waveX) * (mesh.position.y * 0.01)
    mesh.position.y += (particle.direction.y + waveY) * (mesh.position.x * 0.01)
    
    // Subtle breathing effect with scale
    const breatheFactor = 1 + Math.sin(time * 0.5 + i) * 0.02
    mesh.scale.set(mesh.scale.x * breatheFactor, mesh.scale.y * breatheFactor, 1)
    
    // Boundary checks with smoother reset
    const boundary = window.innerWidth < 768 ? 500 : 800
    if (Math.abs(mesh.position.y) > boundary) {
      mesh.position.y *= -0.95
      particle.direction.y *= -0.5
    }
    if (Math.abs(mesh.position.x) > boundary) {
      mesh.position.x *= -0.95
      particle.direction.x *= -0.5
    }
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>

<template>
  <div id="smoke-container" class="fixed inset-0 w-full h-full opacity-95 dark:opacity-80 z-0" />
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