// setup
var yvelocity = 0;
var locked = false;
var wDown = false;
var aDown = false;
var sDown = false;
var dDown = false;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// handle resizing
window.onresize = function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

// skybox
var skyboxGeometry = new THREE.BoxGeometry(30, 30, 30);
var skyboxMaterials = [
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('sky.jpg'), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('sky.jpg'), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('sky.jpg'), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('ground.jpg'), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('sky.jpg'), side: THREE.BackSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('sky.jpg'), side: THREE.BackSide}),
]
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterials);
scene.add(skybox);

// cow
var cowGeometry = new THREE.BoxGeometry(1, 1, 1);
var cowMaterials = [
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('cow.jpeg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('cow.jpeg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('cow.jpeg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('cow.jpeg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('cow.jpeg')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('cow.jpeg')}),
]
var cow = new THREE.Mesh(cowGeometry, cowMaterials);
cow.position.y = -14
scene.add(cow);

// controls
var controls = new THREE.PointerLockControls(camera, document.body);
nw.Window.get().enterFullscreen();
controls.lock();
document.onkeydown = function(event) {
    if (event.code == 'KeyW') {
        wDown = true;
    }
    if (event.code == 'KeyS') {
        sDown = true;
    }
    if (event.code == 'KeyA') {
        aDown = true;
    }
    if (event.code == 'KeyD') {
        dDown = true;
    }
    if (event.code == 'Space') {
        if (yvelocity == 0) {
            yvelocity = 0.3;
        }
    }
    if (event.code == 'F11') {
        nw.Window.get().toggleFullscreen();
    }
}
document.onkeyup = function(event) {
    if (event.code == 'KeyW') {
        wDown = false;
    }
    if (event.code == 'KeyS') {
        sDown = false;
    }
    if (event.code == 'KeyA') {
        aDown = false;
    }
    if (event.code == 'KeyD') {
        dDown = false;
    }
}

// render loop
function loop() {
    if (wDown) {
        controls.moveForward(0.1);
    }
    if (sDown) {
        controls.moveForward(-0.1);
    }
    if (dDown) {
        controls.moveRight(0.1);
    }
    if (aDown) {
        controls.moveRight(-0.1);
    }
    camera.position.y += yvelocity;
    if (camera.position.y <= -14) {
        yvelocity = 0;
        camera.position.y = -14;
    }
    else {
        yvelocity -= 0.01;
    }
    if (cow.position.x > camera.position.x) {
        cow.position.x -= 0.05;
    }
    if (cow.position.x < camera.position.x) {
        cow.position.x += 0.05;
    }
    if (cow.position.z > camera.position.z) {
        cow.position.z -= 0.05;
    }
    if (cow.position.z < camera.position.z) {
        cow.position.z += 0.05;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);