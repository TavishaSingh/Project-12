var spaceImg, space;
var meteorImg, meteor, meteorsGroup;
var star, starImg, starsGroup;
var rocket, rocketImg;

var gameState = "play"

function preload(){
    spaceImg = loadImage("background.jpg");
    meteorImg = loadImage("meteor.png");
    rocketImg = loadImage("rocket.jpg");
    starImg = loadImage("star.jpg")
}

function setup()
{
    createCanvas(600,600);
    
    space = createSprite(300,300);
    space.addImage("space",spaceImg);
    space.velocityY = 1;
    meteorsGroup = new Group();
    starsGroup = new Group();
        
    rocket = createSprite(200,200,50,50);
    rocket.scale = 0.2;
    rocket.addImage("rocket", rocketImg);
}

function draw()
{
    background(255);

   if (gameState === "play") {
      
      if(keyDown("left_arrow"))
      {
          rocket.x = rocket.x - 3;
      }

      if(keyDown("right_arrow"))
      {
       rocket.x = rocket.x + 3; 
      }

      if(keyDown("space") || keyDown("up_arrow"))
      {
       rocket.velocityY = -10;
      }
    
        rocket.velocityY = rocket.velocityY + 0.8;
    
       if(space.y > 400)
       {
          space.y = 300;
        } 
  
        spawnMeteor();

        spawnStar();
        if(starsGroup.isTouching(rocket))
        {
        star.destroy();
        }
       
        if(meteorsGroup.isTouching(rocket) || rocket.y > 600){
        rocket.destroy();
        gameState = "end";
        }
  
        drawSprites();
        
        if (gameState === "end"){
          stroke("red");
          fill("red");
          textSize(30);
          text("Game Over", 230,250)
        }
      }
}

function spawnMeteor()
 {
    if (frameCount % 290 === 0) 
    {
     meteor = createSprite(200, -50);
     meteor.scale = 0.1;
    
     meteor.x = Math.round(random(120,400));

     meteor.addImage(meteorImg);
      
     meteor.velocityY = 10;
    
     meteor.lifetime = 800;
        
     meteorsGroup.add(meteor);
  }
}

function spawnStar()
{
 if(frameCount % 300 === 0)
 {
   star = createSprite(200, -50);
   star.scale = 0.3;

   star.x = Math.round(random(120,400));

   star.addImage(starImg);

   star.velocityY = 1;

   star.lifetime = 800;

   starsGroup.add(star);
   
   
  }
}