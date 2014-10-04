(function(global){
    function Wall(config){
        var self=this,
            colors= ['#eeeeee', '#fffeee', '#ff0000', '#00ff00'];

        function initialize(){
            var exp = 10,
                diffX = exp/2,
                diffZ = exp/2;

            var material = new THREE.MeshPhongMaterial({
                specular: '#a9fcff',
                color: colors[config.color],
                emissive: '#eeeeee',
                shininess: 100
            });

            if(config.axis == 'z'){
                var geo = new THREE.BoxGeometry(exp, 250, config.width);
                diffZ = config.width/2;
            }else{
                var geo = new THREE.BoxGeometry(config.width, 250, exp);
                diffX = config.width/2;
            }

            self.mesh = new THREE.Mesh(geo, material);
            self.mesh.position.x = config.x + diffX;
            self.mesh.position.y = 125;
            self.mesh.position.z = -config.z - diffZ;

            self.config = config;

        }

        initialize();

    }
    global.walls.Wall = Wall;
})(window);


