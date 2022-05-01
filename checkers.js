BOARD_SIZE = 8
let selectedCell;
let selectedPiece;

const boardEl = document.createElement("table");
let imgURL =
{
  // blackpiece: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/5c837aac7c42de1f9f125cff37ab2c70-1612076004546/fiverr-og-logo.png",
  queenblackpiece: "./piece/queenblackpiece.png",
  whitepiece: "./PIECES/whitepiece.png",
  queenwhitepiece: "./PIECES/queenwhitepiece.png"
}
function createBoard() {
  boardEl.classList.add("Board");
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
      cellElement.addEventListener('click', () => onCellClick(row, col));
    }
  }
  boardData = new BoardData();
}

window.addEventListener('load', createBoard);

class Piece {
  constructor(row, col, color, imgURL) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.imgToPlayer(imgURL);
  }
  imgToPlayer(url) {//tag the img to player element
    let newEl = document.createElement("img");
    newEl.src = url;
    let cell = boardEl.rows[this.row].cols[this.col];
    cell.appendChild(newEl);
    console.log(rows);
  }
}

class BoardData {
  constructor() {
    this.pieces = this.getPieces();
  }

  getPlace(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece
      }
    }
  }
  getPieces() {
    let result = [];
    for (let i = 0; i < 3; i += 1) {
      for (let j = i % 2; j < 8; j += 2) {
        result.push(new Piece(i, j, 'black', 'black_player', imgURL.blackpiece))
      }
    }
    return result;
  }

  imgToPlayer() {
    let result = [];
    result.push(new Piece(1, 3, "blackpiece", imgURL.blackpiece))
    result.push(new Piece(6, 2, 'whitepiece', imgURL.whitePawnImg))
    return result;
  }
}

