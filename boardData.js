
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