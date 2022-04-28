function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  chao= createSprite(200,180,400,20)
  chao.addImage(groundImage)
  chaoInvisivel=createSprite(200,190,400,10)
  chaoInvisivel.visible=false
}
var trex, trex_running, edges;
var groundImage;
var chaoInvisivel
var chao;
var cloudImg
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImg=loadImage("cloud.png")
}
var cloud
function spawnClouds(){
  if (frameCount%59==0){
cloud=createSprite(600,100,40,10)
  cloud.addImage(cloudImg)
  cloud.velocityX=-7
  cloud.scale=random(0.5,0.9)
  cloud.y=Math.round(random(10,60))
  cloud.depth=trex.depth
  trex.depth+=1
  }
  
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");

  //registrando a posição y do trex
  chao.velocityX=-7
  //pular quando tecla de espaço for pressionada
  if(keyDown("space")&&trex.y>=150){
    trex.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.5;

 //impedir que o trex caia
  trex.collide(chaoInvisivel)
  drawSprites();

  if (chao.x<0){
    chao.x=chao.width/2
  }
  spawnClouds();
}
