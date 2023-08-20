import * as THREE from "../../three/src/Three.js";
import { EffectComposer } from "../../three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "../../three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "../../three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RenderPixelatedPass } from "../../three/examples/jsm/postprocessing/RenderPixelatedPass.js";
import vertexShader from "./vertex.js";
import fragmentShader from "./fragment.js";
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
let cameraAnimations = [];
let animations = [];
let lights = [];
let postproc = [];


function init() {
  setupScene();
  createLights();
  // createBoxBackground();
  createObject();
  createPostProcessing();
  createAnimations();
  createCameraAnimation();
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;
  cube.material.color = new THREE.Color(255, 255, 255);
  cube.material.wireframe = false;

  if (HOOVERPRODUCTS.hovered) {
    // console.log("products");
    triggerCameraAnimation(0);
    triggerAnimation(0);
    HOOVERPRODUCTS.hovered = false;
  } else if (HOOVERABOUT.hovered) {
    // console.log("about");
    triggerCameraAnimation(1);
    triggerAnimation(1);
    HOOVERABOUT.hovered = false;
  } else if (HOOVERACCOUNT.hovered) {
    // console.log("account");
    triggerCameraAnimation(2);
    triggerAnimation(2);
    HOOVERACCOUNT.hovered = false;
  } else {
    updateUniforms();
  }

  if (HOOVERPRODUCTS.isHoovering == true && CLICK.isClick == true) {
    triggerCameraAnimation(3);
    // triggerAnimation(4);
} else if (HOOVERHOME.isHoovering == true  && CLICK.isClick == true) {
    triggerCameraAnimation(0);
    triggerAnimation(0);
  }

  TWEEN.update();
  //   updateUniforms();
  cube.geometry.needsUpdate = true;

  CLICK.isClick = false;

  updatePostProcessing();

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
  renderer.antialias = true;

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 10;
}

function createObject() {
  const cubeSize = 5;
  const vertices_precision = 100;
  const points = [];
  for (let i = 0; i < vertices_precision; i++) {
    points.push(new THREE.Vector2(Math.sin(i * 0.2) * cubeSize + 10, Math.tan(i - cubeSize / 2) * 0.001));
  }
  const geometry = new THREE.LatheGeometry(points);
  cube = new THREE.Mesh(
    // geometry,
    // new THREE.DodecahedronGeometry(cubeSize,vertices_precision),
    // new THREE.SphereGeometry(cubeSize,vertices_precision,vertices_precision),
    new THREE.BoxGeometry(cubeSize, cubeSize*2, cubeSize, vertices_precision, vertices_precision, vertices_precision),
    new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      // wireframe: true,
      uniforms: {
        uTime: { value: 0 },
        offsetFace: { value: 1.0 },
        deformFactor: { value: 1.0 },
      },
    })
  );
  cube.geometry.needsUpdate = true;
  scene.add(cube);
}

// Update the uTime uniform in the render loop or any desired update function
function updateUniforms() {
  cube.material.uniforms.uTime.value = performance.now() * 0.001; // Set the uTime uniform to the current time
  //   cube.material.uniforms.offsetFace.value = 1 + Math.sin(performance.now() * 0.001);
  cube.material.uniforms.offsetFace.value *= 1 + 0.001 * Math.sin(performance.now() * 0.001);
  cube.material.uniforms.deformFactor.value *= 1 + 0.001 * Math.sin(performance.now() * 0.001);
  // cube.material.uniforms.offsetFace.value = Math.sin(performance.now() * 0.001)+1.0;
  //   cube.material.uniforms.deformFactor.value = Math.sin(performance.now() * 0.001) + 1.0;
}

function createBoxBackground() {
  const geometrybox = new THREE.BoxGeometry(80, 80, 80);

  const materialbox = new THREE.MeshPhongMaterial({
    color: new THREE.Color("#530094"),
    shininess: 0.2,
    specular: new THREE.Color("#5400ff"),
    side: THREE.BackSide,
  });

  const mesh = new THREE.Mesh(geometrybox, materialbox);
  mesh.position.y = 0;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function createPostProcessing() {
  composer = new EffectComposer(renderer);
  const bypass = new RenderPass(scene, camera);
  const unreal = new UnrealBloomPass();
  postproc.push(unreal);
  const renderPixelated = new RenderPixelatedPass(10, scene, camera);
  postproc.push(renderPixelated);
  unreal.threshold = 0.15;
  unreal.strength = 0.3;
  unreal.radius = 10;
  composer.addPass(bypass);
  composer.addPass(renderPixelated);
  composer.addPass(unreal);
  bypass.enabled = true;
  unreal.enabled = true;
  renderPixelated.enabled = false;
}

function updatePostProcessing() {
}

function createAnimations() {
  const anim_duration = 4000;
  const animTween = new TWEEN.Tween(cube.material.uniforms)
    .to({ offsetFace: { value: 1 }, deformFactor: { value: 1 } }, anim_duration)
    .easing(TWEEN.Easing.Cubic.InOut);
  animations.push(animTween);
  const animTween2 = new TWEEN.Tween(cube.material.uniforms)
    .to({ offsetFace: { value: 0 }, deformFactor: { value: 0 } }, anim_duration)
    .easing(TWEEN.Easing.Cubic.InOut);
  animations.push(animTween2);
  const animTween3 = new TWEEN.Tween(cube.material.uniforms)
    .to({ offsetFace: { value: 2 }, deformFactor: { value: 1 } }, anim_duration)
    .easing(TWEEN.Easing.Cubic.InOut);
  animations.push(animTween3);
  const animTween4 = new TWEEN.Tween(cube.material.uniforms)
    .to({ offsetFace: { value: 2 }, deformFactor: { value: 5 } }, anim_duration)
    .easing(TWEEN.Easing.Cubic.InOut);
  animations.push(animTween4);
  const animTween5 = new TWEEN.Tween(cube.position)
    .to({ x : -10, y : 5 }, anim_duration)
    .easing(TWEEN.Easing.Cubic.InOut);
  animations.push(animTween5);
}

function createCameraAnimation() {
  const anim_duration = 3000;
  const cameraTween = new TWEEN.Tween(camera.position)
    .to({ x: 10, y: -3, z: 0 }, anim_duration)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(() => {
      camera.lookAt(0, 0, 0);
    });
  cameraAnimations.push(cameraTween);
  const cameraTween2 = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: -10, z: -10 }, anim_duration)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(() => {
      camera.lookAt(0, 0, 0);
    });
  cameraAnimations.push(cameraTween2);
  const cameraTween3 = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: 0, z: -1 }, anim_duration)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(() => {
      camera.lookAt(0, 0, 0);
    });
  cameraAnimations.push(cameraTween3);
  const cameraTween4 = new TWEEN.Tween(camera.position)
    .to({ x: 7, y: -5, z: 10 }, anim_duration)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(() => {
      camera.lookAt(0, 0, 0);
    });
  cameraAnimations.push(cameraTween4);
}

function triggerAnimation(animIdx) {
  animations.forEach((anim) => {
    anim.stop();
  });
  animations[Math.min(animIdx, animations.length - 1)].startFromCurrentValues();
}
function triggerCameraAnimation(animIdx) {
  cameraAnimations.forEach((anim) => {
    anim.stop();
  });
  cameraAnimations[Math.min(animIdx, cameraAnimations.length - 1)].startFromCurrentValues();
}

function createLights() {
  const ambient = new THREE.AmbientLight(new THREE.Color(1, 0, 1), 0.005);
  scene.add(ambient);
  const colors = [new THREE.Color("#6000FF"), new THREE.Color("#B800E3"), new THREE.Color("#94003F")];
  //   const light1 = createPointLight(colors[0], 0, 0, 0, true, 0.2);
  //   light1.lookAt(0, 0, 0);
  //   lights.push(light1);
  const light1 = createDirectionalLight(colors[0], -5, 0, 30, true, 0.1);
  light1.lookAt(0, 0, 0);
  lights.push(light1);
  const light2 = createDirectionalLight(colors[1], 5, 0, -30, true, 0.1);
  light2.lookAt(0, 0, 0);
  lights.push(light2);
  const light3 = createDirectionalLight(colors[2], 0, -30, 0, true, 0.1);
  light3.lookAt(0, 0, 0);
  lights.push(light3);
  //   const light4 = createDirectionalLight(colors[1], -30, 30, 30, true, 0.4);
  //   light4.lookAt(0, 2, 0);
  //   lights.push(light4);
}

function createDirectionalLight(color = new THREE.Color("#FFFFFF"), x = 0, y = 0, z = 0, shadows = true, intensity = 1) {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(x, y, z);
  light.castShadow = shadows;
  light.shadow.camera.top = 500;
  light.shadow.camera.bottom = -500;
  light.shadow.camera.left = -500;
  light.shadow.camera.right = 500;
  //   light.shadow.bias = 0.01;
  //   light.shadow.radius = 0.1;
  //   light.shadow.mapSize.width = 2048;
  //   light.shadow.mapSize.height = 2048;
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
  light.shadow.bias = 0.01;
  light.shadow.radius = 1;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add(light);
  return light;
}
