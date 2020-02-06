const div2048 = document.querySelector('#div2048');
const start = document.querySelector('#start');

class Game2048 {
  constructor() {
    this.tiles = new Array(16);
  }
  init(){
    for(let i = 0; i < 16; i++){
      let tile = document.createElement('div');
      this.tiles[i] = tile;
      tile.classList.add('tile','tile0');
      tile.setAttribute('index',i);
      div2048.appendChild(this.tiles[i]);
    } 
    this.randomTiles();
    this.randomTiles();
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
    console.log(zeroTiles[randomNumber])
    zeroTiles[randomNumber].innerHTML = random === 2? 2:4;
    zeroTiles[randomNumber].className = 'tile tile'+random;
}
  move(){
        //   document.addEventListener('keydown',(event) => {
    //     switch(event.keyCode){
    //       case 37:
    //         for(let i = 0; i < 16; i++){
    //           if(tiles[i].className !== 'tile tile0'){
    
    //           }
    //         }
    //           ;
    //     }
    //   })
    // }
  }
}

start.addEventListener('click', () => {
  start.style.display = 'none';
  let game = new Game2048;
  game.init();
})