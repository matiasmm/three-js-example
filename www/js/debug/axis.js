(function(global, $){

    global.axis = function(handler, axisLength){
        var axis = new THREE.AxisHelper(300);
        handler.__scene.add(axis);
        global.axis = axis;
        handler.__scene.add(new THREE.GridHelper(10000,200));
        $('.info').removeClass('hidden');
    };

})(window, jQuery);
