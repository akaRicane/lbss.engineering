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
let animations = [];
let composer;

function init() {
  setupScene();
  createPostProcessing();
  createCameraAnimation();
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.02;
  cube.material.color = new THREE.Color(240, 200, 0);
  cube.material.wireframe = true;
  if (HOOVERPRODUCTS) {
    triggerAnimation(0);
    HOOVERPRODUCTS = false;
  } else if (HOOVERABOUT) {
    triggerAnimation(1);
    HOOVERABOUT = false;
  } else if (HOOVERACCOUNT) {
    triggerAnimation(2);
    HOOVERACCOUNT = false;
  } else{
    // triggerAnimation(4);
  }

  if(ISPRODUCTS){
    cube.material.color = new THREE.Color(0, 200, 0);
  }

  TWEEN.update();
//   renderer.render(scene, camera);
  renderer.clear();
  composer.render();
}
init();
animate();

function setupScene() {
  // Set up the scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add a cube to the scene
  const geometry = new THREE.DodecahedronGeometry(2);
  const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(240, 200, 0) });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 5;
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
    .to({ x: -5, y: 0, z: 0 }, anim_duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.lookAt(0, 0, 0);
    });
  animations.push(cameraTween);
  const cameraTween2 = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: -5, z: -5 }, anim_duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.lookAt(0, 0, 0);
    });
  animations.push(cameraTween2);
  const cameraTween3 = new TWEEN.Tween(camera.position)
    .to({ x: 0, y : 0, z: 0}, anim_duration)
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
