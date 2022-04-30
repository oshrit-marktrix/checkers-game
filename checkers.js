BoardSize = 8
let imgSrc =
{
  blackpiece: "./PIECES/blackpiece.png",
  queenblackpiece: "./PIECES/queenblackpiece.png",
  whitepiece: "./PIECES/whitepiece.png",
  queenwhitepiece: "./PIECES/queenwhitepiece.png"
}
table = document.createElement("table");
function createBoard() {
  document.body.appendChild(table);
  table.className = "table"
  for (let i = 0; i < BoardSize; i++) {
    const row = table.insertRow();
    for (let j = 0; j < BoardSize; j++) {
      const cell = row.insertCell();
      cell.id = i.toString() + " " + j.toString();
      if ((i + j) % 2 == 0) {

        cell.classList.add("black")
      } else {
        cell.classList.add("white");
      }
      // cellElement.addEventListener('click', () => onCellClick(row, col));
    }
  }
}
createBoard();
class Pieces {
  constructor(row, col, type, color, imgSrc) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.color = color;
    this.imgSrc = this.imgToPlayer(imgSrc);
  }

  imgToPlayer(Src) {//tag the img to player element
    let newEl = document.createElement("img");
    newEl.src = Src;
    let cell = table.rows[this.row].cells[this.col];
    cell.appendChild(newEl)
    for (let i = 0; i < 3; i += 1) {
      for (let j = i % 2; j < 8; j += 2) {
        (this.color == 'whitepiece')
      }
      newEl.classList.add('upSide')
    }
    return newEl;
  }
}

class boardData {
  constructor(pieces) {
    this.pieces = this.getPieces()(pieces);
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
    result.push(new Pieces(i, j, '', 'blackpiece', imgSrc.blackpiece))
    result.push(new Pieces(6, 2, '', 'whitepiece', imgSrc.whitePawnImg))
    return result;
  }
}
console.log(Pieces);

