let ground;
let lander;
var lander_img;
var bg_img, lander_ani;
var thrust, crash, land, rcs_left, rcs_right;
var vy = 0;
var vx = 0;
var fuel = 100;
var g = 0.05;
var obs, obsimg, lz, lzimg;

function preload()
{
  lander_img = loadImage("lander.png");
  bg_img = loadImage("bg.png");
  lander_ani=loadAnimation("lander.png")
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  crash = loadAnimation("crash1.png","crash2.png","crash3.png")
  land = loadAnimation("landing1.png","landing2.png","landing_3.png");
  rcs_left = loadAnimation("left_thruster_1.png","left_thruster_2.png");
  rcs_right = loadAnimation("right_thruster_1.png", "right_thruster_2.png");
  obsimg = loadImage("obstacle.png")
  lzimg = loadImage("lz.png")
  thrust.playing = true;
  thrust.looping = false;
  rcs_left.looping = false;
  rcs_right.looping = false;
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  timer = 1500;
  thrust.frameDelay = 5;
  rcs_left.frameDelay = 5;
  land.frameDelay = 5;
  crash.frameDelay = 10;
  rcs_right.frameDelay = 5;

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;
  lander.setCollider("rectangle",0,0,200,200)
  lander.addAnimation("thrusting",thrust);
  lander.addAnimation("left",rcs_left);
  lander.addAnimation("right",rcs_right);
  lander.addAnimation("lander",lander_ani);
  lander.addAnimation("crushing",crash);

  ground = createSprite(500,690,1000,20);

  obs = createSprite(320,530,50,100);
  obs.addImage("obstacle",obsimg);
  obs.scale = 0.5;
  obs.setCollider("rectangle",0,130,250,250);

  lz = createSprite(880,610,50,30);
  lz.addImage(lzimg);
  lz.scale = 0.3;
  lz.setCollider("rectangle",0,180,400,100);

  rectMode(CENTER);
  textSize(15);


}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  text("Horizontal Velocity: "+round(vx),800,50);
  text("Fuel: "+fuel,800,25);
  pop();

  //fall down
  vy +=g;
  lander.position.y+=vy;
  lander.position.x+=vx;

  if(lander.collide(obs) == true){
    lander.changeAnimation("crushing");
    stop();
  }
  var d = dist(lander.position.x, lander.position.y, lz.position.x, lz.position.y);
  if(d<=35 && (vy<2 && vy>-2) && (vx<2 && vx>-2)){
    vx=0;
    vy=0;
    g=0;
    lander.changeAnimation("lander");
  }
  if(lander.collide(ground) == true){
    lander.changeAnimation("crushing");
    vx=0;
    vy=0;
    g=0;
  }

  drawSprites();
}

function stop(){
  vx=0;
  vy=0;
  fuel=0;
  g=0;
}

function keyPressed()
{
  if(keyCode==UP_ARROW && fuel>0)
  {
    upward_thrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();
    
  }
  if(keyCode==RIGHT_ARROW && fuel>0)
  {
    lander.changeAnimation('left');
    right_thrust();
    
  }
  if(keyCode==LEFT_ARROW && fuel>0)
  {
    lander.changeAnimation('right');
    Left_thrust();
    
  }
}

function upward_thrust()
{
  vy = -1;
  fuel = fuel-1;
}

function right_thrust()
{
vx = vx+0.2;
fuel = fuel-1;
}

function Left_thrust()
{
vx = vx-0.2;
fuel = fuel-1;
}