(function(global){
    function Player(handler, lookAround){
        var self=this,
            keyboard = new THREEx.KeyboardState(),
            clock = new THREE.Clock(),
            scene = handler.__scene,
            camera = handler.__camera,
            cameraControls = handler.__controls,
            player,
            height = 180,

            jumping = false,
            jumpHeight = 70,
            a = 980, //Gravity
            jumpMaxVelocitiy,
            floor;

        function initialize(){
            var material, cubeGeom = new THREE.BoxGeometry( 5, height, 5 );

            jumpMaxVelocitiy = Math.sqrt(2*a*jumpHeight);

            material = new THREE.MeshPhongMaterial({
                // light
                specular: '#a9fcff',
                // intermediate
                color: '#00abb1',
                // dark
                emissive: '#006063',
                shininess: 100
            });

            player = new THREE.Mesh(cubeGeom, material);
            player.position.set( 0, height/2, 0 );
            //player.useQuaternion = true;
            scene.add( player );
            handler.onUpdate(self.onUpdate);
            self.lookAround = lookAround;
            document.addEventListener( 'mousedown', onDocumentMouseDown, false );
            self.player = player;
            self.r1 = 0;
            self.r2 = 1;
            self.r3= 600;
        }



        function onDocumentMouseDown( event ) {
            event.preventDefault();
            self.lookAround = true;
            cameraControls.center.copy( player.position );
            document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        }

        function onDocumentMouseUp( event ) {
            self.lookAround = false;
            document.removeEventListener( 'mouseup', onDocumentMouseUp );
        }

        function jump(){
            var t = jumping.getElapsedTime(), x, v;

            v = jumpMaxVelocitiy - a * t;
            x = (Math.pow(jumpMaxVelocitiy,2) - Math.pow(v,2))  / 2/a;

            if(x < 0) x=0;

            if (v<= -jumpMaxVelocitiy){
                jumping = false;
            }

            player.position.y = floor + x;

        }

        function onUpdate(){
            var delta = clock.getDelta(); // seconds.
            var moveDistance = 200 * delta; // 200 pixels per second
            var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second

            TWEEN.update();

            // move forwards/backwards/left/right
            if ( keyboard.pressed("W") )
                player.translateZ( -moveDistance );
            if ( keyboard.pressed("S") )
                player.translateZ(  moveDistance );
            if ( keyboard.pressed("Q") )
                player.translateX( -moveDistance );
            if ( keyboard.pressed("E") )
                player.translateX(  moveDistance );

            // rotate left/right/up/down
            var rotation_matrix = new THREE.Matrix4().identity();
            if ( keyboard.pressed("A") )
                player.rotateY(rotateAngle);

            if(keyboard.pressed(' '))
                if(jumping == false){
                    jumping = new THREE.Clock();
                    floor = player.position.y;
                }


            if ( keyboard.pressed("D") )
                player.rotateY(-rotateAngle);
            if ( keyboard.pressed("R") )
                player.rotateX(rotateAngle);
            if ( keyboard.pressed("F") )
                    player.rotateX(-rotateAngle);
            if ( keyboard.pressed("A") || keyboard.pressed("D") ||
                keyboard.pressed("R") || keyboard.pressed("F") ) {
            }

            if(jumping)
                jump();

            camera.lookAt(player.position);

            var relativeCameraOffset = new THREE.Vector3(self.r1, self.r2, self.r3);
            var cameraOffset = relativeCameraOffset.applyMatrix4(player.matrixWorld);

            // Camera TWEEN.
            if (!self.lookAround) {
                new TWEEN.Tween( camera.position ).to( {
                    x: cameraOffset.x,
                    y: height,
                    z: cameraOffset.z }, 20 )
                    .interpolation( TWEEN.Interpolation.Bezier )
                    .easing( TWEEN.Easing.Sinusoidal.InOut ).start();

                camera.lookAt(player.position);
                cameraControls.center.copy( player.position );
            }else{
                camera.lookAt(player.position);
            }
        }

        self.onUpdate = onUpdate;
        initialize();
    }

    global.Player = Player;

})(window);
