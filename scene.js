import * as THREE from 'libs/three.module.js';
import { OrbitControls } from '/libs/OrbitControls_m.js';
import { Water } from '/Water.js';
import { Sky } from '/Sky.js';

let renderer;
let scene;
let camera;
let water;
let objects = [];

init();
animate();

function init() {
	let container = document.getElementById( 'c' );
	scene = new THREE.Scene();
	
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 
		120, 
		window.innerWidth / window.innerHeight, 
		1, 
		20000 );
	camera.position.set( 20, 40, 80 );
	
	let light = new THREE.DirectionalLight( 0xffffff, 0.8 );
	
	let spotLight = new THREE.SpotLight(0xfffb3d, 0.7);
	spotLight.position.set( -50, 200, 30 );
	spotLight.castShadow = true;
	//water
	let waterGeometry = new THREE.PlaneBufferGeometry( 10000, 10000 );
	water = new Water(
		waterGeometry,
		{
			textureWidth: 512,
			textureHeight: 512,
			waterNormals: new THREE.TextureLoader().load( 'waternormals.jpg', function ( texture ) {
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			} ),
			alpha: 1.0,
			sunDirection: light.position.clone().normalize(),
			sunColor: 0xff5e14,
			waterColor: 0x091823,
			distortionScale: 3.7,
			fog: scene.fog !== undefined
		}
	);
	water.rotation.x = - Math.PI / 2;
	water.castShadow = true;
	// Sky
	let sky = new Sky();
	let uniforms = sky.material.uniforms;
	uniforms[ 'turbidity' ].value = 10;
	uniforms[ 'rayleigh' ].value = 2;
	uniforms[ 'luminance' ].value = 1;
	uniforms[ 'mieCoefficient' ].value = 0.005;
	uniforms[ 'mieDirectionalG' ].value = 0.8;
	let parameters = {
		distance: 200,
		inclination: 0.47,
		azimuth: 0.405
	};
	let cubeCamera = new THREE.CubeCamera( 0.1, 1, 512 );
	cubeCamera.renderTarget.texture.generateMipmaps = true;
	cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipmapLinearFilter;
	scene.background = cubeCamera.renderTarget;

	function updateSun() {
		let theta = Math.PI * ( parameters.inclination - 0.5 );
		let phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );
		light.position.x = parameters.distance * Math.cos( phi );
		light.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
		light.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );
		sky.material.uniforms[ 'sunPosition' ].value = light.position.copy( light.position );
		water.material.uniforms[ 'sunDirection' ].value.copy( light.position ).normalize();
		cubeCamera.update( renderer, sky );
	}
	updateSun();

	scene.add( 
		light,
		spotLight,
		water );

    function addObject(x, y, obj) {
        scene.add(obj);
        objects.push(obj);
    }
    function addCubeGeometryA(x, y, geometry) {
        let material = new THREE.MeshPhysicalMaterial({
			color: 0xff5e14,
			opacity: 0.3,
			transparent: true,
			side: THREE.DoubleSide,
			emissive: 0x333030,
			wireframe: false,
			roughness: 0.5,
			metalness: 0.93,
			reflectivity: 0.7});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        addObject(x, y, mesh);
    }
	function addCubeGeometryB(x, y, geometry) {
	    let material = new THREE.MeshPhysicalMaterial({
			color: 0xffc23f,
			opacity: 0.3,
			transparent: true,
			side: THREE.DoubleSide,
			emissive: 0x332332,
			wireframe: false,
			roughness: 0.1,
			metalness: 0.93,
			reflectivity: 0.9});
	    const mesh = new THREE.Mesh(geometry, material);
	    mesh.castShadow = true;
	    addObject(x, y, mesh);
    }

    function Cube(width, height, depth) {
        const i =  this.width;
        const k = this.height;
        const j = this.depth;
        addCubeGeometryA(1, -2, new THREE.IcosahedronGeometry((width, height, depth)));
        addCubeGeometryB(1, -2, new THREE.IcosahedronGeometry((width, height, depth)));
    }
    let cubeA = new Cube( 1, 1, 1, addCubeGeometryA);
    let cubeC = new Cube( 4, 4, 4, addCubeGeometryB);
    let cubeD = new Cube( 7, 7, 7, addCubeGeometryA);
    let cubeE = new Cube( 10, 10, 10, addCubeGeometryB);
    let cubeG = new Cube( 16, 16, 16, addCubeGeometryA);
    let cubeK = new Cube( 20, 20, 20, addCubeGeometryB);
    let cubeL = new Cube( 25, 25, 25, addCubeGeometryA);
    let cubeN = new Cube( 32, 32, 32, addCubeGeometryB);
    let cubeO = new Cube( 37, 37, 37, addCubeGeometryA);
    let cubeP = new Cube( 45, 45, 45, addCubeGeometryB);
    let cubeJ = new Cube( 55, 55, 55, addCubeGeometryA);
    let cubeW = new Cube( 75, 75, 75, addCubeGeometryB);
    let cubeV = new Cube( 85, 85, 85, addCubeGeometryA);
	let cubeS = new Cube( 100, 100, 100, addCubeGeometryB);

	let controls = new OrbitControls( camera, renderer.domElement );
	controls.maxPolarAngle = Math.PI * 0.495;
	controls.target.set( 0, 10, 0 );
	controls.minDistance = 100.0;
	controls.maxDistance = 120.0;
	controls.update();
	
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
	requestAnimationFrame( animate );
	render();
}
function render() {
	let time = performance.now() * 0.0001;
	objects.forEach((obj, ndx) => {
            const speed = .1 + ndx * .05;
            const rot = time * speed;
            obj.rotation.x = rot;
            obj.rotation.y = rot;
});
	water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
	renderer.render( scene, camera );
}
