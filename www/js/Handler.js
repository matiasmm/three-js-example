function Handler(width, height){
    var self=this, renderer, scene, camera, controls, __callbacksUpdate = [];

    function initialize(){
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);

        document.body.appendChild(renderer.domElement);
        scene = new THREE.Scene;

        add();
        __addCamera();
        __addLights();
        self.__camera = camera;
        self.__scene = scene;
        self.__controls = controls;

        addCubo(); // Volar esto
    }

    function __addCamera(){
        var mainCamera = new MainCamera(width, height);
        camera = mainCamera.get();
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.userPan = false;
    }

    function __addLights(){
        var l = new LivingLight();
        scene.add(l.get());
    }

    function addCubo(){
    }

    function add(config, object){

    }

    function onUpdate(callback){
        __callbacksUpdate.push(callback);
    }

    function render(){
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        for(var k in __callbacksUpdate){
            __callbacksUpdate[k]();
        }
        controls.update();
    }

    self.render = render;
    self.add = add;
    self.onUpdate = onUpdate;

    initialize();
}


