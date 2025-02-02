const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

let hue = 0;
let timer ={current:0, max:120};

let btn = document.getElementById('btn');
let btn2 = document.getElementById('btn2');
let text = document.getElementById('text');
let img = document.getElementById('img');

let dialogo = 0;
let respuesta = 0;


let dialogos = [
	{img:"img/saludo.webp", text:"Holaaa Valery 😊"},
	{img:"img/triste.webp", text:"Me han dicho que no te sientes bien"},
	{img:"img/abrazo.webp", text:"Y queria desearte lo mejor y mucho animo. Un Abrazo fuerte para ti, cosita linda 😊"},
	{img:"img/combate.webp", text:"Es hora de combatir con todos los problemas. HYAA! "},
	{img:"img/super.webp", text:"Y salir victoriosa!!"},
	{img:"img/hehe.webp", text:"No lo crees? que tal si sonries un poquito para mi. Por fii 😄"},
	{img:"img/amor.webp", text:"Oh, tienes una linda sonrisa!"},
	{img:"img/a_hah.webp", text:"Ha, tengo una idea! Tirare un 'happy beam' para ti, para que te sientas mejor desde ahora"},
	{img:"img/happy_beam.webp", text:"HAPPYYYY BEAAAAAAAAAM!!!"},
	{img:"img/saludo.webp", text:"Espero que con eso te sientas mejor ❤"},
	{img:"img/saludo.webp", text:"Animo tienes personas que se preocupan por ti y te quieren"},
	{img:"img/sonrojado1.webp", text:"Ademas..."},
	{img:"img/sonrojado2.webp", text:"Yo tambien te quiero mucho, y no quiero que estes mal"},
	{img:"img/sonrojado1.webp", text:"Tu me quieres?"},
	{img:"img/amabilidad.webp", text:"Me hace feliz saber que tambien me quieres 🤗"},
	{img:"img/amor.webp", text:"Espero que te sientas un poco mejor ahora jeje"},
	{img:"img/hehe.webp", text:"Esto es un regalito para ti, espero te guste he he 😊"},
	{img:"img/sonrojado1.webp", text:"Te deseo lo mejor y que te mejores"},
	{img:"img/bostezo.webp", text:"Yo tengo un poco de sueño, ire a descansar... BYEE 😚"},
	{img:"img/dormir.webp", text:""},
];

let dialogoRespuesta = [
	{img:"img/sonrojado1.webp", text:"Hehe..."},
	{img:"img/sonrojado1.webp", text:"Que estas haciendo... 😅"},
	{img:"img/triste.webp", text:"Realmente no me quieres? 😥"},
	{img:"img/triste.webp", text:"Me rompes el corazon 😭"},
	{img:"img/triste.webp", text:"Porque no me quieres?"},
	{img:"img/triste.webp", text:"Queria animarte porque te quiero"},
	{img:"img/triste.webp", text:"Me duele verte triste 😥"},
	{img:"img/triste.webp", text:"Voy a llorar..."},
	{img:"img/triste.webp", text:"Estoy llorando 💔"},
]

text.innerHTML = dialogos[dialogo].text;
img.src = dialogos[dialogo].img;

function siguienteDialogo() {
	dialogo++;
	text.innerHTML =dialogos[dialogo].text;
	img.src = dialogos[dialogo].img;

	if (dialogo == 16) {
		Update();
	}

	if (dialogo == 19) {
		btn.style.display = "none";
	}

	if (text.innerHTML == "Tu me quieres?") {
		btn.innerHTML = "Si";
		btn2.style.display = "block";
	}else{
		btn.innerHTML = "Siguiente";
		btn2.style.display = "none";
	}
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function btnNo(){
	if (respuesta < 8) {respuesta+=0.3;}
	
	btn2.style.left = random(0, window.innerWidth-80) +"px";
	btn2.style.top = random(0, window.innerHeight-80) +"px";

	text.innerHTML = dialogoRespuesta[Math.floor(respuesta)].text;
	img.src = dialogoRespuesta[Math.floor(respuesta)].img;
}


class Particle {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.r = Math.random() * 10;
		this.direction = random(0, 360);
		this.speedX = random(1,10);
		this.speedY = random(1,10);
		this.gravity = 0.01;
		this.acceleration = 0;
		this.color = 'hsl('+hue+',100%, 50%)';
	}

	draw (x, y) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);

		ctx.fillStyle = this.color;
		ctx.fill();

		//ctx.strokeStyle = "red";
		//ctx.stroke();
	}

	update () {
		this.acceleration += this.gravity;

		this.x += (Math.sin((this.speedX) * this.direction * Math.PI/180) * 0.8)*1.5;
		this.y -= (Math.cos((this.speedY) * this.direction * Math.PI/180) - this.acceleration)*1.5;
	}
}

function Update(){
	requestAnimationFrame(Update);
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; //0.25 or 0.05
	ctx.fillRect(0, 0, canvas.width, canvas.height);


	timer.current++;
	if (timer.current >= timer.max) {
		createParticle(random(0, canvas.width), random(0, canvas.height));
		timer.current = 0;
	}
	drawParticle();
	updateParticle();

}

function drawParticle (){
	particleArray.forEach( particle => {
		particle.draw();
	})
}

function updateParticle (){
	hue++;
	particleArray.forEach( particle => {
		particle.update();
	})
}

function createParticle (x, y){
	for(let i = 0; i<50; i++) {
		const particle = new Particle(x,y);
		particleArray.push(particle); 
	}
}

//Update();