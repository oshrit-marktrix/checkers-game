
class Pieces {
  constructor(row, col, type, player, imgUrl) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
    this.img = this.imgToElement(imgUrl);
  }
  //  "tag" the img src as the player element.
  imgToElement(url) {
    let newEl = document.createElement("img");
    newEl.src = url;
    let cell = boardEl.rows[this.row].cells[this.col];
    cell.appendChild(newEl)
    if (this.player == 'black_player') {
      newEl.classList.add('black')
    }
    return newEl;
  }
}
class BoardData {//the start of the game and adding the Pieces to the board.
  constructor(firstPlayer) {
    this.pieces = this.getInitialPieces();
    this.currentPlayer = firstPlayer;
    this.winner = undefined;
  }

  clearBoard(boardEl) {// function that will delete all moves from the board
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        boardEl.rows[i].cells[j].classList.remove('possible-move');
        boardEl.rows[i].cells[j].classList.remove('selected');
      }
    }
  }
  paintPossibleMoves(piece) {// function that will "draw" all moves on the board
    let possibleMoves = piece.getPossibleMoves();
    for (let possibleMove of possibleMoves) {
      let possibleCell = boardEl.rows[possibleMove[0]].cells[possibleMove[1]];
      possibleCell.classList.add('possible-move');
    }
  }


  getPiece(row, col) { // function that will "recognize" the pieces place
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece
      }
    }
  }
  getInitialPieces() {// function that will place the pieces in place
    let result = [];
    for (let i = 0; i < 3; i += 1) {
      for (let j = i % 2; j < 8; j += 2) {
        result.push(new Pieces(i, j, 'black', 'black_player', imgURLsObj.blackblackImg))
      }
    }
    for (let i = 5; i < 8; i += 1) {
      for (let j = i % 2; j < 8; j += 2) {
        result.push(new Pieces(i, j, 'white', 'white_player', imgURLsObj.whitewhiteImg))
      }
    }

    return result;
  }
}
let imgURLsObj =//img's url that get into the "pieces" class constructor
{
  blackblackImg: "http://chongzizil.github.io/Checkers-SMG/imgs/black_man.png",
  blackKingImg: "http://chongzizil.github.io/Checkers-SMG/imgs/black_cro.png",
  whitewhiteImg: "http://chongzizil.github.io/Checkers-SMG/imgs/white_man.png",
  whiteQueenImg: "http://chongzizil.github.io/Checkers-SMG/imgs/white_cro.png",
}
let selectedCell;
let boardData;
let selectedPiece;

const BOARD_SIZE = 8;
const boardEl = document.createElement("table");

function createMainBoard() {
  boardEl.classList.add("mainBoard");
  document.body.appendChild(boardEl);
  for (let row = 0; row < BOARD_SIZE; row++) {
    let rowElement = boardEl.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      let cellElement = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cellElement.classList.add("white");
      } else {
        cellElement.classList.add("black");
      }
    }
  }
  boardData = new BoardData('white_player');
}

window.addEventListener('load', createMainBoard);

