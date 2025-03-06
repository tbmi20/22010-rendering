import * as THREE from 'three';
import { EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Highlight edges of the cube
const edges = new EdgesGeometry(geometry);
const edgeMaterial = new LineBasicMaterial({ color: 0x000000 });
const edgeLines = new LineSegments(edges, edgeMaterial);
cube.add(edgeLines);

camera.position.z = 5;

let rotationAxis = 'z';

document.addEventListener('keydown', (event) => {
    if (event.key === '1') {
        rotationAxis = 'x';
    } else if (event.key === '2') {
        rotationAxis = 'y';
    } else if (event.key === '3') {
        rotationAxis = 'z';
    }
    // Reset rotation when switching axis
    cube.rotation.set(0, 0, 0);
});

function animate() {
    if (rotationAxis === 'x') {
        cube.rotation.x += 0.01;
    } else if (rotationAxis === 'y') {
        cube.rotation.y += 0.01;
    } else if (rotationAxis === 'z') {
        cube.rotation.z += 0.01;
    }
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
