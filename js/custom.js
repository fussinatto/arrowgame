(function () {

	//DOM
	var arrow = document.querySelector('.arrow');
	
	// CONSTS
	var NUM_FRAMES = 100;

	//VARIABLES
	var speed = 0;
	var rotation = 0;
	var pressed = false;
	var vw = window.innerWidth/2;
	var fs = 0;


	// FUNCT

	var updateRotation = function () {

		if( pressed ){
			if( rotation < NUM_FRAMES ) rotation++;
		} else {
			if( rotation ) rotation--;
		}
		// console.log(speed, rotation);
		fs = (speed - rotation*2)/NUM_FRAMES*vw;
		fs = parseInt(fs,10);
		console.log(fs);

		arrow.style.transform = 'translateX(' + fs+ 'px)';


		window.requestAnimationFrame(updateRotation);
	};

	var updateSpeed = function () {
		if( speed < NUM_FRAMES ){
			speed++;
			window.requestAnimationFrame(updateSpeed);
		} 
	};


	function onMouseDown(e) {
		pressed = true;
		arrow.classList.add('going-right');
	}

	function onMouseUp(e) {
		pressed = false;
		arrow.classList.remove('going-right');
	}

	function init () {
		window.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mouseup', onMouseUp);
		updateRotation();
		updateSpeed();
	}


	init();

})();


(function() {
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame'] || window[vp+'CancelRequestAnimationFrame']);
    }
    if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = new Date().getTime();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.caf = clearTimeout;
    }
}());