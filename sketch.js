var dog, happyDog, database, foodS, foodStock;
var dogImage, dogHappyImage;

function preload(){
  dogImage=loadImage("Dog.png");
	dogHappyImage=loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,250);
  dog.addImage(dogImage);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}

function draw() {  
  background(46,149,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImage);
  }
  drawSprites();
  //add styles here
  textSize(25);
  fill("white");
  text("Press the up arrow to feed the dog!", 55, 100);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x +- 1;
  }
  database.ref('/').update({
    Food:x
  })
}