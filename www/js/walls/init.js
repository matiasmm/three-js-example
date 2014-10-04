(function(global){
    function init(handler){
        var configs = global.walls.config,
            Wall = global.walls.Wall,
            wall;

        for(var k in configs){
            wall = new Wall(configs[k]);
            global.walls.items.push(wall);
            handler.__scene.add(wall.mesh);
        }
    }

    function get(label){
        var wall;
        for(var k in global.walls.items){
            wall = global.walls.items[k];
            if(wall.config.label == label)
                return wall;
        }
    }


    global.walls = {};
    global.walls.init = init;
    global.walls.get = get;
    global.walls.items = [];
})(window);