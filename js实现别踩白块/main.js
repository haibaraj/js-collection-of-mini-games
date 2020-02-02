//获取元素
const main = document.querySelector('#main');
const go = document.querySelector('#go');
const count = document.querySelector('#count');
const cols = ['#1AAB8A', '#E15650', '#121B39', '#80A84E'];

//创建开始游戏函数
const startGame = () => {
  let randomNum = Math.floor(Math.random()*4);
  const rowDv = document.createElement('div');
  rowDv.className = 'row';
  
//循环添加方块
  for(let i = 0; i < 4; i++){
    const myDv = document.createElement('div');
    rowDv.appendChild(myDv);
  }

  //判断游戏区域是否有元素，如果有将元素添加到第一个
  if(main.children.length === 0){
    main.appendChild(rowDv);
  }else{
    main.insertBefore(rowDv,main.children[0]);
  }
  rowDv.children[randomNum].style.backgroundColor = cols[randomNum];
  rowDv.children[randomNum].className = 'i';
}

const move = obj => {
  let num = 0, speed = 5;
  obj.timer = setInterval(() => {
    //设置方块移动速度
    let step = obj.offsetTop + speed;
    obj.style.top = step + 'px';

    //如果方块移动到可见区域，则调整游戏区域位置
    if(obj.offsetTop >= 0){
      obj.style.top = -150 + 'px';
      startGame();
    }

    if(obj.children.length === 6){
      for(let i = 0; i < 4; i++){
        if(obj.lastChild.children[i].className === 'i'){
          obj.style.top = -150 +'px';
          gameOver(obj);
        }
      }
      obj.removeChild(obj.lastChild);
    }


//使用addEventListener会出现问题
    obj.onmousedown = (event) => {
      if(event.target.className === 'i'){
        event.target.style.backgroundColor = 'grey';
        event.target.className = '';
        num++;
        count.innerHTML = '游戏分数为'+num;       
      }else{
        gameOver(obj);
      }
      if(num % 10 === 0){
        speed++;
      }
    }
    obj.onmouseup = () => {};
  },20)
}

const gameOver = obj  => {
  clearInterval(obj.timer);
  go.style.display = 'block';
  go.children[0].innerHTML = '游戏结束';

}

go.children[0].addEventListener('click',() => {
  if(main.children.length){
    main.innerHTML = '';
  }
  count.innerHTML = '游戏开始';
  go.style.display = 'none';
  startGame();
  move(main);
})