class Weapon{
constructor (x,y){
this.r=20;
this.x=x;
this.y=y;
  this.bulletSpeed=8; 
}
move(){  
this.y-=this.bulletSpeed;

}
show(){

    fill(random(100,255),0,random(100,150 ));
    noStroke();
    ellipse(this.x,this.y,this.r,this.r);
}










} 