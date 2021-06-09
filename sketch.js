var dog, dogimg1, dogimg2, milkimg;
var database;
var foods,foodStock, lastfeed;

function preload()
{
  dogimg1=loadImage("images/dogImg.png")
  dogimg2=loadImage("images/dogImg1.png")
}

function setup() {
	database=firebase.database()
  createCanvas(1000,400);
  dog=createSprite(250,300,150,150)
  dog.addImage(dogimg1)
  dog.scale=0.15
  foodStock=database.ref('Food')
  foodStock.on("value",readstock)
  food1=new Food()
  feed=createButton("Feed The Dog")
  feed.position(700,95)
  addfood=createButton("Add Food")
  addfood.position(800,95)
  feed.mousePressed(feeddog)
  addfood.mousePressed(addfoods)
}


function draw() {  
background(46,139,87)
food1.display()
feedtime=database.ref('feedtime')
feedtime.on("value",function(data){
  lastfeed=data.val()
})
textSize(1)
if(lastfeed>=12){
  text("lastfeed"+lastfeed%12+"pm",350,30)
}
else if (lastfeed==0){
  text("lastfeed=12am",350,30)
}
else {
  text("lastfeed"+lastfeed+"am",350,30)
}
  drawSprites();
}
function readstock(data){
  foods=data.val()
  food1.updatefoodstock(foods)
}
function feeddog(){
  dog.addImage(dogimg2)
  if(food1.getfoodstock()<=0){
    food1.updatefoodstock(food1.getfoodstock()*0)
  }
  else {
    food1.updatefoodstock(food1.getfoodstock()-1)
  }
  database.ref('/').update({
    Food:food1.getfoodstock(),feedtime:hour()
  })
}

function addfoods(){
foods++
database.ref('/').update({
  Food:foods
})
}