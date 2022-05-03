const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var world,engine;

var ground,backgroundImg;
var b,c,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,p;
var background;
var basket;
var clothes;
var score = 10;
var dirt,d,d1,d2,d3,d4;
var clothesGroup, dirtGroup;


function preload(){
  b = loadImage("./assets/b.png");
  c = loadImage("./assets/c.png");
  c1 = loadImage("./assets/c1.png");
  c2 = loadImage("./assets/c2.png");
  c3 = loadImage("./assets/c3.png");
  c4 = loadImage("./assets/c4.png");
  c5 = loadImage("./assets/c5.png");
  c6 = loadImage("./assets/c6.png");
  c7 = loadImage("./assets/c7.png");
  c8 = loadImage("./assets/c8.png");
  c9 = loadImage("./assets/c9.png");
  c10 = loadImage("./assets/c10.png");
  c11 = loadImage("./assets/c11.png");
  d = loadImage("./assets/Dirt.png");
  d1 = loadImage("./assets/dirt1.png");
  d2 = loadImage("./assets/dirt2.png");
  d3 = loadImage("./assets/dirt3.png");
  d4 = loadImage("./assets/dirt4.png");
  backgroundImg = loadImage("./assets/background.png")
}


function setup() {
  createCanvas(1500,700);

  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic:true
  }
  
  ground = Bodies.rectangle(10,690,1000,20,options);
  World.add(world,ground)

  basket = createSprite(750,600,60,20);
  basket.addImage("basket", b);
  basket.scale = 0.6;
 // basket.debug = true;
  basket.setCollider("rectangle",0,0,300,10);

  clothesGroup = new Group();
  dirtGroup = new Group();
}


function draw() 
{
  background("white");
  image(backgroundImg,0,0,1500,700)

  textSize(40);
  fill("black");
  text("Score: "+ score, 1250,60)

  textSize(20);
  fill("red");
  text("*The game will be over if your points are -30",1100,100);
  text("*Your goal is to reach 100 points", 1100, 120)

  Engine.update(engine);
  
  rectMode(CENTER);
  noStroke();
  fill("grey");
  rect(ground.position.x,ground.position.y,3000,20);

  if(keyIsDown(RIGHT_ARROW)){
    basket.x +=15
  }

  if(keyIsDown(LEFT_ARROW)){
    basket.x -=15
  }

  if(clothesGroup.overlap(basket)){
    score +=5;
    clothes.destroy();
  }

 
  if(score>=100){
    gameOver();
  }

  if(dirtGroup.overlap(basket)){
    score -= 10;
    dirt.destroy();
  }

  if(score <= -30){
     gameLost();
  }

  fallClothes();
  drawSprites();
  fallDirt();
}

function fallClothes(){
  if(frameCount % 150 === 0){
   clothes = createSprite(400,10,50,50);
   
   //clothes.debug=true;
   clothes.setCollider("rectangle",0,0,70,70)
   var x = random(20, 1450);
   clothes.x = x;
    
    var rand = Math.round(random(1,12))
     switch(rand){
       case 1:clothes.addImage(c);
         break;
      
       case 2:clothes.addImage(c1);
        break;
      
       case 3:clothes.addImage(c2);
        break;
      
       case 4:clothes.addImage(c3);
        break;
      
       case 5:clothes.addImage(c4);
        break;
      
       case 6:clothes.addImage(c5);
        break;
      
       case 7:clothes.addImage(c6);
        break;
      
       case 8:clothes.addImage(c7);
         break;
      
       case 9:clothes.addImage(c8);
         break;
      
       case 10:clothes.addImage(c9);
         break;
      
       case 11:clothes.addImage(c10);
         break;
      
       case 12:clothes.addImage(c11);
         break;

       default:
         break;

     }

     clothes.scale = 0.4;
     clothes.velocityY = 10;
     clothesGroup.add(clothes);
     clothes.lifetime= 125
  
  }
}

function gameOver(){
  swal({
    title:"Great!",
    text:"Your score has reached 100",
    imageUrl: 
             "assets/won.png",
    imageSize:"100x100",
    confirmButtonText: "Thanks for Playing"
  })
}

function gameLost(){
  swal({
    title: "You lost!",
    text: "Better luck next time",
    imageUrl:
            "assets/lost.png",
    imageSize: "100x100",
    confirmButtonText: "Ok!"
  })
}


function fallDirt(){
  if(frameCount % 100 === 0){
   dirt = createSprite(750,10,50,50);

   var rand = Math.round(random(1,5));

   switch(rand){
     case 1: dirt.addImage(d);
             break;
    
     case 2: dirt.addImage(d1);
             break;

     case 3: dirt.addImage(d2);
             break;

     case 4: dirt.addImage(d3);
             break;

     case 5: dirt.addImage(d4);
             break;

     default:break;
   }
   dirt.scale = 0.3;
   dirt.velocityY = 10;
   dirt.lifetime = 110;
   var posX = random(20,1450);
   dirt.x = posX;
   //dirt.debug = true;
   dirtGroup.add(dirt);
   
   dirt.setCollider("rectangle",0,0,50,50)
  }
}

