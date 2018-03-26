var letters = [];

$(document).ready(function(){
	setTimeout(initialAnimate, 600);
	setTimeout(bottomText, 3500);
});

//moving text at the bottom
function bottomText(){
	var typed = new Typed('#initialTyped', {
		strings: ["Andrew McNeal", "Andrew McNeil", "Andrew McNeil shit^100", "Andrew McNe^1000el"],
		typeSpeed: 40,
		smartBackspace: true,
		backDelay: 800,
		backSpeed: 50,
		// autoInsertCss: true,
		onComplete: (self) => {
			setTimeout(function(){
				$('.typed-cursor').css('display', 'none');
			}, 1600);
		}
	});
}


function initialAnimate() {
	var children = document.getElementsByClassName("menuSVG");
	for(var i=0; i<children.length; i++){
		var text = children[i].innerHTML;
		var temp = Snap(children[i]);
		animateMenu(temp, text)
	}
}
function animateMenu(element, text){
	var logoTitle = text;
	var logoRandom = '';
	var logoTitleContainer = element.text(0, '98%', '');
	logoTitleContainer.addClass('svgText');
	var possible = "01-+*/|}{[]~\\\":;?/.><=+-_)(*&^%$#@!)}";

	function generateRandomTitle(i, logoRandom) {
		setTimeout( function() {
			logoTitleContainer.attr({ text: logoRandom });
		}, i*130 );
	}

	for( var i=0; i < logoTitle.length+1; i++ ) {
		logoRandom = logoTitle.substr(0, i);
		for( var j=i; j < logoTitle.length; j++ ) { 
			logoRandom += possible.charAt(Math.floor(Math.random() * possible.length)); 
		}
		generateRandomTitle(i, logoRandom);
		logoRandom = '';
	}
}


//************ START OF THREEJS/WEBGL *****************
//************ START OF THREEJS/WEBGL *****************
//************ START OF THREEJS/WEBGL *****************
//************ START OF THREEJS/WEBGL *****************
//************ START OF THREEJS/WEBGL *****************
//************ START OF THREEJS/WEBGL *****************
//************ START OF THREEJS/WEBGL *****************
//************ START OF THREEJS/WEBGL *****************
//************ START OF THREEJS/WEBGL *****************
//************ START OF THREEJS/WEBGL *****************
//************ START OF THREEJS/WEBGL *****************
//************ START OF THREEJS/WEBGL *****************


//Additional Globals
var controls;
var backgroundColor = 0x141414;
var accentColor = 0x00FFD8;
var planeColor = 0xB4B8C5;

var particles = [];

var mouse = {x: 0, y: 0};

var clock = new THREE.Clock();
clock.start();

//*******************************************************************************

//renderer
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
renderer.setClearColor(backgroundColor);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

//need camera and a scene
//CAMERA

var camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.x = 0;
camera.position.y = 3;
camera.position.z = 120;
// camera.rotation.z = 30 * Math.PI/180;

controls = new THREE.TrackballControls(camera);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;


//RESIZE STUFF, FULL SCREEN
THREEx.WindowResize(renderer, camera);
THREEx.FullScreen.bindKey({charCode: 'f'.charCodeAt(0)});

//SCENE
var scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(backgroundColor, .075);



//*******************************************************************************

//MATERIAL
var material = new THREE.MeshStandardMaterial({
	color: 0xB4B8C5,
	metalness: 0.4,
	transparent: true,
	opacity: 0.5,
	wireframe: true,
	// map: new THREE.TextureLoader().load('style/images/klemen.png')
});

var planeMaterial = new THREE.MeshStandardMaterial({
	color: 0xB4B8C5,
	metalness: 0.4,
	transparent: true,
	opacity: 0.5,
	wireframe: true,
	// map: new THREE.TextureLoader().load('style/images/klemen.png')
});



//*******************************************************************************
//GEOMETRY YO
//box
// var geometry = new THREE.BoxGeometry(100, 100, 100, 5,5,5);
// var mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 0;
// mesh.position.y = 0;
// mesh.position.z = -200;
// // scene.add(mesh);

//sphere
// var geometry1 = new THREE.SphereGeometry(50, 50, 50);
// var mesh1 = new THREE.Mesh(geometry1, material);
// mesh1.position.set(200, 50, -500);
// scene.add(mesh1);

//plane
var planeGeo = new THREE.PlaneBufferGeometry(10000, 10000, 30, 30);
var planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
planeMesh.rotation.x = -90*Math.PI/180;
planeMesh.rotation.z = -90*Math.PI/180;
planeMesh.rotation.y = 0*Math.PI/180;
planeMesh.position.y = -100;
scene.add(planeMesh);

//grid of balls
// var ballGrid = [];
// var ballGeo = new THREE.SphereGeometry(.1, 20, 20);
// var gridSize = 50;

// var ballGridContainer = new THREE.Object3D();
// scene.add(ballGridContainer);
// ballGridContainer.position.set(-gridSize/2, 0, 0);
// ballGridContainer.rotation.x = -90*Math.PI/180;
// ballGridContainer.rotation.z = -90*Math.PI/180;

// for(var y=0; y<gridSize; y++){
// 	ballGrid.push([]);
// 	for(var x=0; x<gridSize; x++){
// 		// var col = getRandomColor();
// 		var planeMaterial = new THREE.MeshLambertMaterial({color: backgroundColor,
// 			transparent: true,
// 			opacity: 1,
// 		})
// 		var m = new THREE.Mesh(ballGeo, planeMaterial);
// 		m.position.set(x*3,y*1.2,0);
// 		ballGrid[y].push(m);
// 		ballGridContainer.add(m);
// 	}
// }


// function getRandomColor(){
// 	var str = "0x";
// 	for(var i=0; i<6; i++){
// 		var r = Math.floor(Math.random()*2);
// 		if(r == 0){
// 			s = "e"
// 		}
// 		else{
// 			s = "f";
// 		}
// 		str += s;
// 	}

// 	return parseInt(str, 16);
// }


//update ball grid
// function animateGrid(){
	// var elapsed = clock.getElapsedTime();
	// if(elapsed % 2 < .1){
	// 	console.log(elapsed);
	// 	var r = Math.floor(Math.random()*gridSize);
	// 	var r2 = Math.floor(Math.random()*gridSize);
	// 	ballGrid[r][r2].material.color.setHex(0xffffff);
	// 	setTimeout(function(){
	// 		ballGrid[r][r2].material.color.setHex(backgroundColor);
	// 	}, 140);
	// }
	// for(var y=0; y<gridSize; y++){
	// 	for(var x=0; x<gridSize; x++){
	// 		ballGrid[y][x].position.z = Math.sin(elapsed * (x/(gridSize*.5)))*2.75;
	// 		ballGrid[y][x].position.z += Math.cos(elapsed + (y/gridSize)*10);
	// 	}
	// }
// }


// // addParticles();
// function addParticles(){
// 	var numParticles = 5000;
// 	var particleMaterial = new THREE.MeshStandardMaterial({
// 		color: 0xffffff,
// 		roughness: 0.7,
// 		metalness: 0.4,
// 		transparent: true,
// 		opacity: 0.5,
// 		wireframe: true
// 	});
// 	for(var i=0; i<numParticles; i++){
// 		var particleGeometry = new THREE.SphereGeometry(2,2,2);
// 		var particleMesh = new THREE.Mesh(particleGeometry, particleMaterial);
// 		particleMesh.position.x = Math.random()*400 - 200;
// 		particleMesh.position.y = Math.random()*300 - 150;
// 		particleMesh.position.z = Math.random()*400 - 300;
// 		scene.add(particleMesh);
// 	}
// }



//*********************************************************

//CUSTOM STUFF

// var loader = new THREE.JSONLoader();
// loader.load(
// 	'./Cinema/thing1.json',
// 	function(geometry, materials){
// 		var obj = new THREE.Mesh(geometry, material);
// 		obj.position.set(100, 50, -300);
// 		scene.add(obj);
// 	}
// )

//MOUSE FOLLOW CONTROLS

//*******************************************************************************

//LIGHTS

//FULL LIGHT
var light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

//POINT LIGHT
// var light1 = new THREE.PointLight(0xAAFAC8, 1, 300, 2);
// scene.add(light1);
// light1.position.set(0,0,40);

// var pointLightHelper = new THREE.PointLightHelper(light1);
// scene.add(pointLightHelper);

//DIRECTIONAL LIGHT
// var light2 = new THREE.DirectionalLight(0xffffff, 2.0, 1000);
// light2.target = mesh;
// scene.add(light2);

// var directionalLightHelper = new THREE.DirectionalLightHelper(light2);
// scene.add(directionalLightHelper);

// var light3 = new THREE.SpotLight(0xffffff, 2.0, 8000);
// light3.target = mesh;
// scene.add(light3);

// var light4 = new THREE.HemisphereLight(0xee0000, 0x0808dd, 1);
// scene.add(light4);


// var light5 = new THREE.SpotLight(0xAAFAC8, 2.0, 2000);
// light5.position.z = 60;

// light5.castShadow = true;
// light5.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(100, 1, 1000, 3500));
// light5.shadow.bias = 0.0001;
// light5.shadow.mapSize.width = 2048*2;
// light5.shadow.mapSize.height = 2048*2;

// scene.add(light5);
	
// mesh.castShadow = true;
// mesh1.castShadow = true;
// mesh2.receiveShadow = true;
// ballGeo.castShadow = true;
// ballGeo.receiveShadow = true;
// planeGeo.castShadow = true;
// planeGeo.receiveShadow = true;


// var spotLightHelper = new THREE.SpotLightHelper(light5);
// scene.add(spotLightHelper);


//DEBUG SHADOWS
// var shadowMapViewer = new THREE.ShadowMapViewer(light5);
// shadowMapViewer.position.x = 10;
// shadowMapViewer.position.y = 10;
// shadowMapViewer.size.width = 2048/6;
// shadowMapViewer.size.height = 2048/6;
// shadowMapViewer.update();

//*******************************************************************************
// var x = document.getElementsByClassName("svgText");
// console.log(x);
$('svg').hover(function(){
	planeMesh.material.color.setHex(accentColor);
}, function(){
	planeMesh.material.color.setHex(planeColor);
});


//*******************************************************************************

//COMPOSER
var composer = new THREE.EffectComposer(renderer);

//PASSES

var renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

renderPass.renderToScreen = true;	
// var pass1 = new THREE.ShaderPass(THREE.SepiaShader);
// composer.addPass(pass1);
// pass1.renderToScreen = true;

// var pass2 = new THREE.GlitchPass(64);
// composer.addPass(pass2);

// pass2.renderToScreen = true;

//*******************************************************************************
var startIndex = 1;
var cameraPos1 = [0,0,0];
var cameraPos2 = [100,100,0];
//Camera Movement Testing
function moveToFirst(startIndex, nextIndex){
	if(startIndex === 1){
		if(nextIndex === 2){
			var difx = cameraPos2[0] - cameraPos1[0];
			var dify = cameraPos2[1] - cameraPos1[1];
			var difz = cameraPos2[2] - cameraPos1[2];
			
		}
	}
}

//*******************************************************************************

//RENDER LOOP
render();
var delta = 0;
function render(){
	var elapsed = clock.getElapsedTime();

	composer.render();
	//camera stuff
	// delta += 0.01
	// camera.lookAt(light1.position);
	// camera.position.x = Math.sin(delta)*4000;
	// camera.position.z = Math.cos(delta)*4000;
	// camera.position.y = Math.cos(delta)*300;


	//object stuff
	// mesh.rotation.x += 0.01;
	// mesh.rotation.y += 0.01;
	// mesh1.rotation.x += 0.005;
	// mesh1.rotation.y += 0.005;
	// meshSprite.rotation.x += 0.01;

	// animateGrid();

	// shadowMapViewer.render(renderer);
	requestAnimationFrame(render);
	controls.update();
}

renderer.render(scene, camera);
