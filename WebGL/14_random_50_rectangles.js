var gl;
var points;

var canvas = document.getElementById("gl-canvas");
gl = canvas.getContext("webgl");
if (!gl) { alert( "WebGL isn't available" ); };

var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;
 
function createShader(gl, type, source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if(success){
		return shader;
	}
	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

var vertexShader = createShader(
	gl, gl.VERTEX_SHADER, vertexShaderSource
);

var fragmentShader = createShader(
	gl, gl.FRAGMENT_SHADER, fragmentShaderSource
);
 
function createProgram(gl, vertexShader, fragmentShader) {
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	var success = gl.getProgramParameter(
		program, gl.LINK_STATUS
	);
	if (success) {
		return program;
	}
	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}

var program = createProgram(
	gl, vertexShader, fragmentShader
);
 
var positionBuffer = gl.createBuffer();
 
var positionAttributeLocation = gl.getAttribLocation(program, "vPosition");
  
var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");   
    
var colorUniformLocation = gl.getUniformLocation(program, "u_color");

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
 
gl.useProgram(program);
 
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
 
gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
var size = 2;           
var type = gl.FLOAT;  
var normalize = false;
var stride = 0; 
var offset = 0;
gl.vertexAttribPointer(
	positionAttributeLocation, 
	size, 
	type, 
	normalize, 
	stride, 
	offset
);
 
for(var i = 0; i < 50; ++i) {
	setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

	gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1); 
	
	var primitiveType = gl.TRIANGLES;
	var offset = 0;
	var count = 6;
	gl.drawArrays(gl.TRIANGLES,offset , count);
}

function randomInt(range){
	return Math.floor(Math.random() * range);
}

function setRectangle(gl, x, y, width, height){
	var x1 = x;
	var x2 = x + width;
	var y1 = y;
	var y2 = y + height;
  
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
		x1, y1,
		x2, y1,
		x1, y2,
		x1, y2,
		x2, y1,
		x2, y2]), gl.STATIC_DRAW);
}