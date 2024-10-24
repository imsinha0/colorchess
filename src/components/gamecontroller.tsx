"use client";

import { useState } from 'react';
import {Board} from '../utils/chessboard';
import Image from 'next/image';
import PromotionModal from './PromotionModal';

export default function GameController(){
    const [board, setBoard] = useState(new Board());
    const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null);
    const [turn, setTurn] = useState<'white' | 'black'>('white');
    const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
    const [promotionModalPiece, setPromotionModalPiece] = useState<{ row: number; col: number } | null>(null);


    const handleSquareClick = (row: number, col: number) => {
        const piece = board.boardconfig[row][col];

        if(selectedSquare){
            // move piece
            const selectedChessPiece = board.boardconfig[selectedSquare.row][selectedSquare.col];

            if(selectedChessPiece && board.isMoveValid(selectedChessPiece, selectedSquare.row, selectedSquare.col, row, col)){
                board.movePiece(selectedSquare.row, selectedSquare.col, row, col);

                setTurn(turn === 'white' ? 'black' : 'white');

                if(selectedChessPiece.kind === 'pawn' && (row === 0 || row === 7)){
                    // open promotion modal
                    setIsPromotionModalOpen(true);
                    setPromotionModalPiece({ row, col });
                }

                //const oppositeColor = turn === 'white' ? 'black' : 'white';

                
            }
            if(piece && piece.color === turn){
                setSelectedSquare({ row, col });
            }
            else{
                setSelectedSquare(null);
            }

        } else if (piece && piece.color === turn){
            setSelectedSquare({ row, col });
        }
        else{
            setSelectedSquare(null);
        }

    };

    const promotePawn = (piece: 'queen' | 'rook' | 'bishop' | 'knight') => {
        if(promotionModalPiece){
            board.promotePawn(promotionModalPiece.row, promotionModalPiece.col, piece);
            setIsPromotionModalOpen(false);
            setPromotionModalPiece(null);
        }
    }



    const renderBoard = () => {
        const squares = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const color = board.boardcolors[row][col];
                const piece = board.boardconfig[row][col];
                const selected = selectedSquare?.row === row && selectedSquare?.col === col;

                squares.push(
                    <div key={`${row}-${col}`} 
                    className={`w-[75px] h-[75px]  ${selected ? 'border-2 border-yellow-500':'border-2 border-gray-700'}`} style={{ backgroundColor: color }}
                    onClick={() => handleSquareClick(row, col)}>

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
          <PromotionModal
            isOpen={isPromotionModalOpen}
            onClose={() => setIsPromotionModalOpen(false)}
            promotePawn={promotePawn}
          />
        </div>
        </div>
      )
}