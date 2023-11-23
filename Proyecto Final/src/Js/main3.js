/* Author(A): Santiago Murgueitio, Juan Pablo Bustamante, Mariana Ricaurte
Date of creation: 20/11/23  9:30
Last Modification:  23/11/23  ?
*/

//variables
var scene = null,
  camara = null,
  render = null,
  lights = null;

function createThreeJS() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffbf51);
  camara = new THREE.PerspectiveCamera(
    11, // Field of view (arriba);
    window.innerWidth / window.innerHeight, // Aspect Ratio 16:9
    0.1, // Near
    1000
  ); //Far

  //audio posicional
  const listener = new THREE.AudioListener();
  camara.add(listener);
  const sound = new THREE.PositionalAudio(listener);
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load("../audio/jirafa.mp3", function (buffer) {
    sound.setBuffer(buffer);
    sound.setRefDistance(10);
    sound.play();
    sound.setLoop(true);
  });

  // create an object for the sound to play from
  const sphere = new THREE.SphereGeometry(0.01, 0.01, 0.2);
  const material = new THREE.MeshPhongMaterial({ color: 0xff2200 });
  const mesh = new THREE.Mesh(sphere, material);
  scene.add(mesh);

  render = new THREE.WebGLRenderer({ canvas: document.getElementById("app") });
  render.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(render.domElement);

  controls = new THREE.OrbitControls(camara, render.domElement);
  camara.position.set(-60, 70, 60);
  controls.update();

  const gridHelper = new THREE.GridHelper(20, 20);
  scene.add(gridHelper);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // to call
  //createGeometry();
  createlights("ambientlight");
  createlights("pointlight");
  animate();

  loadModels();
  initSound3D();
  initSoundP();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render.render(scene, camara);
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();

  render.setSize(window.innerWidth, window.innerHeight);
}

function createlights(typelight) {
  //pointlight,spotlight,ambientlight

  switch (typelight) {
    case "pointlight":
      //PointLightHelper( light : PointLight, sphereSize : Float, color : Hex )
      lights = new THREE.PointLight(0xffffff, 1, 100);
      lights.position.set(-15, 5, 5);
      scene.add(lights);

      const sphereSize = 1;
      const lightsHelper = new THREE.PointLightHelper(lights, sphereSize);
      scene.add(lightsHelper);

      break;
    case "ambientlight":
      // AmbientLight( color : Integer, intensity : Float )
      lights = new THREE.AmbientLight(0xffffff); // soft white light
      scene.add(lights);

      break;
    case "spotlight":
      //SpotLightHelper( light : SpotLight, color : Hex )
      lights = new THREE.SpotLight(0xffffff);
      lights.position.set(10, 10, 10);
      scene.add(lights);
      break;
  }
}

function loadModels() {
  loadObjMtl("../models/Jirafa/jirafa1/", "jirafa1.mtl", "jirafa1.obj");
  loadObjMtl("../models/Jirafa/jirafa2/", "jirafa2.mtl", "jirafa2.obj");
  loadObjMtl("../models/Jirafa/jirafa3/", "jirafa3.mtl", "jirafa3.obj");
  loadObjMtl("../models/Jirafa/jirafa4/", "jirafa4.mtl", "jirafa4.obj");
  loadObjMtl("../models/Jirafa/jirafa5/", "jirafa5.mtl", "jirafa5.obj");
}

function initSound3D() {
  // Create an AudioListener and add it to the camera
  const listener = new THREE.AudioListener();
  camara.add(listener);

  // Create the Audio object
  sound3D = new THREE.Audio(listener);

  // Load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load("../audio/jirafaFondo.mp3", function (buffer) {
    sound3D.setBuffer(buffer);
    sound3D.setLoop(true);
    sound3D.setVolume(0.04);
    sound3D.play();
  });
}
