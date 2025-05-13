let bird; 
let imgBird;
let cloud1, cloud2, cloud3;
let CloudsGroup;
let ground;
let invisibleGround;
let score = 0;
let PLAY = 1;
let END = 0;
let gamestate = PLAY;
let edge;
let gameOver;
let gameOverImg;

function preload() {
    imgBird = loadAnimation("Bird11.png", "Bird12.PNG", "Bird13.PNG", "Bird14.PNG");
    cloud1 = loadImage("cloud1.png");
    cloud2 = loadImage("cloud2.png");
    cloud3 = loadImage("cloud3.png");
    gameOverImg = loadImage("GameOver.png");
}

function setup(){
    createCanvas(900, 350);

    bird = createSprite(50, 100, 20, 20);
    bird.addAnimation("animación", imgBird);
    bird.scale = 0.3;

    CloudsGroup = new Group();

    ground = createSprite(200, 180, 400, 20);
    ground.x = ground.width / 2;
    ground.velocityX = -(6 + 3 * score / 100);
    ground.visible = false

    invisibleGround = createSprite(200, 190, 400, 10);
    invisibleGround.visible = false;

    gameOver = createSprite(450, 170);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.15;
    gameOver.visible = false;

    edge = createEdgeSprites();
}

function draw(){
    background("lightBlue");
    textSize(20);
    fill(0);
    textFont ("Georgia")
    text("PUNTUACIÓN: " + score, 600, 47);

    if (gamestate === PLAY) {
        score += Math.round(getFrameRate() / 60);
        ground.velocityX = -(6 + 3 * score / 100);
        
        if (keyDown("UP_ARROW")) bird.y -= 5;
        if (keyDown("DOWN_ARROW")) bird.y += 5;
       

        //bird1.velocityY += 0.8;

        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }

        spawnObstacles();

        if (CloudsGroup.isTouching(bird) || edge.isTouching(bird)){
            gamestate = END;
        }

        drawSprites();
    } 
    else if (gamestate === END) {
        gameOver.visible = true;

        bird.velocityX = 0;
        ground.velocityX = 0;
        CloudsGroup.setVelocityXEach(0);
        CloudsGroup.setLifetimeEach(-1);


        drawSprites();
    }
}

function spawnObstacles() {
    if (frameCount % 27 === 0) {
        let obstacle = createSprite(800, 165, 10, 40);
        obstacle.y = Math.round(random(10, 340));
        obstacle.velocityX = -(5 + 1 * score / 100);

        let rand = Math.round(random(1, 3));
        switch (rand) {
            case 1: obstacle.addImage(cloud1); break;
            case 2: obstacle.addImage(cloud2); break;
            case 3: obstacle.addImage(cloud3); break;
        }

        obstacle.scale = 0.4;
        obstacle.setCollider ("rectangle", 0,0,175,97)
        obstacle.lifetime = 300;

        obstacle.depth = bird.depth;
        bird.depth = bird.depth + 1;
        bird.depth = gameOver.depth + 1;
        obstacle.depth = gameOver.depth + 1;

        CloudsGroup.add(obstacle); 
    }
}

function reset() {
    gamestate = PLAY;
    gameOver.visible = false;
    CloudsGroup.destroyEach();
    bird.velocityY = 0;
    score = 0;
}


