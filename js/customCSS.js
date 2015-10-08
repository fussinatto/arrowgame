(function (){
		
	'use strict';


	/* global Power0, Power1*/

	// DOM
	var obj = document.getElementById('arrow');

	// CONST
	var WH = 900,
		WW = 600,
		VALOCITY = 10;

	// VARS
	var pressed = false,
		raf,
		dist = WW,
		speed = {val: 0};

	TweenMax.set(obj,{x:310,y:210}); // Start

	var dx = 100*(1-Math.sqrt(2)/2);


	function onMouseDown(e) {

		pressed = true;
		window.cancelAnimationFrame(raf);
		TweenMax.killTweensOf(speed);
		TweenMax.to(speed, (100 - speed.val) / 100, {
			val: 100,
			ease: Power0.easeNone,
			onUpdate: updateArrow,
			onUpdateParams: [speed],
			onComplete: continueFullSpeed
		});
	}

	function onMouseUp(e) {

		pressed = false;
		window.cancelAnimationFrame(raf);
		TweenMax.killTweensOf(speed);
		TweenMax.to(speed, speed.val / 100 * 1, {
			val: 0,
			ease: Power0.easeNone,
			onUpdate: updateArrow,
			onUpdateParams: [speed],
			onComplete: continueFullSpeed
		});
	}

	function updateArrow(speed) {
		updatePos(speed, false);
	}

	function continueFullSpeed() {
		updatePos(speed, true);
	}

	function updatePos (speed, callraf){
		callraf = callraf || false;

		dist += (speed.val-50)/VALOCITY;
		TweenMax.set(obj,{x:dist}); 

		if(dist <= 0 || dist >= WW){
			loser();
			return;
		} else {
			if (callraf) raf =  window.requestAnimationFrame(continueFullSpeed);
		}
	}



	function loser () {
		window.removeEventListener('mousedown', onMouseDown);
		window.removeEventListener('mouseup', onMouseUp);
		TweenMax.killTweensOf(speed);
		console.log('LOSER');
	}


	function init () {
		window.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mouseup', onMouseUp);
		onMouseUp(null);
	}

	init();
	
})();





/// POLIFILS
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
})();