
class Pieces {
  constructor(row, col, type, player, imgUrl) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
    if (imgUrl != undefined) {
      this.img = this.imgToElement(imgUrl);
    }
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

    let findMovesFunc = {//get into the moves option and returned by the type.
      'white': ['getwhiteMoves'],
      'black': ['getblackMoves'],
      'queen': ['getQueenMoves'],
      'king': ['getKingMoves'],
    }

    moves = [];
    for (let move of findMovesFunc[this.type]) {

      moves = moves.concat(this[move]()); // Call the function and get a List of the relative and absolute moves of this piece.
    }

    return moves;
  }

  getMovesInDirection(directionRow, directionCol, limit, onlyEat, boardData) {//multiplayer eating method,controled by the direction of the move
    let result = [];
    let eat = false;
    let eatRow;
    let eatCol;
    for (let i = 1; i <= limit; i++) {
      let row = this.row + i * directionRow;
      let col = this.col + i * directionCol;
      if (row <= 7 && 0 <= row && 0 <= col && col <= 7) {

        if (boardData.getPiece(row, col) === undefined) {

          if (eat) {
            result.push([row, col, [[eatRow, eatCol]]]);
            //checking each direction multiplayer eating after the first jump.
            if (!(directionRow === -1 && directionCol === 1)) {
              let piece1 = new Pieces(row, col, this.type, this.player, undefined);
              let result1 = piece1.getMovesInDirection(+1, -1, limit, true, boardData);
              for (let move of result1) {//prevent the player position to be returned as a possible move.
                move[2].push([eatRow, eatCol]);
              }
              result = result.concat(result1);
            }

            if (!(directionRow === 1 && directionCol === 1)) {

              let piece2 = new Pieces(row, col, this.type, this.player, undefined);
              let result2 = piece2.getMovesInDirection(-1, -1, limit, true, boardData);
              for (let move of result2) {
                move[2].push([eatRow, eatCol]);
              }
              result = result.concat(result2);
            }

            if (!(directionRow === 1 && directionCol === -1)) {

              let piece3 = new Pieces(row, col, this.type, this.player, undefined);
              let result3 = piece3.getMovesInDirection(-1, +1, limit, true, boardData);
              for (let move of result3) {
                move[2].push([eatRow, eatCol]);
              }
              result = result.concat(result3);
            }

            if (!(directionRow === -1 && directionCol === -1)) {

              let piece4 = new Pieces(row, col, this.type, this.player, undefined);
              let result4 = piece4.getMovesInDirection(+1, +1, limit, true, boardData);
              for (let move of result4) {
                move[2].push([eatRow, eatCol]);
              }
              result = result.concat(result4);
            }
          }
          else if (!onlyEat) {
            result.push([row, col, []]);
          }
          break;
        } else if (this.player === boardData.getPiece(row, col).player) {
          break;
        } else {
          eat = true;
          eatRow = row;
          eatCol = col;
          //result.push([row, col]);
          //return result;
        }
      }
      else {
        break;
      }
    }
    return result;
  }
  getwhiteMoves() {
    let result = [];

    let result1 = this.getMovesInDirection(-1, 1, 2, false, boardData);
    let eaton1 = result1.some(r => r[2].length > 0);
    let result2 = this.getMovesInDirection(-1, -1, 2, false, boardData);
    let eaton2 = result2.some(r => r[2].length > 0);

    if (eaton1) {
      result = result.concat(result1);
      if (eaton2) {
        result = result.concat(result2);
      }
    }
    else if (!eaton2) {
      result = result.concat(result1);
      result = result.concat(result2);
    }
    else {
      result = result.concat(result2);
    }

    return result;
  }
  getblackMoves() {
    let result = [];
    let result1 = this.getMovesInDirection(1, 1, 2, false, boardData);
    let eaton1 = result1.some(r => r[2].length > 0);
    let result2 = this.getMovesInDirection(1, -1, 2, false, boardData);
    let eaton2 = result2.some(r => r[2].length > 0);

    if (eaton1) {
      result = result.concat(result1);
      if (eaton2) {
        result = result.concat(result2);
      }
    }
    else if (!eaton2) {
      result = result.concat(result1);
      result = result.concat(result2);
    }
    else {
      result = result.concat(result2);
    }

    return result;

  }
  // getblackEatMoves() {
  //   let result = [];
  //   result = result.concat(this.getMovesInDirection(2, 2, boardData));
  //   result = result.concat(this.getMovesInDirection(2, -2, boardData));
  //   return result;

  // }
  getQueenMoves() {
    let result = [];

    result = result.concat(this.getMovesInDirection(+1, -1, 7, boardData));
    result = result.concat(this.getMovesInDirection(-1, -1, 7, boardData));
    result = result.concat(this.getMovesInDirection(-1, +1, 7, boardData));
    result = result.concat(this.getMovesInDirection(+1, +1, 7, boardData));
    return result;
  }
  getKingMoves() {
    let result = [];
    result = result.concat(this.getMovesInDirection(+1, -1, 7, boardData));
    result = result.concat(this.getMovesInDirection(-1, -1, 7, boardData));
    result = result.concat(this.getMovesInDirection(-1, +1, 7, boardData));
    result = result.concat(this.getMovesInDirection(+1, +1, 7, boardData));
    return result;

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
  tryMove(piece, row, col) {

    selectedCell = boardEl.rows[row].cells[col];
    let move = piece.getPossibleMoves().find(element => element[0] == row && element[1] == col);

    // If the cell - is in the possibleMoves list [[2,1], [1,0]]
    if (move != undefined) {
      // Remove img if there is a piece.
      selectedCell.innerHTML = '';
      this.removePiece(row, col);
      // Update new piece's position to the selected cell:
      piece.row = row;
      piece.col = col;




      selectedCell.appendChild(piece.img);

      let eats = move[2];
      for (let eat of eats) {
        let eatenCell = boardEl.rows[eat[0]].cells[eat[1]];
        eatenCell.innerHTML = '';
        this.removePiece(eat[0], eat[1]);
      }
      if (!boardEl.innerHTML.includes("white") || !boardEl.innerHTML.includes("black"))
        this.gameOver();


      this.endTurn();

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
  }
  gameOver() {
    this.winner = this.currentPlayer;
    let winnerMessage = document.createElement('div')
    winnerMessage.innerHTML = 'The winner is: ' + this.currentPlayer;
    winnerMessage.classList.add('winner')
    document.body.appendChild(winnerMessage);
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