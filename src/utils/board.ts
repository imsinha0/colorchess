
type ChessPieceKind = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'
type ChessPieceColor = 'white' | 'black'

class ChessPiece{
    constructor(public kind: ChessPieceKind, public color: ChessPieceColor){
        //no need to initialize with values
    }
}

function dp(kind: ChessPieceKind='pawn'){
    return new ChessPiece(kind, 'black')
}

function lp(kind: ChessPieceKind='pawn'){
    return new ChessPiece(kind, 'white')
}

export class Board{
    fields:Array<Array<ChessPiece | 0>> = [
        [dp('rook'), dp('knight'), dp('bishop'), dp('queen'), dp('king'), dp('bishop'), dp('knight'), dp('rook')],
        [dp(), dp(), dp(), dp(), dp(), dp(), dp(), dp()],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [lp(), lp(), lp(), lp(), lp(), lp(), lp(), lp()],
        [lp('rook'), lp('knight'), lp('bishop'), lp('queen'), lp('king'), lp('bishop'), lp('knight'), lp('rook')]
    ]
}

