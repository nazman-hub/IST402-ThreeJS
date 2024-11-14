import * as THREE from 'three';

var scene, camera, renderer, canvas, cube;

// This function is to make some variables accessible in the console tool
// With module in JavaScript programming, variable access are limited to a module.
// To access variable in this application in the console tool, we need this function.
function exportComponents() {
	window.THREE = THREE;
	window.camera = camera;
	window.scene = scene;
	window.renderer = renderer;
	window.cube = cube;
}

function main() {

	// Initialize the canvas and the renderer
	var canvas = document.getElementById('threejs_canvas');
	renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

	// Parameters for projection transformation matrix
	var fov = 75;
	var aspect = canvas.width/canvas.height; 
	var near = 0.2;
	var far = 100;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 3; // Set up the camera position

	// Create a scene, the root that collects all objects.
	scene = new THREE.Scene();

	// Create a light and add it into the scene
	var light = new THREE.DirectionalLight(0xFFffff, 1.0);
	light.position.set(1, 1, 8);
	scene.add(light);

	// Build a cube with a box primitive 
	var boxWidth = 1;
	var boxHeight = 1;
	var boxDepth = 1;
	var geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	// Set up the material for the box
	var material = new THREE.MeshStandardMaterial( { color: 0xffffff})

	// Create a cube mesh based on the primitive and material
	cube = new THREE.Mesh(geometry, material);

	// Attached the cube to the scene
	scene.add(cube);

	render();
	exportComponents();

}

function render(){
    // Adjust the ratio based on browser size
    if (resizeRendererToDisplaySize(renderer)) {
        var canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.rotation.z += 0.01;
	
	renderer.render(scene, camera);
	requestAnimationFrame(render); // Animation

}

// Resize render
function resizeRendererToDisplaySize(renderer) {

    canvas = renderer.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    var needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

main();
