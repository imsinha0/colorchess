"use client";

import { useState } from 'react';
import {Board} from '../utils/chessboard';
import Image from 'next/image';

export default function GameController(){
    const [board, setBoard] = useState(new Board());


    const renderBoard = () => {
        const squares = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const color = board.boardcolors[row][col];
                const piece = board.boardconfig[row][col]

                squares.push(
                    <div key={`${row}-${col}`} 
                    className={`w-[75px] h-[75px] border-2 border-gray-700`} style={{ backgroundColor: color }}>

                        {piece && (
                            <Image src={`/pieces/${piece.color}_${piece.kind}.png`} width={75} height={75} alt="chess piece" />)}
                    </div>
                );
            }
            
        }
        return squares;
    }

    return (

        <div className="flex justify-center items-center h-screen">
        <div className = "w-[600px] h-[600px] grid grid-rows-8 grid-cols-8 shadow-2xl">
          {renderBoard()}
        </div>
        </div>

    )
}