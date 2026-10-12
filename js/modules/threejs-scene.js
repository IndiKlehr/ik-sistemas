/* ============================================================
   IK SISTEMAS — ESCENA 3D DEL LOGO IK (THREE.js)
   Se inicializa automáticamente si existe #threejs-container
   ============================================================ */

(function () {
  const container = document.getElementById('threejs-container');
  if (!container) return;

  // ---- Setup base ----
  const width  = container.clientWidth  || 480;
  const height = container.clientHeight || 460;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 11.5);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  // ---- Luces ----
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));

  const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
  dirLight.position.set(5, 8, 8);
  scene.add(dirLight);

  const goldLight1 = new THREE.PointLight(0xf59e0b, 4.5, 30);
  goldLight1.position.set(-6, -2, 7);
  scene.add(goldLight1);

  const goldLight2 = new THREE.PointLight(0xd97706, 3.2, 25);
  goldLight2.position.set(6, 4, 5);
  scene.add(goldLight2);

  const cyanLight = new THREE.PointLight(0x06b6d4, 2.5, 20);
  cyanLight.position.set(0, -6, 6);
  scene.add(cyanLight);

  // ---- Grupo maestro ----
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // ---- Materiales ----
  const navyLetterMat = new THREE.MeshPhongMaterial({
    color: 0x0c214d, emissive: 0x050f24, specular: 0x60a5fa, shininess: 90,
  });
  const goldBorderMat = new THREE.MeshPhongMaterial({
    color: 0xf59e0b, emissive: 0x92400e, specular: 0xffffff, shininess: 100,
  });
  const circuitMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
  const nodeMat = new THREE.MeshPhongMaterial({
    color: 0xfbbf24, emissive: 0xb45309, specular: 0xffffff, shininess: 100,
  });
  const cyanGlowMat = new THREE.MeshPhongMaterial({
    color: 0x38bdf8, emissive: 0x0284c7, specular: 0xffffff, shininess: 100,
  });

  // ---- 1. Monograma "IK" ----
  const logoGroup = new THREE.Group();
  mainGroup.add(logoGroup);

  function createLogoBlock(w, h, d, x, y, rotZ) {
    rotZ = rotZ || 0;
    const group = new THREE.Group();
    const geom = new THREE.BoxGeometry(w, h, d);
    group.add(new THREE.Mesh(geom, navyLetterMat));

    const edges = new THREE.EdgesGeometry(geom);
    group.add(new THREE.LineSegments(edges,
      new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 })));

    group.position.set(x, y, 0);
    group.rotation.z = rotZ;
    return group;
  }

  // Letra I
  logoGroup.add(createLogoBlock(0.85, 1.1, 0.85, -2.1,  1.7,  0.12));
  logoGroup.add(createLogoBlock(0.95, 3.4, 0.85, -2.1, -0.65, 0));
  // Letra K
  logoGroup.add(createLogoBlock(0.95, 4.4, 0.85, -0.6,  0.05, 0));
  logoGroup.add(createLogoBlock(0.88, 2.8, 0.85,  1.0,  1.25, -Math.PI / 4.2));
  logoGroup.add(createLogoBlock(0.88, 3.1, 0.85,  1.2, -1.25,  Math.PI / 4.4));
  logoGroup.add(createLogoBlock(0.85, 1.1, 0.88,  0.35, 0.05, 0));

  // ---- 2. Circuitos dorados ----
  const circuitGroup = new THREE.Group();
  mainGroup.add(circuitGroup);

  const circuitLinesData = [
    // Lado izquierdo
    [[-2.6, 1.8, 0], [-3.8, 1.8, 0], [-4.4, 2.4, 0]],
    [[-2.6, 1.2, 0], [-4.2, 1.2, 0], [-4.6, 1.7, 0]],
    [[-2.6, 0.6, 0], [-3.9, 0.6, 0], [-4.8, 0.6, 0]],
    [[-2.6, -0.1, 0], [-4.3, -0.1, 0], [-5.0, -0.4, 0]],
    [[-2.6, -0.8, 0], [-3.8, -0.8, 0], [-4.6, -1.3, 0]],
    [[-2.6, -1.5, 0], [-3.6, -1.5, 0], [-4.3, -2.2, 0], [-4.3, -2.6, 0]],
    [[-2.6, -2.1, 0], [-3.3, -2.1, 0], [-3.8, -2.7, 0], [-3.8, -3.1, 0]],
    // Lado derecho
    [[2.1, 2.1, 0], [3.3, 2.1, 0], [3.8, 2.6, 0], [3.8, 3.1, 0]],
    [[2.2, 1.5, 0], [3.6, 1.5, 0], [4.4, 2.1, 0]],
    [[1.6, 0.7, 0], [3.8, 0.7, 0], [4.6, 0.7, 0]],
    [[1.2, 0.0, 0], [3.6, 0.0, 0], [4.9, 0.0, 0]],
    [[1.6, -0.6, 0], [3.8, -0.6, 0], [4.7, -0.9, 0]],
    [[2.4, -1.4, 0], [3.7, -1.4, 0], [4.4, -2.0, 0]],
    [[2.5, -2.2, 0], [3.4, -2.2, 0], [4.1, -2.8, 0], [4.1, -3.2, 0]],
  ];

  const circuitPins = [];
  const nodeGeometry = new THREE.SphereGeometry(0.13, 16, 16);
  const ringNodeGeom = new THREE.TorusGeometry(0.18, 0.045, 12, 24);

  circuitLinesData.forEach((pts) => {
    const points = pts.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
    circuitGroup.add(new THREE.Line(lineGeom, circuitMat));

    const endPt = points[points.length - 1];
    const ringMesh = new THREE.Mesh(ringNodeGeom, goldBorderMat);
    ringMesh.position.copy(endPt);
    circuitGroup.add(ringMesh);

    const centerSphere = new THREE.Mesh(nodeGeometry, nodeMat);
    centerSphere.position.copy(endPt);
    centerSphere.scale.set(0.65, 0.65, 0.65);
    circuitGroup.add(centerSphere);

    circuitPins.push({ ring: ringMesh, sphere: centerSphere });
  });

  // Barra inferior y orbe central
  const barLeft = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4.8, -3.7, 0), new THREE.Vector3(-0.6, -3.7, 0),
    ]), circuitMat);
  circuitGroup.add(barLeft);

  const barRight = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.6, -3.7, 0), new THREE.Vector3(4.8, -3.7, 0),
    ]), circuitMat);
  circuitGroup.add(barRight);

  const centerGoldOrb = new THREE.Mesh(
    new THREE.SphereGeometry(0.26, 24, 24), goldBorderMat);
  centerGoldOrb.position.set(0, -3.7, 0);
  circuitGroup.add(centerGoldOrb);

  // ---- 3. Partículas ----
  const particleCount = 140;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i]     = (Math.random() - 0.5) * 16;
    particlePositions[i + 1] = (Math.random() - 0.5) * 14;
    particlePositions[i + 2] = (Math.random() - 0.5) * 10;
  }
  const particleGeom = new THREE.BufferGeometry();
  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particles = new THREE.Points(particleGeom, new THREE.PointsMaterial({
    color: 0x38bdf8, size: 0.08, transparent: true, opacity: 0.75,
  }));
  scene.add(particles);

  // ---- Órbitas ----
  const orbitingOrbs = [];
  for (let i = 0; i < 6; i++) {
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), cyanGlowMat);
    scene.add(orb);
    orbitingOrbs.push({
      mesh: orb,
      radiusX: 4.8 + i * 0.35,
      radiusY: 3.8 + i * 0.25,
      speed: 0.015 * (i % 2 === 0 ? 1 : -1.2),
      angle: (i / 6) * Math.PI * 2,
      offsetZ: (Math.random() - 0.5) * 2,
    });
  }

  // ---- Interacción con mouse ----
  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / width  - 0.5) * 2;
    mouseY = -((e.clientY - rect.top)  / height - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    const w = container.clientWidth  || 480;
    const h = container.clientHeight || 460;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // ---- Loop de animación ----
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    mainGroup.rotation.y = Math.sin(t * 0.6) * 0.22 + targetX * 0.65;
    mainGroup.rotation.x = Math.cos(t * 0.5) * 0.12 + targetY * 0.45;
    mainGroup.position.y = Math.sin(t * 1.2) * 0.18;

    centerGoldOrb.scale.setScalar(1 + Math.sin(t * 3) * 0.08);
    circuitPins.forEach((pin, idx) => {
      const pulse = 1 + Math.sin(t * 3 + idx * 0.4) * 0.15;
      pin.sphere.scale.set(0.65 * pulse, 0.65 * pulse, 0.65 * pulse);
    });

    orbitingOrbs.forEach((o) => {
      o.angle += o.speed;
      o.mesh.position.x = Math.cos(o.angle) * o.radiusX;
      o.mesh.position.y = Math.sin(o.angle) * o.radiusY;
      o.mesh.position.z = Math.sin(o.angle * 2) * 1.5 + o.offsetZ;
    });

    particles.rotation.y = t * 0.03;
    particles.rotation.x = t * 0.015;

    renderer.render(scene, camera);
  }
  animate();
})();