import * as THREE from "../../three/src/Three.js";
import { EffectComposer } from "../../three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "../../three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "../../three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RenderPixelatedPass } from "../../three/examples/jsm/postprocessing/RenderPixelatedPass.js";

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
let sphere_radius;

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
  if (HOOVERPRODUCTS) {
    triggerCameraAnimation(0);
    HOOVERPRODUCTS = false;
  } else if (HOOVERABOUT) {
    triggerCameraAnimation(1);
    HOOVERABOUT = false;
  } else if (HOOVERACCOUNT) {
    triggerCameraAnimation(2);
    HOOVERACCOUNT = false;
  } else {
    // triggerCameraAnimation(4);
  }

  if (ISPRODUCTS) {
    triggerAnimation(0);
}else{
    triggerAnimation(1);
  }

  TWEEN.update();
  updateVerticesWithTime(cube, Date.now() / 10);
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
  // Add a cube to the scene
  sphere_radius = 5;
//   const geometry = new THREE.SphereGeometry(sphere_radius);
  const geometry = new THREE.SphereGeometry(sphere_radius, 100, 100);
  //   const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(240, 200, 0), emissive: new THREE.Color(0, 0, 0) });
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(255, 0, 255),
    // emissive: new THREE.Color(0, 0, 0),
    side: THREE.DoubleSide,
    roughness: 0,
    metalness: 0.9,
    shininess: 0,
    clearcoat : 1
  });
  cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);
  // Access vertices and normals
  const vertices = geometry.attributes.position.array;
  const normals = geometry.attributes.normal.array;

  // Convert vertices to spherical coordinates
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    const z = vertices[i + 2];

    const radius = Math.sqrt(x * x + y * y + z * z);
    const theta = Math.acos(y / radius); // Polar angle
    const phi = Math.atan2(z, x); // Azimuthal angle

    // Modify point position along the sphere radius
    const modifiedRadius = sphere_radius; // Adjust as needed

    // Convert back to Cartesian coordinates
    vertices[i] = modifiedRadius * Math.sin(theta) * Math.cos(phi);
    vertices[i + 1] = modifiedRadius * Math.cos(theta);
    vertices[i + 2] = modifiedRadius * Math.sin(theta) * Math.sin(phi);
  }

  // Update the geometry with modified vertices
  geometry.attributes.position.needsUpdate = true;
  
}
function updateVerticesWithTime(mesh, time) {
  const geometry = mesh.geometry;
  const vertices = geometry.attributes.position.array;

  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    const z = vertices[i + 2];

    const radius = Math.sqrt(x * x + y * y + z * z);
    const theta = Math.acos(y / radius);
    const phi = Math.atan2(z, x);

    // Modify point position along the sphere radius using time
    // const modifiedRadius = sphere_radius + (Math.sin(phi + time / 1000) + Math.cos(theta*4 + time/1000) * sphere_radius*0.2); // Adjust as needed
    const modifiedRadius = sphere_radius + (Math.sin(theta*phi * (2 + WHEEL.wheelPositionY*0.0001) + time / 600) * sphere_radius*0.2) + + (Math.sin(theta * (8 + WHEEL.wheelPositionY*0.01) + time / 400) * sphere_radius*0.1) + (Math.cos(phi * (8 + WHEEL.wheelPositionX*0.01) + time / 500) * sphere_radius*0.05); // Adjust as needed

    // Convert back to Cartesian coordinates
    vertices[i] = modifiedRadius * Math.sin(theta) * Math.cos(phi);
    vertices[i + 1] = modifiedRadius * Math.cos(theta);
    vertices[i + 2] = modifiedRadius * Math.sin(theta) * Math.sin(phi);
  }

  // Update the geometry with modified vertices
  geometry.attributes.position.needsUpdate = true;
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
  const renderPixelated = new RenderPixelatedPass( 10, scene, camera);
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


function createAnimations() {
    const anim_duration = 2000;
    const animTween = new TWEEN.Tween(cube.material)
      .to({metalness : 0.99}, anim_duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(()=>{
        cube.material.needsUpdate = true;
      })
      animations.push(animTween);
      const animTween2 = new TWEEN.Tween(cube.material)
      .to({metalness : 0}, anim_duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(()=>{
        cube.material.needsUpdate = true;
      })
      animations.push(animTween2);
}

function createCameraAnimation() {
  const anim_duration = 2000;
  const cameraTween = new TWEEN.Tween(camera.position)
    .to({ x: 10, y: 0, z: 0 }, anim_duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.lookAt(0, 0, 0);
    });
  cameraAnimations.push(cameraTween);
  const cameraTween2 = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: -10, z: -10 }, anim_duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.lookAt(0, 0, 0);
    });
  cameraAnimations.push(cameraTween2);
  const cameraTween3 = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: 0, z: -sphere_radius/2 }, anim_duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      //   camera.lookAt(0, 0, 0);
    });
  cameraAnimations.push(cameraTween3);
  const cameraTween4 = new TWEEN.Tween(camera.position)
    .to({ x: 0, y: -0.1, z: 0.1 }, anim_duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
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
