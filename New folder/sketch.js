let player; let enemies=[];let time=1;
function setup() {
  createCanvas(800, 400);
  player=new Player();
}

function draw() {
  background(220);
  player.move();
  player.show();
  player.shoot();
  enenmy();
fire++;
time++;
} 
function enenmy(){
if (time%spawnRate==0){
enemies[enemies.length]=new Enemy();
}
  if (time>60*5&&time%spawnRate2==0){
  enemies[enemies.length]=new Enemy2();
  }
  for (let i=0;i<enemies.length;i++)
  {
   hit(i);
  }
 for (let i=0;i<enemies.length;i++)
  {
   
  if (enemies[i].y>height){
  enemies.splice(i, 1);
  continue;
  }
  enemies[i].move();
  enemies[i].show();
  }

}
function hit(j)
{
 for (let i=0;i<weapons.length;i++)
  {
    let y1=weapons[i].y,y2=enemies[j].y,x1=enemies[j].x,x2=weapons[i].x;
    
  if (abs(y2-y1)<=weapons[i].r/2+enemies[j].r/2&&abs(x2-x1)<=weapons[i].r/2+enemies[j].r/2 ){
  weapons.splice(i, 1);
  enemies.splice(j, 1);
    break;
  }
  }

}

