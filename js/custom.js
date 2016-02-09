(function (){
		
	'use strict';

// Test
	/* global Power0, Power1*/

	// CONST
	var WH = 600,
		WW = 600,
		VALOCITY = 10;

	// DOM
	var canvas = document.getElementById('playground'),
		ctx = canvas.getContext('2d');

	// VARS
	var	dist = WW,
		speed = {val: 0};

	canvas.height = WH;
	canvas.width = WW;

	

	function onMouseDown(e) {

		TweenMax.killTweensOf(speed);
		TweenMax.to(speed, (100 - speed.val) / 100, {
			val: 100,
			ease: Power0.easeNone
		});
	}

	function onMouseUp(e) {

		TweenMax.killTweensOf(speed);
		TweenMax.to(speed, speed.val / 100 * 1, {
			val: 0,
			ease: Power0.easeNone
		});
	}

	function draw (dist) {
		ctx.clearRect(0,0,WW,WH);
		ctx.fillRect(dist-10,WH/2-10,20,20);
	}

	function updatePos (){

		dist += (speed.val-50)/VALOCITY;

		if(dist > 0 && dist < WW){
			draw(dist);
			window.requestAnimationFrame(updatePos);
		} else {
			loser();
			return;
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
		updatePos();
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