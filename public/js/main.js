
var socket;
var _canvas;
var _context;

var _stageWidth;
var _stageHeight;
var _particleImage;
var MAX_PARTICLES = 200;

var _mouseX	= 0;
var _mouseY = 0;
var _lastX	= 0;
var _lastY	= 0;
var _mouseVelX = 0;
var _mouseVelY = 0;
var _particleContainer = [];
var _requentAnim;

window.onload = function()
{
	console.log('MAin HTML Connected');
	
	socket = io.connect( 'http://localhost' );
	// socket.on( 'entrance', function( data )
	// {
		// console.log(data.message);
		// // document.write( data.message );
	// })	
// 	
	// socket.on( 'paint', function( data )
	// {
		// console.log(data.x);
		// // document.write( data.message );
	// })	
	
	 socket.on( 'animate', function(  )
	 {
	 	 animate();
	 	 console.log('animate');
	 })
	 
	 socket.on( 'stopAnimating', function(  )
	 {
	 	stopAnimating();
	 	console.log('Stop animating');
	 })
	 
	 socket.on( 'move', function( data )
	 {
	 	_mouseX = data.x;
		_mouseY	= data.y;
		_mouseVelX 	= data.vx;
		_mouseVelY	= data.vy;
		
	 })
	
	initCanvas();
}


function initCanvas()
{
	_canvas 		= $('#canvas')[ 0 ];
	_context		= _canvas.getContext( '2d' );
	
	_canvas.width 	= $(window).width();
	_canvas.height 	= $(window).height();
	
	_stageWidth		= _canvas.width;
	_stageHeight	= _canvas.height;
	
	_mouseX			= _stageWidth >> 1;
	_mouseY			= _stageHeight >> 1;
	_lastX			= _mouseX;
	_lastY			= _mouseY;
	
	_particleImage		= new Image();
	_particleImage.src	= 'img/ParticleCyan.png';
	
}


function stopAnimating(  )
{
	window.cancelAnimationFrame( _requentAnim );
	_context.fillRect( 0, 0, _stageWidth, _stageHeight );
}


function createParticles( num )
{
	var i = num;
	var particle;
	var angle;
	var speed;
	
	while( --i > -1 )
	{
		particle 		= new ImageParticle( _mouseX, _mouseY, _particleImage );
		
		// angle			= Math.random() * Math.PI / 2; 	Math.PI / 4;
		// speed				= ( Math.random() * 10 ) + 10
		
		// particle.vx			= Math.sin( angle ) * speed;
		// particle.vy			= Math.cos( angle ) * speed;
		
		particle.radius		= randomRange(2,4);
		particle.vx			= randomRange(-6,6) + ( _mouseVelX * 0.4 );
		particle.vy			= randomRange(-6,6) + ( _mouseVelY * 0.4 );;
		particle.shrink		= 0.96;
		particle.fade		= 0.03;
		particle.alpha		= 1;
		
		particle.friction	= 0.97;
		particle.gravity	= 0.2;
		
		particle.shimmer = true;
		
		particle.compositeOperation = 'lighter'; 
		
		_particleContainer.push( particle );
	}
	
	while( _particleContainer.length > MAX_PARTICLES ){ _particleContainer.shift(); };
}

function animate()
{
	// _context.clearRect( 0, 0, _stageWidth, _stageHeight );
	_requentAnim = requestAnimationFrame( animate );
	
	_context.fillStyle	="rgb(0,0,0)";
	//context.fillStyle="rgba(0,0,0,0.2)";
	_context.fillRect( 0, 0, _stageWidth, _stageHeight );
	
	
	createParticles( 5 )
	
	var i = _particleContainer.length;
	var particle;
	while( --i > -1 )
	{
		particle = _particleContainer[ i ];
		particle.update();
		particle.render( _context );
	}
}

function randomRange(min, max) {
	return ((Math.random()*(max-min)) + min); 
}


