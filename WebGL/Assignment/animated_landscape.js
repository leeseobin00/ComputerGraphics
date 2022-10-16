var gl;
var points;

var leftFishFlag = false;
var rightFishFlag = false;
var leftShipFlag = false;
var rightShipFlag = false;

var offsetLoc;
var shipPos = 0;
var fishPos = 0;

var maxNumTriangles = 200;  
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0;
var clicks = [];

var vertexPositionBufferId;
var vertexColorBufferId;
var vPosition;
var vColor;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }
	
    var vertices = new Float32Array([
        // background
        -1.0, 1.0, 
		-1.0, 0.0, 
		 1.0, 1.0,
        -1.0, 0.0,  
		 1.0, 1.0, 
		 1.0, 0.0,

        //ground
        -1.0, 0.0, -1.0, -1.0, 1.0, 0.0,
        -1.0, -1.0, 1.0, 0.0, 1.0, -1.0,

        //house bottom
        0.4, 0.18, 
		0.4, -0.1, 
		0.7, 0.18,
		
        0.4, -0.1, 
		0.7, 0.18, 
		0.7, -0.1,

		// house door
        0.45, 0.1, 
		0.45, -0.1, 
		0.55, 0.1,
		
        0.45, -0.1, 
		0.55, 0.1,
		0.55, -0.1,

		// house roof
        0.55,  0.43, 
		0.80, 0.18,
		0.30, 0.18,

        //large tree leaves
        -0.60, 0.60, 
		-0.80, 0.4, 
		-0.40, 0.4,
		
        -0.60,  0.4, 
		-0.80, 0.20, 
		-0.40, 0.20,
        
		-0.60, 0.20, 
		-0.80, 0.00, 
		-0.40, 0.00,
        
		// tree bottom
		-0.65,  0.00, 
		-0.65, -0.15, 
		-0.55,  0.00,
		
        -0.65, -0.15, 
		-0.55,  0.00, 
		-0.55, -0.15,

        //small tree
         0.0,  0.55, 
		 -0.15, 0.4,  
		 0.15, 0.4,
		 
         0.0,  0.4, 
		 -0.15, 0.25,  
		 0.15, 0.25,
         
		 0.0,  0.25, 
		 -0.15, 0.1,  
		 0.15, 0.1,
		 
        // smal tree bottom
		-0.05,  0.1, 
		-0.05, -0.05,  
		0.05,  0.1,
        
		-0.05, -0.05,  
		0.05,  0.1,  
		0.05, -0.05,
		
		//Mountain
		-1.0,  0.0, -0.4,  0.7,  0.2,  0.0,
		-0.2,  0.0,  0.4,  0.7,  1.0,  0.0,
		
		// lake
		-0.95, -0.57, 
		-0.70, -0.20,  
		 0.70, -0.20,
		 0.95, -0.57,  
		 0.70, -0.94, 
		 -0.70, -0.94,
		-0.95, -0.57, 
		
		// ship
		-0.70, -0.6, 
		-0.65, -0.7,
		-0.3, -0.6, 
		-0.35, -0.7, 
		
		// ship mast	
		-0.51, -0.3, 
		-0.51, -0.6, 
		-0.49, -0.3, 
		-0.49, -0.6, 
    
		// ship flag
        -0.49, -0.3, 
		-0.32, -0.42, 
		-0.49, -0.42, 
		
		// fish
		0.3, -0.5, 
        0.4, -0.45, 
        0.5, -0.45, 
        0.6, -0.5, 
        0.5, -0.55, 
        0.4, -0.55, 
        0.3, -0.5, 
		
		// fish tail
		0.59, -0.5, 
		0.69, -0.55, 
		0.69, -0.45, 
		
		// fish eye
		0.38, -0.47, 
		0.40, -0.48, 
		0.39, -0.49,
				
    ]);

    var colors = [
        //background
        vec4(0.4, 0.4, 0.4, 1),	
        vec4(0.0, 0.0, 0.0, 1),		
        vec4(0.4, 0.4, 0.4, 1),	
        vec4(0.0, 0.0, 0.0, 1),	
        vec4(0.4, 0.4, 0.4, 1),	
        vec4(0.0, 0.0, 0.0, 1),	
		
        //ground
        vec4(0.5, 1.0, 0.5, 1.0),
        vec4(0.5, 1.0, 0.5, 0.7),
        vec4(0.5, 1.0, 0.5, 1.0),
		vec4(0.5, 1.0, 0.5, 0.7),
        vec4(0.5, 1.0, 0.5, 1.0),
        vec4(0.5, 1.0, 0.5, 0.7),
        
        //house bottom
        vec4(0.2, 0.2, 0.0, 0.35),
        vec4(0.2, 0.2, 0.0, 0.35),
        vec4(0.2, 0.2, 0.0, 0.35),
        vec4(0.2, 0.2, 0.0, 0.35),
        vec4(0.2, 0.2, 0.0, 0.35),
        vec4(0.2, 0.2, 0.0, 0.35),

		// house door
        vec4(0.2, 0.1, 0.0, 0.7),
        vec4(0.2, 0.1, 0.0, 0.7),
        vec4(0.2, 0.1, 0.0, 0.7),
        vec4(0.2, 0.1, 0.0, 0.7),
        vec4(0.2, 0.1, 0.0, 0.7),
        vec4(0.2, 0.1, 0.0, 0.7),

		// house roof
        vec4(1.0, 0.1, 0.1, 0.7),
        vec4(1.0, 0.1, 0.1, 0.7),
        vec4(1.0, 0.1, 0.1, 0.7),

        //large tree
        vec4(0.9, 1.0, 0.9, 1.0),
        vec4(0.3, 0.7, 0.3, 1.0),
        vec4(0.3, 0.7, 0.3, 1.0),
        vec4(0.9, 1.0, 0.9, 1.0),
        vec4(0.3, 0.7, 0.3, 1.0),
        vec4(0.3, 0.7, 0.3, 1.0),
        vec4(0.9, 1.0, 0.9, 1.0),
        vec4(0.3, 0.7, 0.3, 1.0),
        vec4(0.3, 0.7, 0.3, 1.0),

        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),

        //small tree
        vec4(1, 1.0, 1, 1.0),
        vec4(0, 0.2, 0, 0.6),
        vec4(0, 0.2, 0, 0.6),
        vec4(1, 1.0, 1, 1.0),
        vec4(0, 0.2, 0, 0.6),
        vec4(0, 0.2, 0, 0.6),
        vec4(1, 1.0, 1, 1.0),
        vec4(0, 0.2, 0, 0.6),
        vec4(0, 0.2, 0, 0.6),

        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
        vec4(0.5, 0.25, 0, 1),
		
		// mountain
		vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
		vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
		
		//lake
		vec4(0.0, 0.6, 0.8, 0.7),
		vec4(0.0, 0.6, 0.8, 0.7),
		vec4(0.0, 0.6, 0.8, 0.7),
		vec4(0.0, 0.6, 0.8, 0.7),
		vec4(0.0, 0.6, 0.8, 0.7),
		vec4(0.0, 0.6, 0.8, 0.7),
		vec4(0.0, 0.6, 0.8, 0.7),
		
		// ship
		vec4(0.5, 0.3, 0.2, 0.8),
		vec4(0.5, 0.3, 0.2, 0.8),
		vec4(0.5, 0.3, 0.2, 0.8),
		vec4(0.5, 0.3, 0.2, 0.8),
		
		// ship mast
		vec4(0.5, 0.3, 0.2, 1.0),
		vec4(0.5, 0.3, 0.2, 1.0),
		vec4(0.5, 0.3, 0.2, 1.0),
		vec4(0.5, 0.3, 0.2, 1.0),
		
		// ship flag
		vec4(0.0, 0.0, 0.0, 0.0),
		vec4(0.0, 0.0, 0.0, 0.0),
		vec4(0.0, 0.0, 0.0, 0.0),
		
		// fish body
		vec4(0.0, 0.6, 1.0, 1.0),
		vec4(0.0, 0.6, 1.0, 1.0),
		vec4(0.0, 0.6, 1.0, 1.0),
		vec4(0.0, 0.6, 1.0, 1.0),
		vec4(0.0, 0.6, 1.0, 1.0),
		vec4(0.0, 0.6, 1.0, 1.0),
		vec4(0.0, 0.6, 1.0, 1.0),
		
		// fish tail
		vec4(0.3, 0.6, 1.0, 1.0),
		vec4(0.3, 0.6, 1.0, 1.0),
		vec4(0.3, 0.6, 1.0, 1.0),
		
		// fish eye
		vec4(0.0, 0.0, 0.0, 1.0),
		vec4(0.0, 0.0, 0.0, 1.0),
		vec4(0.0, 0.0, 0.0, 1.0),
		
		vec4(0.0, 0.0, 0.0, 1.0),
		vec4(0.0, 0.0, 0.0, 1.0),
		vec4(0.0, 0.0, 0.0, 1.0),

    ];

    //Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 1.0, 1.0);

    //Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //Load the data into the GPU
    vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    //Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.clear(gl.COLOR_BUFFER_BIT);
	
	// Use when change the position of the same picture
    offsetLoc = gl.getUniformLocation(program, "uOffset");
	
	// If you click the button, 
	// the flag changes and the fish or ship moves
	document.getElementById( "moveShipLeft" ).onclick = function () {
		leftShipFlag = !leftShipFlag;
        rightShipFlag = false;
    };
	document.getElementById( "moveShipRight" ).onclick = function () {
		rightShipFlag = !rightShipFlag;
        leftShipFlag = false;
    };
	document.getElementById( "moveFishLeft" ).onclick = function () {
		leftFishFlag = !leftFishFlag;
        rightFishFlag = false;
    };
	document.getElementById( "moveFishRight" ).onclick = function () {
		rightFishFlag = !rightFishFlag;
        leftFishFlag = false;
    };
	
	// When a click event occurs, 
	// obtains and saves the generated coordinates
	canvas.addEventListener("click", function(event){
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
        var t = vec2(2*event.clientX/canvas.width-1, 
             2*(canvas.height-event.clientY)/canvas.height-1);
        //gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));
		console.log(t)
		
        gl.bindBuffer( gl.ARRAY_BUFFER, vertexColorBufferId);
        t = vec4(1.0, 1.0, 0.0, 1.0);
		//gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
        index++;
    } );
	
	// Print to console to check the accuracy of the coordinate calculation
	render()
    intervalId = setInterval(render,100);
};

// Draw shapes to match coordinate values and colors
function render()
{	
	// Check the true and false of each flag
	// Add or subtract the coordinate value of the ship or fish if the condition is satisfied
	if(leftShipFlag&&shipPos>-0.21) {
        shipPos -= 0.01;
		console.log("ship left");
		console.log(shipPos);
    }

    if(rightShipFlag&&shipPos<1.2) {
        shipPos += 0.01;
		console.log("ship right");
		console.log(shipPos);
    }
	
	if(leftFishFlag&&fishPos>-0.81) {
        fishPos -= 0.01;
		console.log("fish left");
		console.log(fishPos);
    }

    if(rightFishFlag&&fishPos<0.18) {
        fishPos += 0.01;
		console.log("fish right");
		console.log(fishPos);
    }
	
	gl.uniform4fv(offsetLoc, [0, 0, 0, 0]);
	// background
    gl.drawArrays(gl.TRIANGLES, 0, 12);
	gl.uniform4fv(offsetLoc, [0, 0, 0, 0]);
	// mountain 
	gl.drawArrays(gl.TRIANGLES, 57, 6);
	
	gl.uniform4fv(offsetLoc, [0, 0, 0, 0]);
	//lake
	gl.drawArrays( gl.TRIANGLE_FAN, 63, 7 );
	gl.uniform4fv(offsetLoc, [0, 0, 0, 0]);
	
    //house
    gl.drawArrays(gl.TRIANGLES, 12, 6);
    gl.drawArrays(gl.TRIANGLES, 18, 6);
    gl.drawArrays(gl.TRIANGLES, 24, 3);
    gl.drawArrays(gl.TRIANGLES, 27, 9);

    //large tree
    gl.drawArrays(gl.TRIANGLES, 36, 6);

    //small tree
    gl.drawArrays(gl.TRIANGLES, 42, 9);
    gl.drawArrays(gl.TRIANGLES, 51, 6);

    //small tree
    gl.uniform4fv(offsetLoc, [0.2, -0.1, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 9);
    gl.drawArrays(gl.TRIANGLES, 51, 6);

    //small tree
    gl.uniform4fv(offsetLoc, [0.8, 0, 0, 0]);
    gl.drawArrays(gl.TRIANGLES, 42, 9);
    gl.drawArrays(gl.TRIANGLES, 51, 6);
	
	gl.uniform4fv(offsetLoc, [fishPos, 0, 0, 0]);
	
	// fish body
	gl.drawArrays( gl.TRIANGLE_FAN, 81, 7 );
	
	// fish tail
	gl.drawArrays( gl.TRIANGLES, 88, 3 );
	
	// fish eye
	gl.drawArrays( gl.TRIANGLES, 91, 3 );
	
	gl.uniform4fv(offsetLoc, [-0.3+fishPos, 0.12, 0, 0]);
	
	// secode fish body
	gl.drawArrays( gl.TRIANGLE_FAN, 81, 7 );
	
	// secode fish tail
	gl.drawArrays( gl.TRIANGLES, 88, 3 );
	
	// secode fish eye
	gl.drawArrays( gl.TRIANGLES, 91, 3 );
	
	// ship
	gl.uniform4fv(offsetLoc, [shipPos, 0, 0, 0]);
	gl.drawArrays( gl.TRIANGLE_STRIP, 70, 4 );
	
	// ship mast
	gl.drawArrays( gl.TRIANGLE_STRIP, 74, 4 );
	
	// ship flag
	gl.drawArrays( gl.TRIANGLE_STRIP, 78, 3 );
	/**
	gl.uniform4fv(offsetLoc, [0, 0, 0, 0]);
	gl.drawArrays( gl.TRIANGLES, 94, index );
	requestAnimFrame(render);**/
}
