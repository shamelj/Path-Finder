let spawnRate=70;
class Enemy{
constructor (){
this.x=random(100,700);
this.y=0;
  this.r=20;
  this.speed=random(1,3);
} 
move(){  
this.y+=this.speed;
  if (player.x+50<this.x)this.x+=0.8;
  else this.x-=0.8;
}
show(){
 
    fill(0,255,0);
    noStroke();
    ellipse(this.x,this.y,this.r,this.r);
}






}