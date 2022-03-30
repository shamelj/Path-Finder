let spawnRate2=200;
class Enemy2{
constructor (){
this.x=random(200,600);
this.y=0;
  this.r=30;
  this.speedY=4;
  this.speedX=0;
} 
move(){  
  this.speedX =random(-10,10);
  this.speedY =random(-2,5);
  this.y+=this.speedY;
  this.x += this.speedX;
}
show(){
 
    fill(200,180,0);
    noStroke();
    ellipse(this.x,this.y,this.r,this.r);
}






}