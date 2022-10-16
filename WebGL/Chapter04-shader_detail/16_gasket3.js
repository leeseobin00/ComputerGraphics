
var canvas;
var gl;

var points = [];
var colors = [];

var NumTimesToSubdivide = 2;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the Sierpinski Gasket
	//
    
    var vertices = [
        vec3(  0.0000,  0.0000, -1.0000 ),
        vec3(  0.0000,  0.9428,  0.3333 ),
        vec3( -0.8165, -0.4714,  0.3333 ),
        vec3(  0.8165, -0.4714,  0.3333 )
    ];
    
    divideTetrahedron( vertices[0], vertices[1], vertices[2], vertices[3], NumTimesToSubdivide);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    // From Slides
    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    //So it displays correctly
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

function triangle( a, b, c, color )
{

	//Colors
    var FaceColors = [
	  vec3(1.0, 0.0, 0.0),
	  vec3(0.0, 1.0, 0.0),
	  vec3(0.0, 0.0, 1.0),
	  vec3(1.0, 0.0, 1.0)
	/**
        vec3(1.0, 0.769, 0.145), //Gold
        vec3(0.643, 0.0, 0.275), //Maroon
        vec3(0.0, 0.0, 0.0), 
        vec3(1.0, 1.0, 1.0) **/
    ];
	
	//So each face has a different color
    colors.push( FaceColors[color] );
    points.push( a );
    colors.push( FaceColors[color] );
    points.push( b );
    colors.push( FaceColors[color] );
    points.push( c );
}

function tetrahedron( a, b, c, d )
{
    // tetrahedron with each side using
    // a different color
    
    triangle( a, c, b, 0 );
    triangle( a, c, d, 1 );
    triangle( a, b, d, 2 );
    triangle( b, c, d, 3 );
}

function divideTetrahedron( a, b, c, d, count )
{
    // check for end of recursion
    
    if ( count === 0 ) {
        tetrahedron( a, b, c, d );
    }
    
    else {
		
		//Tetrahedron has 6 edges
		//Find mid of each edge
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var ad = mix( a, d, 0.5 );
        var bc = mix( b, c, 0.5 );
        var bd = mix( b, d, 0.5 );
        var cd = mix( c, d, 0.5 );

        --count;
        
		//Each division creates 4 new Tetrahedron
        divideTetrahedron( a, ab, ac, ad, count );
        divideTetrahedron( ab, b, bc, bd, count );
        divideTetrahedron( ac, bc, c, cd, count );
        divideTetrahedron( ad, bd, cd, d, count );
    }
}


function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
