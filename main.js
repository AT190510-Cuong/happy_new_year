var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#ffa400", "#2cccff", "#ff6bcb", "#e74c3c", "#20E3B2"];

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

function Particle(x, y, radious, color, velocity) {
  this.x = x;
  this.y = y;
  this.radious = radious;
  this.color = color;
  this.velocity = velocity;
  this.ttl = 200;
  this.draw = () => {
    context.beginPath();
    context.arc(this.x, this.y, this.radious, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  };
  this.update = () => {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl--;
  };
}

//const particle = new Particle(100, 100, 10, "blue");
let particles;
const particlesCount = 30;

function init() {
  particles = [];
  for (let index = 0; index < particlesCount; index++) {
    const radians = (Math.PI * 2) / particlesCount;
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const velocity = {
      x: Math.cos(radians * index),
      y: Math.sin(radians * index),
    };
    particles.push(new Particle(x, y, 10, randomColor(colors), velocity));
  }
}

function generateCircles() {
  setTimeout(generateCircles, 250);
  for (let index = 0; index < particlesCount; index++) {
    const radians = (Math.PI * 2) / particlesCount;
    const x = mouse.x;
    const y = mouse.y;
    const velocity = {
      x: Math.cos(radians * index),
      y: Math.sin(radians * index),
    };
    particles.push(new Particle(x, y, 5, randomColor(colors), velocity));
  }
}
function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = "rgba(0,0,0,0.05)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((item, index) => {
    if (item.ttl == 0) {
      particles.splice(index, 1);
    }
    item.update();
  });

  //  particle.update();
}

init();
animate();
generateCircles();

window.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
