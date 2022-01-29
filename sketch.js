var PLAY = 1;
var END = 0;
var gameState = PLAY;
var stars = 0;
var score = 0;
var shoot_lines = 2;

var rocket, rocket_image;
var astroid_image, astroidG;
var star_image, starG;
var backgroundImg;
var speed_powerup_image, speed_powerupG;
var speed_powerup;
var astroid;
var star;
var game_over_image;
var rocket_sound_load;
var shoot, shoot_image, shoot_sound_load, shootG;
var shoot_ammo, shoot_ammo_image, ammoG;
var alien, alien_image, alienG;
var black_hole, black_hole_image, black_holeG;
var spaceship_crash_image;

var restart, restartImg;



function preload(){
    backgroundImg = loadImage("baground.png");
    rocket_image = loadAnimation("rocket.gif");
    astroid_image = loadImage("astroid.png");
    star_image = loadImage("star.png");
    speed_powerup_image = loadImage("speed.png");
    game_over_image = loadAnimation("rocket_crash.png");
    shoot_image = loadImage("shoot.png");
    restartImg = loadImage("restart.png");
    shoot_ammo_image = loadImage("shoot_ammo.png");
    alien_image = loadAnimation("alien.png");
    black_hole_image = loadImage("black_hole.png");
    spaceship_crash_image = loadAnimation("spaceship_crash.png")

    rocket_sound_load = loadSound("rocket_crash.wav");
    shoot_sound_load = loadSound("shoot_sound.wav");

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    backgroundImg.velocityX = -(6 + 3*score/100);

    rocket = createSprite(200,windowHeight-60,10,10);
    rocket.addAnimation("rocket",rocket_image);
    rocket.addAnimation("crash", game_over_image);
    rocket.addAnimation("alien crash", spaceship_crash_image);
    rocket.scale = 0.5;
    rocket.debug = false;
    rocket.setCollider('circle',0,0,50);

    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);
    restart.scale = 0.1;
    restart.visible = false;

    astroidG = new Group();
    starG = new Group();
    speed_powerupG = new Group();
    shootG = new Group();
    ammoG = new Group();
    black_holeG = new Group();
    alienG = new Group();


}

function draw() {
    background(backgroundImg);

    textSize(20);
    fill("white")
    text("Stars: "+ stars,30,50);

    textSize(20);
    text("Score: "+ score,30,80);

    textSize(20);
    text("Ammo : "+ shoot_lines,30,110);

    if (gameState===PLAY){
        starG.depth = rocket.depth;
        rocket.depth = rocket.depth-1;

        score = score + Math.round(getFrameRate()/60);
        rocket.x = World.mouseX;
        
        //for fun//rocket.y = World.mouseY;

        createAstroid();
        createStar();
        createSpeed();
        createAmmo();
        createalien();
        createblackhole();


        if(rocket.isTouching(starG)){
            stars = stars + 1;
            starG.destroyEach();
        }
        else if(rocket.isTouching(astroidG)){
            alienG.destroyEach();
            starG.destroyEach();
            astroidG.destroyEach();
            speed_powerupG.destroyEach();
            ammoG.destroyEach();
            black_holeG.destroyEach();
            rocket_sound_load.play();
            rocket.changeAnimation("crash", game_over_image);
            gameState = END;
        }
        else if(rocket.isTouching(speed_powerupG)){
            speed_powerupG.destroyEach();
            score = score + 500;
        }


        else if (keyDown("SPACE") && shoot_lines > 0) {
            shoot_lines = shoot_lines - 1;
            shoot = createSprite(rocket.x,rocket.y, 10, 10);
            shoot.addImage(shoot_image);
            shoot_sound_load.play();
            shoot.scale=0.12;
            shoot.velocityY = -6;
            shoot.lifetime = 400;
            shootG.add(shoot);
        }
        else if(shootG.isTouching(astroidG)){
            astroidG.destroyEach();
        }
        else if(shootG.isTouching(alienG)){
            alienG.destroyEach();
        }
        else if(shoot_lines < 0){
            shootG.destroyEach();
        }
        else if(rocket.isTouching(ammoG)){
            ammoG.destroyEach();
            shoot_lines = shoot_lines + 50
        }
        else if(rocket.isTouching(alienG)){
            rocket.changeAnimation("alien crash", spaceship_crash_image);
            alienG.destroyEach();
            starG.destroyEach();
            astroidG.destroyEach();
            speed_powerupG.destroyEach();
            ammoG.destroyEach();
            black_holeG.destroyEach();
            rocket_sound_load.play();
            gameState = END;
        }
        else if(rocket.isTouching(black_holeG)){
            alienG.destroyEach();
            starG.destroyEach();
            astroidG.destroyEach();
            speed_powerupG.destroyEach();
            ammoG.destroyEach();
            black_holeG.destroyEach();
            rocket_sound_load.play();
            gameState = END;
        }
        
    }

    if(gameState===END){
        textSize(50);
        fill("white")
        text("Game Over",150,300);
        restart.visible = true;

        if(keyDown("SPACE")) {      
            reset();
          }
    }


drawSprites();
}


function createAstroid() {
    if (World.frameCount % 200 == 0) {
    astroid = createSprite(Math.round(random(windowWidth),40, 10, 10));
    astroid.addImage(astroid_image);
    astroid.scale=0.12;
    astroid.velocityY = 5;
    astroid.lifetime = 400;
    astroidG.add(astroid);
    
    }
  }

  function createStar() {
    if (World.frameCount % 300 == 0) {
    star = createSprite(Math.round(random(windowWidth),40, 10, 10));
    star.addImage(star_image);
    star.velocityY = 5;
    star.scale = 0.12;
    star.lifetime = 400;
    starG.add(star);
    
    }
  }

  function createSpeed() {
    if (World.frameCount % 1050 == 0) {
        speed_powerup = createSprite(Math.round(random(windowWidth),40, 10, 10));
        speed_powerup.addImage(speed_powerup_image);
        speed_powerup.scale=0.12;
        speed_powerup.velocityY = 10;
        speed_powerup.lifetime = 400;
        speed_powerupG.add(speed_powerup);
    
    }
  }

  function reset(){
    gameState = PLAY;
    restart.visible = false;
    
    speed_powerupG.destroyEach();
    starG.destroyEach();
    astroidG.destroyEach();
    
    rocket.changeAnimation("rocket",rocket_image);
    
    score = 0;
    stars = 0;
    shoot_lines = 2;


}

function createAmmo() {
    if (World.frameCount % 500 == 0) {
        shoot_ammo = createSprite(Math.round(random(windowWidth),40, 10, 10));
        shoot_ammo.addImage(shoot_ammo_image);
        shoot_ammo.scale=0.2;
        shoot_ammo.velocityY = 5;
        shoot_ammo.lifetime = 400;
        ammoG.add(shoot_ammo);
    
    }
  }

  function createalien() {
    if (World.frameCount % 249 == 0) {
        alien = createSprite(Math.round(random(windowWidth),40, 10, 10));
        alien.addAnimation("alien", alien_image);
        
        alien.scale=0.2;
        alien.velocityY = 5;
        alien.lifetime = 400;
        alienG.add(alien);
    
    }
  }

  function createblackhole() {
    if (World.frameCount % 435 == 0) {
        black_hole = createSprite(Math.round(random(windowWidth),40, 10, 10));
        black_hole.addImage(black_hole_image);
        black_hole.scale=0.2;
        black_hole.velocityY = 5;
        black_hole.lifetime = 400;
        black_holeG.add(black_hole);
    
    }
  }