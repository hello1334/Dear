import { useEffect } from 'react';

import * as THREE from 'three';
import { OBJLoader, MTLLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

const Main3D = () => {
  const scene = new THREE.Scene();
  const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
  scene.add(ambientLight);

  const specularLight = new THREE.DirectionalLight(0xffffff, 2);
  specularLight.position.set(-5, -1.2, 5);
  specularLight.target.position.set(0, -1.2, 0);
  scene.add(specularLight);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const mtlLoader = new MTLLoader();
  mtlLoader.load('models/house/house.mtl', function (materials) {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(
      'models/house/house.obj',
      function (object) {
        object.position.set(3, -1.2, -1);
        object.rotation.y = -1;
        scene.add(object);
      },
      // called when loading is in progresses
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      function () {
        console.log('An error happened');
      },
    );
  });

  mtlLoader.load('models/mailbox/mailbox.mtl', function (materials) {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(
      'models/mailbox/mailbox.obj',
      function (object) {
        object.position.set(1, -1.2, -3);
        object.rotation.y = -0.6;
        scene.add(object);
      },
      // called when loading is in progresses
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      function () {
        console.log('An error happened');
      },
    );
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enableDamping = false;
  controls.maxPolarAngle = Math.PI / 2;
  controls.minPolarAngle = Math.PI / 2;
  controls.minAzimuthAngle = -Math.PI / 2.3;
  controls.maxAzimuthAngle = -Math.PI / 10;

  const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  };

  // camera.position.z = 7;
  camera.position.z = 0.05;
  camera.position.x = -0.05;

  useEffect(() => {
    animate();
  }, []);
  return <></>;
};

export default Main3D;
