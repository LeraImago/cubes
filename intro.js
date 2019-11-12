function main() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 45;
    const aspect = 2;  
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 150;
    
    let ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    
    const objects = [];
    function addObject(x, y, obj) {
        scene.add(obj);
        objects.push(obj);
    }
    
    function addLineGeometry(x, y, geometry) {
        const material = new THREE.LineBasicMaterial({color: 0xFF4500,
        linewidth: 1});
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);
    }
    function addLineGeometryB(x, y, geometry) {
        const material = new THREE.LineBasicMaterial({color: 0xFF6347,
        linewidth: 2});
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);
    }
    function addLineGeometryC(x, y, geometry) {
        const material = new THREE.LineBasicMaterial({color: 0xFF7F50});
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);
    }
    function addLineGeometryD(x, y, geometry) {
        const material = new THREE.LineBasicMaterial({color: 0xFFA07A});
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);
    }
    function addLineGeometryE(x, y, geometry) {
        const material = new THREE.LineBasicMaterial({color: 0x2E2F3E});
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);
    }
    function addLineGeometryF(x, y, geometry) {
        const material = new THREE.LineBasicMaterial({color: 0x696969});
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);
    }
    function addLineGeometryG(x, y, geometry) {
        const material = new THREE.LineBasicMaterial({color: 0xFF6347, linewidth: 2});
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);
    }
    function Cube(width, height, depth, addLineGeometry) {
        const i =  this.width;
        const k = this.height;
        const j = this.depth;
        addLineGeometry(1, -2, new THREE.WireframeGeometry(new THREE.BoxBufferGeometry(width, height, depth)));
    }
    let cubeA = new Cube( 1, 1, 1, addLineGeometry);
    let cubeB = new Cube( 2, 2, 2, addLineGeometry);
    let cubeC = new Cube( 4, 4, 4, addLineGeometryG);
    let cubeD = new Cube( 7, 7, 7, addLineGeometryB);
    let cubeE = new Cube( 10, 10, 10, addLineGeometryB);
    let cubeF = new Cube( 13, 13, 13, addLineGeometryB);
    let cubeG = new Cube( 16, 16, 16, addLineGeometryC);
    let cubeK = new Cube( 20, 20, 20, addLineGeometryC);
    let cubeL = new Cube( 25, 25, 25, addLineGeometryC);
    let cubeM = new Cube( 28, 28, 28, addLineGeometryD);
    let cubeN = new Cube( 32, 32, 32, addLineGeometryD);
    let cubeO = new Cube( 37, 37, 37, addLineGeometryD);
    let cubeP = new Cube( 45, 45, 45, addLineGeometryF);
    let cubeJ = new Cube( 55, 55, 55, addLineGeometryF);
    let cubeS = new Cube( 140, 100, 100, addLineGeometryE);
    
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
            }
        return needResize;
    }
    
    function render(time) {
        time *= 0.0001;
        
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        objects.forEach((obj, ndx) => {
            const speed = .1 + ndx * .05;
            const rot = time * speed;
            obj.rotation.x = rot;
            obj.rotation.y = rot;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
}
main();