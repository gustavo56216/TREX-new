var trex, trex_running, edges, solo2, nuvens, nuvens2, cacto;
var groundImage;
var solo;
var c1;
var c2;
var c3;
var c4;
var c5;
var c6;
var gameover,gameoverimg; 
var restart,restarting;
var gameState = "jogar"
var evecactos, evenuvens;
var song1, song2, song3;
var score = 0 ;
var velo = 4 ;
var lose;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  nuvens2 = loadImage("cloud.png")
  c1=loadImage("obstacle1.png")
  c2=loadImage("obstacle2.png")
  c3=loadImage("obstacle3.png")
  c4=loadImage("obstacle4.png")
  c5=loadImage("obstacle5.png")
  c6=loadImage("obstacle6.png")
  gameoverimg=loadImage("gameOver.png")
  restarting=loadImage("restart.png")
  song1=loadSound("checkPoint.mp3") 
  song2=loadSound("die.mp3")
  song3=loadSound("jump.mp3")
  lose=loadAnimation("trex_collided.png")

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  frameRate(80);

  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("lose", lose);
  trex.scale = 0.5;
  trex.x = 50;
  //trex.debug=true
  trex.setCollider("circle",0,0,40);
  //criando o solo
  edges = createEdgeSprites();
  solo = createSprite(300,190,600,20);
  solo.addImage("soloimage",groundImage);
  solo2=createSprite(300,200,600,10);
  solo2.visible=false;

  //GameOver e Restart
  gameover=createSprite(width/2,60,30,30 );
  gameover.addImage("gameover",gameoverimg);
  gameover.visible=false;
  gameover.scale=0.60;

  restart=createSprite(width/2,100,10,10 );
  restart.addImage("restart",restarting);
  restart.visible=false;
  restart.scale=0.60;

  evecactos=new Group();
  evenuvens=new Group();
}

function draw(){
  //definir a cor do plano de fundo 
  background("white");
  text("score:"+score,40 ,30);
  //JOGAR
  if(gameState === "jogar"){
    
    if( touches.length>0 ||keyDown("space")&&trex.y>160){
      trex.velocityY = -12;
      song3.play();
      touches = []
    }
    score+= Math.round(frameCount/320);
    if(score%200===0 && score>0){
      velo=velo+1;
      song1.play();
    }
   
    trex.velocityY = trex.velocityY + 0.5;
    solo.velocityX = -velo;
    if(solo.x<0){
    solo.x= solo.width/2;
    } 

    if(trex.isTouching(evecactos)){
      gameState="encerrar";
      song2.play()
    }
    geranuvens();
    cactos();

    //ENCERRAR
  } else if(gameState === "encerrar"){
    solo.velocityX = 0;
    evecactos.setVelocityXEach(0);
    evenuvens.setVelocityXEach(0);
    evenuvens.setLifetimeEach(-1);
    evecactos.setLifetimeEach(-1);
    gameover.visible=true;
    trex.velocityY=0;
    restart.visible=true;
    trex.changeAnimation("lose", lose);

    if(mousePressedOver(restart)|| touches.length>0){
      gameState="jogar";
      evecactos.destroyEach();
      evenuvens.destroyEach();
      restart.visible=false;
      gameover.visible=false;
      score=0;
      frameCount=0;
      trex.changeAnimation("running",trex_running);
      touches=[]
    }

  }
  
 drawSprites();
 trex.collide(solo2);
}

function geranuvens(){  
  if(frameCount%(Math.round(random(40,60)))===0){
    nuvens=createSprite(width,100,20,50);
    nuvens.velocityX=-3;
    nuvens.addImage(nuvens2);
    nuvens.y = Math.round(random(20,100));
    nuvens.scale=0.7;
    nuvens.lifetime=220;
    evenuvens.add(nuvens);
  }

}

function cactos (){  
  if(frameCount%60===0){
    cacto=createSprite(width,174,20,50);
    cacto.velocityX=-velo;
    cacto.lifetime=220;
    evecactos.add(cacto);

    var valor = Math.round(random(1,6));
    cacto.scale=0.4;
    switch(valor){
      case 1:cacto.addImage(c1);
      break;
      case 2:cacto.addImage(c2);
      break;
      case 3:cacto.addImage(c3);
      break;
      case 4:cacto.addImage(c4);
      break;
      case 5:cacto.addImage(c5);
      break;
      case 6:cacto.addImage(c6);
      break;
    }
  }  
}
  

