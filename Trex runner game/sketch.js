var PLAY = 1;
var END = 0;
var gameState = PLAY;
var LVL2
var naruro, naruto_running, naruto_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, wood, metalspike


var score = 0

var backgroundImg;

var backgroundImg2;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload() {
  naruto_running = loadAnimation("N1.PNG", "N2.PNG", "N3.PNG");
  naruto_collided = loadAnimation("NC1.png", "NC2.png");

  groundImage = loadImage("ground2.png");



  wood = loadImage("wood.png");
  spike = loadImage("spike.png");

  backgroundImg = loadImage("naruto_background.jpg")
  backgroundImg2 = loadImage("naruto_background2.jpg")

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  background = createSprite(200, 100, 600, 200)
  naruto = createSprite(50, 160, 20, 50);

  naruto.addAnimation("running", naruto_running);

  naruto.scale = 0.2;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3 * score / 100);

  ground.visible = false

  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300, 140);
  restart.addImage(restartImg);

  gameOver.scale = 0.3;
  restart.scale = 0.04;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(200, 170, 400, 10);
  invisibleGround.visible = false;

 naruto.setCollider("circle", 0,0,40)


  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  //naruto.debug = true;

  


  if (gameState === PLAY) {
    background.addImage("background", backgroundImg)
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -(6 + 3 * score / 100);

   // if (keyDown("space") && naruto.y <= 159) {
      //naruto.velocityY = -12;
  //}
    if((touches.length > 0 || keyDown("SPACE")) && naruto.y  >= height-100) {
      
     naruto.velocityY = -10;
    }
    

    naruto.velocityY = naruto.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    naruto.collide(invisibleGround);

    if(score > 1000){
      gameState = LVL2
    }

    spawnObstacles();

    if (obstaclesGroup.isTouching(naruto)) {
      gameState = END;
    }
  }



  if (gameState === LVL2) {
    background.addImage("background", backgroundImg2)
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -(6 + 3 * score / 100);

    //if (keyDown("space") && naruto.y <= 159) {
      //naruto.velocityY = -12;
    //}

    if((touches.length > 0 || keyDown("SPACE")) && naruto.y  >= height-90) {
      
      naruto.velocityY = -12;
     }

    naruto.velocityY = naruto.velocityY + 0.8
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }naruto.collide(invisibleGround);

    spawnObstacles();

   if (obstaclesGroup.isTouching(naruto)) {
    gameState = END;
    }
  }


  

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    ground.velocityX = 0;
    naruto.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);


    //change the naruto animation


    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
      naruto.changeAnimation(naruto_collided);
    

    if (mousePressedOver(restart)) {
     reset();
    }
  }


  drawSprites();
  textSize(20);
  fill("yellow");
  text("Score: " + score, 450, 50);

}


function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3 * score / 100);
obstacle.setCollider("circle", 0,0,80)
    //generate random obstacles
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: obstacle.scale = 0.9
      obstacle.addImage(wood);
      
        break;
      case 2: obstacle.addImage(spike);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();


  naruto.changeAnimation("running", naruto_running);

  if (localStorage["HighestScore"] < score) {
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);

  score = 0;

}