var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background, backgroundImage;
var MagicalBook, MagicalBookImage;
var Slappy,SlappyImage ;
var Snowman, SnowmanImage;
var Werewolf, WerewolfImage;
var Dwarf, DwarfImage;
var SlappyGrp, SnowmanGrp, WerewolfGrp, DwarfGrp;
var obstacle, obstacleGrp;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var score;

function preload(){
  //load backgroundImage here
  backgroundImage = loadImage("Images/BGImage2.png");
  //load MagicalBookImage here
  MagicalBookImage = loadImage("Images/magicalBook.png");
  //load SlappyImage here
  SlappyImage = loadImage("Images/slappyobj1.png");
  //load SnowmanImage here
  SnowmanImage = loadImage("Images/snowmanobj3.png");
  //load WerewolfImage here
  WerewolfImage = loadImage("Images/werewolfobj2.png");
  //load DwarfImage here
  DwarfImage = loadImage("Images/dwarfobj4.png");
  gameOverImg = loadImage("Images/GameOverImage.png")
  restartImg = loadImage("Images/restart.png")
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}


function setup(){
  //create canvas
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth);
  console.log(windowHeight);

  //create background
  background = createSprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  background.shapeColor = "lightBlue";
  background.addImage(backgroundImage);
  background.scale = 1.5;
 
  //create MagicalBook
  MagicalBook = createSprite(windowWidth-1150, windowHeight-70, 20, 60);
  MagicalBook.shapeColor = "yellow";
  MagicalBook.addImage(MagicalBookImage);
  MagicalBook.scale = 0.5;

  gameOver = createSprite(640,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;

  restart = createSprite(650,400);
  restart.addImage(restartImg);
  //restart.scale = 0.5;

  invisibleGround = createSprite(windowWidth/2,windowHeight-10,windowWidth,10);
  invisibleGround.visible = false;

  score = 0;

//create Obstacle Groups
obstacleGrp = createGroup();
}
  
function draw(){
 
  //displaying score
  fill("yellow");
  text("Score: "+ score, 500,50);
   
    if(gameState === PLAY){
     
      gameOver.visible = false;
      restart.visible = false;

      //scoring
    score = score + Math.round(getFrameRate()/60);

    if(score>0 && score%100 === 0){
      checkPointSound.play() 
   }
      //jump when the space key is pressed
    if(keyDown("space")&& MagicalBook.y >= windowHeight-300) {
      MagicalBook.velocityY = -12;
      jumpSound.play();
    }
    //add gravity
    MagicalBook.velocityY = MagicalBook.velocityY + 0.8;

    //spawn obstacles
    spawnObj();

    if(obstacleGrp.isTouching(MagicalBook)){
      jumpSound.play();
      gameState = END;
      dieSound.play()
    }
  }
  else if (gameState === END) {

    gameOver.visible = true;
    restart.visible = true;

  //set lifetime of the game objects so that they are never destroyed
    obstacleGrp.setLifetimeEach(-1);
    obstacleGrp.setVelocityXEach(0);

    if(mousePressedOver(restart)) {
      reset();
    }
  }

  //stop MagicalBook from falling down
    MagicalBook.collide(invisibleGround);
    
  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGrp.destroyEach();
  score = 0;
}

function spawnObj(){
  if (frameCount%100 == 0){
    obstacle = createSprite(windowWidth, windowHeight-90, 20,20);
    obstacle.velocityX = -6;
    obstacleGrp.add(obstacle);
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(SlappyImage);
              break;
      case 2: obstacle.addImage(SnowmanImage);
              break;
      case 3: obstacle.addImage(WerewolfImage);
              break;
      case 4: obstacle.addImage(DwarfImage);
              break;
      default: break;
      }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
  }
}