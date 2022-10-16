
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    var vertices = [
		vec2( 0.0, 1.0),
		vec2(-0.4, 0.6), 
		vec2( 0.4, 0.6), 
		vec2( 0.0, 0.6),
		vec2(-0.4, 0.2), 
		vec2( 0.4, 0.2), 
		vec2( 0.0, 0.2),
		vec2(-0.4, -0.2), 
		vec2( 0.4, -0.2), 
	];
	
	var treeBottomVertices = [
		vec2(-0.13, -0.2),
		vec2(-0.13, -0.6),
		vec2( 0.13, -0.2),
		vec2( 0.13, -0.6),
	];
	
	//var treeBottomVertics = 
	gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );

    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	var uColor = gl.getUniformLocation(program, "uColor");
	gl.uniform4fv(uColor, [0.0, 1.0, 0.0, 1.0]);

	gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 9 );
	
	// Draw Tree's Bottom
	gl.bufferData( gl.ARRAY_BUFFER,flatten(treeBottomVertices), gl.STATIC_DRAW );

	gl.uniform4fv(uColor, [0.5, 0.3, 0.2, 1.0]);
	
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4);
};

