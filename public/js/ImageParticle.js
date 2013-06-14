function ImageParticle( x, y, image )
{
	var TO_RADIANS 			= Math.PI / 180; 
	
	this.radius				= 0;
	this.x					= x;
	this.y					= y;
	this.vx					= 0;
	this.vy					= 0;
	this.gravity			= 0;
	this.friction			= 1;
	this.alpha				= 1;
	this.fade				= 0;
	this.shrink				= 1;
	this.shimmer			= false;
	this.spin 				= 0; 
	this.rotation 			= 0; 
	this.compositeOperation = 'source-over';
	this.image				= image;
	this.maxSize			= -1; 
	this.rotation			= 0;
	
	
	this.update = function()
	{
		this.vx 	*= this.friction;
		this.vy		*= this.friction;
		
		this.vy		+= this.gravity;
		
		this.x		+= this.vx;
		this.y		+= this.vy;
		
		this.radius	*= this.shrink;
		
		if((this.maxSize>0) && (this.radius>this.maxSize))
			this.radius = this.maxSize; 
		
		this.alpha	-= this.fade;
		if(this.alpha<0) this.alpha = 0; 
		
		this.rotation += this.spin; 
	}
	
	
	this.render = function( context )
	{
		if( this.alpha === 0 ) return; 
		
		context.save();
		context.translate( this.x, this.y );
		
		var s = this.shimmer ? this.radius * Math.random() : this.radius; 
		context.scale( s, s );
		context.rotate( this.rotation * TO_RADIANS )
		context.translate( this.image.width * -0.5, this.image.height  * -0.5 );
		context.globalAlpha = this.alpha;
		context.globalCompositeOperation = this.compositeOperation;
		context.drawImage( this.image, 0, 0 );
		context.restore();
		
	}
}

