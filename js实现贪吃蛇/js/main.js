const box = document.querySelector('.snake-box');
let ele = [];
let arr = [];
class snake{
  constructor(ele,arr){
    this.ele = ele;
    this.arr = arr;
  }
  init(){  
    this.ele = [];
    for(let i = 0; i < 3; i++){
      let head = document.createElement('div');
      this.ele.push(head);
      this.ele[i].style.width = '20px';
      this.ele[i].style.height = '20px';
      this.ele[i].style.backgroundColor = 'deeppink';
      this.ele[i].style.position = 'absolute';     
      this.ele[i].style.zIndex = 999;
      box.appendChild(this.ele[i]);
    }
    this.ele[0].style.backgroundColor = 'skyblue';
    for(let i = 0; i < this.ele.length; i++){
      this.ele[i].style.top = 0 + 'px';
      this.ele[i].style.left = (this.ele.length-i-1)*20 + 'px';
    }
  }

  // 移动动画
  animate(dir,step){
      if(dir === 'top'){
        for(let i = this.ele.length-1; i >= 1; i--){
          this.ele[i].style.left = this.ele[i-1].offsetLeft + 'px';
          this.ele[i].style.top = this.ele[i-1].offsetTop + 'px';
        }
        this.ele[0].style.top = this.ele[0].offsetTop + step + 'px';
      }else{
        for(let i = this.ele.length-1; i >= 1; i--){
          this.ele[i].style.left = this.ele[i-1].offsetLeft + 'px';
          this.ele[i].style.top = this.ele[i-1].offsetTop + 'px';
        }
        this.ele[0].style.left = this.ele[0].offsetLeft + step + 'px';
      }
  }

  // 蛇头移动
  move(e){
      switch(e){
        case 40:
          this.animate('top',20);
          break;
        case 38:
          this.animate('top',-20);
          break;
        case 37:
          this.animate('left',-20);
          break;
        case 39:
          this.animate('left',20);
          break;
    }
  }

  //创建随机食物 
  foods(){
    let randomX = Math.floor(Math.random()*40)*20;
    let radomy = Math.floor(Math.random()*25)*20;
    let food = document.createElement('div');
    food.style.width = '20px';
    food.style.height = '20px';
    food.style.backgroundColor = 'deeppink';
    food.style.position = 'absolute';
    food.style.top = radomy + 'px';
    food.style.left = randomX+ 'px';
    box.appendChild(food);
    this.arr.push(food);
  }

  isCover(){
    // 判断蛇是否吃到食物
    for(let i = 0; i < this.arr.length; i++){
      if(this.ele[0].offsetLeft === this.arr[i].offsetLeft){
        if(this.ele[0].offsetTop === this.arr[i].offsetTop){
          this.ele.push(this.arr[i]);
          return true;
        }  
      }
    }
   
    return false;
  }

  over(){
    for(let i = 0; i < this.ele.length; i++){
      if(this.ele[i].offsetTop < 0 || this.ele[i].offsetTop > 500){
        game.init()
        return true;
      }
      if(this.ele[i].offsetLeft <0 || this.ele[i].offsetLeft > 800){
        game.init();
        return true;
      }
    }

    return false;
  }
}
  
const game = new snake(ele,arr);
game.init();
game.foods();
document.addEventListener('keydown',(e) => {
  clearInterval(ele.time);
  ele.time = setInterval(() => {
  game.move(e.keyCode);
  if(game.isCover()){
    game.foods();
  }
  if(game.over()){
    alert('game over');
    clearInterval(ele.time);
    for(let i = box.children.length-1; i >=0; i--){
      box.removeChild(box.children[i]);
    }
    game.init();
    game.foods();
  }
  }, 300);
})



