import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ─── Setup ───
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0d1f15, 0.025)

    const camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 100)
    camera.position.set(0, 3, 10)
    camera.lookAt(0, 1, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0d1f15)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.9
    container.appendChild(renderer.domElement)

    // ─── Lights ───
    const ambientLight = new THREE.AmbientLight(0x1a2f23, 2.5)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xc8a96e, 2)
    dirLight.position.set(5, 10, 5)
    scene.add(dirLight)

    const pointLight1 = new THREE.PointLight(0xc8a96e, 4, 25)
    pointLight1.position.set(-4, 5, 2)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x8faa7b, 3, 25)
    pointLight2.position.set(4, 3, -2)
    scene.add(pointLight2)

    // Warm spotlight from below (like construction site lighting)
    const spotLight = new THREE.SpotLight(0xc8a96e, 2, 30, Math.PI / 6, 0.5)
    spotLight.position.set(0, -1, 5)
    spotLight.target.position.set(0, 5, 0)
    scene.add(spotLight)
    scene.add(spotLight.target)

    // ─── Terrain mesh ───
    const terrainGeo = new THREE.PlaneGeometry(40, 40, 100, 100)
    terrainGeo.rotateX(-Math.PI / 2)

    const terrainPos = terrainGeo.attributes.position
    const terrainHeights: number[] = []
    for (let i = 0; i < terrainPos.count; i++) {
      const x = terrainPos.getX(i)
      const z = terrainPos.getZ(i)
      const h =
        Math.sin(x * 0.2) * Math.cos(z * 0.2) * 0.8 +
        Math.sin(x * 0.5 + 1) * Math.cos(z * 0.4) * 0.3
      terrainPos.setY(i, h)
      terrainHeights.push(h)
    }
    terrainGeo.computeVertexNormals()

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x1a2f23,
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
    })
    const terrain = new THREE.Mesh(terrainGeo, terrainMat)
    terrain.position.y = -2
    scene.add(terrain)

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xc8a96e, wireframe: true, transparent: true, opacity: 0.025 })
    const wireframe = new THREE.Mesh(terrainGeo.clone(), wireMat)
    wireframe.position.y = -1.97
    scene.add(wireframe)

    // ─── CONSTRUCTION ELEMENTS ───

    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xc8a96e, transparent: true, opacity: 0.25 })
    const edgeMaterialDim = new THREE.LineBasicMaterial({ color: 0xc8a96e, transparent: true, opacity: 0.1 })
    const solidMat = new THREE.MeshStandardMaterial({ color: 0x1a2f23, roughness: 0.7, metalness: 0.3, transparent: true, opacity: 0.6 })
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x8faa7b, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.15 })

    // ── Building 1: Main house wireframe (left) ──
    const building1Group = new THREE.Group()

    // Base structure
    const baseGeo = new THREE.BoxGeometry(2.5, 3, 2)
    const baseMesh = new THREE.Mesh(baseGeo, solidMat)
    baseMesh.position.set(0, 1.5, 0)
    building1Group.add(baseMesh)

    const baseEdges = new THREE.EdgesGeometry(baseGeo)
    const baseLines = new THREE.LineSegments(baseEdges, edgeMaterial)
    baseLines.position.copy(baseMesh.position)
    building1Group.add(baseLines)

    // Roof (pitched)
    const roofGeo = new THREE.ConeGeometry(2, 1.2, 4)
    roofGeo.rotateY(Math.PI / 4)
    const roofMesh = new THREE.Mesh(roofGeo, solidMat)
    roofMesh.position.set(0, 3.6, 0)
    building1Group.add(roofMesh)

    const roofEdges = new THREE.EdgesGeometry(roofGeo)
    const roofLines = new THREE.LineSegments(roofEdges, edgeMaterial)
    roofLines.position.copy(roofMesh.position)
    building1Group.add(roofLines)

    // Windows (glass panels)
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 2; col++) {
        const windowGeo = new THREE.PlaneGeometry(0.5, 0.7)
        const windowMesh = new THREE.Mesh(windowGeo, glassMat)
        windowMesh.position.set(-0.5 + col * 1, 1 + row * 1.3, 1.01)
        building1Group.add(windowMesh)
      }
    }

    building1Group.position.set(-4, -2, -2)
    scene.add(building1Group)

    // ── Building 2: Modern structure (right) ──
    const building2Group = new THREE.Group()

    // L-shaped modern home
    const block1Geo = new THREE.BoxGeometry(2, 4, 1.8)
    const block1Mesh = new THREE.Mesh(block1Geo, solidMat)
    block1Mesh.position.set(0, 2, 0)
    building2Group.add(block1Mesh)
    const block1Edges = new THREE.EdgesGeometry(block1Geo)
    building2Group.add(new THREE.LineSegments(block1Edges, edgeMaterial).translateX(0).translateY(2))

    const block2Geo = new THREE.BoxGeometry(1.5, 2.5, 2.5)
    const block2Mesh = new THREE.Mesh(block2Geo, solidMat)
    block2Mesh.position.set(1.5, 1.25, 0.35)
    building2Group.add(block2Mesh)
    const block2Edges = new THREE.EdgesGeometry(block2Geo)
    const b2Lines = new THREE.LineSegments(block2Edges, edgeMaterial)
    b2Lines.position.copy(block2Mesh.position)
    building2Group.add(b2Lines)

    // Large glass facade
    const facadeGeo = new THREE.PlaneGeometry(1.8, 3.5)
    const facadeMesh = new THREE.Mesh(facadeGeo, glassMat)
    facadeMesh.position.set(0, 2, 0.91)
    building2Group.add(facadeMesh)

    // Flat green roof
    const greenRoofGeo = new THREE.BoxGeometry(2.2, 0.15, 2)
    const greenRoofMat = new THREE.MeshStandardMaterial({ color: 0x8faa7b, roughness: 0.9, metalness: 0, transparent: true, opacity: 0.5 })
    const greenRoof = new THREE.Mesh(greenRoofGeo, greenRoofMat)
    greenRoof.position.set(0, 4.07, 0)
    building2Group.add(greenRoof)

    building2Group.position.set(4, -2, -3)
    building2Group.rotation.y = -0.2
    scene.add(building2Group)

    // ── Building 3: Farmhouse silhouette (far back) ──
    const building3Group = new THREE.Group()

    const barnGeo = new THREE.BoxGeometry(3, 2, 2.5)
    const barnMesh = new THREE.Mesh(barnGeo, solidMat.clone())
    ;(barnMesh.material as THREE.MeshStandardMaterial).opacity = 0.3
    barnMesh.position.set(0, 1, 0)
    building3Group.add(barnMesh)
    const barnEdges = new THREE.EdgesGeometry(barnGeo)
    building3Group.add(new THREE.LineSegments(barnEdges, edgeMaterialDim).translateY(1))

    // Barn roof
    const barnRoofGeo = new THREE.CylinderGeometry(0, 2.2, 1.5, 4, 1)
    barnRoofGeo.rotateY(Math.PI / 4)
    const barnRoofMesh = new THREE.Mesh(barnRoofGeo, solidMat.clone())
    ;(barnRoofMesh.material as THREE.MeshStandardMaterial).opacity = 0.25
    barnRoofMesh.position.set(0, 2.75, 0)
    building3Group.add(barnRoofMesh)
    const barnRoofEdges = new THREE.EdgesGeometry(barnRoofGeo)
    building3Group.add(new THREE.LineSegments(barnRoofEdges, edgeMaterialDim).translateY(2.75))

    building3Group.position.set(0, -2, -8)
    scene.add(building3Group)

    // ── Crane ──
    const craneGroup = new THREE.Group()
    const craneMat = new THREE.LineBasicMaterial({ color: 0xc8a96e, transparent: true, opacity: 0.15 })

    // Vertical mast
    const mastPoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 8, 0)]
    const mastGeo = new THREE.BufferGeometry().setFromPoints(mastPoints)
    craneGroup.add(new THREE.Line(mastGeo, craneMat))

    // Horizontal jib
    const jibPoints = [new THREE.Vector3(-1, 8, 0), new THREE.Vector3(5, 8, 0)]
    const jibGeo = new THREE.BufferGeometry().setFromPoints(jibPoints)
    craneGroup.add(new THREE.Line(jibGeo, craneMat))

    // Counter jib
    const counterJibPoints = [new THREE.Vector3(0, 8, 0), new THREE.Vector3(-2.5, 8, 0)]
    const counterJibGeo = new THREE.BufferGeometry().setFromPoints(counterJibPoints)
    craneGroup.add(new THREE.Line(counterJibGeo, craneMat))

    // Support cables
    const cable1Points = [new THREE.Vector3(0, 8.5, 0), new THREE.Vector3(5, 8, 0)]
    craneGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(cable1Points), craneMat))
    const cable2Points = [new THREE.Vector3(0, 8.5, 0), new THREE.Vector3(-2.5, 8, 0)]
    craneGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(cable2Points), craneMat))

    // Hanging cable
    const hangPoints = [new THREE.Vector3(3.5, 8, 0), new THREE.Vector3(3.5, 5, 0)]
    craneGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(hangPoints), craneMat))

    // Cross bracing on mast
    for (let i = 0; i < 4; i++) {
      const y1 = i * 2
      const y2 = (i + 1) * 2
      const brace1 = [new THREE.Vector3(-0.15, y1, 0), new THREE.Vector3(0.15, y2, 0)]
      const brace2 = [new THREE.Vector3(0.15, y1, 0), new THREE.Vector3(-0.15, y2, 0)]
      craneGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(brace1), craneMat))
      craneGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(brace2), craneMat))
    }

    craneGroup.position.set(7, -2, -5)
    scene.add(craneGroup)

    // ── Blueprint grid on ground ──
    const gridHelper = new THREE.GridHelper(20, 40, 0xc8a96e, 0xc8a96e)
    gridHelper.position.y = -1.95
    ;(gridHelper.material as THREE.Material).transparent = true
    ;(gridHelper.material as THREE.Material).opacity = 0.03
    scene.add(gridHelper)

    // ─── Floating particles (like construction dust / fireflies) ───
    const particleCount = 150
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSpeeds = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 25
      particlePositions[i * 3 + 1] = Math.random() * 10 - 1
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 25
      particleSpeeds[i] = 0.003 + Math.random() * 0.012
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0xc8a96e,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)

    // ─── Glowing orbs (like site beacons) ───
    const orbData: { mesh: THREE.Mesh; phase: number; speed: number; radius: number }[] = []
    for (let i = 0; i < 3; i++) {
      const orbGeo = new THREE.SphereGeometry(0.08, 12, 12)
      const orbMat = new THREE.MeshBasicMaterial({ color: i === 0 ? 0xc8a96e : 0x8faa7b, transparent: true, opacity: 0.3 })
      const orb = new THREE.Mesh(orbGeo, orbMat)
      scene.add(orb)
      orbData.push({ mesh: orb, phase: Math.random() * Math.PI * 2, speed: 0.15 + Math.random() * 0.2, radius: 2 + Math.random() * 3 })
    }

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

      // Smooth mouse
      mouseX += (targetMouseX - mouseX) * 0.02
      mouseY += (targetMouseY - mouseY) * 0.02

      // Camera
      camera.position.x = mouseX * 1
      camera.position.y = 3 + mouseY * -0.4
      camera.lookAt(0, 1, 0)

      // Terrain wave
      const tPos = terrain.geometry.attributes.position
      for (let i = 0; i < tPos.count; i++) {
        const x = tPos.getX(i)
        const z = tPos.getZ(i)
        const wave = Math.sin(x * 0.4 + elapsed * 0.25) * Math.cos(z * 0.4 + elapsed * 0.2) * 0.1
        tPos.setY(i, terrainHeights[i] + wave)
      }
      tPos.needsUpdate = true
      terrain.geometry.computeVertexNormals()

      // Buildings gentle sway
      building1Group.rotation.y = Math.sin(elapsed * 0.15) * 0.02
      building2Group.rotation.y = -0.2 + Math.sin(elapsed * 0.12 + 1) * 0.015

      // Crane slow rotation
      craneGroup.rotation.y = Math.sin(elapsed * 0.08) * 0.3

      // Particles
      const pPos = particleSystem.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        pPos[i * 3 + 1] += particleSpeeds[i]
        pPos[i * 3] += Math.sin(elapsed * 0.5 + i) * 0.001

        if (pPos[i * 3 + 1] > 10) {
          pPos[i * 3 + 1] = -1
          pPos[i * 3] = (Math.random() - 0.5) * 25
          pPos[i * 3 + 2] = (Math.random() - 0.5) * 25
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true

      // Orbs
      orbData.forEach(d => {
        d.mesh.position.x = Math.sin(elapsed * d.speed + d.phase) * d.radius
        d.mesh.position.y = 2 + Math.sin(elapsed * d.speed * 0.6 + d.phase) * 2
        d.mesh.position.z = Math.cos(elapsed * d.speed * 0.4 + d.phase) * d.radius
      })

      // Lights orbit
      pointLight1.position.x = Math.sin(elapsed * 0.2) * 6
      pointLight1.position.z = Math.cos(elapsed * 0.2) * 4
      pointLight2.position.x = Math.cos(elapsed * 0.15) * 5
      pointLight2.position.z = Math.sin(elapsed * 0.15) * 5

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
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}
