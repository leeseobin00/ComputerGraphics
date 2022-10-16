
var gl;
var points;

window.onload = function init()	
// By default, it is fired when the document’s window is ready for representation
{
    var canvas = document.getElementById( "gl-canvas" );	
		// It gives us a reference to the canvas

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	var treeVertices = [
		// First Tree Leaves
        vec2(-0.6,  0.50), //v0
        vec2(-0.75, 0.35), //v1
        vec2(-0.45, 0.35), //v2
        vec2(-0.6,  0.35), //v3
        vec2(-0.75, 0.20), //v4
        vec2(-0.45, 0.20), //v5
		vec2(-0.6,  0.20), //v6
        vec2(-0.75, 0.05), //v7
        vec2(-0.45, 0.05), //v8
		
		// Second Tree Leaves
		vec2( 0.0,  0.50), //v0
        vec2(-0.15, 0.35), //v1
        vec2( 0.15, 0.35), //v2
		vec2( 0.0,  0.35), //v3
        vec2(-0.15, 0.20), //v4
        vec2( 0.15, 0.20), //v5
		vec2( 0.0,  0.20), //v6
        vec2(-0.15, 0.05), //v7
        vec2( 0.15, 0.05), //v8
		
		// Third Tree Leaves
		vec2(-0.3,  0.56), //v0
        vec2(-0.45, 0.41), //v1
        vec2(-0.15, 0.41), //v2
		vec2(-0.3,  0.41), //v3
        vec2(-0.45, 0.26), //v4
        vec2(-0.15, 0.26), //v5
		vec2(-0.3,  0.26), //v6
        vec2(-0.45, 0.11), //v7
        vec2(-0.15, 0.11), //v8
    ];
	
	// Field vertices
	var fieldVertices = [
        vec2(-1.0,  0.0), // v0
		vec2( 1.0,  0.0), // v1
		vec2( 1.0, -1.0), // v2
		vec2(-1.0, -1.0) // v3
    ];
	
	// First Tree Bottom Vertices
	var tree1bottomVertices = [
        vec2(-0.65,  0.05), // v0
		vec2(-0.65, -0.10), // v1
		vec2(-0.55,  0.05), // v2
		vec2(-0.55, -0.10) // v3
    ];
	
	// Second Tree Bottom Vertices
	var tree2bottomVertices = [
        vec2(-0.05,  0.05), // v0
		vec2(-0.05, -0.10), // v1
		vec2( 0.05,  0.05), // v2
		vec2( 0.05, -0.10) // v3
    ];
	
	// Third Tree Bottom Vertices
	var tree3bottomVertices = [
        vec2(-0.35,  0.11), // v0
		vec2(-0.35, -0.02), // v1
		vec2(-0.25,  0.11), // v2
		vec2(-0.25, -0.02) // v3
    ];	
	
	// House's Roof vertices
	var roofVertices = [
        vec2(0.55,  0.43), //v0
        vec2(0.80, 0.18), //v1
        vec2(0.30, 0.18), //v2
	];
	
	// House Bottom Vertices
	var houseVertices = [
        vec2(0.7, 0.18), // v0
		vec2(0.7, -0.1), // v1
		vec2(0.4, 0.18), // v2
		vec2(0.4, -0.1) // v3
    ];
	
	// Door vertices
	var doorVertices = [
        vec2(0.55, 0.1), // v0
		vec2(0.55, -0.1), // v1
		vec2(0.45, 0.1), // v2
		vec2(0.45, -0.1) // v3
    ];
	
	// Lake Vertices
	var lakeVertices = [
        vec2(-0.95, -0.55), //v0
        vec2(-0.70, -0.15), //v1
        vec2( 0.70, -0.15), //v2
        vec2( 0.95, -0.55), //v3
        vec2( 0.70, -0.95), //v4
        vec2(-0.70, -0.95), //v5
        vec2(-0.95, -0.55), //v6
    ];
	
	// Two Mountain Vertices
	var mountainVertices = [
		// Start first mountain
		vec2(-1.0,  0.0), //v0
        vec2(-0.4,  0.7), //v1
        vec2( 0.2,  0.0), //v2
		
		// Start second mountain
        vec2(-0.2,  0.0), //v3
        vec2( 0.4,  0.7), //v4
        vec2( 1.0,  0.0), //v5
	]; 
	
	// Sun vertices
	var sunVertices = [
		vec2( 0.06,  0.87), //v0
        vec2( 0.12,  0.8), //v1
        vec2( 0.12,  0.7), //v2
        vec2( 0.06,  0.63), //v3
        vec2(-0.06,  0.63), //v4 
        vec2(-0.12,  0.7), //v5
		vec2(-0.12,  0.8), //v6
        vec2(-0.06,  0.87), //v7
	];
	
	// Ship vertices
	var shipVertices = [
        vec2(-0.70, -0.6), // v0
		vec2(-0.65, -0.7), // v1
		vec2(-0.3, -0.6), // v2
		vec2(-0.35, -0.7) // v3
    ];
	
	// Mast Vertices
	var mastVertices = [
        vec2(-0.51, -0.3), // v1
		vec2(-0.51, -0.6), // v0
		vec2(-0.49, -0.3), // v2
		vec2(-0.49, -0.6) // v3
    ];
	
	// Flag vertices
	var flagVertices = [
        vec2(-0.49, -0.3), // v0
		vec2(-0.32, -0.42), // v1
		vec2(-0.49, -0.42), // v2
    ];
	
	// First Fish vectices
	var fish1Vertices = [
        vec2(0.3, -0.6), //v0
        vec2(0.4, -0.55), //v1
        vec2(0.5, -0.55), //v2
        vec2(0.6, -0.6), //v3
        vec2(0.5, -0.65), //v4
        vec2(0.4, -0.65), //v5
        vec2(0.3, -0.6), //v6
    ];
	
	// Secod Fish vectices
	var fish2Vertices = [
        vec2(0.25, -0.4), //v0
        vec2(0.35, -0.35), //v1
        vec2(0.45, -0.35), //v2
        vec2(0.55, -0.4), //v3
        vec2(0.45, -0.45), //v4
        vec2(0.35, -0.45), //v5
        vec2(0.25, -0.4), //v6
    ];
	
	// Fish's tail vertices
	var tailVertices = [
        vec2(0.59, -0.6), // v0
		vec2(0.69, -0.65), // v1
		vec2(0.69, -0.55), // v2
		
		vec2(0.26, -0.4), // v0
		vec2(0.16, -0.35), // v1
		vec2(0.16, -0.45), // v2
    ];
	
	// Fish's eye vertices
	var eyeVertices = [
        vec2(0.38, -0.57), // v0
		vec2(0.40, -0.58), // v1
		vec2(0.39, -0.59), // v2
		
		vec2(0.47, -0.37), // v0
		vec2(0.45, -0.38), // v1
		vec2(0.46, -0.39), // v2
    ];
	
	// strip vertices
	var stripVertices = [
		// first strip
        vec2(0.0,  -0.8), //v0
		vec2(0.1,  -0.72), //v1
        vec2(0.2,  -0.8), //v2
        vec2(0.3,  -0.72), //v3
        vec2(0.4,  -0.8), //v4
        vec2(0.5,  -0.72), //v5
		vec2(0.6,  -0.8), //v6
		
        // start second strip
		vec2(-0.35, -0.32), //v7
        vec2(-0.25, -0.24), //v8
        vec2(-0.15, -0.32), //v9
        vec2(-0.05, -0.24), //v10
        vec2( 0.05, -0.32), //v11
    ];
	
	// Sun strip vertices
	var sunstripVertices = [
        vec2(-0.14,  0.75), //v0
		vec2(-0.24,  0.75), //v1
        vec2(0.14,  0.75), //v2
        vec2(0.24,  0.75), //v3
		
		vec2(0.0,  0.89), //v4
		vec2(0.0,  0.97), //v5
        vec2(0.0,  0.61), //v6
        vec2(0.0,  0.53), //v7
		
		vec2(-0.1,  0.85), //v8
        vec2(-0.18,  0.91), //v9
        vec2(0.1,  0.85), //v10
        vec2(0.18,  0.91), //v11
		
		vec2(-0.1,  0.65), //v12
        vec2(-0.18,  0.59), //v13
        vec2(0.1,  0.65), //v14
        vec2(0.18,  0.59), //v15
    ];
	
	// COnfigure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );	
    gl.clearColor( 0.0, 0.6, 0.8, 0.3 );	// background color
	gl.clear(gl.COLOR_BUFFER_BIT);

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation( program, "vPosition" );
	var uColor = gl.getAttribLocation(program, "uColor");
	
	colorLoc = gl.getUniformLocation(program, "uColor");

	// Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	// Draw Mountain
	gl.bufferData( gl.ARRAY_BUFFER, flatten(mountainVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.0, 1.0, 0.0, 1.0);
	gl.drawArrays( gl.TRIANGLES, 0, 6 );
	
	// Draw Field
	gl.bufferData( gl.ARRAY_BUFFER, flatten(fieldVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.5, 1.0, 0.5, 1.0);
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
	// Draw First Tree Bottom
	gl.bufferData( gl.ARRAY_BUFFER, flatten(tree1bottomVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.5, 0.3, 0.2, 1.0);
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
	
	// Draw Second Tree Bottom
	gl.bufferData( gl.ARRAY_BUFFER, flatten(tree2bottomVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.5, 0.3, 0.2, 1.0);
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
	
	// Draw Third Tree Bottom
	gl.bufferData( gl.ARRAY_BUFFER, flatten(tree3bottomVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.5, 0.3, 0.2, 1.0);
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
	
	// Draw House Bottom
	gl.bufferData( gl.ARRAY_BUFFER, flatten(houseVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.2, 0.2, 0.0, 0.35);
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
	
	// Draw Door
	gl.bufferData( gl.ARRAY_BUFFER, flatten(doorVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.2, 0.1, 0.0, 0.7);
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
	
	// Draw Roof
	gl.bufferData( gl.ARRAY_BUFFER, flatten(roofVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.3, 0.3, 0.7, 0.7);
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	// Draw Tree's Leaves
    gl.bufferData( gl.ARRAY_BUFFER, flatten(treeVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.6, 1.0, 0.0, 1.0);
	gl.drawArrays(gl.TRIANGLES, 0, 27);
	
	// Draw Lake
	gl.bufferData( gl.ARRAY_BUFFER, flatten(lakeVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.0, 0.6, 0.8, 0.7);
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 7 );
	
	// Draw Sun
	gl.bufferData( gl.ARRAY_BUFFER, flatten(sunVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 1.0, 0.0, 0.0, 1.0);
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 8 );
	
	// Draw Ship
	gl.bufferData( gl.ARRAY_BUFFER, flatten(shipVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.5, 0.3, 0.2, 0.8);
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
	
	// Draw Mast
	gl.bufferData( gl.ARRAY_BUFFER, flatten(mastVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.5, 0.3, 0.2, 1.0);
	gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
	
	// Draw Flag
	gl.bufferData( gl.ARRAY_BUFFER, flatten(flagVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.0, 0.0, 0.0, 0.0);
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	
	// Draw First Fish Body
	gl.bufferData( gl.ARRAY_BUFFER, flatten(fish1Vertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.0, 0.6, 1.0, 1.0);
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 7 );
	
	// Draw Second Fish Body
	gl.bufferData( gl.ARRAY_BUFFER, flatten(fish2Vertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.0, 0.6, 0.8, 1.0);
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 7 );
	
	// Draw Fish Tail
	gl.bufferData( gl.ARRAY_BUFFER, flatten(tailVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.3, 0.6, 1.0, 1.0);
	gl.drawArrays( gl.TRIANGLES, 0, 6 );
	
	// Draw Second Fish eye
	gl.bufferData( gl.ARRAY_BUFFER, flatten(eyeVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.0, 0.0, 0.0, 1.0);
	gl.drawArrays( gl.TRIANGLES, 0, 6 );
	
	// Draw Two Lake Strip
    gl.bufferData( gl.ARRAY_BUFFER, flatten(stripVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 0.0, 0.4, 0.8, 0.7);
	gl.drawArrays(gl.LINE_STRIP, 0, 7);
	gl.drawArrays(gl.LINE_STRIP, 7, 5);
	
	// Draw Eight Sun Strip
	gl.bufferData( gl.ARRAY_BUFFER, flatten(sunstripVertices), gl.STATIC_DRAW );
	gl.uniform4f(colorLoc, 1.0, 0.0, 0.0, 1.0);
	gl.drawArrays(gl.LINE_STRIP, 0, 2);
	gl.drawArrays(gl.LINE_STRIP, 2, 2);
	gl.drawArrays(gl.LINE_STRIP, 4, 2);
	gl.drawArrays(gl.LINE_STRIP, 6, 2);
	gl.drawArrays(gl.LINE_STRIP, 8, 2);
	gl.drawArrays(gl.LINE_STRIP, 10, 2);
	gl.drawArrays(gl.LINE_STRIP, 12, 2);
	gl.drawArrays(gl.LINE_STRIP, 14, 2);
};


