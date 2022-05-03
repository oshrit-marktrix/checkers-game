
let imgURLsObj =
{
  blackblackImg: "http://chongzizil.github.io/Checkers-SMG/imgs/black_man.png",
  blackKingImg: "http://chongzizil.github.io/Checkers-SMG/imgs/black_cro.png",
  whitewhiteImg: "http://chongzizil.github.io/Checkers-SMG/imgs/white_man.png",
  whiteQueenImg: "http://chongzizil.github.io/Checkers-SMG/imgs/white_cro.png",
}
let selectedCell;
let boardData;
let selectedPiece;
let cell;
const BOARD_SIZE = 8;
const boardEl = document.createElement("table");

function createMainBoard() {
  boardEl.classList.add("mainBoard");
  document.body.appendChild(boardEl);
  for (let row = 0; row < BOARD_SIZE; row++) {
    let rowElement = boardEl.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      cell = rowElement.insertCell();
      cell.id = row.toString() + " " + col.toString();
      if ((row + col) % 2 === 0) {
        cell.classList.add("dark");
      } else {
        cell.classList.add("light");
      }
      cell.addEventListener('click', () => onCellClick(row, col));
    }
  }
  boardData = new BoardData('white_player');
}

window.addEventListener('load', createMainBoard);

function onCellClick(row, col) {
  selectedCell = boardEl.rows[row].cells[col];

  if (selectedPiece !== undefined && boardData.tryMove(selectedPiece, row, col)) {
    boardData.clearBoard(boardEl);
    selectedPiece = undefined;

  } else { // First click will always start in the else block.
    boardData.clearBoard(boardEl);
    const piece = boardData.getPiece(row, col);
    if (!(piece === undefined)) {
      boardData.paintPossibleMoves(piece)
    }
    selectedCell.classList.add('selected');
    selectedPiece = piece;
  }
}