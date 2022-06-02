function setup(){
  createCanvas(windowWidth,windowHeight);
  //createCanvas(600,200);
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided", trex_collided);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  chao= createSprite(width,height/2-110,400,20)
  chao.addImage(groundImage)
  chaoInvisivel=createSprite(200,190,400,10)
  chaoInvisivel.visible=false
  cactusGroup=new Group()
  cloudsGroup=new Group()
  //trex.debug=true
  trex.setCollider("circle", 0, 0, 40);
  gameOver = createSprite(width/2,height/2-200);
  restart = createSprite(width/2,height/2-160);
  gameOver.addImage(gameOverImg);
  restart.addImage(restartImg);
  restart.scale=0.5;
  gameOver.scale=0.5;
  restart.visible=false;
  gameOver.visible=false;
}
var trex, trex_running, edges;
var groundImage;
var chaoInvisivel
var chao;
var cloudImg
var cactu1,cactu2,cactu3,cactu4,cactu5,cactu6
var cactusGroup,cloudsGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var trex_collided;
var gameOver, restartImg, gameOverImg;
var jumpSound , checkPointSound, dieSound;
var score=0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImg=loadImage("cloud.png")
  cactu1=loadImage("obstacle1.png")
  cactu2=loadImage("obstacle2.png")
  cactu3=loadImage("obstacle3.png")
  cactu4=loadImage("obstacle4.png")
  cactu5=loadImage("obstacle5.png")
  cactu6=loadImage("obstacle6.png")
  trex_collided=loadImage("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3")
  checkPointSound = loadSound("checkpoint.mp3")
  dieSound = loadSound("die.mp3")
}
var cloud
function spawnClouds(){
  if (frameCount%59==0){
    cloud=createSprite(windowWidth,windowHeight,40,10)
    cloud.addImage(cloudImg)
    cloud.velocityX=-7
    cloud.scale=random(0.5,0.9)
    cloud.y=Math.round(random(10,60))
    cloud.depth=trex.depth
    trex.depth+=1;
    cloud.lifetime=95;
    cloudsGroup.add(cloud);
  }
  
}

function spawnCactus(){
  if (frameCount%59==0){
    var cactus=createSprite(600,165,10,40);
    cactus.velocityX=-7
      var numero=Math.round(random(1,6))
      switch(numero) 
      { case 1: cactus.addImage(cactu1); 
        break; case 2: 
        cactus.addImage(cactu2); 
        break; case 3: cactus.addImage(cactu3); 
        break; case 4: cactus.addImage(cactu4); 
        break; case 5: cactus.addImage(cactu5); 
        break; case 6: cactus.addImage(cactu6); 
        break; default: break;
      }
    cactus.scale=1/2;
    cactus.lifetime=300;
    cactusGroup.add(cactus);
  }
}

function draw(){
  //definir a cor do plano de fundo 
  background("white");
  textFont("courier New");
  text("score:"+score,width-80,99-60,40,)
    if(gameState==PLAY){
    chao.velocityX=-7
    score+=Math.round(getFrameRate()/60)
    if(score%100==0&score>0){
      checkPointSound.play();
    }
    if((touches.length>0 ||keyDown("space"))&&trex.y>=150){
      trex.velocityY =-10;
      jumpSound.play();
      touches=[]
    }
  
    trex.velocityY = trex.velocityY + 0.5;
    if (chao.x<0){
      chao.x=chao.width/2
    }
    spawnClouds();
    spawnCactus();
    if(trex.isTouching(cactusGroup)){
      gameState=END;
      dieSound.play();
      //jumpSound.play();
      //trex.velocityY=-10
    }
  }else{
    chao.velocityX=0
    cloudsGroup.setVelocityXEach(0);
    cactusGroup.setVelocityXEach(0);
    trex.velocityY=0;
    cactusGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    trex.changeAnimation("trex_collided",trex_collided)
    restart.visible=true;
    gameOver.visible=true;
    
  }
  //registrando a posição y do trex
  
  //pular quando tecla de espaço for pressionada
  
 //impedir que o trex caia
  trex.collide(chaoInvisivel)
  if (touches.length>0||mousePressedOver(restart)){
    touches=[];
    restartGame();
  }
  drawSprites();
  
}
function restartGame() {
  gameState=PLAY
  restart.visible=false;
  gameOver.visible=false;
  cloudsGroup.destroyEach()
  cactusGroup.destroyEach()
  score=0
  trex.changeAnimation("running",trex_running)
}