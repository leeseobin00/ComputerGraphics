
var canvas;
var gl;

var points = [];

var numVertices = 36;

var pointsArray = [];
var colorsArray = [];

var vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ), // 0
    vec4( -0.5,  0.5,  0.5, 1.0 ), // 1
    vec4(  0.5,  0.5,  0.5, 1.0 ), // 2
    vec4(  0.5, -0.5,  0.5, 1.0 ), // 3
    vec4( -0.5, -0.5, -0.5, 1.0 ), // 4 
    vec4( -0.5,  0.5, -0.5, 1.0 ), // 5
    vec4(  0.5,  0.5, -0.5, 1.0 ), // 6
    vec4(  0.5, -0.5, -0.5, 1.0 )  // 7
];
var vertexColors = [
    [ 0.0, 0.0, 0.0, 1.0 ],  // black
    [ 1.0, 0.0, 0.0, 1.0 ],  // red
    [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
    [ 0.0, 1.0, 0.0, 1.0 ],  // green
    [ 0.0, 0.0, 1.0, 1.0 ],  // blue
    [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
    [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
    [ 1.0, 1.0, 1.0, 1.0 ]   // white
];

var near = -1;
var far = 1;
var radius = 1;
var theta = 0.0;
var phi = 0.0;
var dr = 5.0 * Math.PI / 180.0;

var left = -1.0;
var right = 1.0;
var ytop = 1.0;
var bottom = -1.0;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

function quad(a, b, c, d) {
	pointsArray.push(vertices[a]);
	colorsArray.push(vertexColors[a]);
	pointsArray.push(vertices[b]);
	colorsArray.push(vertexColors[a]);
	pointsArray.push(vertices[c]);
	colorsArray.push(vertexColors[a]);
	pointsArray.push(vertices[a]);
	colorsArray.push(vertexColors[a]);
	pointsArray.push(vertices[c]);
	colorsArray.push(vertexColors[a]);
	pointsArray.push(vertices[d]);
	colorsArray.push(vertexColors[a]);
	
}

function colorCube()
{
    quad( 1, 0, 3, 2 ); // blue
    quad( 2, 3, 7, 6 ); // yellow
    quad( 3, 0, 4, 7 ); // green
    quad( 6, 5, 1, 2 ); // cyan
    quad( 4, 5, 6, 7 ); // red       
    quad( 5, 4, 0, 1 ); // magenta
}

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
	colorCube();
	
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
	projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
		
    document.getElementById( "depthSlider" ).onclick = function(event) {
		far = event.target.value/2;
		near = -event.target.value/2;
    };
	document.getElementById( "radiusSlider" ).onclick = function(event) {
		radius = event.target.value;
    };
	document.getElementById( "thetaSlider" ).onclick = function(event) {
		theta = event.target.value * Math.PI/180.0;
    };
	document.getElementById( "phiSlider" ).onclick = function(event) {
		phi = event.target.value * Math.PI/180.0;
    };
	document.getElementById( "heightSlider" ).onclick = function(event) {
		ytop = event.target.value/2;
		bottom = -event.target.value/2;
    };
	document.getElementById( "widthSlider" ).onclick = function(event) {
		right = event.target.value/2;
		left = -event.target.value/2;
    };
        
    render();
}

var render = function() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	eye = vec3( radius * Math.cos(theta) * Math.sin(phi), radius*Math.sin(theta), 
		radius*Math.cos(theta)*Math.cos(phi) );	// eye point
	
	modelViewMatrix = lookAt(eye, at, up);
	projectionMatrix = ortho(left, right, bottom, ytop, near, far);
	
	gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
	gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
	
	gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    requestAnimFrame( render );
};

