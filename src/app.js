import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
let loader = new GLTFLoader();

const textureLoader = new THREE.TextureLoader();
let map = textureLoader.load(
  /* 'assets/modelFour/textures/Material.010_baseColor.png', */
  'assets/modelOne/textures/Material_baseColor.png'
);

let map1 = textureLoader.load(
  /* 'assets/modelThree/textures/coat_baseColor.png', */
  'assets/texturas/1.jpg'
);

let map2 = textureLoader.load(
  /* 'assets/modelThree/textures/glass_baseColor.png', */
  'assets/texturas/2.jpg'
);

map.encoding = THREE.sRGBEncoding;
map.flipY = false;

map1.encoding = THREE.sRGBEncoding;
map1.flipY = false;

map2.encoding = THREE.sRGBEncoding;
map2.flipY = false;

let car;
let hlight;
let directionalLight;
let light;
let light2;
let light3;
let light4;


document.body.onload = () => {
  main();
};

window.onresize = () => {
  scene.background = new THREE.Color(0xffffff);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth , window.innerHeight, true);
};

export function reset() {
    scene.children = [];
    renderer.setSize(0, 0, true);
    
  }

export function main() {
    reset();
  // Configuracion inicial
  renderer.setSize(window.innerWidth , window.innerHeight);
  renderer.shadowMap.enabled = true;
  scene.background = new THREE.Color(0xffffff);
  document.body.appendChild(renderer.domElement);

  // Visual Configs
  cameraConfig();
  controlsConfig();

  // Light
  setupLights();

  // Modelo
  loadInitialModel();

  //cambio de modelo
  changeModel();
}

function loadInitialModel() {
  loader.load(
    './assets/modelOne/scene.gltf',
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}

export function changeModel(assetFolder) {
  scene.children = [];
  // Light
  setupLights();
  loader.load(
    `./assets/${assetFolder}/scene.gltf`,
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}

export function changeTexture() {
  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.material.map = map;
    }
  });
  //car.material = new THREE.MeshPhongMaterial({ map: map, color: 0xff00ff });
  animate();
}

export function changeTexture1() {
  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.material.map = map1;
    }
  });
  //car.material = new THREE.MeshPhongMaterial({ map: map, color: 0xff00ff });
  animate();
}

export function changeTexture2() {
  car.traverse(function (node) {
    if (node instanceof THREE.Mesh) {
      node.material.map = map2;
    }
  });
  //car.material = new THREE.MeshPhongMaterial({ map: map, color: 0xff00ff });
  animate();
}

function controlsConfig() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.enablePan = true;
}

function cameraConfig() {
  camera.position.x = 4;
  camera.position.y = 1;
  camera.position.z = 6;
}

function setupLights() {
  /* hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 50);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
   */
  directionalLight = new THREE.DirectionalLight(0xffffff, 20);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  light = new THREE.PointLight(0xc4c4c4, 1.5);
  light.position.set(0, 300, 500);
  scene.add(light);

  light2 = new THREE.PointLight(0xc4c4c4, 1.5);
  light2.position.set(500, 100, 0);
  scene.add(light2);

  light3 = new THREE.PointLight(0xc4c4c4, 1.5);
  light3.position.set(0, 100, -500);
  scene.add(light3);

  light4 = new THREE.PointLight(0xc4c4c4, 1.5);
  light4.position.set(-500, 300, 500);
  scene.add(light4);
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}