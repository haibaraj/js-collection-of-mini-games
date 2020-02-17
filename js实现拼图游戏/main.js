// 获取需要的元素
const start = document.querySelector('.start');
const restart = document.querySelector('.restart');
const p = document.querySelector('p');
const main = document.querySelector('.main');

class Puzzle{
  constructor(){
  
  }
  startRandom(){
    let randomNumber;
    let arr = [1,2,3,4,5,6,7,8,''];

    for(let i = arr.length-1; i >= 0; i--){
      randomNumber = Math.floor(Math.random()*(arr.length-1));
      let num = arr[randomNumber];
      arr[randomNumber] = arr[i];
      arr[i] = num;
    }

    for(let i = 0; i < arr.length; i++){
      main.children[i].innerHTML = arr[i];
      main.children[i].style.backgroundColor = main.children[i].innerHTML ===''?'#ffe272':'#21a5fa';
      main.children[i].setAttribute('index',i);
    }
  }

  time(obj){
    let second = 0;
    let minute = 0;
    setInterval(() => {
      second++;
      if(second%60 === 0){
        second = 0;
        minute++;
      }
      if(second < 10){
        second = '0'+second; 
      }
      obj.innerHTML = '总用时:' + minute + ':' +second;
    }, 1000);
  }

  change(obj1,obj2){
    obj1.innerHTML = obj2.innerHTML;
    obj1.style.backgroundColor = obj2.style.backgroundColor;
    obj2.innerHTML = '';
    obj2.style.backgroundColor = '#ffe272';
  }

  move(obj){
    const index = parseInt(obj.getAttribute('index'));
     for(let i = 0; i < main.children.length; i++){
       if(main.children[i].innerHTML === ''){
         const num = parseInt(main.children[i].getAttribute('index'));
         if(num-3 === index){
          this.change(main.children[i],obj);
         }
         if(num+3 === index){
          this.change(main.children[i],obj);
         }
         if(num-1 === index){
          this.change(main.children[i],obj);
         }
         if(num+1 === index){
          this.change(main.children[i],obj);
         }
       }
     }
  }

  over(){
    for(let i = 0; i < main.children.length-1; i++){
      let x = parseInt(main.children[i].innerHTML);
      if(x-1 !== i){
        return false;
      }
    }
    return true;
  }
}

const game = new Puzzle;
start.addEventListener('click',() => {
  start.style.display = 'none';
  restart.style.display = 'block';
  game.startRandom();
  game.time(p);
  for(let i = 0; i < main.children.length; i++){
    main.children[i].addEventListener('click',function(){
      game.move(this);
      if(game.over()){
        alert('游戏结束');
      }
    });
  }
})