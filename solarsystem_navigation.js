import * as THREE from 'three';

var objects = [], objectRotationFlag = [], objectRotationTime = [];
var solarSystem = new THREE.Object3D();
export var canvas, renderer, scene;

export var camera;

var rotationSpeed = 0.01;
var atX = 0, atY = 0, atZ = 0;

function init() {

    // Set up radio button action
    var radioButtons = document.querySelectorAll('input[name="viewpoint"]');
    radioButtons.forEach((button) => {
        button.addEventListener("change", (event) => {
            radioButtonCheck(event.target.value); // the selected value
        });
    });

    // Set up checkbox actions
    document.getElementById('solarsystem').addEventListener('click', () => {
        objectRotationFlag[0] = document.getElementById('solarsystem').checked;
        objectRotationTime[0] =undefined;
    });

    document.getElementById('sun').addEventListener('click', () => {
        objectRotationFlag[1] = document.getElementById('sun').checked;
        if (!objectRotationFlag[1])
            objectRotationTime[1] =undefined;
        });
    document.getElementById('earth').addEventListener('click', () => {
        objectRotationFlag[2] = document.getElementById('earth').checked;
        if (!objectRotationFlag[2])
            objectRotationTime[1] =undefined;
    });

    // Set up button action 
    document.getElementById("right").onclick = function(){move(-2.0, 0, 0);};
    document.getElementById("left").onclick = function(){move(2.0, 0, 0);};
    document.getElementById("up").onclick = function(){move(0, 2.0, 0);};
    document.getElementById("down").onclick = function(){move(0, -2.0, 0);};
    document.getElementById("forward").onclick = function(){move(0, 0, -2.0);};
    document.getElementById("backward").onclick = function(){move(0,0, +2.0);};
    document.getElementById("turnright").onclick = function(){turn(.628);};
    document.getElementById("turnleft").onclick = function(){turn(-0.628);};
 
    // Get the canvas variable
    canvas = document.getElementById('threejs_canvas');

    // Get the render variable
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    // Set up projection parameters
    var fov = 40;
    var aspect = 2;
    var near = 0.1;
    var far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Camera parameters
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(atX, atY, atZ);

    // Create the scene variable, the root to hold all objects
    scene = new THREE.Scene();
    {
        var color = 0xFFFFFF;
        var intensity = 500;
        var light = new THREE.PointLight(color, intensity);
        scene.add(light);
    } // color, light for the scene

    scene.add(solarSystem); // solar system, a 3D object, as a child of scene

    objects.push(solarSystem); //An object array to hold all objects

    // Set up a basic sphere
    var radius = 1;
    var widthSegments = 32;
    var heightSegments = 32;
    var sphereGeometry = new THREE.SphereGeometry(
        radius, widthSegments, heightSegments);
    // Load the texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('textures/Earth.jpg');
    const sunTexture = textureLoader.load('textures/Sun.jpg');
    const marsTexture = textureLoader.load('textures/Mars.jpg');
    // Create the Sun as a sphere object
    
    var sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture }); // Yellow
    var sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5); // Size
    sunMesh.name = "sun"; // name

    solarSystem.add(sunMesh); // Add the sun mesh into the solar system
    objects.push(sunMesh); // Add the sun into the objects array

    // Create the Earth
    var earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture }); 
    var earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthMesh.position.x = 10; // Distance to the origin (or the Sun)
    earthMesh.name = "earth";

    solarSystem.add(earthMesh); // Add the earth mesh into the solar system
    //scene.add(earthMesh);  // Add the earth mesh at the root level
    objects.push(earthMesh); // Add the earth into the objects array

    // Statements to make variables accessible in the console tool of developer tools
    window.scene = scene;
      window.camera = camera;

    requestAnimationFrame(render); // Animation

}

// Render function
function render() {

    // Adjust the ratio based on browser size
    if (resizeRendererToDisplaySize(renderer)) {
        var canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    // All objects rotate: the solar syste, the sun, and the eartch
    objects.forEach((obj, ind) => {
        if (objectRotationFlag[ind])
            obj.rotation.y += rotationSpeed;       
    });


    //Call the render function to render the scene based on camera location
    renderer.render(scene, camera);

    // Repeat the rendering for aniation 
    requestAnimationFrame(render);

}

// Switch between two viewpoints
function radioButtonCheck(viewpoint) {
    if (viewpoint == 'top') {
        camera.position.set(0, 50, 0);
        camera.up.set(0, 0, 1);
        camera.lookAt(atX, atY, atZ);
    } else if (viewpoint == 'side') {
        camera.position.set(50, 0, 0);
        camera.up.set(0, 1, 0);
        camera.lookAt(atX, atY, atZ);
    }
}

// Resize render
function resizeRendererToDisplaySize(renderer) {

    var canvas = renderer.domElement;
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    var needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}


function move(x, y, z){
    camera.translateX(x);
    camera.translateY(y);
    camera.translateZ(z);
}

function turn(dgr){
    camera.rotation.y += dgr;
}

init();
