const box = document.querySelector('.snake-box');
class snake{
  constructor(ele){
    this.ele = ele;
  }
  init(){
  this.ele.style.width = '20px';
  this.ele.style.height = '20px';
  this.ele.style.backgroundColor = 'blue';
  this.ele.style.position = 'absolute';
  this.ele.style.top = 0;
  this.ele.style.left = 0;
  box.appendChild(this.ele);
  }

  animate(ele,dir,step,t){
    clearInterval(ele.time);
    if(dir === 'top'){
      ele.time = setInterval(() => {
        let top = ele.offsetTop;
        ele.style.top = step + top + 'px';
      }, t);
    } else{
      ele.time = setInterval(() => {
        let left = ele.offsetLeft;
        ele.style.left = step + left + 'px';
      }, t);
    }
  }

  move(e){
    switch(e){
      case 40:
        this.animate(this.ele,'top',10,200);
        break;
      case 38:
        this.animate(this.ele,'top',-10,200);
        break;
      case 37:
        this.animate(this.ele,'left',-10,200);
        break;
      case 39:
        this.animate(this.ele,'left',10,200);
        break;
    }
  }

  food(){
    
  }
}
  

let ele = document.createElement('div');
const game = new snake(ele);
game.init();
document.addEventListener('keydown',(e) => {
  game.move(e.keyCode);
})
