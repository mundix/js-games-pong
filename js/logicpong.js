let loops;
let speed = 5;
const c = document.getElementById("canvas");
let areaW = c.width;
let areaH = c.height;
const ctx = c.getContext("2d");
let score1 = 0;
let score2 = 0;
//Objects 
let ball = new Ball();

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

// Global Functions 

function draw() {
    ctx.clearRect(0,0,areaW,areaH);

}

function frame() {

    requestAnimationFrame(frame);
}

function init() {
    frame();
}

