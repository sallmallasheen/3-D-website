import * as THREE from "three";


const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 20, 140);
scene.background = new THREE.Color(0x000000);


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const path = new THREE.LineCurve3(
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, -150)
);


const geometry = new THREE.TubeGeometry(
  path,
  100,
  5,
  32,
  false
);

const material = new THREE.MeshStandardMaterial({
  color: 0x2b2b2b,
  side: THREE.BackSide,
  metalness: 0.4,
  roughness: 0.8
});

const tunnel = new THREE.Mesh(geometry, material);
scene.add(tunnel);
for (let i = 0; i < 30; i++) {

  const light = new THREE.PointLight(0xffcc66, 8, 12);

  light.position.set(
    0,
    3.5,
    -i * 5
  );

  scene.add(light);

}

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffdd88, 120);
pointLight.position.set(0, 0, 20);
pointLight.position.copy(camera.position);
pointLight.position.z -= 2;
scene.add(pointLight);
const roadGeometry = new THREE.PlaneGeometry(10, 150);

const roadMaterial = new THREE.MeshStandardMaterial({
  color: 0x222222
});

const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2;
road.position.set(0, -5, -75);
road.position.y = -5;
road.position.z = -75;

scene.add(road);
for (let i = 0; i < 30; i++) {

    const mark = new THREE.Mesh(

        new THREE.PlaneGeometry(0.4,2),

        new THREE.MeshBasicMaterial({
            color:0xffffff
        })

    );

    mark.rotation.x = -Math.PI/2;

    mark.position.set(
        0,
        -4.95,
        -i*5
    );

    scene.add(mark);

}



camera.position.set(18, 10, 25);
camera.lookAt(0, 0, -20);

let stage = 0;

function animate() {

  requestAnimationFrame(animate);

  if (stage === 0) {

    camera.position.x -= 0.03;
    camera.position.y -= 0.02;
    camera.position.z -= 0.05;

    camera.lookAt(0, 0, -20);

    if (
      camera.position.x <= 0 &&
      camera.position.y <= 0 &&
      camera.position.z <= 8
    ) {
      stage = 1;
    }

  } else {

    camera.position.z -= 0.15;
    camera.lookAt(0, 0, camera.position.z - 20);

  }
  pointLight.position.copy(camera.position);

  renderer.render(scene, camera);

}

animate();