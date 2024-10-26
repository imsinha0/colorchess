

type ChessPieceKind = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
type ChessPieceColor = 'white' | 'black';

class ChessPiece {
  constructor(
    public kind: ChessPieceKind,
    public color: ChessPieceColor
  ) {}
}

const colors = ['red', 'green', 'blue'] as const;

function dp(kind: ChessPieceKind) {
    return new ChessPiece(kind, 'black');
    }
function lp(kind: ChessPieceKind) {
    return new ChessPiece(kind, 'white');
    }

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function createColorBoard() {
    const board = [];
    for (let row = 0; row < 4; row++) {
        const rowColors = [];
        for (let col = 0; col < 8; col++) {
            rowColors.push(getRandomColor());
        }
        board.push(rowColors);
    }
    return board.concat(board.slice().reverse());
}

export class Board{
    boardconfig: Array<Array<ChessPiece|null>> = [
        [dp('rook'), dp('knight'), dp('bishop'), dp('queen'), dp('king'), dp('bishop'), dp('knight'), dp('rook')],
        [dp('pawn'), dp('pawn'), dp('pawn'), dp('pawn'), dp('pawn'), dp('pawn'), dp('pawn'), dp('pawn')],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [lp('pawn'), lp('pawn'), lp('pawn'), lp('pawn'), lp('pawn'), lp('pawn'), lp('pawn'), lp('pawn')],
        [lp('rook'), lp('knight'), lp('bishop'), lp('queen'), lp('king'), lp('bishop'), lp('knight'), lp('rook')]
    ];

    boardcolors: Array<Array<string>> = createColorBoard();

    whiteKingPosition = {row: 4, col: 7};
    blackKingPosition = {row: 4, col: 0};

    currentColor: string = "";

    movePiece(fromRow: number, fromCol: number, toRow: number, toCol: number) {
        const piece  = this.boardconfig[fromRow][fromCol];
        this.boardconfig[toRow][toCol] = piece;
        this.boardconfig[fromRow][fromCol] = null;
        if(piece && piece.kind == 'king'){
            if(piece.color == 'white'){
                this.whiteKingPosition = {row: toRow, col: toCol};
            }else{
                this.blackKingPosition = {row: toRow, col: toCol};
            }
        }
        if(piece && piece.kind == 'pawn' && (toRow === 0 || toRow === 7)){

        }
    }

    promotePawn(row: number, col: number, piece: 'queen' | 'rook' | 'bishop' | 'knight') {
        this.boardconfig[row][col] = new ChessPiece(piece, this.boardconfig[row][col]!.color);
    }

    isPathClear = (startRow: number, startCol: number, endRow: number, endCol: number) => {

        let rowDirection = endRow > startRow ? 1 : -1;
        let colDirection = endCol > startCol ? 1 : -1
        if(startRow === endRow){
            rowDirection = 0;
        }
        if(startCol === endCol){
            colDirection = 0;
        }
        

        let row = startRow + rowDirection;
        let col = startCol + colDirection;

        while (row !== endRow || col !== endCol) {
            if (this.boardconfig[row][col]) {
                return false;
            }
            row += rowDirection;
            col += colDirection;
        }
        return true;
    }

    isKingInCheck(color: ChessPieceColor): boolean {
        const kingPosition = color === 'white' ? this.whiteKingPosition : this.blackKingPosition;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.boardconfig[row][col];
                if (piece instanceof ChessPiece && piece.color !== color) {
                    if (this.isMoveValid(piece, row, col, kingPosition.row, kingPosition.col)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    movesPutKingInCheck = (piece: ChessPiece, startRow: number, startCol: number, endRow: number, endCol: number) => {
        const simulatedBoard = new Board();
        simulatedBoard.boardconfig = this.boardconfig.map(row => row.slice());
        simulatedBoard.movePiece(startRow, startCol, endRow, endCol);
        if (simulatedBoard.isKingInCheck(piece.color)) {
            return true;
        }
        return false;
    }

    doesKingExist = (color: ChessPieceColor) => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.boardconfig[row][col];
                if (piece instanceof ChessPiece && piece.kind === 'king' && piece.color === color) {
                    return true;
                }
            }
        }
        return false;
    }

    isCheckmate = (color: ChessPieceColor) => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.boardconfig[row][col];
                if (piece instanceof ChessPiece && piece.color === color) {
                    for (let endRow = 0; endRow < 8; endRow++) {
                        for (let endCol = 0; endCol < 8; endCol++) {
                            if (this.isMoveValid(piece, row, col, endRow, endCol) && !this.movesPutKingInCheck(piece, row, col, endRow, endCol)) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }

    isStalemate = (color: ChessPieceColor) => {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.boardconfig[row][col];
                if (piece instanceof ChessPiece && piece.color === color) {
                    for (let endRow = 0; endRow < 8; endRow++) {
                        for (let endCol = 0; endCol < 8; endCol++) {
                            if (this.isMoveValid(piece, row, col, endRow, endCol)) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }

    isMoveValid = (piece: ChessPiece, startRow: number, startCol: number, endRow: number, endCol: number) => {

        const rowDiff = Math.abs(startRow - endRow);
        const colDiff = Math.abs(startCol - endCol);

        if(piece.color === 'white' && this.boardconfig[endRow][endCol] && this.boardconfig[endRow][endCol].color === 'white'){
            return false;
        }
        if(piece.color === 'black' && this.boardconfig[endRow][endCol] && this.boardconfig[endRow][endCol].color === 'black'){
            return false;
        }

        switch (piece.kind) {
            case 'pawn':
                if(piece.color === 'white'){
                    if(startRow === 6 && endRow === 4 && startCol === endCol && !this.boardconfig[endRow][endCol]){
                        return this.isPathClear(startRow, startCol, endRow, endCol);
                    }
                    if(rowDiff === 1 && startRow > endRow && startCol === endCol && !this.boardconfig[endRow][endCol]){
                        return this.isPathClear(startRow, startCol, endRow, endCol);
                    }
                    if(endRow === startRow - 1 && colDiff === 1 && this.boardconfig[endRow][endCol]){
                        return true;
                    }
                }
                if(piece.color === 'black'){
                    if(startRow === 1 && endRow === 3 && startCol === endCol && !this.boardconfig[endRow][endCol]){
                        return this.isPathClear(startRow, startCol, endRow, endCol);
                    }
                    if(rowDiff === 1 && startRow < endRow && startCol === endCol && !this.boardconfig[endRow][endCol]){
                        return this.isPathClear(startRow, startCol, endRow, endCol);
                    }
                    if(endRow === startRow + 1 && colDiff === 1 && this.boardconfig[endRow][endCol]){
                        return true;
                    }
                }
                break
            case 'rook':
                if(startRow === endRow || startCol === endCol){
                    return this.isPathClear(startRow, startCol, endRow, endCol);
                }
                break
            case 'knight':
                if((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)){
                    return true;
                }
                break
            case 'bishop':
                if(rowDiff === colDiff){
                    return this.isPathClear(startRow, startCol, endRow, endCol);
                }
                break
            case 'queen':
                if(rowDiff === colDiff || startRow === endRow || startCol === endCol){
                    return this.isPathClear(startRow, startCol, endRow, endCol);
                }
                break
            case 'king':
                if(piece.color === 'white'){

                    if(startRow === 7 && endRow === 7 && startCol === 4 && endCol === 6 && this.boardconfig[7][7] && this.boardconfig[7][7].kind === 'rook' && this.boardconfig[7][7].color === 'white' && !this.boardconfig[7][5] && !this.boardconfig[7][6]){
                        this.boardconfig[7][7] = null;
                        this.boardconfig[7][5] = new ChessPiece('rook', 'white');
                        return true;
                    }
                    if(startRow === 7 && endRow === 7 && startCol === 4 && endCol === 2 && this.boardconfig[7][0] && this.boardconfig[7][0].kind === 'rook' && this.boardconfig[7][0].color === 'white' && !this.boardconfig[7][1] && !this.boardconfig[7][2] && !this.boardconfig[7][3]){
                        this.boardconfig[7][0] = null;
                        this.boardconfig[7][3] = new ChessPiece('rook', 'white');
                        return true;
                    }
                }
                if(piece.color === 'black'){

                    if(startRow === 0 && endRow === 0 && startCol === 4 && endCol === 6 && this.boardconfig[0][7] && this.boardconfig[0][7].kind === 'rook' && this.boardconfig[0][7].color === 'black' && !this.boardconfig[0][5] && !this.boardconfig[0][6]){
                        this.boardconfig[0][7] = null;
                        this.boardconfig[0][5] = new ChessPiece('rook', 'black');
                        return true;
                    }
                    if(startRow === 0 && endRow === 0 && startCol === 4 && endCol === 2 && this.boardconfig[0][0] && this.boardconfig[0][0].kind === 'rook' && this.boardconfig[0][0].color === 'black' && !this.boardconfig[0][1] && !this.boardconfig[0][2] && !this.boardconfig[0][3]){
                        this.boardconfig[0][0] = null;
                        this.boardconfig[0][3] = new ChessPiece('rook', 'black');
                        return true;
                    }
                }

                if(rowDiff <= 1 && colDiff <= 1){
                    return true;
                }
                break
        }
    }



}