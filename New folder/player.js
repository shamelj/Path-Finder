let weapons=[];let fireRate=25,fire=0;
class Player{
constructor(){
this.x=width/2 -50;
this.y=height -40;
this.speed=10;
this.h=20;
this.w=100;
this.weapon=new Weapon(this.x+50,this.y);
}
  move(){
  if (keyIsDown(RIGHT_ARROW)){
    this.x+=this.speed;}
  else if (keyIsDown(LEFT_ARROW))
  {
   this.x-=this.speed;
  }
  if (this.x+this.w>width) 
    this.x=width-this.w;
    else if (this.x<0)
      this.x=0;
  }
  show(){
  fill(255,0,0);
    noStroke();
   // rectMode(CENTER);
    rect(this.x,this.y,this.w,this.h);
    fill(0,0,random(100,255))
    rect(this.x+this.w/2.5,this.y,20,20)
   
  }
  shoot(){
   if (keyIsDown(32)&&fire>=fireRate) {
  weapons[weapons.length]=new Weapon(player.x+50,player.y);
     fire=0;
   
  }
  for (let i=0;i<weapons.length;i++)
  {
  if (weapons[i].y<0){
  weapons.shift();
  continue;
  }
  weapons[i].move();
  weapons[i].show();
  }
  
  
  }






}
 