var scene, renderer, controls, camera, clock, cube, width, height;

function init() {
    //create scene and setup renderer
    myWorks = document.getElementById("myworks");
    width = myWorks.offsetWidth/2, 
    height = myWorks.offsetHeight / 1.5;
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(width, height);
    renderer.setClearColor( 0x000000, 0 );
    //add renderer to page
    myWorks.appendChild(renderer.domElement);
    var child = myWorks.getElementsByTagName("canvas")[0];
    child.style.top = "calc(" + myWorks.offsetTop + "px - " + "3%)";
    child.style.left = "25%";

    camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 10000);
    clock = new THREE.Clock();

    /*************************************
            Cube
    *************************************/
    //define width, height, and depth of cube
    var cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
    var cubeTexture = new THREE.ImageUtils.loadTexture('assets/images/cube.png');
    var cubeEye = new THREE.ImageUtils.loadTexture('assets/images/cubeeye.png')
    //define material for cube
    var materials = [];
    materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture}));
    materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture}));
    materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture}));
    materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture}));
    materials.push(new THREE.MeshLambertMaterial({ map: cubeEye}));
    materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture}));  
    var cubeMaterial = new THREE.MeshFaceMaterial(materials);
    //define the cube
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    
    /*************************************
            Skybox
    *************************************/
    //create a skybox that is the max drawn position of the scene
    var skyboxGeometry = new THREE.BoxGeometry(10000,10000,10000);
    //create a white skybox and display it on its backside(inside of the box)
    var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x444444, side: THREE.BackSide });
    //create the skybox
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

    /*************************************
            PointLight
    *************************************/
    //add a light to the scene so the box is not black
    var pointLight = new THREE.PointLight(0xffffff);
    //move the position to the right, up, and back
    pointLight.position.set(100,75,200);
    //add a light to the scene so the box is not black
    var pointLight2 = new THREE.PointLight(0xffffff);
    //move the position to the right, up, and back
    pointLight2.position.set(-100,75,200);

    //move the camera back
  camera.position.z = 400;
  //move the camera up
  camera.position.y = 160;
  //look at cube
  camera.lookAt(cube.position);

    scene.add(cube);
    //scene.add(skybox);
    scene.add(pointLight);
    scene.add(pointLight2);
    scene.add(camera);

    //start render loop
    requestAnimationFrame(update);
}

function update() {
    requestAnimationFrame(update);
    document.body.addEventListener("mousemove", function(event){
        //update the mouse position and have the cube look at it
        mouse3D = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
        cube.lookAt(mouse3D);
    });
    // Fetch the delta from THREE.js clock.
    var delta = clock.getDelta();
    renderer.render(scene, camera);


}

// Load up the scene when the DOM finishes loading.
window.addEventListener('DOMContentLoaded', init, false);