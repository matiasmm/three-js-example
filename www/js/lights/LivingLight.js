function LivingLight(){
    var light = new THREE.PointLight(0x4499ff);
    light.position.set(110, 110, 0);

    this.get = function(){
        return light;
    }
}