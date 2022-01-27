var PLAY = 1;
var END = 0;
var gameState = PLAY;
var stars = 0;
var score = 0;

var rocket, rocket_image;
var astroid_image, astroidG;
var star_image, starG;
var backgroundImg;
var speed_powerup_image, speed_powerupG;
var speed_powerup;
var astroid;
var star;
var game_over_image;



function preload(){
    backgroundImg = loadImage("baground.png");
    rocket_image = loadAnimation("rocket.gif");
    astroid_image = loadImage("astroid.png");
    star_image = loadImage("star.png");
    speed_powerup_image = loadImage("speed.png");
    game_over_image = loadAnimation("rocket_crash.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    backgroundImg.velocityX = -(6 + 3*score/100);

    rocket = createSprite(200,500,10,10);
    rocket.addAnimation("rocket",rocket_image);
    rocket.addAnimation("crash", game_over_image);
    rocket.scale = 0.5;
    rocket.debug = false;
    rocket.setCollider('circle',0,0,50);

    

    astroidG = new Group();
    starG = new Group();
    speed_powerupG = new Group();
}

function draw() {
    background(backgroundImg);

    console.log(rocket.x)
    textSize(20);
    fill("white")
    text("Stars: "+ stars,30,50);

    fill("white")
    text("Score: "+ score,30,80);

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        rocket.x = World.mouseX;

        createAstroid();
        createStar();
        createSpeed();

        if(rocket.isTouching(starG)){
            stars = stars + 1;
            starG.destroyEach();
        }
        else if(rocket.isTouching(astroidG)){
            starG.destroyEach();
            astroidG.destroyEach();
            speed_powerupG.destroyEach();
            rocket.changeAnimation("crash", game_over_image);
            gameState = END;
        }
        if(rocket.isTouching(speed_powerupG)){
            speed_powerupG.destroyEach();
            score = score + 500;
        }
    }

    if(gameState===END){
        textSize(50);
        fill("white")
        text("Game Over",150,300);
    }


drawSprites();
}


function createAstroid() {
    if (World.frameCount % 100 == 0) {
    astroid = createSprite(Math.round(random(windowWidth),40, 10, 10));
    astroid.addImage(astroid_image);
    astroid.scale=0.12;
    astroid.velocityY = 3;
    astroid.lifetime = 400;
    astroidG.add(astroid);
    
    }
  }

  function createStar() {
    if (World.frameCount % 150 == 0) {
    star = createSprite(Math.round(random(windowWidth),40, 10, 10));
    star.addImage(star_image);
    star.velocityY = 3;
    star.scale = 0.12;
    star.lifetime = 400;
    starG.add(star);
    
    }
  }

  function createSpeed() {
    if (World.frameCount % 100 == 0) {
    speed_powerup = createSprite(Math.round(random(windowWidth),40, 10, 10));
    speed_powerup.addImage(speed_powerup_image);
    speed_powerup.scale=0.12;
    speed_powerup.velocityY = 3;
    speed_powerup.lifetime = 400;
    speed_powerupG.add(speed_powerup);
    
    }
  }