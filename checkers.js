
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
    if (this.player == 'white_player') {
      newEl.classList.add('white')
    }
    else {
      newEl.classList.add('black')
    }
    return newEl;
  }
  getPossibleMoves() {
    if (boardData.currentPlayer !== this.player || boardData.winner !== undefined) {
      return []
    }
    let moves;

    let findMovesFunc = {
      'white': 'getwhiteMoves',
      'black': 'getblackMoves',
      'queen': 'getQueenMoves',
      'king': 'getKingMoves',
    }

    moves = this[findMovesFunc[this.type]]() // Call the function and get a List of the relative and absolute moves of this piece.

    let filteredMoves = [];
    for (let move of moves) {
      const absoluteRow = move[0];
      const absoluteCol = move[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(move);


      }
    }
    return filteredMoves;
  }

  getMovesInDirection(directionRow, directionCol, boardData) {
    let result = [];
    if (this.type === 'white' || this.type === 'black') {
      for (let i = 1; i < 2; i++) {
        let row = this.row + directionRow;
        let col = this.col + directionCol;
        if (boardData.getPiece(row, col) === undefined) {
          result.push([row, col]);
        } else if (this.player !== boardData.getPiece(row, col).player) {
          result.push([row, col]);
          return result;
        } else if (this.player === boardData.getPiece(row, col).player) {
          return result;
        }
      }
      return result;
    } else {
      let row = this.row + directionRow;
      let col = this.col + directionCol;
      if (boardData.getPiece(row, col) === undefined) {
        result.push([row, col]);
      } else if (this.player !== boardData.getPiece(row, col).player) {
        result.push([row, col]);
        return result;
      } else if (this.player === boardData.getPiece(row, col).player) {
        return result;
      }
      return result;
    }
  }
  checking() {
    let result = [false, false]
    if (currentPosition[1] !== 7) {
      let cell = document.getElementById(`${currentPosition[0] - 1} ${currentPosition[1] + 1}`).getElementsByClassName('black')[0]
      if (cell) {
        result[0] = true;
      }
    }
    if (currentPosition[1] !== 0) {
      cell = document.getElementById(`${currentPosition[0] - 1} ${currentPosition[1] - 1}`).getElementsByClassName('black')[0]
      if (cell) {
        result[1] = true;
      }
      return result
    }
  }
  getwhiteMoves() {
    let checkes = this.checking();
    let result = [];
    if (checkes[1]) result = result.concat(this.getMovesInDirection(-2, -2, boardData));
    else result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    if (checkes[0]) result = result.concat(this.getMovesInDirection(-2, 2, boardData));
    else result = result.concat(this.getMovesInDirection(-1, 1, boardData));

    return result;
  }
  getwhiteEatMoves() {
    let result = [];
    return result;

  }
  getblackMoves() {
    let result = [];
    result = result.concat(this.getMovesInDirection(1, 1, boardData))
    result = result.concat(this.getMovesInDirection(1, -1, boardData))
    return result;
  }
  getblackEatMoves() {
    let result = [];
    result = result.concat(this.getMovesInDirection(2, 2, boardData));
    result = result.concat(this.getMovesInDirection(2, -2, boardData));
    return result;

  }
  getQueenMoves() {
    let result = [];

    result = result.concat(this.getMovesInDirection(+i, -i, boardData));
    result = result.concat(this.getMovesInDirection(-i, -i, boardData));
    result = result.concat(this.getMovesInDirection(-i, +i, boardData));
    result = result.concat(this.getMovesInDirection(+i, +i, boardData));
    return result;
  }
  getKingMoves() {
    let result = [];
    result = result.concat(this.getMovesInDirection(+i, -i, boardData));
    result = result.concat(this.getMovesInDirection(-i, -i, boardData));
    result = result.concat(this.getMovesInDirection(-i, +i, boardData));
    result = result.concat(this.getMovesInDirection(+i, +i, boardData));
    return result;

  }
  // checkEat(player) {
  //   if (){}

  // }
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
  tryMove(piece, row, col) {

    selectedCell = boardEl.rows[row].cells[col];
    // If the cell - is in the possibleMoves list [[2,1], [1,0]]
    if (piece.getPossibleMoves().some(element => element.toString() === [row, col].toString())) {
      this.removePiece(row, col);
      // Remove img if there is a piece. Better than removeChild for case of empty cells.
      selectedCell.innerHTML = ''
      // Update new piece's position to the selected cell:
      piece.row = row;
      piece.col = col;
      selectedCell.appendChild(piece.img);

      if (!boardEl.innerHTML.includes("white") || !boardEl.innerHTML.includes("black"))
        this.gameOver()
      this.endTurn()

      return true;
    }
    return false;
  }
  endTurn() {
    if (this.currentPlayer === 'white_player') {
      this.currentPlayer = 'black_player';
    } else {
      this.currentPlayer = 'white_player';
    }
    // document.querySelector(".Player-1").classList.toggle("player--active");
    // document.querySelector(".Player-2").classList.toggle("player--active")
  }
  gameOver() {
    this.winner = this.currentPlayer;
    let winnerMessage = document.createElement('div')
    winnerMessage.innerHTML = 'The winner is: ' + this.currentPlayer;
    winnerMessage.classList.add('winner')
    boardEl.appendChild(winnerMessage);
  }
  removePiece(row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      const piece = this.pieces[i];
      if (piece.row === row && piece.col === col) {
        this.pieces.splice(i, 1);
        return piece;
      }
    }
  }

  getPiece(row, col) {// function that will "recognize" the pieces place
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece
      }
    }
  }
  // Return a list of all pieces, their first locations, their color and images elements.
  getInitialPieces() {
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
}//img's url that get into the "pieces" class constructor
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
let currentPosition;
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
  currentPosition = [row, col]
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
  // } console.log(cell);
  // function royalty() {
  //   if (col) {

  //   }
}