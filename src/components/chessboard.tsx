"use client"

import { useState } from "react"
import { Board } from "../utils/board"
import Image from "next/image"
import { IconChess, IconChessBishop, IconChessKing, IconChessKnight, IconChessQueen, IconChessRook } from "@tabler/icons-react"

export function Chessboard(){
    const [currentBoard, setCurrentBoard] = useState(new Board())
    return (
        <div className="shadow-2xl">
            <div className="w-[600px] h-[600px] grid grid-rows-8 grid-cols-8">
            {currentBoard.fields.map((boardRow, rowIndex) => {
                return boardRow.map((field /* 0 or chess piece */, columnIndex) => {
                    return <div key = {`${rowIndex}_${columnIndex}`} className = {`w-[75px] h-[75px] flex justify-center items-center ${rowIndex % 2 === columnIndex % 2 ? 'bg-gray-400' : 'bg-gray-700'}`}>
                        {field !== 0 && field.kind === 'bishop' && field.color === 'black' && <IconChessBishop size={50} color="black"/>}
                        {field !== 0 && field.kind === 'bishop' && field.color === 'white' && <IconChessBishop size={50} color="white"/>}
                        {field !== 0 && field.kind === 'rook' && field.color === 'black' && <IconChessRook size={50} color="black"/>}
                        {field !== 0 && field.kind === 'rook' && field.color === 'white' && <IconChessRook size={50} color="white"/>}
                        {field !== 0 && field.kind === 'pawn' && field.color === 'black' && <IconChess size={50} color="black"/>}
                        {field !== 0 && field.kind === 'pawn' && field.color === 'white' && <IconChess size={50} color="white"/>}
                        {field !==0 && field.kind === 'knight' && field.color == 'black' && <IconChessKnight size={50} color="black"/>}
                        {field !==0 && field.kind === 'knight' && field.color == 'white' && <IconChessKnight size={50} color="white"/>}
                        {field !==0 && field.kind === 'queen' && field.color == 'black' && <IconChessQueen size={50} color="black"/>}
                        {field !==0 && field.kind === 'queen' && field.color == 'white' && <IconChessQueen size={50} color="white"/>}
                        {field !==0 && field.kind === 'king' && field.color == 'black' && <IconChessKing     size={50} color="black"/>}
                        {field !==0 && field.kind === 'king' && field.color == 'white' && <IconChessKing size={50} color="white"/>}

                        

                    </div>
                })
            })}
            </div>
        </div>
    )
}