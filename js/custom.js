(function (){
	
'use strict';


/* global Power0, Power1*/

// DOM
var obj = document.getElementById('obj');
var i = document.querySelector('i');

// CONST
var WH = 900,
	WW = 600,
	VALOCITY = 25;

// VARS
var pressed = false,
	raf,
	dist = WW/2,
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
		onUpdate: updateSpeed,
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
		onUpdate: updateSpeed,
		onUpdateParams: [speed],
		onComplete: continueFullSpeed
	});

}

function updateSpeed(speed) {

	i.textContent = parseInt(speed.val,10);
	dist += (speed.val-50)/VALOCITY;
	updatePosition();
}



function updatePosition () {
	
	dist += (speed.val-50)/VALOCITY;
	TweenMax.set(obj,{x:dist}); 
}

function continueFullSpeed() {

	updateSpeed(speed);
	i.textContent = parseInt(speed.val,10);
	raf =  window.requestAnimationFrame(continueFullSpeed);

}


	function init () {
		window.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mouseup', onMouseUp);
		onMouseUp(null);
	}

	// init();
	
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




/*
// 1/8 CIRCLE
tl.fromTo(obj, 0.5,{
		x: 50,
		y: 450
	}, {
	bezier: {
		type: 'quadratic',
		values: [{
			x: 50,
			y: 450
		},{
			x: 50,
			y: 450+dy/2
		}, {
			x: 50+dx,
			y: 450+dy
		}],
		autoRotate: true
	},
	ease: Power0.easeNone
});
*/

/*
// 1/4 CIRCLE
tl.fromTo(obj, 1,{
		x: 50,
		y: 450
	}, {
	bezier: {
		type: 'quadratic',
		values: [{
			x: 50,
			y: 450
		},{
			x: 50,
			y: 550
		}, {
			x: 150,
			y: 550
		}],
		autoRotate: true
	},
	ease: Power0.easeNone
});
*/


/*
// 2/4 CIRCLE
tl.fromTo(obj, 2,{
		x: 50,
		y: 450
	}, {
	bezier: {
		type: 'quadratic',
		values: [{
			x: 50,
			y: 450
		},{
			x: 50,
			y: 550
		}, {
			x: 150,
			y: 550
		},{
			x: 250,
			y: 550
		}, {
			x: 250,
			y: 450
		}],
		autoRotate: true
	},
	ease: Power0.easeNone
});
*/



/*
// 3/4 CIRCLE
tl.fromTo(obj, 3,{
		x: 50,
		y: 450
	}, {
	bezier: {
		type: 'quadratic',
		// curvines: 50,
		values: [{
			x: 50,
			y: 450
		},
		{
			x: 50,
			y: 550
		}, 
		{
			x: 150,
			y: 550
		},
		{
			x: 250,
			y: 550
		}, 
		{
			x: 250,
			y: 450
		}, 
		{
			x: 250,
			y: 350
		}, 
		{
			x: 150,
			y: 350
		}],
		autoRotate: true
	},
	ease: Power0.easeNone
});
*/



/*
// 3/4 + 1/8 CIRCLE
tl.to(obj, 3,{
	// 	x: 50,
	// 	y: 450
	// }, {
	bezier: {
		type: 'quadratic',
		// curvines: 50,
		values: [{
			x: 50,
			y: 450
		},
		{
			x: 50,
			y: 550
		}, 
		{
			x: 150,
			y: 550
		},
		{
			x: 250,
			y: 550
		}, 
		{
			x: 250,
			y: 450
		}, 
		{
			x: 250,
			y: 350
		}, 
		{
			x: 150,
			y: 350
		},
		// {
		// 	x: 150-dy/2,
		// 	y: 350
		// },{
		// 	x: 150-dy,
		// 	y: 350+dx
		// }
		],
		autoRotate: true
	},
	ease: Power0.easeNone
});
*/





// tl.add(TweenMax.fromTo(obj,1,{x:200,y:300},{x:200,y:150, ease: Power0.easeNone }));
// tl.add(TweenMax.to(obj, 2, {
// 	bezier: {
// 		type:'quadratic',
// 		values: [{
// 			x: 200,
// 			y: 150
// 		}, {
// 			x: 150,
// 			y: 100
// 		}, {
// 			x: 100,
// 			y: 150
// 		}, {
// 			x: 150,
// 			y: 200
// 		}],
// 		autoRotate: true
// 	},
// 	ease: Power0.easeNone
// }));
// tl.add(TweenMax.to(obj,1,{x:300,y:200, ease: Power0.easeNone}));




//var obj = document.getElementById('obj');

/*
var tl = new TimelineMax();
tl.add(TweenMax.fromTo(obj, 5, {
	x: 310,
	y: 210
}, {
	bezier: {
		type:'soft',
		ease:Power0.easeNone,
		values: [{
			x: 150,
			y: 210
				}, {
			x: 50,
			y: 210
				}, {
			x: 50,
			y: 310
				}, {
			x: 50,
			y: 455
				}, {
			x: 50,
			y: 450
				}, {
			x: 50,
			y: 550
				}, {
			x: 150,
			y: 550
				}, {
			x: 150,
			y: 550
				}, {
			x: 250,
			y: 550
				}, {
			x: 250,
			y: 450
				}, {
			x: 250,
			y: 400
				}, {
			x: 250,
			y: 400
				}, {
			x: 230,
			y: 360
				}, {
			x: 270,
			y: 320
				}, {
			x: 230,
			y: 280
				}, {
			x: 250,
			y: 240
				}, {
			x: 250,
			y: 130
				}, {
			x: 250,
			y: 130
				}, {
			x: 250,
			y: 50
				}, {
			x: 330,
			y: 50
				}, {
			x: 470,
			y: 50
				}, {
			x: 470,
			y: 50
				}, {
			x: 550,
			y: 50
				}, {
			x: 550,
			y: 130
				}, {
			x: 550,
			y: 130
				}, {
			x: 550,
			y: 210
				}, {
			x: 470,
			y: 210
				}, {
			x: 310,
			y: 210
				}]
	}
}).repeat(1));*/