
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var jungle,jungleImage;
var score=0
var PLAY=1;
var END=0;
var gameState=PLAY;
var ground;

function preload(){
  jungleImage=loadImage("jungle.jpg");
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
   jungle=createSprite(200,200,900,200)
  jungle.addImage(jungleImage);
  monkey.depth=jungle.depth;
  monkey.depth=monkey.depth+1;
  jungle.velocityX=-2;
  
  
  ground=createSprite(400,350,900,10)
  ground.visible=false;
  foodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
 background("white");
  text("Score:"+score,300,50)
  if (gameState===PLAY){
    ground.velocityX=-4;
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    if(jungle.x<0){
      jungle.x=jungle.width/2;
    }
    if(keyDown("space")&& monkey.y >= 265){
      monkey.velocityY=-12;
    }
    monkey.velocityY=monkey.velocityY+0.8;
    monkey.collide(ground);
     rock();
    food();
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score=score+1;
    }
   if (obstacleGroup.isTouching(monkey)){
     gameState=END;
   }
   drawSprites(); 
  }
  if (gameState===END){
     stroke("yellow");
fill("yellow");
textSize(30);
text("Game Over", 135,230)
   
  }
  
}


function rock(){
  if(frameCount%80===0){
     obstacle=createSprite(400,325,10,40)
   obstacle.addImage(obstacleImage);
        obstacle.velocityX=-(3+score/4)
    obstacleGroup.add(obstacle);
    obstacle.lifetime=140;
    obstacle.scale=0.1;
  }
}
function food(){
  if(frameCount%120===0){
    banana=createSprite(400,random(120,200),20,20)
    banana.addImage(bananaImage)
    banana.velocityX=-(3+score/4)
    foodGroup.add(banana);
      banana.lifetime=140;
    banana.scale=0.1;
}
  }







