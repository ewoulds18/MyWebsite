// set up canvas

const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerHeight;
ctx.canvas.height = window.innerHeight;
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 100) * (canvas.width / 100)
};

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

class Particle {
    constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }

    drawParticle() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#666666';
        ctx.fill();
    }

    update(){
        //check if particle is outside of canvas and change direction to come back
        if(this.x > canvas.width || this.x < 0){
            this.dirX = -this.dirX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.dirY = -this.dirY;
        }

        //check for collision with mouse and particle
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size *10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        //move particle
        this.x += this.dirX;
        this.y += this.dirY;
        //draw particle
        this.drawParticle();
    }
}

//create an array of particles
function init(){
    particles = [];
    let numOfParticles = (canvas.height * canvas.width) / 9000;
    for(let i = 0; i < numOfParticles * 1.5; i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size *2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size *2);
        let dirX = (Math.random() * 5) - 2.5;
        let dirY = (Math.random() * 5) - 2.5;
        let color = '#666666';

        particles.push(new Particle(x, y, dirX, dirY, size, color));
     }
}

//connect particles with lines if close enough
function connect() {
    let opacity = 1;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            let distance =
                ((particles[i].x - particles[j].x) *
                    (particles[i].x - particles[j].x)) +
                ((particles[i].y - particles[j].y) *
                    (particles[i].y - particles[j].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacity = 1 - (distance/10000);
                ctx.strokeStyle = 'rgba(102,102,102,' + opacity + '\)' ;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

//animation loop
function animate(){
    requestAnimationFrame(animate);
    //clear old canvas
    ctx.clearRect(0,0, innerWidth, innerHeight);

    for(let i = 0; i < particles.length; i++){
        particles[i].update();
    }
    connect();
}

window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height / 100) * (canvas.width / 100);
        init();
    }
)

window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

init();
animate();

