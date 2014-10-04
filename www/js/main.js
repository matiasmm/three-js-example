(function(global){
    var width = window.innerWidth,
        height = window.innerHeight,
        handler,
        player;

    handler = new Handler(width, height);
    handler.render();
    player = new Player(handler, false);

    global.walls.init(handler);


    global.handler = handler;
    global.player = player;
    global.axis(handler, 1000);
    global.width = width;
    global.height = height;
})(window);