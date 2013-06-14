
var socket;
var _canvas;
var _context;
var _mouseX	= 0;
var _mouseY = 0;
var _lastX	= 0;
var _lastY	= 0;
var _mouseVelX = 0;
var _mouseVelY = 0;

window.onload = function()
{
	console.log('MOBILE HTML Connected');
	socket = io.connect( 'http://localhost' );
	addListeners();
}

function addListeners()
{
	window.addEventListener( 'mousedown', mouseDown_handler );
}

function mouseDown_handler( event )
{
	window.removeEventListener( 'mousedown', mouseDown_handler );
	window.addEventListener( 'mousemove', mouseMove_handler );
	window.addEventListener( 'mouseup', mouseUp_handler );
	
	socket.emit( 'start-drawing' );
}


function mouseUp_handler( event )
{
	window.removeEventListener( 'mousemove', mouseMove_handler );
	window.addEventListener( 'mousedown', mouseDown_handler );
	socket.emit( 'end-drawing' );
}

function mouseMove_handler( event )
{
	_mouseX = event.clientX;
	_mouseY	= event.clientY;
	
	_mouseVelX 	= _mouseX - _lastX;
	_mouseVelY	= _mouseY - _lastY;
	
	_lastX		= _mouseX;
	_lastY		= _mouseY;
	
	socket.emit( 'draw', { x : _mouseX, y : _mouseY, vx : _mouseVelX, vy : _mouseVelY } );
}