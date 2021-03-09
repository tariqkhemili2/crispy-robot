var dino,dinoAnim,deaddino;
var bg,bgImage;
var obstacle, obstacleGroup, obstacleImage;
var ground;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameover, gameoveri;
var reset, reseti;
var score=0;

function preload(){
  dinoAnim = loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png");
  bgImage = loadImage("bg.jpg");
  obstacleImage = loadImage("ob.png");
  deaddino = loadAnimation("Dead (1).png","Dead (2).png","Dead (3).png","Dead (4).png","Dead (5).png","Dead (6).png","Dead (7).png","Dead (8).png");
  gameoveri = loadImage("game.png");
  reseti = loadImage("reset.png");
}

function setup() {
  createCanvas(600,400);
  bg = createSprite(400,200);
  bg.x = bg.width/2;
  bg.addImage(bgImage);
  bg.velocityX = -2
  bg.scale = 1.2
  dino = createSprite(100,310);
  dino.addAnimation("dino1", dinoAnim);
  dino.addAnimation("dead",deaddino);
  dino.scale = 0.2
  ground = createSprite(300,390,600,15);
  ground.visible = false;
  obstacleGroup = new Group();
  reset = createSprite(300,100,100,100);
  reset.addImage(reseti);
  reset.scale=0.2;
  gameover = createSprite(300,200,10,10);
  gameover.addImage(gameoveri);
  gameover.scale=0.3;
}

function draw() {
  background("white");
  if(gameState===PLAY){
  if(bg.x<200){
    bg.x = 400;
  }
  obstacle1();
  reset.visible=false;
  dino.velocityY = dino.velocityY+0.3
  dino.collide(ground);
  if(keyDown("w") && dino.y>250){
    dino.velocityY = -5;
  }
  if(dino.isTouching(obstacleGroup)){
    gameState=END;
   } 
  gameover.visible=false;
  }
  else if(gameState===END){
    dino.velocityY=0;
    obstacleGroup.setVelocityEach(0,0);
    obstacleGroup.setLifetimeEach(-1);
    bg.velocityX=0;
    dino.changeAnimation("dead",deaddino);
    gameover.visible=true;
    reset.visible=true;
    if(mousePressedOver(reset)){
      restart();
    }
  }  
  drawSprites();
  stroke("black");
  textSize(20);
  text("Score: "+ score,50,50);
  score = score+Math.round(getFrameRate()/60)
}

function obstacle1(){
  if(frameCount%60===0){
    obstacle = createSprite(400,380,10,40);
    obstacle.velocityX = -10;
    obstacle.addImage(obstacleImage);   
    obstacle.lifetime = 50;
    obstacleGroup.add(obstacle);
    obstacle.scale=0.25;
  }
}
function restart(){
  score=0;
  gameState=PLAY;
  gameover.visible=false;
  reset.visible=false;
  dino.changeAnimation("dino1", dinoAnim);
  obstacleGroup.destroyEach();
  bg.velocityX = -2;
  if(bg.x<200){
    bg.x = 400;
  }
}