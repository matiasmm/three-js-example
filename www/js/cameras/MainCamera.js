function MainCamera(width, height){
    var camera = new THREE.PerspectiveCamera(
        40, // Campo de visión
        (width / height), // Proporcion
        1,
        10000// Campo de visión
    );


    this.get = function(){
        return camera;
    }

}