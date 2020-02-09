const div2048 = document.querySelector('#div2048');
const start = document.querySelector('#start');

class Game2048 {
  constructor() {
    this.tiles = new Array(16);
  }
  init(){
    for(let i = 0; i < 16; i++){
      let tile = document.createElement('div');
      this.setTilesVal(tile,0);
      this.tiles[i] = tile;
      div2048.appendChild(this.tiles[i]);
    } 
    this.randomTiles();
    this.randomTiles();
  }

  setTilesVal(tile,innerVal){
    tile.innerHTML = innerVal;
    if(innerVal === 0){
      tile.innerHTML = '';
    }
    tile.className = 'tile tile' + innerVal;
    tile.setAttribute('val',innerVal);
  }

  randomTiles(){
    let zeroTiles = [];
    const random = Math.random() < 0.7? 2:4;
  
    for(let i = 0; i < this.tiles.length; i++){
      if(this.tiles[i].innerHTML === ''){
        zeroTiles.push(this.tiles[i]);
      }
    }
    let randomNumber = Math.floor(Math.random()*zeroTiles.length);
    this.setTilesVal(zeroTiles[randomNumber],random);
  }

  move(keyCode){
    let j;
    switch(keyCode){
      case 37:
        for(let i = 1; i < this.tiles.length; i++){
          j = i;
          while(j%4 !== 0){
            this.merge(this.tiles[j-1],this.tiles[j]);
            j-=1;
          }
        }
        this.randomTiles();
        break;
      case 38:
        for(let i = 4; i < this.tiles.length; i++){
          j = i;
          while(j >= 4){
            this.merge(this.tiles[j-4],this.tiles[j]);
            j -=4;
          }
        }
        this.randomTiles();
        break;
      case 39:
        for(let i = 14; i >= 0; i--){
          j = i;
          while(j % 4 !== 3){
            this.merge(this.tiles[j+1],this.tiles[j]);
            j+=1;
          }
        }
        this.randomTiles();
        break;
      case 40:
        for(let i = 11; i >=0; i--){
          j = i;
          while(j <= 11){
            this.merge(this.tiles[j+4],this.tiles[j]);
            j+=4;
          }
        }
        this.randomTiles();
      default:
        break;
    }
  }

  merge(preTile,currTile){
    let preVal =  parseInt(preTile.getAttribute('val')); 
    let currVal = parseInt(currTile.getAttribute('val'));
    if(currVal !== 0){
      if(preVal === 0){
        this.setTilesVal(preTile,currVal);
        this.setTilesVal(currTile,0);
      }else if(preVal === currVal){
        this.setTilesVal(preTile,preVal*2);
        this.setTilesVal(currTile,0);
      }
    }
  }

  over(){
    for(let i = 0; i < this.tiles.length; i++){
      if(this.tiles[i].innerHTML === ''){
        return false;
      }
      if(i%4 !== 3){
        if(this.tiles[i].innerHTML === this.tiles[i+1].innerHTML){
          return false;
        }
      }
      if(i < 12){
        if(this.tiles[i].innerHTML === this.tiles[i+4].innerHTML){
          return false;
        }
      }
    }
    return true;
  }

  clean(){
    for(let i = 0; i < this.tiles.length; i++){
      div2048.removeChild(this.tiles[i]);
    }
  }
}

let game = new Game2048;
start.addEventListener('click', () => {
  start.style.display = 'none';
  game.init();
})
window.addEventListener('keyup',(event) => {
  if(game.over()){
    game.clean();
    start.style.display = 'block';
    start.innerHTML = 'Restart';
    return;
  }
  game.move(event.keyCode);
})


