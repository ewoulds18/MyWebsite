// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const points = [];

let isMouseHover = false;

// function to generate random number

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

//check if mouse is over the canvas
canvas.addEventListener(
    "mouseleave",
    function (event) {
        isMouseHover = false;
        event.target.textContent = "mouse out";
    },
    false
);

canvas.addEventListener(
    "mouseover",
    function (event) {
        isMouseHover = true;
        event.target.textContent = "mouse in";
    },
    false
);

//check for mouse click

canvas.addEventListener(
    "click",
    function(event){
        let c = event.target.getBoundingClientRect();
        let x = event.clientX - c.left;
        let y = event.clientY - c.top;
        createPoint(x,y);
        for (let i = 0; i < points.length; i += 1) {
           for (let j = 0; j < points.length; j += 1) {
               if (100 > points[i].getDistance(points[j].x, points[j].y)) {

                   if(points[i] != points[j]){
                       ctx.strokeStyle = "white";
                       ctx.lineWidth = 1;

                       ctx.beginPath();
                       ctx.moveTo(points[i].x, points[i].y);
                       ctx.lineTo(points[j].x, points[j].y);
                       ctx.stroke();
                       console.log(
                           "Drawing line from " +
                               points[i].x +
                               " " +
                               points[i].y +
                               " to " +
                               points[j].x +
                               " " +
                               points[j].y
                       );
                   }
               }
           }
        }
    },
    false
);

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    drawPoint() {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
    getDistance(x2, y2){
        const x12 = this.x - x2;
        const y12 = this.y - y2;
        const xSquare = Math.pow(x12, 2);
        const ySquare = Math.pow(y12, 2);
        return Math.sqrt(xSquare + ySquare);
    }
}

//create point
function createPoint(x,y){
    const point = new Point(x, y);
    point.drawPoint();
    points.push(point);
}

while(points.length < 10){
    const point = new Point(
        random(0, width),
        random(0 , height)
    );
    points.push(point);
}

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
    for (const point of points) {
        point.drawPoint();
    }

    requestAnimationFrame(loop);
}

loop();
