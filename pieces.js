
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
        let result = [];//return if their option to eat so you can't move to the other direction

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
        let result = [];//return if their option to eat so you can't move to the other direction
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