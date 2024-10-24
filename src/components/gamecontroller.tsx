"use client";

import { useState } from 'react';
import {Board} from '../utils/chessboard';
import Image from 'next/image';
import PromotionModal from './PromotionModal';
import { ScrollArea } from "@/components/ui/scroll-area"


export default function GameController(){
    const [board, setBoard] = useState(new Board());
    const [selectedSquare, setSelectedSquare] = useState<{ row: number; col: number } | null>(null);
    const [turn, setTurn] = useState<'white' | 'black'>('white');
    const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
    const [promotionModalPiece, setPromotionModalPiece] = useState<{ row: number; col: number } | null>(null);
    const [gameLog, setGameLog] = useState<string[]>([]);


    const handleSquareClick = (row: number, col: number) => {
        const piece = board.boardconfig[row][col];

        if(selectedSquare){
            // move piece
            const selectedChessPiece = board.boardconfig[selectedSquare.row][selectedSquare.col];

            if(selectedChessPiece && board.isMoveValid(selectedChessPiece, selectedSquare.row, selectedSquare.col, row, col)){
                board.movePiece(selectedSquare.row, selectedSquare.col, row, col);

                // add move to game log
                const log = `${selectedChessPiece.color} ${selectedChessPiece.kind} moved from ${selectedSquare.row},${selectedSquare.col} to ${row},${col}`;
                setGameLog([...gameLog, log]);

                setTurn(turn === 'white' ? 'black' : 'white');

                if(selectedChessPiece.kind === 'pawn' && (row === 0 || row === 7)){
                    // open promotion modal
                    setIsPromotionModalOpen(true);
                    setPromotionModalPiece({ row, col });
                }

                //const oppositeColor = turn === 'white' ? 'black' : 'white';

                
            }
            if(selectedSquare.row === row && selectedSquare.col === col){
                setSelectedSquare(null);
            }
            else if(piece && piece.color === turn){
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

            const oppositeColor = turn === 'white' ? 'black' : 'white';
            const log = `${oppositeColor} pawn promoted to ${piece}`;
            setGameLog([...gameLog, log]);
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
        
        <ScrollArea className="h-[600px] w-[250px] rounded-md border p-4 shadow-md bg-card text-card-foreground text-white">
          <h2 className="text-2xl font-bold mb-4">Game Log</h2>
          <p className="text-sm">
            {gameLog.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </p>
        </ScrollArea>

        </div>

      )
}