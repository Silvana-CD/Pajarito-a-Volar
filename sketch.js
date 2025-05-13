let trex;
let imgTrex;
let edges;
let ground;
let imgGround;
let invisibleGround;
let rand;
let cloud;
let cloudImage;
let obstacle;
let obs1, obs2, obs3, obs4, obs5, obs6;
let score=0;
let CloudsGroup, obstaclesGroup;
let trex_running;
let PLAY=1;
let END=0;
let gamestate=PLAY;
let gameOver, restart;

function preload() {
    groundImage = loadImage("cloud.png");
    imgTrex = loadAnimation("trex2.png","trex3.png","trex4.png");
    imgGround = loadImage("ground2.png");
    cloudImage = loadImage("cloud.png");
    obs1 = loadImage ("obstacle1.png");
    obs2 =  loadImage ("obstacle2.png");
    obs3 =  loadImage ("obstacle3.png");
    obs4 = loadImage ("obstacle4.png");
    obs5 = loadImage ("obstacle5.png");
    obs6 = loadImage ("obstacle6.png");

    gameOver=loadImage("gameOver.png");
    restart=loadImage("restart.png");
}
function setup() {
createCanvas(600,200);

trex = createSprite(200,180,400,20);

trex.addAnimation("running",trex_running);
trex.addAnimation("collided", trex_collided);
trex.scale = 0.5;

ground = createSprite(200, 180, 400, 20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -(6 + 3*score/100);

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);

restart = createSprite(300,100);
restart.addImage(restartImg);

gameOver.scale = 0.5;
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;

CloudsGroup = new Group();
obstaclesGroup = new Group();

score = 0;
rand = Math.round(random(1,100));
}
function draw(){
    //trex.debug = true;
    background(255);
    text("PUNTUACIÓN: "+score, 500,50);

    if(gamestate===PLAY){
    score = score+ Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

   if(keyDown("space") && trex.y >= 159) {
        trex.velocityY = -12;
    }

    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
        ground.x = ground.width/2;
    }
     
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();

    if(obstaclesGroup.isTouching(trex)){
        gamestate = END;
    }
}
    else if(gamestate===END) { 
        gameOver.visible = true;
        restart.visible = true;

    //establece la velocidad de cada objeto de juego en 0
       trex.velocityX = 0;
       ground.velocityX = 0;
       obstaclesGroup.setVelocityXEach(0);
       CloudsGroup.setVelocityXEach(0);

//cambia la animación del Trex
    trex.changeAnimation("collided",trex_collided);
   
   
    obstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart1)){  
        resert();
    }
}


   drawSprites()
}


function spawnClouds() {
//escribe aquí el código para aparecer las nubes
if(frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

//asigna el ciclo de vida a la variable
    cloud.lifetime = 200;

//ajusta la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;

    CloudsGroup.add(cloud);
    }

}


function spawnObstacles() {
    if(frameCount % 60 === 0) {
        var obstacle = createSprite (600,165,10,40);
    //obstacle.debug = true
        obstacle.velocityX=-(6 + 3*score/100);

    //genera obstáculos al azar
        var rand = Math.round(random(1,6));
    switch(rand) {
        case 1: obstacle.addImage(obs1);
            break;
        case 2: obstacle.addImage(obs2);
            break;
        case 3: obstacle.addImage(obs3);
            break;
        case 4: obstacle.addImage(obs4);
            break;            
        case 5: obstacle.addImage(obs5);
            break;        
        case 6: obstacle.addImage(obs6);
            break;
    default: break;
}

//asigna una escala y un ciclo de vida al obstáculo
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
//añade cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
    }
}
function reset(){
    gamestate = PLAY;
    gameOver.visible = false;
    restart.visible = false;


    obstaclesGroup.destroyEach();
    CloudsGroup.destroyEach();

    trex.changeAnimation("running",trex_running);
    
    
    
    SCORE=0;

}