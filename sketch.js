var path,boy,cash,diamonds,jwellery,sword,hurdle,select;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg,hurdleImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup,hurdleG;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  hurdleImg = loadImage("hurdle.png")
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;


  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  hurdleG=new Group();
  swordGroup=new Group();

}

function draw() {

  background(0);
  
  
   
  if(gameState===PLAY){
 boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  boy.setCollider("circle",0,0,550);
 
  select=Math.round(random(1,5));
  if(select===1){
    createCash();
  }else if(select===2){
    createDiamonds();
  }else if (select===3){
    createJwellery();
  }else if(select===4){
    createHurdle();
  }else if(select===5){
    createSword();
  }
 
  destroy();
  
     
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
     }
  }
  
  if(gameState===END){
    path.velocityY=0;
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    hurdleG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    
    swordGroup.destroyEach();
    cashG.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    hurdleG.destroyEach();
    
    boy.addAnimation("SahilRunning",endImg);
    boy.scale=0.9;
    boy.x=200;
    boy.y=200;
  }
  
  

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 80 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 80 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

function createHurdle(){
  if (World.frameCount % 80 == 0){
    var hurdle = createSprite(Math.round(random(50,350),40,10,10));
    hurdle.addImage(hurdleImg);
    hurdle.scale=0.3;
    hurdle.velocityY = 3;
    hurdle.lifetime = 150;
    hurdleG.add(hurdle);

  }
}

function destroy(){
  
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+20
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+30
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+40
      
    }else{
      if(swordGroup.isTouching(boy)||hurdleG.isTouching(boy)) {
        gameState = END;
    }
  }
}
