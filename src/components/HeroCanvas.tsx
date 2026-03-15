import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ─── Setup ───
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0d1f15, 0.035)

    const camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 100)
    camera.position.set(0, 2, 8)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0d1f15)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.8
    container.appendChild(renderer.domElement)

    // ─── Lights ───
    const ambientLight = new THREE.AmbientLight(0x1a2f23, 2)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xc8a96e, 1.5)
    dirLight.position.set(5, 8, 5)
    scene.add(dirLight)

    const pointLight1 = new THREE.PointLight(0xc8a96e, 3, 20)
    pointLight1.position.set(-4, 3, 2)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x8faa7b, 2, 20)
    pointLight2.position.set(4, 2, -2)
    scene.add(pointLight2)

    // ─── Terrain mesh ───
    const terrainGeo = new THREE.PlaneGeometry(30, 30, 128, 128)
    terrainGeo.rotateX(-Math.PI / 2)

    const positions = terrainGeo.attributes.position
    const terrainHeights: number[] = []
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const z = positions.getZ(i)
      const h =
        Math.sin(x * 0.3) * Math.cos(z * 0.3) * 1.2 +
        Math.sin(x * 0.7 + 1) * Math.cos(z * 0.5) * 0.6 +
        Math.sin(x * 1.5) * 0.15
      positions.setY(i, h)
      terrainHeights.push(h)
    }
    terrainGeo.computeVertexNormals()

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x1a2f23,
      roughness: 0.85,
      metalness: 0.1,
      wireframe: false,
      flatShading: true,
    })

    const terrain = new THREE.Mesh(terrainGeo, terrainMat)
    terrain.position.y = -2
    scene.add(terrain)

    // ─── Wireframe overlay ───
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc8a96e,
      wireframe: true,
      transparent: true,
      opacity: 0.03,
    })
    const wireframe = new THREE.Mesh(terrainGeo.clone(), wireMat)
    wireframe.position.y = -1.98
    scene.add(wireframe)

    // ─── Floating particles ───
    const particleCount = 200
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSpeeds = new Float32Array(particleCount)
    const particleSizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20
      particlePositions[i * 3 + 1] = Math.random() * 8 - 1
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20
      particleSpeeds[i] = 0.005 + Math.random() * 0.015
      particleSizes[i] = 0.02 + Math.random() * 0.06
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeo.setAttribute('aSize', new THREE.BufferAttribute(particleSizes, 1))

    const particleMat = new THREE.PointsMaterial({
      color: 0xc8a96e,
      size: 0.06,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)

    // ─── Glowing orbs ───
    const orbGroup = new THREE.Group()
    const orbData: { mesh: THREE.Mesh; phase: number; speed: number; radius: number }[] = []

    for (let i = 0; i < 4; i++) {
      const orbGeo = new THREE.SphereGeometry(0.15 + Math.random() * 0.2, 16, 16)
      const orbMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xc8a96e : 0x8faa7b,
        transparent: true,
        opacity: 0.15,
      })
      const orb = new THREE.Mesh(orbGeo, orbMat)
      orbGroup.add(orb)
      orbData.push({
        mesh: orb,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3,
        radius: 2 + Math.random() * 3,
      })
    }
    scene.add(orbGroup)

    // ─── Mouse tracking ───
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const handleMouse = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    // ─── Animate ───
    const clock = new THREE.Clock()

    function animate() {
      const elapsed = clock.getElapsedTime()

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.03
      mouseY += (targetMouseY - mouseY) * 0.03

      // Camera subtle movement
      camera.position.x = mouseX * 0.8
      camera.position.y = 2 + mouseY * -0.3
      camera.lookAt(0, 0.5, 0)

      // Animate terrain
      const terrainPositions = terrain.geometry.attributes.position
      for (let i = 0; i < terrainPositions.count; i++) {
        const x = terrainPositions.getX(i)
        const z = terrainPositions.getZ(i)
        const baseH = terrainHeights[i]
        const wave = Math.sin(x * 0.5 + elapsed * 0.3) * Math.cos(z * 0.5 + elapsed * 0.2) * 0.15
        terrainPositions.setY(i, baseH + wave)
      }
      terrainPositions.needsUpdate = true
      terrain.geometry.computeVertexNormals()

      // Animate particles
      const pPositions = particleSystem.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3 + 1] += particleSpeeds[i]
        pPositions[i * 3] += Math.sin(elapsed + i) * 0.002

        // Reset when too high
        if (pPositions[i * 3 + 1] > 8) {
          pPositions[i * 3 + 1] = -1
          pPositions[i * 3] = (Math.random() - 0.5) * 20
          pPositions[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true

      // Animate orbs
      orbData.forEach((data) => {
        data.mesh.position.x = Math.sin(elapsed * data.speed + data.phase) * data.radius
        data.mesh.position.y = 1 + Math.sin(elapsed * data.speed * 0.7 + data.phase) * 1.5
        data.mesh.position.z = Math.cos(elapsed * data.speed * 0.5 + data.phase) * data.radius
      })

      // Animate lights
      pointLight1.position.x = Math.sin(elapsed * 0.3) * 5
      pointLight1.position.z = Math.cos(elapsed * 0.3) * 3
      pointLight2.position.x = Math.cos(elapsed * 0.2) * 4
      pointLight2.position.z = Math.sin(elapsed * 0.2) * 4

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // ─── Resize ───
    const handleResize = () => {
      const w = container.offsetWidth
      const h = container.offsetHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouse)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouse)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}
