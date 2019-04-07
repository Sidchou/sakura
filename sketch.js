var feather = [];
var g;
var k;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  g = 0.2;
  k = 0.2;
}


function draw() {
  background("#C0E2FF");

  if (random(1)< 0.2){feather.push(new OBJ(0, random(-height,height)))}

for (f of feather){
  let gravity = createVector(0, g * f.m);
  let resistance = f.v.copy().mult(f.v.mag()).mult(-k).mult(sin(f.theta)+2);
  f.applyForce(gravity);
  f.applyForce(resistance);
  let normalF = createVector(sin(f.theta)/5, -Math.abs(cos(f.theta))).mult(0.5);
  f.applyForce(normalF);
  let wind = createVector(1 , 0).mult(cos(f.theta)+2).mult(0.8);
  f.applyForce(wind)
  f.update();
  f.render();
}
}


class OBJ {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.v = createVector(0, 0);
    this.a = createVector(0, 0);
    this.m = random(8,12);
    this.r = random(1.1,1.8);
    this.c = color(random(220,235),random(170,200),random(225,235));
    this.theta = 0;
    this.n = random(1000);
  }

  applyForce(force) {
    //f = ma
    let f = p5.Vector.div(force, this.m);
    this.a.add(f);
  }

  update() {
    this.v = this.v.add(this.a);
    this.pos = this.pos.add(this.v);
    this.a.mult(0);
    this.theta += (noise(this.n+(this.pos.x+this.pos.y)/100)-0.5)/10
  }

  render() {
    push();
    fill(this.c);
    translate(this.pos.x, this.pos.y);
    rotate(this.theta);
    ellipse(0, 0, this.r* this.m, this.m);
    pop();
  }

  checkEdge(){}

  reset(x, y, c) {
    this.pos.x = x;
    this.pos.y = y;
    this.c = c;
    this.v.mult(0);
  }
}
