import * as THREE from "../../three/src/Three.js";
import { OrbitControls } from "../../three/addons/OrbitControls.js";
// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let controls = new OrbitControls(camera, renderer.domElement);

// Add a cube to the scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;
  switch (EVENT.message) {
    case "LINK_TO_PRODUCTS":
      cube.material.color = new THREE.Color("#FF00FF".slice(0, 7));
      cube.material.wireframe = true;

      break;
    case "LINK_TO_ABOUT":
      cube.material.wireframe = false;
      cube.material.color = new THREE.Color("#0F0FFF".slice(0, 7));

      break;
    case "LINK_TO_ACCOUNT":
      cube.material.wireframe = true;
      cube.material.color = new THREE.Color("#4FFDFF".slice(0, 7));

      break;

    default:
      cube.material.wireframe = false;
      cube.material.color = new THREE.Color("#5E00FF".slice(0, 7));
      break;
  }
  renderer.render(scene, camera);
}

animate();
