var gameState ="play"
var score=0
var bomb,bombImage,bombGroup
var life=3

function setup() {
  createCanvas(1000,600);
  snowbroad=createSprite(500, 500, 50, 50);
  snowbroad.addImage("snowbroad",snowbroadimage)
  snowbroad.addImage("collided",fallImage)
  snowbroad.scale= 1.3
  coinGroup= new Group()
  bombGroup= new Group()
  restart=createSprite(width/2,height/2);
  restart.addImage("restart",restartImage);
  restart.scale=0.5
}

function coins(){
  if (frameCount % 60===0){
    var coin =createSprite(600,0,40,10);
    coin.x= Math.round(random(80,900));
    coin.addImage(coinImage);
    coin.scale= 0.5;
    coin.velocityY= 3;

    coin.lifetime=200;

    coinGroup.add(coin)
  }
}
function bombs(){
  if (frameCount % 80===0){
  var bomb=createSprite(500,0,40,10);
  bomb.x= Math.round(random(80,900));
  bomb.addImage("bombImage",bombImage);
  bomb.scale= 0.2;
  bomb.velocityY= 3;

  bomb.lifetime=200;
  bombGroup.add(bomb)
}
}
function draw() {
  
  if (gameState==="play"){
    
  
  background(backgroundimage); 
  coins() 
  bombs()
  if(keyDown("left")){
    snowbroad.x-= 5
  }
  if(keyDown("right")){
    snowbroad.x+=5
  }
  if(snowbroad.x<50){
    snowbroad.x=50
  }

  if(snowbroad.x>950){
    snowbroad.x=950
  }
  restart.visible=false
  textSize(25)
  fill("Black")
  text("Score:"+score, 90,50)
  text("Life:"+life,90,80)

  if(coinGroup.isTouching(snowbroad)){
    score=score+1
    coinGroup[0].destroy()
  }
  if(bombGroup.isTouching(snowbroad)){
    life=life-1
    bombGroup[0].destroy()
  }
  if(life<=0){
    gameState="end"
  }
}
else if (gameState === "end"){
  coinGroup.setVelocityYEach(0);
  bombGroup.setVelocityYEach(0);
  restart.visible=true
  snowbroad.changeImage("collided",fallImage)
  if(mousePressedOver(restart)){
    reset()
  }
}
drawSprites();

}
function reset(){
  gameState = "play";
  restart.visible = false;
  snowbroad.changeImage("snowbroad",snowbroadimage);
  restart.destroy();
  coinGroup.destroyEach();
  bombGroup.destroyEach();
  score = 0;
  life=3
}
function preload(){
  backgroundimage= loadImage("Background.avif")
  snowbroadimage= loadImage("Starting.png")
  coinImage= loadImage("Coins.png")
  bombImage= loadImage("bomb_imag.png")
  fallImage= loadImage("Fall.png")
  restartImage= loadImage("restart.png")
}
