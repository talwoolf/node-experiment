function Particle( x, y, radius )
{
	
	this.radius		= radius
	this.x			= x;
	this.y			= y;
	this.vx			= 0;
	this.vy			= 0;
	this.gravity	= 0;
	this.friction	= 1;
	this.alpha		= 1;
	this.fade		= 0;
	this.shrink		= 1;
	
	this.update = function()
	{
		this.vx 	*= this.friction;
		this.vy		*= this.friction;
		
		this.vy		+= this.gravity;
		
		this.x		+= this.vx;
		this.y		+= this.vy;
		
		this.radius	*= this.shrink;
		this.alpha	-= this.fade;
	}
	
	
	this.render = function( context )
	{
		if( this.alpha < 0.01 ) return; 
		
		context.fillStyle = "rgba(255,0,0,"+this.alpha+")";
		context.beginPath();
		context.arc( this.x, this.y, this.radius, 0, Math.PI*2, true ); 
		context.closePath();
		context.fill();
	}
}


function randomRange(min, max) {
	return ((Math.random()*(max-min)) + min); 
}
