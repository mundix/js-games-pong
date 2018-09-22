let loops;
let speed = 6;
const c = document.getElementById("canvas");
let areaW = c.width;
let areaH = c.height;
const ctx = c.getContext("2d");
let score1 = 0;
let score2 = 0;
let paletteSize = 75;
let surface =  areaH - paletteSize;


// Classes 
class Base {
    //Collision Detect
    collision(obj) {
        if(this.backGnd < obj.y || this.y > obj.backGnd || obj.rightSide < obj.x || obj.rightSide) {
            return false;
        }else{
            return true;
        }
    }
}

class Ball  extends Base {
    constructor() {
        super(); 
        this.size = 25;
        this.x = Math.floor(Math.random() *(areaW - this.size));
        this.y = Math.floor(Math.random() *(areaH - this.size));

        this.xdir = speed;
        this.ydir = speed;
    }

    verticalCollision() {
        if(this.y < 0 || this.y >= areaH - this.size) {
            this.ydir = - this.ydir; //change direction in Y
        }
    }

    horizontalCollition() {
        if(this.x <= 0) {
            this.xdir = -this.xdir;
            score2++;
        }
        if(this.x >= areaW - this.size) {
            this.xdir = -this.xdir;
            score1++;
        }
    }

    move() {
        this.x += this.xdir;
        this.y += this.ydir
        this.verticalCollision();
        this.horizontalCollition();
    }

    draw() {
        ctx.fillRect(this.x,this.y,this.size,this.size);
    }
}

class Palette extends Base {
    constructor(x) {
        super();
        this.x = x;
        this.w = 25;
        this.h = paletteSize;
        this.y = Math.floor(Math.random() * surface);
        this.dir = 0;
    }

    draw() {
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
    move() {
        this.y += this.dir;
        // collision condition
        if(this.y < 0 ){ //Reset palette position
            this.y = 0;
            this.dir = 9;
        }
        if(this.y >= surface) {
            this.y = surface;
            this.dir = 0;
        }
    }
}

// Global Functions 
// Draw function
function draw() {
    ctx.clearRect(0,0,areaW,areaH);
    ball.draw();
    player1.draw();
    player2.draw();
}
// Animate function
function frame() {
    ball.move();
    player1.move();
    player2.move();
    draw();
    requestAnimationFrame(frame);
}

function init() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    frame();
}

// controls functions
function movePlayers(event) {
    let key = event.keyCode;
    if(key === 38) {
        //player 2 up 
        player2.dir = -speed;
    }
    if(key === 40)
    {
        player2.dir = speed;
    }
    if(key === 87) {
        //player 1 up 
        player1.dir = -speed;
    }
    if(key === 83)
    {
        player1.dir = speed;
    }


}
function stopPlayers(event) {
    let key = event.keyCode;
    if(key === 38 || key === 40) {
        player2.dir = 0;
    }
    if(key === 87 || key === 83)
    {
        player1.dir = 0;
    }
}

//Objects 
let ball = new Ball();
let player1 = new Palette(30);
let player2 = new Palette(545); //width game board define in the html canvas.
init();

