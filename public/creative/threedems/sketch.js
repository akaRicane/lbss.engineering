import * as THREE from "../../three/src/Three.js";
import { EffectComposer } from "../../three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "../../three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "../../three/examples/jsm/postprocessing/UnrealBloomPass.js";

/* --------------------------------- EVENTS --------------------------------- */
// ISHOME = true;
// HOOVERPRODUCTS = false;
// HOOVERABOUT = false;
// HOOVERACCOUNT = false;
// ISPRODUCTS = false;
// ISABOUT = false;
// ISACCOUNT = false;
// CLICK = { isClick : false, x : 0, y : 0};
// WHEEL = { isWheel : false, deltaX : 0, deltaY : 0};
// CURSOR = {x : 0, y : 0};
/* ------------------------------------ x ----------------------------------- */

let scene, camera, renderer;
let cube;
let composer;
let animations = [];
let lights = [];

function init() {
  setupScene();
  createLights();
  createPostProcessing();
  createCameraAnimation();
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;
  cube.material.color = new THREE.Color(240, 200, 0);
  cube.material.wireframe = false;
  if (HOOVERPRODUCTS) {
    triggerAnimation(0);
    HOOVERPRODUCTS = false;
  } else if (HOOVERABOUT) {
    triggerAnimation(1);
    HOOVERABOUT = false;
  } else if (HOOVERACCOUNT) {
    triggerAnimation(2);
    HOOVERACCOUNT = false;
  } else {
    // triggerAnimation(4);
  }

  if (ISPRODUCTS) {
    cube.material.color = new THREE.Color(0, 200, 0);
  }

  TWEEN.update();
  //   updateShadows();

  // Without Post Proc
  //   renderer.render(scene, camera);

  // Post Proc
  renderer.clear();
  composer.render();
}

init();
animate();

function setupScene() {
  // Set up the scene
  scene = new THREE.Scene();
  //   scene.background = new THREE.Color(0,0,20)
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Add a cube to the scene
  const geometry = new THREE.BoxGeometry(5,5,5);
  //   const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(240, 200, 0), emissive: new THREE.Color(0, 0, 0) });
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(240, 200, 0),
    // emissive: new THREE.Color(0, 0, 0),
    side : THREE.DoubleSide,
    roughness: 0,
    metalness: 1,
    shininess : 0
  });
  cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);

  const geometrybox = new THREE.BoxGeometry(50, 50, 50);

  const materialbox = new THREE.MeshPhongMaterial({
    color: new THREE.Color("#530094"),
    shininess: 12,
    specular: new THREE.Color("#94003F"),
    side: THREE.BackSide,
  });

  const mesh = new THREE.Mesh(geometrybox, materialbox);
  mesh.position.y = 0;
  mesh.receiveShadow = true;
  scene.add(mesh);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 10;
}

function createPostProcessing() {
  composer = new EffectComposer(renderer);
  const bypass = new RenderPass(scene, camera);
  const unreal = new UnrealBloomPass();
  unreal.threshold = 0;
  unreal.strength = 2;
  unreal.radius = 1;
  composer.addPass(bypass);
  composer.addPass(unreal);
  bypass.enabled = true;
  unreal.enabled = true;
}

function createCameraAnimation() {
  const anim_duration = 2000;
  const cameraTween = new TWEEN.Tween(camera.position)
    .to({ x: -10, y: 0, z: 0 }, anim_duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.lookAt(0, 0, 0);
    });
  animations.push(cameraTween);
  const cameraTween2 = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: -10, z: -10 }, anim_duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.lookAt(0, 0, 0);
    });
  animations.push(cameraTween2);
  const cameraTween3 = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: 0, z: 0 }, anim_duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      //   camera.lookAt(0, 0, 0);
    });
  animations.push(cameraTween3);
  const cameraTween4 = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: -0.1, z: 0.1 }, anim_duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.lookAt(0, 0, 0);
    });
  animations.push(cameraTween4);
}

function triggerAnimation(animIdx) {
  animations.forEach((anim) => {
    anim.stop();
  });
  animations[Math.min(animIdx, animations.length - 1)].startFromCurrentValues();
}

//   tween1.chain(tween2);

function createLights() {
  const ambient = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.01);
  scene.add(ambient);
  const colors = [new THREE.Color("#6000FF"), new THREE.Color("#B800E3"), new THREE.Color("#E3C800")];
//   const light = createDirectionalLight(colors[0], -2, 1, 5, true, 0.2);
//   light.lookAt(0, 0, 0);
//   lights.push(light);
//   const light2 = createDirectionalLight(colors[1], -2, 1, 5, true, 0.2);
//   light2.lookAt(0, 0, 0);
//   lights.push(light2);
//   const light3 = createDirectionalLight(colors[2], -2, 1, -5, true, 0.2);
//   light3.lookAt(0, 0, 0);
//   lights.push(light3);
//   const light4 = createDirectionalLight(colors[2], -2, 1, -5, true, 0.2);
//   light4.lookAt(0, 0, 0);
//   lights.push(light4);
  const light6 = createPointLight(colors[0], 0, 0, 0, true, 0.1);
  light6.lookAt(0, 0, 0);
  lights.push(light6);
  const light7 = createPointLight(colors[1], 10, 10, 10, true, 0.05);
  lights.push(light7);
  const light8 = createPointLight(colors[2], -10, 10, -10, true, 0.05);
  lights.push(light8);
  const light9 = createPointLight(colors[1], -10, 10, 10, true, 0.05);
  lights.push(light9);
  const light10 = createPointLight(colors[2], 10, 10, -10, true, 0.05);
  lights.push(light10);
}

function createDirectionalLight(color = new THREE.Color("#FFFFFF"), x = 0, y = 0, z = 0, shadows = true, intensity = 1) {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(x, y, z);
  light.castShadow = shadows;
  light.shadow.camera.top = 10;
  light.shadow.camera.bottom = -10;
  light.shadow.camera.left = -10;
  light.shadow.camera.right = 10;
  light.shadow.bias = -0.001;
  light.shadow.radius = 4;
  light.shadow.mapSize.width = 2048 * 2;
  light.shadow.mapSize.height = 2048 * 2;
  scene.add(light);
  return light;
}
function createPointLight(color = new THREE.Color("#FFFFFF"), x = 0, y = 0, z = 0, shadows = true, intensity = 1) {
  const light = new THREE.PointLight(color, intensity);
  light.position.set(x, y, z);
  light.castShadow = shadows;
  light.shadow.camera.top = 100;
  light.shadow.camera.bottom = -100;
  light.shadow.camera.left = -100;
  light.shadow.camera.right = 100;
  light.shadow.bias = -0.01;
  light.shadow.radius = 100;
  light.shadow.mapSize.width = 2048*8;
  light.shadow.mapSize.height = 2048*8;
  scene.add(light);
  return light;
}

function updateShadows() {
  lights.forEach((light) => {
    light.shadow.update();
    light.shadow.camera.updateMatrixWorld();
  });
}
