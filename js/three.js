document.addEventListener("DOMContentLoaded", () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  var controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.minDistance = 10;
	controls.maxDistance = 500;
  // controls.target.set( 0, 0, 0 )

  var cube;
  var geometry,
    v = {
      a: 5,
      b: 28,
      c: 2,
      dt: 0.01,
    };
  var x, y, z;
  const vertices = [];
  var lineObject, lineMaterial;
  var color = {h: 200, s: 25, l: 30}, colors = [];
  
  // let targetRotationX = 0; // for custom mouse controls
  // let targetRotationY = 0; // for custom mouse controls

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  function init() {
    x = 10;
    y = 10;
    z = 10;
    renderer.setClearColor("#1d1e22");
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.set( 0, 0, 100 );
    // camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  function plot() {
    var geometry = new THREE.BoxGeometry(100, 100, 100);
    var material = new THREE.MeshBasicMaterial({
      color: 0xffcc00,
      wireframe: true,
    });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.04;
    // cube.rotation.y += 0.04;

    color = {h: ((color.h + 5) % 360), s: 80, l: 50}
    let _c = new THREE.Color(`hsl(${color.h}, ${color.s}%, ${color.l}%)`);
		colors.push( _c.r, _c.g, _c.b );

    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    calculate();
    vertices.push(new THREE.Vector3(x, y, z));
    geometry.setFromPoints(vertices);

    // for custom mouse controls
    // lineObject.rotation.y += ( targetRotationX - lineObject.rotation.y ) * 0.5;
    // lineObject.rotation.x += ( targetRotationY - lineObject.rotation.x ) * 0.5;
    
    // auto smooth rotating
    // camera.position.x += 0.05
    lineObject.rotation.y -= 0.0005;

    controls.update();
    renderer.render(scene, camera);
  }

  // function datGuiSetup() {
  //   var gui = new dat.GUI();
  // }

  function calculate() {
    let dx, dy, dz;
    dx = v.a * (y - x) * v.dt;
    dy = (x * (v.b - z) - y) * v.dt;
    dz = (x * y - v.c * z) * v.dt;
    x += dx;
    y += dy;
    z += dz;
  }

  function points() {
    const vertices = [];
    keys = Object.keys(v);
    vertices.push(v[keys[0]], v[keys[1]], v[keys[2]]);
    // for (let i = 0; i < 100; i++) {
    // const x = THREE.MathUtils.randFloat(-1000, 2000);
    // const y = THREE.MathUtils.randFloat(-1000, 2000);
    // const z = THREE.MathUtils.randFloat(-1000, 2000);

    // vertices.push(x, y, z);
    // }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({ color: 0xffffff });

    const points = new THREE.Points(geometry, material);

    scene.add(points);
    renderer.render(scene, camera);
  }

  function line() {
    geometry = new THREE.BufferGeometry().setFromPoints(vertices);
    lineMaterial = new THREE.LineBasicMaterial({linewidth: 5, vertexColors: true});
    lineObject = new THREE.Line(geometry, lineMaterial);

    // geometry = new THREE.TubeGeometry(vertices, 20, 2, 8).setFromPoints(vertices);
    // lineMaterial = new THREE.MeshBasicMaterial({color: 0x49ef4});
    // lineObject = new THREE.Mesh( geometry, lineMaterial );

    scene.add(lineObject);
    renderer.render(scene, camera);
  }

  init();
  // datGuiSetup();
  // plot();
  // points();
  line();
  animate();

  /*
  // Custom Mouse controls ****************************
  let targetRotationXOnPointerDown = 0;
  let targetRotationYOnPointerDown = 0;

  let pointerX = 0;
  let pointerXOnPointerDown = 0;
  let pointerY = 0;
  let pointerYOnPointerDown = 0;

  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  renderer.domElement.addEventListener( 'pointerdown', onPointerDown );

  function onPointerDown(event) {
    if (event.isPrimary === false) return;

    pointerXOnPointerDown = event.clientX - windowHalfX;
    pointerYOnPointerDown = event.clientY - windowHalfY;
    targetRotationXOnPointerDown = targetRotationX;
    targetRotationYOnPointerDown = targetRotationY;

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(event) {
    if (event.isPrimary === false) return;

    pointerX = event.clientX - windowHalfX;
    pointerY = event.clientY - windowHalfY;

    targetRotationX = targetRotationXOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;
    targetRotationY = targetRotationYOnPointerDown + (pointerY - pointerYOnPointerDown) * 0.02;
  }

  function onPointerUp(event) {
    if (event.isPrimary === false) return;

    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  }
  */
});
