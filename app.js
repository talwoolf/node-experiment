var express = require('express');
var app 	= express();
var server  = require('http').createServer( app );
var chat 	= require('socket.io').listen( server );

var hasUser	= false;
var currentUser;

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.use(express.errorHandler());
});


app.get( '/', function(req, res)
{
    var ua = req.header('user-agent');
    if(/mobile/i.test(ua)) {
        res.render('/public/mobile.html');
    } else {
        res.sendfile(__dirname + '/public/index.html');
    }
    
});

server.listen( 3000 );

// 
// var io	 		= require( 'socket.io' );
// var connect		= require( 'express' );
// 
// var app = connect().listen( 3000, function()
// {
	// console.log('connecting on 3000');
// });
// 	
// 
// app.get('/', function (req, res) {
  // res.sendfile(__dirname + '/index.html');
// });
// 	
// 

// var chat	= io.listen( app );

chat.sockets.on( 'connection', function( socket )
{
	if( currentUser === undefined ) currentUser = socket;
	console.log( 'connected from client' );
	
	chat.sockets.emit( 'entrance', { message : "this is a test message ::: " + socket.id } );
	
	socket.on( 'start-drawing', function( data )
	{
		chat.sockets.emit( 'animate');
	})
	
	socket.on( 'end-drawing', function( data )
	{
		chat.sockets.emit( 'stopAnimating' );
	})
	
	socket.on( 'draw', function( data )
	{
		chat.sockets.emit( 'move', { x : data.x, y : data.y, vx : data.vx, vy : data.vy } );
	})

} )







